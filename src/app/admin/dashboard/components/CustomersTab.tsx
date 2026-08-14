"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import type { Customer } from "./types";

function UserOrdersDropdown({ orders }: { orders: { id: string; orderTime: Date }[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [coords, setCoords] = useState({ top: 0, left: 0 });

    const toggleDropdown = () => {
        if (!isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setCoords({
                top: rect.bottom + 12,
                left: rect.left + rect.width / 2
            });
        }
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (isOpen && buttonRef.current) {
                const rect = buttonRef.current.getBoundingClientRect();
                setCoords({
                    top: rect.bottom + 12,
                    left: rect.left + rect.width / 2
                });
            }
        };
        window.addEventListener('scroll', handleScroll, true);
        return () => window.removeEventListener('scroll', handleScroll, true);
    }, [isOpen]);

    return (
        <div className="relative">
            <button
                type="button"
                ref={buttonRef}
                onClick={toggleDropdown}
                className="font-medium text-[11px] bg-white text-gray-700 px-3 py-1.5 rounded-none border border-gray-200 hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2"
            >
                {orders.length} Orders
                <svg className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && createPortal(
                <div className="fixed inset-0 z-[9999]">
                    <button
                        type="button"
                        className="absolute inset-0 bg-transparent w-full h-full border-0 p-0 m-0 cursor-default focus:outline-none"
                        aria-label="Close dropdown"
                        onClick={() => setIsOpen(false)}
                    />

                    <div
                        className="fixed w-72 bg-white/95 backdrop-blur-md border border-gray-100 shadow-xl rounded-none p-4 text-left animate-in fade-in zoom-in-95 duration-200"
                        style={{
                            top: `${coords.top}px`,
                            left: `${coords.left}px`,
                            transform: 'translateX(-50%)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-3 pb-2 border-b border-gray-100">
                            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">User Orders</h4>
                        </div>
                        <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                            {orders.map((order) => (
                                <div key={order.id} className="bg-gray-50/50 rounded-none p-2.5">
                                    <p className="font-medium text-[12px] text-gray-800 leading-tight mb-1.5">ID: #{order.id.slice(-6)}</p>
                                    <div className="flex justify-between items-center text-[10px] font-medium tracking-wide text-gray-500">
                                        <span>Time:</span>
                                        <span className="text-gray-900 font-semibold">{new Date(order.orderTime).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                            <span className="text-[11px] font-medium text-gray-500 uppercase tracking-widest">Total Orders</span>
                            <span className="text-sm font-semibold text-gray-900">{orders.length}</span>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}

export function CustomersTab({ customers }: { customers: Customer[] }) {
    return (
        <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { label: "Total Customers", value: customers.length.toString() },
                ].map(s => (
                    <div key={s.label} className="bg-white rounded-none border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center justify-center">
                        <p className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-2">{s.label}</p>
                        <p className="text-3xl font-light text-gray-900">{s.value}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-none border border-gray-300 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-white">
                    <h3 className="font-medium uppercase tracking-widest text-sm text-gray-800">Customers</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-center">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-300 divide-x divide-gray-300 text-center">
                                {[
                                    "UserID",
                                    "Name",
                                    "Email",
                                    "Phone",
                                    "Address",
                                    "Joined",
                                    "Orders"
                                ].map(h => (
                                    <th key={h} className="px-6 py-4 text-[10px] font-semibold uppercase tracking-widest text-red-600 whitespace-nowrap text-center">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {customers.map((u) => (
                                <tr key={u.id} className="hover:bg-gray-50/50 transition-colors divide-x divide-gray-300 text-center">
                                    <td className="px-6 py-4 font-mono text-xs text-gray-400 whitespace-nowrap text-center" title={u.id}>
                                        {u.id.slice(-8)}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900 truncate max-w-[150px] text-center">
                                        {u.name || "N/A"}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 lowercase text-center">{u.email}</td>
                                    <td className="px-6 py-4 text-gray-500 text-center">{u.phone || "-"}</td>
                                    <td className="px-6 py-4 text-gray-500 truncate max-w-[150px] text-center">{u.address || "N/A"}</td>
                                    <td className="px-6 py-4 text-gray-400 text-xs text-center">
                                        {new Date(u.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center">
                                            <UserOrdersDropdown orders={u.orders} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
