import Link from "next/link";
import {Button} from "~/components/ui/button";

export function DiscogsLogin() {
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
