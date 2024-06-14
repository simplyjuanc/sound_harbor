import * as querystring from "node:querystring";
import {
    auth,
    clerkClient,
    type OauthAccessToken
} from "@clerk/nextjs/server";
import type {
    Resource,
    ResourceType,
    SpotifyClientAPI,
    ItemsRequest,
} from "~/server/services/interfaces/spotify";
import type {
    Album,
    Albums,
    Artist,
    Page,
    Track
} from "@spotify/web-api-ts-sdk";


const SPOTIFY_BASE_URL = "https://api.spotify.com/";
const SPOTIFY_API_VERSION = "v1";


export class SpotifyClient implements SpotifyClientAPI {
    async getUserTopArtists (request: ItemsRequest<ResourceType.ARTISTS>) {
        const accessToken = await this.getAccessToken()
        const headers = this.generateHeader(accessToken)
        const url = this.buildResourcePath(`me/top/artists`, request)
        const response = await fetch(url, { headers })
        return await response.json() as Page<Artist>;
    }

    async getUserTopTracks (request: ItemsRequest<ResourceType.TRACKS>) {
        const accessToken = await this.getAccessToken()
        const headers = this.generateHeader(accessToken)
        const builtUrl = this.buildResourcePath(`me/top/tracks`, request)
        const response = await fetch(builtUrl, { headers })
        return await response.json() as Page<Track>;
    }

    async getArtistTopAlbums (id:string): Promise<Page<Album>> {
        const accessToken = await this.getAccessToken()
        const headers = this.generateHeader(accessToken)

        const builtUrl = this.buildResourcePath(`artists/${id}/top-tracks`)
        const response = await fetch(builtUrl, { headers });
        return await response.json() as Page<Album>;
    }

    private async getAccessToken() {
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

    private buildResourcePath(path: string, query?: ItemsRequest<unknown>) {
        const preppedQuery = query && this.prepareQueryString(query);
        return new URL(
            `${SPOTIFY_API_VERSION}/${path}` + (preppedQuery && "?" + querystring.stringify(preppedQuery)),
            SPOTIFY_BASE_URL
        )
    }

    private prepareQueryString<T>(obj: T): Record<string, string> {
        const result: Record<string, string> = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const value = obj[key];
                result[key] = String(value);
            }
        }
        return result;
    }

    private generateHeader(accessToken: OauthAccessToken) {
        return {
            Authorization: 'Bearer ' + accessToken.token,
        };
    };
}
