"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import type { Order } from "./types";

function ItemsDropdown({ items }: { items: any[] }) {
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
                {items.length} ITEMS
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
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Order Contents</h4>
                        </div>
                        <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                            {items.map((item: any) => (
                                <div key={item.name} className="bg-gray-50 border-2 border-black p-2 shadow-[2px_2px_0px_0px_#000]">
                                    <p className="font-black text-[11px] uppercase leading-tight mb-1">{item.name}</p>
                                    <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest">
                                        <span className="text-gray-500">QTY: <span className="text-black">{item.quantity}</span></span>
                                        <span className="bg-black text-white px-1.5 py-0.5">BDT {(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-3 border-t-2 border-black flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase">Total Items</span>
                            <span className="text-sm font-black">{items.reduce((acc, i) => acc + (i.quantity || 1), 0)}</span>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}

export function OrdersTab({ orders }: { orders: Order[] }) {
    return (
        <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: "Total Orders", value: orders.length.toString() },
                    { label: "Revenue", value: `BDT ${orders.reduce((acc, o) => acc + (o.paymentStatus === 'PAID' ? o.totalCost : 0), 0).toLocaleString()}` },
                ].map(s => (
                    <div key={s.label} className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_#000]">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">{s.label}</p>
                        <p className="text-3xl font-black tracking-tight">{s.value}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000]">
                <div className="px-6 py-4 border-b-2 border-black flex items-center justify-between bg-black text-white">
                    <h3 className="font-black uppercase tracking-widest text-sm">All Orders</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-black bg-gray-50">
                                {[
                                    "OrderID",
                                    "User ID",
                                    "Name",
                                    "Email",
                                    "Phone",
                                    "Address",
                                    "Order Time",
                                    "Items",
                                    "Total Cost",
                                    "Payment",
                                    "TrxID"
                                ].map(h => (
                                    <th key={h} className="px-5 py-3 text-center text-[10px] font-black uppercase tracking-widest text-red-600 whitespace-nowrap border-r-2 border-black last:border-r-0">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((o) => (
                                <tr key={o.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors text-center">
                                    <td className="px-5 py-4 font-mono font-bold text-xs whitespace-nowrap border-r-2 border-black last:border-r-0" title={o.id}>
                                        {o.id.slice(-8)}
                                    </td>
                                    <td className="px-5 py-4 font-mono text-[10px] text-gray-400 whitespace-nowrap border-r-2 border-black last:border-r-0" title={o.userId}>
                                        {o.userId.slice(-8)}
                                    </td>
                                    <td className="px-5 py-4 font-semibold whitespace-nowrap border-r-2 border-black last:border-r-0">{o.name}</td>
                                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap border-r-2 border-black last:border-r-0">{o.email}</td>
                                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap border-r-2 border-black last:border-r-0">{o.phone || "-"}</td>
                                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap border-r-2 border-black last:border-r-0 truncate max-w-[150px] text-[10px]" title={o.address}>{o.address}</td>
                                    <td className="px-5 py-4 text-gray-400 text-xs whitespace-nowrap border-r-2 border-black last:border-r-0">
                                        {new Date(o.orderTime).toLocaleString()}
                                    </td>
                                    <td className="px-5 py-4 border-r-2 border-black last:border-r-0">
                                        <div className="flex flex-col items-center gap-1">
                                            {Array.isArray(o.items) ? (
                                                <ItemsDropdown items={o.items} />
                                            ) : (
                                                <span className="text-gray-400 text-[10px]">Data Error</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 font-black whitespace-nowrap border-r-2 border-black last:border-r-0">BDT {o.totalCost.toLocaleString()}</td>
                                    <td className="px-5 py-4 text-[10px] font-bold uppercase tracking-tighter text-gray-400 border-r-2 border-black last:border-r-0">{o.paymentType}</td>
                                    <td className="px-5 py-4 font-mono text-[10px] text-blue-600 font-bold whitespace-nowrap border-r-2 border-black last:border-r-0">{o.trxId || "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
