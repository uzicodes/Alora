"use client";

import React, { useState } from "react";

type Tab = "orders" | "products" | "customers";

// ─── Mock Data (replace with your real DB fetches later) ──────────────────────

const orders = [
    { id: "#ORD-8821", customer: "Rania Chowdhury", product: "Silk Drape Midi", amount: "$248.00", status: "Delivered", date: "Apr 09, 2026" },
    { id: "#ORD-8820", customer: "Mehreen Aslam", product: "Linen Co-ord Set", amount: "$185.00", status: "Processing", date: "Apr 09, 2026" },
    { id: "#ORD-8819", customer: "Nadia Islam", product: "Velvet Blazer", amount: "$320.00", status: "Shipped", date: "Apr 08, 2026" },
    { id: "#ORD-8818", customer: "Tanya Rahman", product: "Cotton Wrap Dress", amount: "$140.00", status: "Delivered", date: "Apr 08, 2026" },
    { id: "#ORD-8817", customer: "Sara Hossain", product: "Structured Tote", amount: "$95.00", status: "Cancelled", date: "Apr 07, 2026" },
    { id: "#ORD-8816", customer: "Layla Bhuiyan", product: "Crêpe Palazzo Set", amount: "$210.00", status: "Delivered", date: "Apr 07, 2026" },
];

const products = [
    { id: "PRD-001", name: "Silk Drape Midi", category: "Dresses", stock: 42, price: "$248.00", status: "Active" },
    { id: "PRD-002", name: "Linen Co-ord Set", category: "Sets", stock: 18, price: "$185.00", status: "Active" },
    { id: "PRD-003", name: "Velvet Blazer", category: "Outerwear", stock: 0, price: "$320.00", status: "Out of Stock" },
    { id: "PRD-004", name: "Cotton Wrap Dress", category: "Dresses", stock: 67, price: "$140.00", status: "Active" },
    { id: "PRD-005", name: "Structured Tote", category: "Accessories", stock: 5, price: "$95.00", status: "Low Stock" },
    { id: "PRD-006", name: "Crêpe Palazzo Set", category: "Sets", stock: 29, price: "$210.00", status: "Active" },
];

const customers = [
    { id: "USR-001", name: "Rania Chowdhury", email: "rania@email.com", orders: 14, spent: "$2,840", joined: "Jan 2025", status: "VIP" },
    { id: "USR-002", name: "Mehreen Aslam", email: "mehreen@email.com", orders: 7, spent: "$1,120", joined: "Mar 2025", status: "Active" },
    { id: "USR-003", name: "Nadia Islam", email: "nadia@email.com", orders: 3, spent: "$540", joined: "Aug 2025", status: "Active" },
    { id: "USR-004", name: "Tanya Rahman", email: "tanya@email.com", orders: 21, spent: "$4,200", joined: "Nov 2024", status: "VIP" },
    { id: "USR-005", name: "Sara Hossain", email: "sara@email.com", orders: 1, spent: "$95", joined: "Feb 2026", status: "New" },
    { id: "USR-006", name: "Layla Bhuiyan", email: "layla@email.com", orders: 9, spent: "$1,890", joined: "Jun 2025", status: "Active" },
];

// ─── Status Badge ──────────────────────────────────────────────────────────────

const statusColors: Record<string, string> = {
    Delivered: "bg-emerald-100 text-emerald-700",
    Processing: "bg-amber-100   text-amber-700",
    Shipped: "bg-blue-100    text-blue-700",
    Cancelled: "bg-red-100     text-red-600",
    Active: "bg-emerald-100 text-emerald-700",
    "Out of Stock": "bg-red-100     text-red-600",
    "Low Stock": "bg-amber-100   text-amber-700",
    VIP: "bg-purple-100  text-purple-700",
    New: "bg-blue-100    text-blue-700",
};

function Badge({ label }: { label: string }) {
    return (
        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide ${statusColors[label] ?? "bg-gray-100 text-gray-600"}`}>
            {label}
        </span>
    );
}

// ─── Section: Orders ──────────────────────────────────────────────────────────

function OrdersSection() {
    return (
        <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: "Total Orders", value: "8,821", delta: "↑ 12% this month" },
                    { label: "Revenue", value: "$142K", delta: "↑ 8% this month" },
                    { label: "Pending", value: "34", delta: "↓ 5 from yesterday" },
                    { label: "Delivered", value: "98.2%", delta: "↑ 0.4% this week" },
                ].map(s => (
                    <div key={s.label} className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_#000]">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">{s.label}</p>
                        <p className="text-3xl font-black tracking-tight">{s.value}</p>
                        <p className="text-xs text-emerald-600 font-bold mt-1">{s.delta}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] overflow-hidden">
                <div className="px-6 py-4 border-b-2 border-black flex items-center justify-between bg-black text-white">
                    <h3 className="font-black uppercase tracking-widest text-sm">Recent Orders</h3>
                    <button className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">View All →</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-black bg-gray-50">
                                {["Order ID", "Customer", "Product", "Amount", "Status", "Date"].map(h => (
                                    <th key={h} className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-widest text-gray-500">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((o, i) => (
                                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="px-5 py-4 font-mono font-bold text-xs">{o.id}</td>
                                    <td className="px-5 py-4 font-semibold">{o.customer}</td>
                                    <td className="px-5 py-4 text-gray-600">{o.product}</td>
                                    <td className="px-5 py-4 font-black">{o.amount}</td>
                                    <td className="px-5 py-4"><Badge label={o.status} /></td>
                                    <td className="px-5 py-4 text-gray-400 text-xs">{o.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// ─── Section: Products ────────────────────────────────────────────────────────

function ProductsSection() {
    return (
        <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: "Total Products", value: "248", delta: "↑ 6 added this week" },
                    { label: "Active", value: "231", delta: "93% of catalogue" },
                    { label: "Out of Stock", value: "9", delta: "↓ 3 from last week" },
                    { label: "Low Stock", value: "8", delta: "Needs restocking" },
                ].map(s => (
                    <div key={s.label} className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_#000]">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">{s.label}</p>
                        <p className="text-3xl font-black tracking-tight">{s.value}</p>
                        <p className="text-xs text-emerald-600 font-bold mt-1">{s.delta}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] overflow-hidden">
                <div className="px-6 py-4 border-b-2 border-black flex items-center justify-between bg-black text-white">
                    <h3 className="font-black uppercase tracking-widest text-sm">All Products</h3>
                    <button className="text-xs font-black uppercase tracking-widest border border-white px-3 py-1 hover:bg-white hover:text-black transition-colors">+ Add Product</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-black bg-gray-50">
                                {["ID", "Name", "Category", "Stock", "Price", "Status"].map(h => (
                                    <th key={h} className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-widest text-gray-500">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p, i) => (
                                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="px-5 py-4 font-mono text-xs text-gray-500">{p.id}</td>
                                    <td className="px-5 py-4 font-semibold">{p.name}</td>
                                    <td className="px-5 py-4 text-gray-600">{p.category}</td>
                                    <td className="px-5 py-4">
                                        <span className={`font-black ${p.stock === 0 ? "text-red-600" : p.stock < 10 ? "text-amber-600" : "text-black"}`}>
                                            {p.stock}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 font-black">{p.price}</td>
                                    <td className="px-5 py-4"><Badge label={p.status} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// ─── Section: Customers ───────────────────────────────────────────────────────

function CustomersSection() {
    return (
        <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: "Total Customers", value: "12,408", delta: "↑ 340 this month" },
                    { label: "VIP Members", value: "1,204", delta: "9.7% of customers" },
                    { label: "New (30d)", value: "340", delta: "↑ 22% growth" },
                    { label: "Avg. Order Value", value: "$186", delta: "↑ $14 vs last month" },
                ].map(s => (
                    <div key={s.label} className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_#000]">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">{s.label}</p>
                        <p className="text-3xl font-black tracking-tight">{s.value}</p>
                        <p className="text-xs text-emerald-600 font-bold mt-1">{s.delta}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] overflow-hidden">
                <div className="px-6 py-4 border-b-2 border-black flex items-center justify-between bg-black text-white">
                    <h3 className="font-black uppercase tracking-widest text-sm">Customers</h3>
                    <button className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">Export CSV →</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-black bg-gray-50">
                                {["ID", "Name", "Email", "Orders", "Total Spent", "Joined", "Status"].map(h => (
                                    <th key={h} className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-widest text-gray-500">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((u, i) => (
                                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="px-5 py-4 font-mono text-xs text-gray-500">{u.id}</td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-full bg-black text-white text-xs font-black flex items-center justify-center flex-shrink-0">
                                                {u.name[0]}
                                            </div>
                                            <span className="font-semibold">{u.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-gray-500">{u.email}</td>
                                    <td className="px-5 py-4 font-black">{u.orders}</td>
                                    <td className="px-5 py-4 font-black">{u.spent}</td>
                                    <td className="px-5 py-4 text-gray-400 text-xs">{u.joined}</td>
                                    <td className="px-5 py-4"><Badge label={u.status} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

const tabs: { id: Tab; label: string }[] = [
    { id: "orders", label: "Orders" },
    { id: "products", label: "Products" },
    { id: "customers", label: "Customers" },
];

export default function AdminDashboardClient() {
    const [active, setActive] = useState<Tab>("orders");

    return (
        <div className="min-h-screen bg-[#F4F4F5] flex selection:bg-black selection:text-white">

            {/* ── Sidebar ─────────────────────────────────── */}
            <div className="w-72 bg-black text-white p-8 hidden md:flex flex-col flex-shrink-0 border-r-4 border-black">
                <div className="mb-12 border-b-2 border-white/20 pb-6">
                    <h2 className="text-3xl font-black tracking-tighter uppercase mb-1">Alora</h2>
                    <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase font-bold">Admin Portal</p>
                </div>

                <nav className="space-y-2 flex-1">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActive(tab.id)}
                            className={`w-full text-left p-4 border-2 font-bold tracking-widest uppercase text-sm transition-all duration-200 ${active === tab.id
                                    ? "border-white bg-white text-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]"
                                    : "border-transparent text-gray-400 hover:border-white/40 hover:text-white"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
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

            {/* ── Mobile Tab Bar ───────────────────────────── */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t-2 border-white/20 flex z-50">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActive(tab.id)}
                        className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-colors ${active === tab.id ? "text-white bg-white/10" : "text-gray-500"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* ── Main Content ─────────────────────────────── */}
            <div className="flex-1 p-6 md:p-10 pb-24 md:pb-10 overflow-auto">
                <div className="max-w-6xl mx-auto">

                    {/* Header */}
                    <div className="mb-8 border-b-4 border-black pb-5 flex items-end justify-between">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-1">Admin Portal</p>
                            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                                {tabs.find(t => t.id === active)!.label}
                            </h1>
                        </div>

                        {/* Desktop tab switcher inside header */}
                        <div className="hidden md:flex items-center gap-1 border-2 border-black p-1">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActive(tab.id)}
                                    className={`px-4 py-2 text-xs font-black uppercase tracking-widest transition-colors ${active === tab.id
                                            ? "bg-black text-white"
                                            : "text-gray-500 hover:text-black"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div key={active} style={{ animation: "fadeUp 0.2s ease both" }}>
                        <style>{`
                            @keyframes fadeUp {
                                from { opacity: 0; transform: translateY(8px); }
                                to   { opacity: 1; transform: translateY(0); }
                            }
                        `}</style>

                        {active === "orders" && <OrdersSection />}
                        {active === "products" && <ProductsSection />}
                        {active === "customers" && <CustomersSection />}
                    </div>

                </div>
            </div>
        </div>
    );
}