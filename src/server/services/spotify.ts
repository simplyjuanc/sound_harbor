import {env} from "~/env";
import {redirect} from "next/navigation";
import {stringify} from "node:querystring";
import {addTimeInterval, generateRandomAlphanumString} from "~/lib/utils";


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
        this.state = generateRandomAlphanumString();
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
                        Authorization:
                            `Basic ${Buffer.from(this.clientId + ':' + this.clientSecret)
                            .toString('base64')}`,
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

}


const spotifyClient = new SpotifyClient({
    clientId: env.SPOTIFY_CLIENT_ID,
    clientSecret: env.SPOTIFY_CLIENT_SECRET,
    redirectUrl: env.SPOTIFY_REDIRECT_URL,
    scopes: env.SPOTIFY_SCOPES}
);

export default spotifyClient;
