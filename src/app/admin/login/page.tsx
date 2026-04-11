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
        } catch (err) {
            setError("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F4F4F5] p-4 relative overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-gray-200 rounded-full blur-3xl opacity-50 z-0"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-gray-300 rounded-full blur-3xl opacity-50 z-0"></div>

            <div className="bg-white px-10 py-12 min-h-[480px] z-10 w-full max-w-md border-[3px] border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] rounded-none transition-all duration-300 hover:shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:-translate-x-1 flex flex-col justify-center">
                <div className="flex justify-center mb-10"></div>

                <h1 className="text-4xl font-black mb-4 text-center uppercase tracking-tighter">
                    Admin Portal
                </h1>

                <form onSubmit={handleLogin} className="flex flex-col items-center gap-8">
                    <p className="text-red-500 text-center text-[10px] font-bold uppercase tracking-widest leading-relaxed mb-6">
                        Authorized personnel only.
                    </p>

                    <div className="space-y-5">
                        <label className="block text-center text-sm font-bold uppercase tracking-widest text-gray-700">
                            Security Key
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border-2 border-gray-300 bg-gray-50 p-4 mt-2 font-mono text-lg focus:border-black focus:bg-white focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all duration-200 rounded-none placeholder-gray-400 text-center"
                            placeholder="••••••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <div className="border border-red-500 bg-red-50 p-4 mt-2 flex items-center justify-center gap-3 animate-pulse">
                            <svg
                                className="w-6 h-6 text-red-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <p className="text-red-700 text-sm font-bold tracking-wide uppercase">
                                {error}
                            </p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-2/3 mx-auto mt-4 bg-black text-white p-5 font-bold tracking-[0.2em] uppercase border-2 border-black hover:bg-green-800 hover:border-green-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            {loading ? "AUTHENTICATING..." : "AUTHORIZE ACCESS"}
                            {!loading && (
                                <svg
                                    className="w-5 h-5 group-hover:translate-x-2 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                </svg>
                            )}
                        </span>
                    </button>
                </form>
            </div>
        </div>
    );
}