import {SignedIn, SignedOut} from "@clerk/nextjs";
import {Button} from "~/components/ui/button";
import Link from "next/link";

export default function HomePage() {
    return (
        <>
            <SignedOut>
                <div className="flex flex-col align-middle my-auto">
                    <h1 className="m-auto text-4xl font-bold">
                        Welcome to the SoundHarbor app.
                    </h1>
                    <h2 className="m-auto text-3xl font-bold">
                        Please sign in above to continue.
                    </h2>
                </div>
            </SignedOut>
            <SignedIn>
                <SpotifyLogin />
                <DiscogsLogin />
            </SignedIn>
        </>
    );
}


function SpotifyLogin() {
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
            <Link href={"  TODO  "}><Button size={"lg"} className="mx-auto">Connect to Spotify</Button></Link>
        </div>
    );
}


function DiscogsLogin() {
    return (
        <div className="flex flex-col mx-auto justify-center align-middle mt-16 text-center gap-8">
            <div className="flex flex-col mx-8">
                <h1>Fantastic!</h1>
                <p>
                    Now that we have connected to your Spotify account, let&apos;s get you set
                    up with Discogs so that we can find music you might want to add to
                    your collection!
                </p>
            </div>
            {/*TODO: Add Discogs login link*/}
            <Link href={"  TODO  "}><Button size={"lg"} className="mx-auto">Connect to Discogs</Button></Link>
        </div>
    );
}
