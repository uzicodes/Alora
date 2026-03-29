import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Use your local dev URL for now. When you deploy to Vercel, this will need to be your production URL.
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});

// Export the hooks so you can use them anywhere in your app
export const { signIn, signUp, signOut, useSession } = authClient;