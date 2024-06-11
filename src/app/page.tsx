import {SignedIn, SignedOut} from "@clerk/nextjs";
import Conditional from "~/components/Conditional"
import {SpotifyLogin} from "~/components/SpotifyLogin";
import {DiscogsLogin} from "~/components/DiscogsLogin";

export default function HomePage() {
    const isSignedInToSpotify = true;
    const isSignedInToDiscogs = true;
    const isFullySignedIn = isSignedInToSpotify && isSignedInToDiscogs;

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
                <Conditional showWhen={!isSignedInToSpotify}><SpotifyLogin /></Conditional>
                <Conditional showWhen={isSignedInToSpotify && !isSignedInToDiscogs}><DiscogsLogin /></Conditional>
                {/*TODO: implement logic for redirecting */}
                <Conditional showWhen={isFullySignedIn}>
                    <SpotifyLogin/>
                    <DiscogsLogin />
                </Conditional>
            </SignedIn>
        </>
    );
}


