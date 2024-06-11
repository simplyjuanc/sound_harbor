import {auth, clerkClient} from "@clerk/nextjs/server";



export async function getSpotifyAccessToken() {
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