import {db} from "~/server/db";
import {users} from "~/server/db/schema/users";
import {type User} from "~/server/db/schema";
import {eq} from "drizzle-orm";


export async function createUser(clerkId: string, email: string) {
    return db.insert(users)
        .values({
            clerkId,
            email,
            lastLogin: new Date(),
        })
        .returning({
            userId: users.id,
        });
}

export async function updateUser(user: Partial<User>) {
    if (!user.id) {
        throw new Error('User id is required');
    }
    return db.update(users)
        .set({...user})
        .where(eq(users.id, user.id))
        .returning({updatedUserId: users.id});
}

export async function getUserById(userId: number) {
    return db.query.users.findFirst({
        where: eq(users.id, userId),
    });
}

export async function getUserByClerkId(clerkId: string) {
    return db.query.users.findFirst({
        where: eq(users.clerkId, clerkId),
    });
}

export async function deleteUser(userId: number) {
    return db.delete(users)
        .where(eq(users.id, userId))
        .returning({ deletedUserId: users.id });
}

