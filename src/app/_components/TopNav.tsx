// noinspection HtmlUnknownTarget

import Link from "next/link";
import React from "react";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";

function TopNav() {
  return (
    <header className="flex w-full items-center gap-4 border-b-2 border-b-white  p-4 text-xl font-semibold">
        <SignedOut>
            <SignInButton/>
        </SignedOut>
        <SignedIn>
            <Link href="/collection">Collection</Link>
            <Link href="/recommendations">Recommendations</Link>
            <UserButton/>
        </SignedIn>
    </header>
  );
}

export default TopNav;
