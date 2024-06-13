import {
    type Album,
    type Albums,
    type Artists,
    type MaxInt,
    type Page,
    type Tracks
} from "@spotify/web-api-ts-sdk";


export type RequestResource = "artists" | "tracks" | "albums";
export type Resource<T> = T extends "artists" ? Artists : T extends "tracks" ? Tracks : T extends "albums" ? Albums : never;

export interface TopItemsRequest<T extends RequestResource> {
    type: T;
    time_range?: "short_term" | "medium_term" | "long_term";
    limit?: MaxInt<50>;
    offset?: number;
}

export type GetUserTopItems<T extends RequestResource> = (request:TopItemsRequest<T>) => Promise<Page<Resource<T>>>;


export interface SpotifyClientAPI {
    getUserTopAlbums: GetUserTopItems<"albums">;
    getUserTopTracks: GetUserTopItems<"tracks">
    getUserTopArtists: GetUserTopItems<"artists">

    getArtistTopTracks: () => Promise<Page<Tracks>>;
    searchAlbum:  (album: string, artist: string, accessToken: string) => Promise<Page<Album>>;
    getUserRecommendations: () => Promise<Page<Albums>>;
}
