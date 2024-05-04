import Link from "next/link";
import React from "react";

function TopNav() {
  return (
    <header className="flex w-full items-center gap-4 border-b-2 border-b-white  p-4 text-xl font-semibold">
      <Link href="/collection">Collection</Link>
      <Link href="/recommendations">Recommendations</Link>
    </header>
  );
}

export default TopNav;
