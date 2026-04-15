"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
// @ts-ignore
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, fetchStatus, setActive } = useSignIn() as any;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const isLoading = fetchStatus === "fetching";

  const handleForgotPasswordClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!signIn) return;
    if (!email) {
      setError("Please enter your email first");
      return;
    }
    setError("");
    try {
      await signIn.resetPasswordEmailCode.sendCode({ emailAddress: email });
      setIsForgotPassword(true);
    } catch (err: any) {
      console.error(err);
      setError(err.errors?.[0]?.longMessage || err.errors?.[0]?.message || "An error occurred");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signIn) return;
    setError("");
    try {
      // Verify code 
      await signIn.resetPasswordEmailCode.verifyCode({ code: resetCode });

      // code OK? -> submit the new password
      if (signIn.status === "needs_new_password") {
        await signIn.resetPasswordEmailCode.submitPassword({ password: newPassword });
      }

      // Finalize the login & redirect
      if (signIn.status === "complete") {
        await signIn.finalize();
        router.push("/shop");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.errors?.[0]?.longMessage || err.errors?.[0]?.message || "Invalid code or weak password");
    }
  };

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
        redirectUrl: "/profile",
        redirectCallbackUrl: "/sso-callback",
      });
    } catch (err: any) {
      console.error("SSO Error:", err);
    }
  };

  return (
    <div className="flex min-h-screen items-start justify-center p-4 bg-white" style={{ paddingTop: '140px' }}>
      <form className={styles.form} onSubmit={isForgotPassword ? handleResetPassword : handleEmailLogin}>
        <div className={styles.title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Image src="/alora_BG.png" alt="Alora Logo" width={32} height={32} className="rounded-full" priority />
            <span style={{ fontFamily: 'var(--font-kharaissa), sans-serif', letterSpacing: '4px', fontWeight: 'normal', color: '#636B06', fontSize: '1.2em' }}>ALORA</span>
          </div>
          <span style={{ marginTop: '4px', fontSize: '0.75rem' }}>WELCOME BACK</span>
        </div>

        {error && (
          <div className="w-full text-red-500 text-sm mb-2 text-center font-medium">
            {error}
          </div>
        )}

        <input
          type="email"
          className={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {!isForgotPassword ? (
          <>
            <div className={styles.inputGroup}>
              <input
                type={showPassword ? "text" : "password"}
                className={styles.input}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" /></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                )}
              </button>
            </div>

            <div className="w-full max-w-[300px] flex justify-end mb-2 mt-1 pr-4">
              <span
                className="text-[10px] text-gray-500 hover:text-black cursor-pointer"
                onClick={handleForgotPasswordClick}
              >
                Forgot password?
              </span>
            </div>

            {/* Captcha element for Clerk Bot Protection */}
            <div id="clerk-captcha"></div>

            <button className={styles["button-confirm"]} type="submit" disabled={isLoading || !signIn}>
              {isLoading ? "Logging in..." : "Login →"}
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              className={styles.input}
              placeholder="Enter 6-digit Reset Code"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              required
              style={{ marginTop: '16px' }}
            />
            <div className={styles.inputGroup} style={{ marginTop: '16px' }}>
              <input
                type={showPassword ? "text" : "password"}
                className={styles.input}
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" /></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                )}
              </button>
            </div>

            <button
              className={styles["button-confirm"]}
              type="submit"
              disabled={isLoading || !signIn}
              style={{ marginTop: '24px' }}
            >
              Reset Password
            </button>

            <div className="w-full text-center mt-4">
              <span
                className="text-sm text-gray-500 hover:text-black cursor-pointer"
                onClick={() => {
                  setIsForgotPassword(false);
                  setError("");
                }}
              >
                Back to login
              </span>
            </div>
          </>
        )}

        <div className="w-full mt-4 text-sm font-semibold text-gray-700 text-center">
          Or continue with
        </div>

        <div className={styles["login-with"]}>
          <button type="button" className={styles["button-log"]} onClick={handleGoogleLogin}>
            <svg className={styles.icon} viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
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