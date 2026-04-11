import React from "react";

export const metadata = {
    title: "ADMIN PORTAL - ALORA",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50 text-black">
            {children}
        </div>
    );
}