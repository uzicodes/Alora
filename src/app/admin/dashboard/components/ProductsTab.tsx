"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { Product } from "./types";

function ProductFormDialog({
    showDialog,
    setShowDialog,
    resetForm,
    setEditMode,
    selectedId,
    form,
    setForm,
    products,
    saving,
    handleSave,
}: {
    showDialog: boolean;
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
    resetForm: () => void;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    selectedId: string | null;
    form: { name: string; brand: string; price: string; sizeMl: string; concentration: string; gender: string; imageUrls: string; };
    setForm: React.Dispatch<React.SetStateAction<{ name: string; brand: string; price: string; sizeMl: string; concentration: string; gender: string; imageUrls: string; }>>;
    products: Product[];
    saving: boolean;
    handleSave: () => Promise<void>;
}) {
    if (!showDialog) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            <button
                type="button"
                className="absolute inset-0 bg-black/60 backdrop-blur-sm w-full h-full border-0 p-0 m-0 cursor-default focus:outline-none"
                aria-label="Close dialog"
                onClick={() => { setShowDialog(false); resetForm(); setEditMode(false); }}
            />
            <div className="relative bg-white border-4 border-black shadow-[12px_12px_0px_0px_#000] p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="mb-6 pb-3 border-b-4 border-black flex items-center justify-between">
                    <h3 className="text-2xl font-black uppercase tracking-tight">
                        {selectedId ? "Edit Product" : "Add New Product"}
                    </h3>
                    <button type="button" onClick={() => { setShowDialog(false); resetForm(); setEditMode(false); }} className="w-8 h-8 bg-black text-white flex items-center justify-center font-black hover:bg-red-600 transition-colors text-sm">✕</button>
                </div>

                <div className="space-y-4">
                    {/* Brand Dropdown */}
                    <div>
                        <label htmlFor="brand-select" className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Brand</label>
                        <select
                            id="brand-select"
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
                        <label htmlFor="product-name" className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Name</label>
                        <input
                            id="product-name"
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="e.g. Eros EDP"
                            className="w-full border-2 border-black p-3 font-bold text-sm focus:shadow-[4px_4px_0px_0px_#000] outline-none transition-all placeholder-gray-300"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label htmlFor="product-price" className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Price (BDT)</label>
                        <input
                            id="product-price"
                            type="number"
                            value={form.price}
                            onChange={(e) => setForm(prev => ({ ...prev, price: e.target.value }))}
                            placeholder="e.g. 2500"
                            className="w-full border-2 border-black p-3 font-bold text-sm focus:shadow-[4px_4px_0px_0px_#000] outline-none transition-all placeholder-gray-300"
                        />
                    </div>

                    {/* Gender Toggle Buttons */}
                    <div>
                        <span className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Gender</span>
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
                        <label htmlFor="product-concentration" className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Concentration</label>
                        <input
                            id="product-concentration"
                            type="text"
                            value={form.concentration}
                            onChange={(e) => setForm(prev => ({ ...prev, concentration: e.target.value }))}
                            placeholder="e.g. EDP / EDT / Parfum"
                            className="w-full border-2 border-black p-3 font-bold text-sm focus:shadow-[4px_4px_0px_0px_#000] outline-none transition-all placeholder-gray-300"
                        />
                    </div>

                    {/* Size (ML) */}
                    <div>
                        <label htmlFor="product-size" className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Size (ML)</label>
                        <input
                            id="product-size"
                            type="number"
                            value={form.sizeMl}
                            onChange={(e) => setForm(prev => ({ ...prev, sizeMl: e.target.value }))}
                            placeholder="e.g. 100"
                            className="w-full border-2 border-black p-3 font-bold text-sm focus:shadow-[4px_4px_0px_0px_#000] outline-none transition-all placeholder-gray-300"
                        />
                    </div>

                    {/* Image URLs */}
                    <div>
                        <label htmlFor="product-images" className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Image URLs (comma separated)</label>
                        <input
                            id="product-images"
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
                        type="button"
                        onClick={handleSave}
                        disabled={saving || !form.name || !form.brand || !form.price}
                        className="flex-1 bg-black text-white py-4 font-black uppercase tracking-widest text-xs border-2 border-black hover:bg-emerald-600 hover:border-emerald-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[4px_4px_0px_0px_#000] active:translate-y-1 active:shadow-none"
                    >
                        {saving ? "SAVING..." : selectedId ? "UPDATE PRODUCT" : "ADD PRODUCT"}
                    </button>
                    <button
                        type="button"
                        onClick={() => { setShowDialog(false); resetForm(); setEditMode(false); }}
                        className="px-6 py-4 border-2 border-black font-black uppercase tracking-widest text-xs hover:bg-gray-100 transition-colors"
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}

function ProductCatalogTable({
    products,
    editMode,
    selectedId,
    handleSelectForEdit,
}: {
    products: Product[];
    editMode: boolean;
    selectedId: string | null;
    handleSelectForEdit: (p: Product) => void;
}) {
    return (
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
                        {products.map((p) => (
                            <tr
                                key={p.id}
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
                                            <div className="w-10 h-10 border-2 border-black overflow-hidden relative">
                                                <Image src={p.imageUrls[0]} alt={p.name} fill sizes="40px" className="object-cover" />
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
    );
}

export function ProductsTab({ products, setProducts }: { products: Product[], setProducts: React.Dispatch<React.SetStateAction<Product[]>> }) {
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
                imageUrls: form.imageUrls.split(",").flatMap(s => {
                    const trimmed = s.trim();
                    return trimmed ? [trimmed] : [];
                }),
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
                setForm({ name: "", brand: "", price: "", sizeMl: "", concentration: "", gender: "", imageUrls: "" });
            } else {
                alert(data.error || "Failed to save product.");
            }
            setSaving(false);
            setShowDialog(false);
            setSelectedId(null);
        } catch (error) {
            console.error("Failed to save product:", error);
            alert("Failed to save product.");
            setSaving(false);
            setShowDialog(false);
            setSelectedId(null);
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
                <button type="button" onClick={handleAddClick} className="bg-transparent text-green-600 p-5 border-2 border-green-600 transition-all hover:bg-green-600 hover:text-white active:translate-y-1 group">
                    <span className="text-xl font-black uppercase tracking-tighter truncate w-full">+ Add Item</span>
                </button>

                {/* Edit Item Button */}
                <button type="button" onClick={handleEditClick} className={`p-5 border-2 transition-all active:translate-y-1 group ${editMode ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700" : "bg-transparent text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"}`}>
                    <span className="text-xl font-black uppercase tracking-tighter truncate w-full">{editMode ? "Cancel Edit" : "Edit Item"}</span>
                </button>
            </div>

            <ProductFormDialog
                showDialog={showDialog}
                setShowDialog={setShowDialog}
                resetForm={resetForm}
                setEditMode={setEditMode}
                selectedId={selectedId}
                form={form}
                setForm={setForm}
                products={products}
                saving={saving}
                handleSave={handleSave}
            />

            <ProductCatalogTable
                products={products}
                editMode={editMode}
                selectedId={selectedId}
                handleSelectForEdit={handleSelectForEdit}
            />
        </div>
    );
}
