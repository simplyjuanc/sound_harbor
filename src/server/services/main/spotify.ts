import {auth, clerkClient} from "@clerk/nextjs/server";
import type {Artist, MaxInt, Page, Track} from "@spotify/web-api-ts-sdk";


const SPOTIFY_BASE_URL = "https://api.spotify.com/";
const SPOTIFY_API_VERSION = "v1";


type getUserTopItems = <T extends "artists" | "tracks">(type: T,
                                                        time_range?: "short_term" | "medium_term" | "long_term",
                                                        limit?: MaxInt<50>,
                                                        offset?: number) => Promise<Page<T extends "artists" ? Artist : Track>>;

/**
 * Retrieves the Spotify access token for the authenticated user.
 * If the user is not authenticated or if there is no access token found, it throws an error.
 *
 * @returns {Promise<string>} A promise that resolves to the Spotify access token.
 * @throws {Error} Will throw an error if the user is not authenticated or if no access token is found.
 */
export async function getSpotifyAccessToken() {
    const {userId} = auth();
    if (!userId) throw new Error("User not found");

    const provider = "oauth_spotify";
    const clerkResponse = await clerkClient.users.getUserOauthAccessToken(
        userId,
        provider
    );

    const accessToken = clerkResponse.data[0]!
    if (!accessToken) throw new Error("No access token found.")

    return accessToken
}

function buildResourcePath(path: string) {
    return new URL(`${SPOTIFY_API_VERSION}/${path}`, SPOTIFY_BASE_URL)
}
