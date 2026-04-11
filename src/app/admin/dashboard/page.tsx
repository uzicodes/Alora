import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
    // Protect the route: Check admin cookie exists
    const cookieStore = await cookies();
    const adminSession = cookieStore.get("admin_session");

    if (!adminSession || adminSession.value !== "authorized") {
        // Kick them back to login if they don't have the cookie
        redirect("/admin/login");
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar Placeholder */}
            <div className="w-64 bg-black text-white p-6 hidden md:block">
                <h2 className="text-2xl font-bold mb-8">Alora Admin</h2>
                <nav className="space-y-4">
                    <a href="#" className="block p-3 bg-gray-800 rounded font-bold">Orders</a>
                    <a href="#" className="block p-3 hover:bg-gray-800 rounded">Products</a>
                    <a href="#" className="block p-3 hover:bg-gray-800 rounded">Customers</a>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                <div className="flex justify-between items-center mb-8 border-b-2 border-gray-200 pb-4">
                    <h1 className="text-3xl font-bold">Orders Overview</h1>
                    <button className="bg-red-500 text-white px-4 py-2 font-bold rounded">Logout</button>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-gray-200">
                    <p className="text-gray-500">Welcome to the control panel! Soon, we will connect Prisma here to list all your live orders.</p>
                </div>
            </div>
        </div>
    );
}