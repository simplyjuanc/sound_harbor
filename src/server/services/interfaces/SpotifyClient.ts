import {
    type Album,
    type Albums,
    type Artists,
    type Tracks
} from "@spotify/web-api-ts-sdk";


export interface SpotifyClientAPI {
    getUserTopAlbums: () => Promise<Albums>;
    getUserTopTracks: () => Promise<Tracks>;
    getUserTopArtists: () => Promise<Artists>;

    getArtistTopTracks: () => Promise<Tracks>;
    searchAlbum:  (album: string, artist: string, accessToken: string) => Promise<Album>;
    getUserRecommendations: () => Promise<Albums>;
}