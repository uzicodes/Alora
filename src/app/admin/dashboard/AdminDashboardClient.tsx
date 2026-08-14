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
        <div className="min-h-screen bg-[#FAFAFA] flex font-sans selection:bg-[#C2B280] selection:text-white">
            <div className="w-72 bg-white text-gray-900 p-8 hidden md:flex flex-col flex-shrink-0 border-r border-gray-100 h-screen sticky top-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
                <div className="mb-12 border-b border-gray-100 pb-6 text-center">
                    <h2 className="text-2xl font-light tracking-[0.2em] text-[#C2B280] uppercase mb-2">Alora</h2>
                    <p className="text-[10px] tracking-widest text-gray-400 uppercase font-medium">Admin Portal</p>
                </div>

                <nav className="space-y-3 flex-1 px-2">
                    {tabs.map(tab => (
                        <button
                            type="button"
                            key={tab.id}
                            onClick={() => setActive(tab.id)}
                            className={`w-full text-left px-5 py-3.5 rounded-none font-medium tracking-wide text-sm transition-all duration-300 ${active === tab.id
                                ? "bg-[#C2B280]/10 text-[#C2B280] shadow-sm"
                                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto pt-8 border-t border-gray-100 px-2">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full justify-center px-6 py-3.5 bg-red-50 text-red-600 rounded-none font-medium tracking-wide text-sm hover:bg-red-100 transition-all duration-300 flex items-center gap-2 group"
                    >
                        Logout
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Ã¢â€â‚¬Ã¢â€â‚¬ Mobile Tab Bar Ã¢â€â‚¬Ã¢â€â‚¬ */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.04)]">
                {tabs.map(tab => (
                    <button
                        type="button"
                        key={tab.id}
                        onClick={() => setActive(tab.id)}
                        className={`flex-1 py-4 text-xs font-medium tracking-wide transition-colors ${active === tab.id ? "text-[#C2B280] bg-[#C2B280]/5" : "text-gray-500"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Ã¢â€â‚¬Ã¢â€â‚¬ Main Content Ã¢â€â‚¬Ã¢â€â‚¬ */}
            <div className="flex-1 p-6 md:p-10 pb-24 md:pb-10 overflow-auto relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C2B280]/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-10 pb-6 border-b border-gray-200 flex items-end justify-between">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-light tracking-wide text-gray-900">
                                {tabs.find(t => t.id === active)!.label}
                            </h1>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div key={active} style={{ animation: "fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both" }}>
                        <style>{`
                            @keyframes fadeUp {
                                from { opacity: 0; transform: translateY(12px); }
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