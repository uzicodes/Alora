"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import "./login.css";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, errors, fetchStatus } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLoading = fetchStatus === "fetching";

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signIn) return;

    try {
      await signIn.password({ 
        emailAddress: email, 
        password 
      });

      if (signIn.status === 'complete') {
        await signIn.finalize({ navigate: () => router.push('/') });
      }
    } catch (err: any) {
      alert(err.errors?.[0]?.longMessage || err.errors?.[0]?.message || "An error occurred during login");
    }
  };

  const handleGoogleLogin = async () => {
    if (!signIn) return;
    
    try {
      await signIn.sso({
        strategy: "oauth_google",
        redirectUrl: "/",
        redirectCallbackUrl: "/sso-callback",
      });
    } catch (err: any) {
      console.error("SSO Error:", err);
    }
  };

  return (
    <div className="flex min-h-screen items-start justify-center p-4 bg-white" style={{ paddingTop: '10vh' }}>
      <form className="form" onSubmit={handleEmailLogin}>
        <div className="title" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Image src="/alora_BG.png" alt="Alora Logo" width={32} height={32} className="rounded-full" />
            <span style={{ fontFamily: 'var(--font-kharaissa), sans-serif', letterSpacing: '4px', fontWeight: 'normal', color: '#636B06', fontSize: '1.2em' }}>ALORA</span>
          </div>
          <span style={{ marginTop: '4px', fontSize: '0.50em' }}>WELCOME BACK</span>
        </div>

        <input
          type="email" 
          className="input" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <input 
          type="password" 
          className="input" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="button-confirm" type="submit" disabled={isLoading || !signIn}>
          {isLoading ? "Logging in..." : "Login →"}
        </button>

        <div className="w-full mt-4 text-sm font-semibold text-gray-700 text-center">
          Or continue with
        </div>

        <div className="login-with">
          <button type="button" className="button-log" onClick={handleGoogleLogin}>
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </button>
        </div>

        <div className="w-full mt-2 text-sm font-semibold text-gray-700 text-center">
          Don't have an account? <Link href="/signup" className="text-black underline">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}