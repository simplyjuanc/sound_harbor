import {
    auth,
    clerkClient,
    type OauthAccessToken
} from "@clerk/nextjs/server";
import {
    type GetUserTopItems,
    type Resource,
    type ResourceType,
    type SpotifyClientAPI,
    type ItemsRequest,
} from "~/server/services/interfaces/SpotifyClient";
import type {Page, Tracks} from "@spotify/web-api-ts-sdk";
import * as querystring from "node:querystring";


const SPOTIFY_BASE_URL = "https://api.spotify.com/";
const SPOTIFY_API_VERSION = "v1";


export class SpotifyClient implements SpotifyClientAPI {
    getUserTopArtists = this.getUserTopItems<ResourceType.ARTISTS>(`me/top/artists`)
    getUserTopTracks = this.getUserTopItems<ResourceType.TRACKS>(`me/top/tracks`)
    getArtistTopTracks = async (id:string): Promise<Page<Tracks>> => {
        const accessToken = await this.getAccessToken()
        const headers = this.generateHeader(accessToken)

        const builtUrl = this.buildResourcePath(`artists/${id}/top-tracks`)
        const response = await fetch(builtUrl, {headers});
        return await response.json() as Page<Resource<Tracks>>;
    }
    private getUserTopItems<T extends ResourceType>(url:string):GetUserTopItems<T> {
        let headers: ReturnType<typeof this.generateHeader>;
        this.getAccessToken()
            .then(accessToken => headers = this.generateHeader(accessToken))
            .catch(err => console.log(err));

        return async (request:ItemsRequest<T>): Promise<Page<Resource<T>>> => {
            const builtUrl = this.buildResourcePath(url, request)
            const response = await fetch(builtUrl, {headers});

            return await response.json() as Page<Resource<T>>;
        };
    }

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

    buildResourcePath(path: string, query?: ItemsRequest<never>) {
        const preppedQuery = query && this.prepareForQueryString(query);
        return new URL(
            SPOTIFY_API_VERSION + path + (preppedQuery && "&" + querystring.stringify(preppedQuery)),
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
