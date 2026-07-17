"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { OrdersTab } from "./components/OrdersTab";
import { ProductsTab } from "./components/ProductsTab";
import { CustomersTab } from "./components/CustomersTab";
import type { Tab, Order, Product, Customer } from "./components/types";

const tabs: { id: Tab; label: string }[] = [
    { id: "orders", label: "Orders" },
    { id: "products", label: "Products" },
    { id: "customers", label: "Customers" },
];

export default function AdminDashboardClient({ initialOrders, initialProducts, initialUsers }: { initialOrders: Order[], initialProducts: Product[], initialUsers: Customer[] }) {
    const [active, setActive] = useState<Tab>("orders");
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [customers, setCustomers] = useState<Customer[]>(initialUsers);
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch("/api/admin/auth", { method: "DELETE" });
            router.push("/");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <div className="min-h-screen bg-[#F4F4F5] flex selection:bg-black selection:text-white">
            <div className="w-72 bg-black text-white p-8 hidden md:flex flex-col flex-shrink-0 border-r-4 border-black h-screen sticky top-0">
                <div className="mb-12 border-b-2 border-white/20 pb-6">
                    <h2 className="text-3xl font-black tracking-tighter uppercase mb-1">Alora</h2>
                    <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase font-bold">Admin Portal</p>
                </div>

                <nav className="space-y-2 flex-1">
                    {tabs.map(tab => (
                        <button
                            type="button"
                            key={tab.id}
                            onClick={() => setActive(tab.id)}
                            className={`w-full text-left p-4 border-2 font-bold tracking-widest uppercase text-sm transition-all duration-200 ${active === tab.id
                                ? "border-white text-white"
                                : "border-transparent text-gray-400 hover:border-white/40 hover:text-white"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto pt-8 border-t-2 border-white/20">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="mx-auto w-fit px-10 bg-red-600 text-white py-3 border-2 border-red-600 font-black uppercase tracking-widest text-[10px] hover:bg-red-700 hover:border-red-700 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(255,0,0,0.3)] active:translate-y-1 active:shadow-none flex items-center gap-3 group"
                    >
                        LOGOUT
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 16l4-4m0 0l-4-4m4 4H7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* ── Mobile Tab Bar ── */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t-2 border-white/20 flex z-50">
                {tabs.map(tab => (
                    <button
                        type="button"
                        key={tab.id}
                        onClick={() => setActive(tab.id)}
                        className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-colors ${active === tab.id ? "text-white bg-white/10" : "text-gray-500"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* ── Main Content ── */}
            <div className="flex-1 p-6 md:p-10 pb-24 md:pb-10 overflow-auto">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8 border-b-4 border-black pb-5 flex items-end justify-between">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                                {tabs.find(t => t.id === active)!.label}
                            </h1>
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

                        {active === "orders" && <OrdersTab orders={orders} />}
                        {active === "products" && <ProductsTab products={products} setProducts={setProducts} />}
                        {active === "customers" && <CustomersTab customers={customers} />}
                    </div>
                </div>
            </div>
        </div>
    );
}