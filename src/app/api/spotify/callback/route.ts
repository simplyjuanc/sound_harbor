import {type NextRequest, NextResponse} from "next/server";
import {type AccessToken } from "@spotify/web-api-ts-sdk";
import { redirect, RedirectType } from "next/navigation";
import spotifyClient from "~/server/services/spotify";


export default async function POST(req:NextRequest) {
   try {
      const accessToken = await req.json() as AccessToken;
      await spotifyClient.confirmMixedUserUserAuth(accessToken)

      redirect("/", RedirectType.replace)
   } catch (error) {
      return new NextResponse(
          error instanceof Error ? error.message : "Unknown error occurred",
          { status: 500 }
      )
   }
}