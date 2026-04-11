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

        // We will call a dedicated server action to verify the password securely
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
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border-t-4 border-black">
                <h1 className="text-2xl font-bold mb-6 text-center">Alora Admin Access</h1>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Admin Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border-2 border-gray-300 p-3 rounded focus:border-black outline-none transition-colors"
                            placeholder="Enter secret key..."
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm font-bold">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white p-3 font-bold rounded hover:bg-gray-800 transition-colors"
                    >
                        {loading ? "VERIFYING..." : "ENTER DASHBOARD"}
                    </button>
                </form>
            </div>
        </div>
    );
}