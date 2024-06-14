import type {
    Album,
    Albums,
    Artist,
    Artists,
    MaxInt,
    Page,
    Track,
    Tracks
} from "@spotify/web-api-ts-sdk";

export enum ResourceType {
    ARTISTS = "artists",
    TRACKS = "tracks",
    ALBUMS = "albums"
}

export type Resource<T> =
    T extends ResourceType.ARTISTS ? Artists :
    T extends ResourceType.TRACKS ? Tracks :
    Albums

export interface ItemsRequest<T> {
    type: T;
    time_range?: "short_term" | "medium_term" | "long_term";
    limit?: MaxInt<50>;
    offset?: number;
}

export type GetUserTopItems<T extends ResourceType> = (request:ItemsRequest<Resource<ResourceType>>) => Promise<Page<Resource<T>>>;


export interface SpotifyClientAPI {
    getUserTopTracks: (request:ItemsRequest<ResourceType.TRACKS>) => Promise<Page<Track>>;
    getUserTopArtists: (request:ItemsRequest<ResourceType.ARTISTS>) => Promise<Page<Artist>>;
    getArtistTopAlbums: (id:string) => Promise<Page<Album>>;
    // searchAlbum:  (album: string, artist: string, accessToken: string) => Promise<Page<Album>>;
}
