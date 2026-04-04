import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
// @ts-ignore - Ignoring potential type error if connectionString object is passed directly instead of a Pool instance
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local");
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id: clerkId, email_addresses, first_name, last_name } = evt.data;

    // Combine first and last name
    const name = [first_name, last_name].filter(Boolean).join(" ") || "Unknown";

    // Get primary email
    const primaryEmail = email_addresses?.length > 0 
      ? email_addresses[0].email_address 
      : "";

    if (!clerkId || !primaryEmail) {
      return new Response("Missing user data", { status: 400 });
    }

    try {
      // Upsert user in database
      const user = await prisma.user.upsert({
        where: { id: clerkId },
        update: {
          email: primaryEmail,
          name: name,
        },
        create: {
          id: clerkId,
          email: primaryEmail,
          name: name,
        },
      });

      console.log(`User ${user.id} was successfully saved/updated in database.`);
    } catch (error) {
      console.error("Error saving user to database:", error);
      return new Response("Error executing database operation", { status: 500 });
    }
  }

  return new Response("Webhook processed successfully", { status: 200 });
}
