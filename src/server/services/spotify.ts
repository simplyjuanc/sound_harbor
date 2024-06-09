import {type AccessToken, SpotifyApi} from "@spotify/web-api-ts-sdk";
import {env} from "~/env";




class SpotifyClient {
    private CLIENT_ID: string;
    private CLIENT_SECRET: string;
    private REDIRECT_URL: string;
    private SCOPES: string[];
    private api = SpotifyApi;

    constructor({
        clientId,
        clientSecret,
        redirectUrl,
        scopes,
    }: { clientId: string, clientSecret: string, redirectUrl:string, scopes: string }) {
        this.CLIENT_ID = clientId;
        this.CLIENT_SECRET = clientSecret;
        this.SCOPES = scopes.split(" ");
        this.REDIRECT_URL = redirectUrl
    }

    async initiateMixedUserAuthFlow(postbackUrl:string) {
        return this.api.performUserAuthorization(
            this.CLIENT_ID,
            this.REDIRECT_URL,
            this.SCOPES,
            postbackUrl
        );
    }

    async confirmMixedUserUserAuth(accessToken: AccessToken) {
        return this.api.withAccessToken(this.CLIENT_ID, accessToken);
    }

}


const spotifyClient = new SpotifyClient({
    clientId: env.SPOTIFY_CLIENT_ID,
    clientSecret: env.SPOTIFY_CLIENT_SECRET,
    redirectUrl: env.SPOTIFY_REDIRECT_URL,
    scopes: env.SPOTIFY_SCOPES}
);

export default spotifyClient;