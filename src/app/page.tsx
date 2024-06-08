import {SignedIn, SignedOut} from "@clerk/nextjs";

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
            <h1 className="m-auto text-4xl font-bold">
              Please choose one of the two options above.
            </h1>
        </SignedIn>
    </>
  );
}
