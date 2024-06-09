import "~/styles/globals.css";

import { Inter } from "next/font/google";
import Header from "./_components/Header";
import {ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "SoundHarbor",
  description: "The music you love, yours to have",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <ClerkProvider>
        <html lang="en" className="dark">
        <body className={`font-sans ${inter.variable}`}>
        <div className="flex min-h-screen flex-col gap-4">
          <Header/>
          <main className="flex w-full grow flex-col px-4">{children}</main>
        </div>
        </body>
        </html>
      </ClerkProvider>
  );
}
