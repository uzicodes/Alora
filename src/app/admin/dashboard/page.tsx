import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
    const cookieStore = await cookies();
    const adminSession = cookieStore.get("admin_session");

    if (!adminSession || adminSession.value !== "authorized") {
        redirect("/admin/login");
    }

    return (
        <div className="min-h-screen bg-[#F4F4F5] flex font-sans selection:bg-black selection:text-white">
            {/* Sidebar */}
            <div className="w-72 bg-black text-white p-8 hidden md:flex flex-col border-r-4 border-black z-20">
                <div className="mb-12 border-b-2 border-white/20 pb-6">
                    <h2 className="text-3xl font-black tracking-tighter uppercase mb-1">Alora</h2>
                    <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase font-bold">Admin Portal</p>
                </div>

                <nav className="space-y-4 flex-1">
                    <a href="#" className="block p-4 border-2 border-white bg-white text-black font-bold tracking-widest uppercase text-sm transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:-translate-y-1">
                        Orders
                    </a>
                    <a href="#" className="block p-4 border-2 border-transparent hover:border-white/50 text-gray-300 hover:text-white font-bold tracking-widest uppercase text-sm transition-all duration-300">
                        Products
                    </a>
                    <a href="#" className="block p-4 border-2 border-transparent hover:border-white/50 text-gray-300 hover:text-white font-bold tracking-widest uppercase text-sm transition-all duration-300">
                        Customers
                    </a>
                </nav>

                <div className="mt-auto pt-8 border-t-2 border-white/20">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <span className="text-black font-black text-sm">A</span>
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest">Admin</p>
                            <p className="text-[10px] capitalize text-gray-400">System Root</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 md:p-12 relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b-4 border-black pb-6 gap-6">
                        <div>
                            <h1 className="text-5xl font-black uppercase tracking-tight mb-2">Orders</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}