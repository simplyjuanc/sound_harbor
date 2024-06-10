import Link from "next/link";
import {Button} from "~/components/ui/button";


export async function SpotifyLogin() {
    return (
        <div className="flex flex-col mx-auto justify-center align-middle mt-16 text-center gap-8">
            <h1 className="my-8 font-semibold text-3xl">Welcome!</h1>
            <div>
                <p className="my-6">First things first, we need to get you set up!</p>
                <p className="my-6">
                    This means that we will first need to connect your Spotify account
                    so that we can get an idea of what kind of music you like.
                </p>
            </div>
            {/*TODO: Add Spotify login link*/}
            <Link href={"/api/spotify/login"}><Button size={"lg"} className="mx-auto">Connect to Spotify</Button></Link>
        </div>
    );
}
