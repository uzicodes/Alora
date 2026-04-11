import React from "react";

export const metadata = {
    title: "Admin Portal - Alora",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        // This wrapper ensures the admin section has its own clean background 
        // and ignores the main website's padding/margins.
        <div className="min-h-screen bg-gray-50 text-black">
            {children}
        </div>
    );
}