import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { type WebhookEvent } from '@clerk/nextjs/server'
import {env} from "~/env";

enum EventType {
    UserCreated = "user.created",
    UserUpdated = "user.updated",
}


export async function POST(req: Request) {
    const WEBHOOK_SECRET = env.WEBHOOK_SECRET
    if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    const header = headers();
    const svix_id = header.get("svix-id");
    const svix_timestamp = header.get("svix-timestamp");
    const svix_signature = header.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occurred -- no svix headers', {
            status: 400
        })
    }

    const body = JSON.stringify(await req.json());
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent

    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occurred', {
            status: 400
        })
    }

    const { id } = evt.data;
    const eventType = evt.type;

    switch (eventType) {
        case EventType.UserCreated: {
            console.log('User created:', id);
            break;
        }
        case EventType.UserUpdated: {
            console.log('User updated:', id);
            break;
        }
        default: {
            console.log('Webhook event:', eventType);
            return new Response(
                `Unrecognized event ${eventType}, expected 'user.created' or 'user.updated' events`,
                { status: 500 })
        }
    }

    console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
    console.log('Webhook body:', body)
    return new Response('', { status: 200 })

}