import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { type UserJSON, type WebhookEvent } from '@clerk/nextjs/server'
import { env } from "~/env";
import { createUser } from "~/server/services/users";

enum EventType {
    UserCreated = "user.created",
    UserUpdated = "user.updated",
}


export async function POST(req: Request) {
    const WEBHOOK_SECRET = env.WEBHOOK_SECRET
    if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    let evt: WebhookEvent
    try {
        evt = await verifyClerkWebhook(req, WEBHOOK_SECRET)
    } catch (e) {
        console.info('Error verifying webhook', e)
        return new Response(
            e.message,
            { status: 400 }
        )
    }

    const { id, email_addresses   } = evt.data as UserJSON;
    if (evt.type !== EventType.UserCreated) {
        return new Response(
            'Expected UserCreated event',
            { status: 500 }
        )
    }

    const user = await createUser(
        id,
        email_addresses[0]?.email_address ?? ""
    )

    console.log(`Webhook with and ID of ${id} and type of ${evt.type}`)
    return new Response(
        JSON.stringify({ user }),
        { status: 200 }
    )

}


async function verifyClerkWebhook(req:Request, webhookSecret:string) {
    const header = headers();
    const svix_id = header.get("svix-id");
    const svix_timestamp = header.get("svix-timestamp");
    const svix_signature = header.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        throw new Error('Error occurred -- no svix headers')
    }

    const body = JSON.stringify(await req.json());
    const wh = new Webhook(webhookSecret);

    try {
        return wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (err) {
        throw new Error(`Error verifying webhook` );
    }
}