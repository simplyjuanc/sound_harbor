import {
    type Album,
    type Albums,
    type Artists,
    type MaxInt,
    type Page,
    type Tracks
} from "@spotify/web-api-ts-sdk";


export enum ResourceType {
    ARTISTS = "artists",
    TRACKS = "tracks",
    ALBUMS = "albums"
}

export type Resource<T> =
    T extends ResourceType.ARTISTS ? Artists :
    T extends ResourceType.TRACKS ? Tracks :
    T extends ResourceType.ALBUMS ? Albums :
    never;

export interface ItemsRequest<T> {
    type: T;
    time_range?: "short_term" | "medium_term" | "long_term";
    limit?: MaxInt<50>;
    offset?: number;
}

export type GetUserTopItems<T extends ResourceType> = (request:ItemsRequest<Resource<ResourceType>>) => Promise<Page<Resource<T>>>;


export interface SpotifyClientAPI {
    getUserTopTracks: GetUserTopItems<ResourceType.TRACKS>
    getUserTopArtists: GetUserTopItems<ResourceType.ARTISTS>
    getArtistTopTracks: (id:string) => Promise<Page<Tracks>>;

    searchAlbum:  (album: string, artist: string, accessToken: string) => Promise<Page<Album>>;
    getUserRecommendations: () => Promise<Page<Albums>>;
}
