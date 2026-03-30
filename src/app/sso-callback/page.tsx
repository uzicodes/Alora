import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallbackPage() {
  // This handles the redirect back from Google and creates the session
  return <AuthenticateWithRedirectCallback />;
}