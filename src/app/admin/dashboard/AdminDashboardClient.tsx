"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";



type Tab = "orders" | "products" | "customers";


type Order = {
    id: string;
    userId: string;
    name: string;
    email: string;
    phone: string | null;
    orderTime: string;
    items: any;
    totalCost: number;
    paymentType: string;
    trxId: string | null;
    paymentStatus: string;
};


type Product = {
    id: string;
    name: string;
    brand: string;
    price: number;
    sizeMl: number;
    concentration: string;
    gender: string;
    imageUrls: string[];
    createdAt: string;
};


type Customer = {
    id: string;
    name: string | null;
    email: string;
    phone: string | null;
    address: string | null;
    createdAt: string;
    orders: { id: string; orderTime: string }[];
    _count: {
        orders: number;
    };
};


// ─── Dropdown for Items ───

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
                    <div className="absolute inset-0 bg-transparent" onClick={() => setIsOpen(false)}></div>

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
                            {items.map((item: any, idx: number) => (
                                <div key={idx} className="bg-gray-50 border-2 border-black p-2 shadow-[2px_2px_0px_0px_#000]">
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

function UserOrdersDropdown({ orders }: { orders: { id: string; orderTime: string }[] }) {
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

    if (!orders || orders.length === 0) return <span className="text-gray-300">-</span>;

    return (
        <div className="relative">
            <button
                ref={buttonRef}
                onClick={toggleDropdown}
                className="bg-black text-white px-3 py-1 font-black text-xs hover:bg-gray-800 transition-all active:translate-y-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] flex items-center gap-2"
            >
                {orders.length} ORDERS
            </button>

            {isOpen && createPortal(
                <div className="fixed inset-0 z-[9999]">
                    <div className="absolute inset-0 bg-transparent" onClick={() => setIsOpen(false)}></div>
                    <div
                        className="fixed w-48 bg-white border-2 border-black shadow-[10px_10px_0px_0px_#000] p-4 text-left animate-in fade-in slide-in-from-top-2 duration-200"
                        style={{
                            top: `${coords.top}px`,
                            left: `${coords.left}px`,
                            transform: 'translateX(-50%)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-2 pb-1 border-b-2 border-black">
                            <h4 className="text-[9px] font-black uppercase tracking-widest text-gray-400">Order History</h4>
                        </div>
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                            {orders.map((order, idx) => (
                                <div key={idx} className="flex flex-col border-b border-gray-100 last:border-0 pb-1 mb-1">
                                    <span className="font-mono text-[10px] font-black uppercase">#{order.id.slice(-8)}</span>
                                    <span className="text-[8px] text-gray-400 uppercase">{new Date(order.orderTime).toLocaleDateString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}












// ─── Section: Orders ───

function OrdersSection({ orders }: { orders: Order[] }) {
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
                            {orders.map((o, i) => (
                                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors text-center">
                                    <td className="px-5 py-4 font-mono font-bold text-xs whitespace-nowrap border-r-2 border-black last:border-r-0" title={o.id}>
                                        {o.id.slice(-8)}
                                    </td>
                                    <td className="px-5 py-4 font-mono text-[10px] text-gray-400 whitespace-nowrap border-r-2 border-black last:border-r-0" title={o.userId}>
                                        {o.userId.slice(-8)}
                                    </td>
                                    <td className="px-5 py-4 font-semibold whitespace-nowrap border-r-2 border-black last:border-r-0">{o.name}</td>
                                    <td className="px-5 py-4 text-gray-600 whitespace-nowrap border-r-2 border-black last:border-r-0">{o.email}</td>
                                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap border-r-2 border-black last:border-r-0">{o.phone || "-"}</td>
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












// ─── Section: Products ───

function ProductsSection({ products, setProducts }: { products: Product[], setProducts: React.Dispatch<React.SetStateAction<Product[]>> }) {
    const [showDialog, setShowDialog] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        name: "", brand: "", price: "", sizeMl: "", concentration: "", gender: "", imageUrls: ""
    });

    const resetForm = () => {
        setForm({ name: "", brand: "", price: "", sizeMl: "", concentration: "", gender: "", imageUrls: "" });
        setSelectedId(null);
    };

    const handleAddClick = () => {
        resetForm();
        setEditMode(false);
        setShowDialog(true);
    };

    const handleEditClick = () => {
        setEditMode(prev => !prev);
        setSelectedId(null);
        setShowDialog(false);
    };

    const handleSelectForEdit = (p: Product) => {
        setSelectedId(p.id);
        setForm({
            name: p.name,
            brand: p.brand,
            price: p.price.toString(),
            sizeMl: p.sizeMl.toString(),
            concentration: p.concentration,
            gender: p.gender,
            imageUrls: p.imageUrls.join(", ")
        });
        setShowDialog(true);
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const payload = {
                ...form,
                imageUrls: form.imageUrls.split(",").map(s => s.trim()).filter(Boolean),
                ...(selectedId ? { id: selectedId } : {})
            };

            const res = await fetch("/api/admin/products", {
                method: selectedId ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (data.success) {
                if (selectedId) {
                    setProducts(prev => prev.map(p => p.id === selectedId ? data.product : p));
                } else {
                    setProducts(prev => [data.product, ...prev]);
                }
                setShowDialog(false);
                setEditMode(false);
                resetForm();
            } else {
                alert("Error: " + (data.message || "Failed to save"));
            }
        } catch (err) {
            alert("Network error. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: "Total Products", value: products.length.toString() },
                    { label: "Brands", value: Array.from(new Set(products.map(p => p.brand))).length.toString() },
                ].map(s => (
                    <div key={s.label} className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_#000]">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2">{s.label}</p>
                        <p className="text-3xl font-black tracking-tight">{s.value}</p>
                    </div>
                ))}

                {/* Add Item Button */}
                <button onClick={handleAddClick} className="bg-black text-green-300 p-5 border-2 border-black shadow-[4px_4px_0px_0px_#000] flex flex-col items-center justify-center gap-1 hover:bg-gray-800 transition-all active:translate-x-1 active:translate-y-1 active:shadow-none group">
                    <span className="text-xl font-black uppercase tracking-tighter truncate w-full">+ Add Item</span>
                </button>

                {/* Edit Item Button */}
                <button onClick={handleEditClick} className={`p-5 border-2 border-black shadow-[4px_4px_0px_0px_#000] flex flex-col items-center justify-center gap-1 hover:bg-gray-800 transition-all active:translate-x-1 active:translate-y-1 active:shadow-none group ${editMode ? "bg-blue-600 text-white" : "bg-black text-blue-400"}`}>
                    <span className="text-xl font-black uppercase tracking-tighter truncate w-full">{editMode ? "Cancel Edit" : "Edit Item"}</span>
                </button>
            </div>

            {/* ─── Product Dialog (Add / Edit) ─── */}
            {showDialog && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setShowDialog(false); resetForm(); setEditMode(false); }}></div>
                    <div className="relative bg-white border-4 border-black shadow-[12px_12px_0px_0px_#000] p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <div className="mb-6 pb-3 border-b-4 border-black flex items-center justify-between">
                            <h3 className="text-2xl font-black uppercase tracking-tight">
                                {selectedId ? "Edit Product" : "Add New Product"}
                            </h3>
                            <button onClick={() => { setShowDialog(false); resetForm(); setEditMode(false); }} className="w-8 h-8 bg-black text-white flex items-center justify-center font-black hover:bg-red-600 transition-colors text-sm">✕</button>
                        </div>

                        <div className="space-y-4">
                            {/* Brand Dropdown */}
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Brand</label>
                                <select
                                    value={form.brand}
                                    onChange={(e) => setForm(prev => ({ ...prev, brand: e.target.value }))}
                                    className="w-full border-2 border-black p-3 font-bold text-sm focus:shadow-[4px_4px_0px_0px_#000] outline-none transition-all bg-white appearance-none cursor-pointer"
                                >
                                    <option value="">Select a brand...</option>
                                    {Array.from(new Set(products.map(p => p.brand))).sort().map(brand => (
                                        <option key={brand} value={brand}>{brand}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Name */}
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="e.g. Eros EDP"
                                    className="w-full border-2 border-black p-3 font-bold text-sm focus:shadow-[4px_4px_0px_0px_#000] outline-none transition-all placeholder-gray-300"
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Price (BDT)</label>
                                <input
                                    type="number"
                                    value={form.price}
                                    onChange={(e) => setForm(prev => ({ ...prev, price: e.target.value }))}
                                    placeholder="e.g. 2500"
                                    className="w-full border-2 border-black p-3 font-bold text-sm focus:shadow-[4px_4px_0px_0px_#000] outline-none transition-all placeholder-gray-300"
                                />
                            </div>

                            {/* Gender Toggle Buttons */}
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Gender</label>
                                <div className="flex gap-2">
                                    {["Men", "Women", "Unisex"].map(g => (
                                        <button
                                            key={g}
                                            type="button"
                                            onClick={() => setForm(prev => ({ ...prev, gender: g }))}
                                            className={`flex-1 py-3 border-2 border-black font-black uppercase tracking-widest text-xs transition-all ${form.gender === g
                                                ? "bg-black text-white shadow-[4px_4px_0px_0px_#000]"
                                                : "bg-white text-black hover:bg-gray-100"
                                                }`}
                                        >
                                            {g}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Concentration */}
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Concentration</label>
                                <input
                                    type="text"
                                    value={form.concentration}
                                    onChange={(e) => setForm(prev => ({ ...prev, concentration: e.target.value }))}
                                    placeholder="e.g. EDP / EDT / Parfum"
                                    className="w-full border-2 border-black p-3 font-bold text-sm focus:shadow-[4px_4px_0px_0px_#000] outline-none transition-all placeholder-gray-300"
                                />
                            </div>

                            {/* Size (ML) */}
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Size (ML)</label>
                                <input
                                    type="number"
                                    value={form.sizeMl}
                                    onChange={(e) => setForm(prev => ({ ...prev, sizeMl: e.target.value }))}
                                    placeholder="e.g. 100"
                                    className="w-full border-2 border-black p-3 font-bold text-sm focus:shadow-[4px_4px_0px_0px_#000] outline-none transition-all placeholder-gray-300"
                                />
                            </div>

                            {/* Image URLs */}
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Image URLs (comma separated)</label>
                                <input
                                    type="text"
                                    value={form.imageUrls}
                                    onChange={(e) => setForm(prev => ({ ...prev, imageUrls: e.target.value }))}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full border-2 border-black p-3 font-bold text-sm focus:shadow-[4px_4px_0px_0px_#000] outline-none transition-all placeholder-gray-300"
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex gap-3">
                            <button
                                onClick={handleSave}
                                disabled={saving || !form.name || !form.brand || !form.price}
                                className="flex-1 bg-black text-white py-4 font-black uppercase tracking-widest text-xs border-2 border-black hover:bg-emerald-600 hover:border-emerald-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[4px_4px_0px_0px_#000] active:translate-y-1 active:shadow-none"
                            >
                                {saving ? "SAVING..." : selectedId ? "UPDATE PRODUCT" : "ADD PRODUCT"}
                            </button>
                            <button
                                onClick={() => { setShowDialog(false); resetForm(); setEditMode(false); }}
                                className="px-6 py-4 border-2 border-black font-black uppercase tracking-widest text-xs hover:bg-gray-100 transition-colors"
                            >
                                CANCEL
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000]">
                <div className="px-6 py-4 border-b-2 border-black flex items-center justify-between bg-black text-white">
                    <h3 className="font-black uppercase tracking-widest text-sm">All Products</h3>
                    {editMode && <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-400 animate-pulse">← Select a row to edit</span>}
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-black bg-gray-50">
                                {editMode && <th className="px-3 py-3 text-center text-[10px] font-black uppercase tracking-widest text-red-600 border-r-2 border-black">Select</th>}
                                {[
                                    "ID",
                                    "Brand",
                                    "Name",
                                    "Price",
                                    "Gender",
                                    "Concentration",
                                    "ML",
                                    "ImageURL"
                                ].map(h => (
                                    <th key={h} className="px-5 py-3 text-center text-[10px] font-black uppercase tracking-widest text-red-600 whitespace-nowrap border-r-2 border-black last:border-r-0">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p, i) => (
                                <tr
                                    key={i}
                                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors text-center font-bold ${editMode ? "cursor-pointer" : ""} ${selectedId === p.id ? "bg-blue-50 border-blue-300" : ""}`}
                                    onClick={() => editMode && handleSelectForEdit(p)}
                                >
                                    {editMode && (
                                        <td className="px-3 py-4 border-r-2 border-black">
                                            <div className="flex justify-center">
                                                <div className={`w-5 h-5 border-2 border-black flex items-center justify-center ${selectedId === p.id ? "bg-blue-600" : "bg-white"}`}>
                                                    {selectedId === p.id && <span className="text-white text-xs font-black">✓</span>}
                                                </div>
                                            </div>
                                        </td>
                                    )}
                                    <td className="px-5 py-4 font-mono text-[10px] text-gray-400 border-r-2 border-black last:border-r-0" title={p.id}>
                                        {p.id}
                                    </td>
                                    <td className="px-5 py-4 uppercase border-r-2 border-black last:border-r-0">{p.brand}</td>
                                    <td className="px-5 py-4 border-r-2 border-black last:border-r-0 truncate max-w-[150px]">{p.name}</td>
                                    <td className="px-5 py-4 font-black border-r-2 border-black last:border-r-0">BDT {p.price.toLocaleString()}</td>
                                    <td className="px-5 py-4 uppercase text-xs border-r-2 border-black last:border-r-0">{p.gender}</td>
                                    <td className="px-3 py-4 uppercase text-[10px] border-r-2 border-black last:border-r-0 max-w-[80px] truncate">{p.concentration}</td>
                                    <td className="px-5 py-4 border-r-2 border-black last:border-r-0">{p.sizeMl}ML</td>
                                    <td className="px-5 py-4 border-r-2 border-black last:border-r-0">
                                        <div className="flex justify-center">
                                            {p.imageUrls[0] ? (
                                                <div className="w-10 h-10 border-2 border-black overflow-hidden shadow-[2px_2px_0px_0px_#000]">
                                                    <img src={p.imageUrls[0]} alt={p.name} className="w-full h-full object-cover" />
                                                </div>
                                            ) : (
                                                <span className="text-gray-300 text-[10px]">NO IMG</span>
                                            )}
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





















// ─── Section: Customers ───

function CustomersSection({ customers }: { customers: Customer[] }) {
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
                            {customers.map((u, i) => (
                                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors text-center font-bold">
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










// ─── Main Export ────

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
                    <button
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

                        {active === "orders" && <OrdersSection orders={orders} />}
                        {active === "products" && <ProductsSection products={products} setProducts={setProducts} />}
                        {active === "customers" && <CustomersSection customers={customers} />}
                    </div>

                </div>
            </div>
        </div>
    );
}