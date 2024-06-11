import {auth, clerkClient} from "@clerk/nextjs/server";
import type {Artist, MaxInt, Page, Track} from "@spotify/web-api-ts-sdk";
import * as path from "node:path";


const SPOTIFY_BASE_URL = "https://api.spotify.com/";
const SPOTIFY_API_VERSION = "v1";


type getUserTopItems = <T extends "artists" | "tracks">(type: T,
                                                        time_range?: "short_term" | "medium_term" | "long_term",
                                                        limit?: MaxInt<50>,
                                                        offset?: number) => Promise<Page<T extends "artists" ? Artist : Track>>;


async function getSpotifyAccessToken() {
    const {userId} = auth();
    if (!userId) throw new Error("User not found");

    const provider = "oauth_spotify";
    const clerkResponse = await clerkClient.users.getUserOauthAccessToken(
        userId,
        provider
    );
    const accessToken = clerkResponse.data[0]

    if (!accessToken) throw new Error("No access token found.")
    return accessToken
}

function buildResourcePath(path: string) {
    return new URL(`${SPOTIFY_API_VERSION}/${path}`, SPOTIFY_BASE_URL)
}
