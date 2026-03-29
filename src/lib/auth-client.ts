import { createAuthClient } from "better-auth/react";
import { sentinelClient } from "@better-auth/infra/client";

export const authClient = createAuthClient({
  // Use your local dev URL for now. When you deploy to Vercel, this will need to be your production URL.
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "https://aloraa.vercel.app/",
  plugins: [sentinelClient()],
});


export const { signIn, signUp, signOut, useSession } = authClient;