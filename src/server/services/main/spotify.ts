import {
    auth,
    clerkClient,
    type OauthAccessToken
} from "@clerk/nextjs/server";
import {
    type GetUserTopItems,
    type RequestResource,
    type Resource,
    type SpotifyClientAPI,
    type TopItemsRequest,
} from "~/server/services/interfaces/SpotifyClient";
import type {Page} from "@spotify/web-api-ts-sdk";
import * as querystring from "node:querystring";


const SPOTIFY_BASE_URL = "https://api.spotify.com/";
const SPOTIFY_API_VERSION = "v1";





export class SpotifyClient implements SpotifyClientAPI {

    private getUserTopItems<T extends RequestResource>(url:string):GetUserTopItems<T> {
        let headers: ReturnType<typeof this.generateHeader>;
        this.getAccessToken()
            .then(accessToken => this.generateHeader(accessToken))
            .catch(err => console.log(err));

        return async (request:TopItemsRequest<T>): Promise<Page<Resource<T>>> => {
            const builtUrl = this.buildResourcePath(url, request)
            const response = await fetch(builtUrl, {headers});

            return await response.json() as Page<Resource<T>>;
        };
    }

    // TODO: Check the top tracks/artist/album method (one is different from the others)
    // TODO: Check for the correct URls
    getUserTopArtists = this.getUserTopItems<"artists">(`me/top/artists`)
    getUserTopAlbums = this.getUserTopItems<"albums">(`me/top/tracks`)
    getUserTopTracks = this.getUserTopItems<"tracks">(`me/top/artists`)


    async getAccessToken() {
        const {userId} = auth();
        if (!userId) throw new Error("User not found");

        const provider = "oauth_spotify";
        const clerkResponse = await clerkClient.users.getUserOauthAccessToken(
            userId,
            provider
        );

        const accessToken = clerkResponse.data[0]!
        if (!accessToken) throw new Error("No access token found.");
        return accessToken
    }

    buildResourcePath(path: string, query?: TopItemsRequest<RequestResource>) {
        const preppedQuery = query && this.prepareForQueryString(query);
        return new URL(
            `${SPOTIFY_API_VERSION}/${path}${preppedQuery && (`&${querystring.stringify(preppedQuery)}`)}`,
            SPOTIFY_BASE_URL
        )
    }

    prepareForQueryString<T>(obj: T): Record<string, string> {
        const result: Record<string, string> = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const value = obj[key];
                result[key] = String(value);
            }
        }
        return result;
    }

    generateHeader (accessToken: OauthAccessToken) {
        return {
            Authorization: 'Bearer ' + accessToken.token,
        };
    };

}
