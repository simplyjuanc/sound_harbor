import {env} from "~/env";
import {redirect} from "next/navigation";
import {stringify} from "node:querystring";


enum SpotifyResponse {
    CODE = 'code',
    AUTHORIZATION_CODE = 'authorization_code',
}


interface AuthorizationToken {
    access_token: string; //	An access token that can be provided in subsequent calls, for example to Spotify Web API services.
    token_type: string; //	How the access token may be used: always "Bearer".
    scope: string; //	A space-separated list of scopes which have been granted for this access_token
    expires_in: number; //	The time period (in seconds) for which the access token is valid.
    refresh_token: string; //	See refreshing tokens.
}


class SpotifyClient {
    private readonly clientId: string;
    private readonly clientSecret: string;
    private readonly scopes: string;
    private readonly redirectUrl: string;

    readonly AUTH_BASE_URL =  'https://accounts.spotify.com';
    readonly AUTH_URL =  this.AUTH_BASE_URL + '/authorize?';
    readonly TOKEN_URL =  this.AUTH_URL + '/api/token?'
    private state: string | undefined;

    private accessToken: string | undefined;
    private refreshToken: string | undefined;
    private expiresIn: Date | undefined;

    constructor({
        clientId,
        clientSecret,
        redirectUrl,
        scopes,
    } : { clientId: string, clientSecret: string, redirectUrl: string, scopes: string }) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.scopes = scopes;
        this.redirectUrl = redirectUrl
    }

    initiateUserAuth() {
        this.state = this.generateRandomString();
        const authRequestBody = {
            response_type: SpotifyResponse.CODE,
            client_id: this.clientId,
            redirect_uri: this.redirectUrl,
            scope: this.scopes,
            state: this.state,
        };
        redirect(
            this.AUTH_URL +
            stringify(authRequestBody)
        );
    }


    async confirmAuthCallback(authorizationCode: string, state: string) {
        try {
            const response = await fetch(
                this.TOKEN_URL,
                {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        Authorization: `Basic ${Buffer.from(
                            this.clientId + ':' + this.clientSecret
                        ).toString('base64')}`,
                    },
                    body: new URLSearchParams({
                        code: authorizationCode,
                        redirect_uri: this.redirectUrl,
                        grant_type: SpotifyResponse.AUTHORIZATION_CODE,
                    }),
                }
            );

            const data = await response.json() as AuthorizationToken;
            this.accessToken = data.access_token;
            this.refreshToken = data.refresh_token;
            this.expiresIn = addTimeInterval(new Date(), data.expires_in, 'seconds');
        } catch (e) {
            console.log(e);
        }
    }


    private generateRandomString (length = 64): string {
        let text = '';
        const possible =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return encodeURIComponent(text);
    };

}

type TimeInterval = 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds';

function addTimeInterval(date: Date, amount: number, interval: TimeInterval): Date {
    const newDate = new Date(date.getTime()); // Create a new date object to avoid mutating the original date

    switch (interval) {
        case 'years':
            newDate.setFullYear(date.getFullYear() + amount);
            break;
        case 'months':
            newDate.setMonth(date.getMonth() + amount);
            break;
        case 'days':
            newDate.setDate(date.getDate() + amount);
            break;
        case 'hours':
            newDate.setHours(date.getHours() + amount);
            break;
        case 'minutes':
            newDate.setMinutes(date.getMinutes() + amount);
            break;
        case 'seconds':
            newDate.setSeconds(date.getSeconds() + amount);
            break;
        default:
            throw new Error(`Invalid interval.`);
    }

    return newDate;
}


const spotifyClient = new SpotifyClient({
    clientId: env.SPOTIFY_CLIENT_ID,
    clientSecret: env.SPOTIFY_CLIENT_SECRET,
    redirectUrl: env.SPOTIFY_REDIRECT_URL,
    scopes: env.SPOTIFY_SCOPES}
);

export default spotifyClient;
