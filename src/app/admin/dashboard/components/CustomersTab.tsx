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
                className="font-bold text-[10px] bg-black text-white px-3 py-1.5 rounded-none border-2 border-black hover:bg-gray-800 transition-all active:translate-y-0.5 active:translate-x-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] flex items-center gap-2"
            >
                {orders.length} ORDERS
                <svg className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
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
                        className="fixed w-72 bg-white border-2 border-black shadow-[10px_10px_0px_0px_#000] p-4 text-left animate-in fade-in slide-in-from-top-2 duration-200"
                        style={{
                            top: `${coords.top}px`,
                            left: `${coords.left}px`,
                            transform: 'translateX(-50%)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-3 pb-2 border-b-2 border-black">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">User Orders</h4>
                        </div>
                        <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                            {orders.map((order) => (
                                <div key={order.id} className="bg-gray-50 border-2 border-black p-2 shadow-[2px_2px_0px_0px_#000]">
                                    <p className="font-black text-[11px] uppercase leading-tight mb-1">ID: #{order.id.slice(-6)}</p>
                                    <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-gray-500">
                                        <span>Time:</span>
                                        <span className="text-black">{new Date(order.orderTime).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-3 border-t-2 border-black flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase">Total Orders</span>
                            <span className="text-sm font-black">{orders.length}</span>
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: "Total Customers", value: customers.length.toString() },
                ].map(s => (
                    <div key={s.label} className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_#000]">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">{s.label}</p>
                        <p className="text-3xl font-black tracking-tight">{s.value}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000]">
                <div className="px-6 py-4 border-b-2 border-black flex items-center justify-between bg-black text-white">
                    <h3 className="font-black uppercase tracking-widest text-sm">Customers</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-black bg-gray-50">
                                {[
                                    "UserID",
                                    "Name",
                                    "Email",
                                    "Phone",
                                    "Address",
                                    "Joined",
                                    "Orders"
                                ].map(h => (
                                    <th key={h} className="px-5 py-3 text-center text-[10px] font-black uppercase tracking-widest text-red-600 whitespace-nowrap border-r-2 border-black last:border-r-0">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((u) => (
                                <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors text-center font-bold">
                                    <td className="px-5 py-4 font-mono text-[10px] text-gray-400 border-r-2 border-black last:border-r-0" title={u.id}>
                                        {u.id.slice(-8)}
                                    </td>
                                    <td className="px-5 py-4 border-r-2 border-black last:border-r-0 truncate max-w-[150px]">
                                        {u.name || "N/A"}
                                    </td>
                                    <td className="px-5 py-4 text-gray-600 border-r-2 border-black last:border-r-0 lowercase">{u.email}</td>
                                    <td className="px-5 py-4 text-gray-500 border-r-2 border-black last:border-r-0">{u.phone || "-"}</td>
                                    <td className="px-5 py-4 border-r-2 border-black last:border-r-0 truncate max-w-[150px]">{u.address || "N/A"}</td>
                                    <td className="px-5 py-4 text-gray-400 text-[10px] border-r-2 border-black last:border-r-0">
                                        {new Date(u.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-5 py-4 border-r-2 border-black last:border-r-0">
                                        <div className="flex justify-center">
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
