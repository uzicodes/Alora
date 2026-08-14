"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/admin/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (data.success) {
                router.push("/admin/dashboard");
            } else {
                setError("Incorrect password. Access denied.");
            }
            setLoading(false);
        } catch (err) {
            setError("Something went wrong.");
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#FAFAFA] p-4 relative overflow-hidden font-sans">
            <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-[#C2B280]/20 rounded-full blur-[100px] opacity-60 z-0 pointer-events-none"></div>
            <div className="absolute bottom-[-15%] right-[-10%] w-[500px] h-[500px] bg-gray-200 rounded-full blur-[100px] opacity-60 z-0 pointer-events-none"></div>

            <div className="bg-white/80 backdrop-blur-xl px-10 py-12 min-h-[480px] z-10 w-full max-w-md border border-white/50 shadow-2xl rounded-3xl transition-all duration-500 hover:shadow-3xl flex flex-col justify-center">
                <div className="flex justify-center mb-6">
                    <h2 className="text-xl font-medium tracking-[0.2em] text-[#C2B280] uppercase">Alora</h2>
                </div>

                <h1 className="text-3xl font-light mb-2 text-center tracking-wide text-gray-900">
                    Admin Portal
                </h1>
                
                <form onSubmit={handleLogin} className="flex flex-col items-center gap-8 mt-6">
                    <p className="text-gray-400 text-xs font-medium uppercase tracking-widest leading-relaxed mb-4 text-center">
                        Authorized personnel only
                    </p>

                    <div className="space-y-3 w-full">
                        <label htmlFor="security-key" className="block text-center text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                            Security Key
                        </label>

                        <input
                            id="security-key"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            aria-label="Security Key"
                            className="w-full border border-gray-200 bg-white/50 p-4 mt-2 font-mono text-lg focus:border-[#C2B280] focus:ring-1 focus:ring-[#C2B280] outline-none transition-all duration-300 rounded-xl placeholder-gray-300 text-center shadow-inner"
                            placeholder="••••••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <div className="w-full bg-red-50/50 border border-red-100 p-4 rounded-xl flex items-center justify-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <svg className="w-5 h-5 text-red-500/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-red-600 text-xs font-medium tracking-wide">
                                {error}
                            </p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-4 bg-gray-900 text-white p-4 font-medium tracking-widest uppercase rounded-xl hover:bg-[#C2B280] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-3 text-sm">
                            {loading ? "Authenticating..." : "Authorize Access"}
                            {!loading && (
                                <svg
                                    className="w-4 h-4 group-hover:translate-x-1 transition-transform opacity-70"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            )}
                        </span>
                    </button>
                </form>
            </div>
        </div>
    );
}