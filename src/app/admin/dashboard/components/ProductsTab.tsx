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
            <div className="relative bg-white border border-gray-100 shadow-2xl rounded-none p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="mb-6 pb-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-2xl font-light tracking-wide text-gray-900">
                        {selectedId ? "Edit Product" : "Add New Product"}
                    </h3>
                    <button type="button" onClick={() => { setShowDialog(false); resetForm(); setEditMode(false); }} className="w-8 h-8 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center hover:bg-gray-100 hover:text-gray-900 transition-colors text-sm">Ã¢Å“â€¢</button>
                </div>

                <div className="space-y-5">
                    {/* Brand Dropdown */}
                    <div>
                        <label htmlFor="brand-select" className="block text-[11px] font-semibold uppercase tracking-widest text-gray-500 mb-2">Brand</label>
                        <select
                            id="brand-select"
                            value={form.brand}
                            onChange={(e) => setForm(prev => ({ ...prev, brand: e.target.value }))}
                            className="w-full border border-gray-200 rounded-none p-3.5 font-medium text-sm focus:border-[#C2B280] focus:ring-1 focus:ring-[#C2B280] outline-none transition-all bg-gray-50/50 appearance-none cursor-pointer"
                        >
                            <option value="">Select a brand...</option>
                            {Array.from(new Set(products.map(p => p.brand))).sort().map(brand => (
                                <option key={brand} value={brand}>{brand}</option>
                            ))}
                        </select>
                    </div>

                    {/* Name */}
                    <div>
                        <label htmlFor="product-name" className="block text-[11px] font-semibold uppercase tracking-widest text-gray-500 mb-2">Name</label>
                        <input
                            id="product-name"
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="e.g. Eros EDP"
                            className="w-full border border-gray-200 rounded-none p-3.5 font-medium text-sm focus:border-[#C2B280] focus:ring-1 focus:ring-[#C2B280] outline-none transition-all bg-gray-50/50 placeholder-gray-400"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label htmlFor="product-price" className="block text-[11px] font-semibold uppercase tracking-widest text-gray-500 mb-2">Price (BDT)</label>
                        <input
                            id="product-price"
                            type="number"
                            value={form.price}
                            onChange={(e) => setForm(prev => ({ ...prev, price: e.target.value }))}
                            placeholder="e.g. 2500"
                            className="w-full border border-gray-200 rounded-none p-3.5 font-medium text-sm focus:border-[#C2B280] focus:ring-1 focus:ring-[#C2B280] outline-none transition-all bg-gray-50/50 placeholder-gray-400"
                        />
                    </div>

                    {/* Gender Toggle Buttons */}
                    <div>
                        <span className="block text-[11px] font-semibold uppercase tracking-widest text-gray-500 mb-3">Gender</span>
                        <div className="flex gap-2">
                            {["Men", "Women", "Unisex"].map(g => (
                                <button
                                    key={g}
                                    type="button"
                                    onClick={() => setForm(prev => ({ ...prev, gender: g }))}
                                    className={`flex-1 py-3 rounded-none font-semibold uppercase tracking-widest text-[10px] transition-all border ${form.gender === g
                                        ? "bg-gray-900 text-white border-gray-900 shadow-md"
                                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                                        }`}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Concentration */}
                    <div>
                        <label htmlFor="product-concentration" className="block text-[11px] font-semibold uppercase tracking-widest text-gray-500 mb-2">Concentration</label>
                        <input
                            id="product-concentration"
                            type="text"
                            value={form.concentration}
                            onChange={(e) => setForm(prev => ({ ...prev, concentration: e.target.value }))}
                            placeholder="e.g. EDP / EDT / Parfum"
                            className="w-full border border-gray-200 rounded-none p-3.5 font-medium text-sm focus:border-[#C2B280] focus:ring-1 focus:ring-[#C2B280] outline-none transition-all bg-gray-50/50 placeholder-gray-400"
                        />
                    </div>

                    {/* Size (ML) */}
                    <div>
                        <label htmlFor="product-size" className="block text-[11px] font-semibold uppercase tracking-widest text-gray-500 mb-2">Size (ML)</label>
                        <input
                            id="product-size"
                            type="number"
                            value={form.sizeMl}
                            onChange={(e) => setForm(prev => ({ ...prev, sizeMl: e.target.value }))}
                            placeholder="e.g. 100"
                            className="w-full border border-gray-200 rounded-none p-3.5 font-medium text-sm focus:border-[#C2B280] focus:ring-1 focus:ring-[#C2B280] outline-none transition-all bg-gray-50/50 placeholder-gray-400"
                        />
                    </div>

                    {/* Image URLs */}
                    <div>
                        <label htmlFor="product-images" className="block text-[11px] font-semibold uppercase tracking-widest text-gray-500 mb-2">Image URLs (comma separated)</label>
                        <input
                            id="product-images"
                            type="text"
                            value={form.imageUrls}
                            onChange={(e) => setForm(prev => ({ ...prev, imageUrls: e.target.value }))}
                            placeholder="https://example.com/image.jpg"
                            className="w-full border border-gray-200 rounded-none p-3.5 font-medium text-sm focus:border-[#C2B280] focus:ring-1 focus:ring-[#C2B280] outline-none transition-all bg-gray-50/50 placeholder-gray-400"
                        />
                    </div>
                </div>

                <div className="mt-8 flex gap-3">
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={saving || !form.name || !form.brand || !form.price}
                        className="flex-1 bg-gray-900 text-white py-4 rounded-none font-semibold uppercase tracking-widest text-xs hover:bg-[#C2B280] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    >
                        {saving ? "Saving..." : selectedId ? "Update Product" : "Add Product"}
                    </button>
                    <button
                        type="button"
                        onClick={() => { setShowDialog(false); resetForm(); setEditMode(false); }}
                        className="px-6 py-4 rounded-none bg-gray-100 text-gray-700 font-semibold uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors"
                    >
                        Cancel
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
        <div className="bg-white rounded-none border border-gray-300 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-white">
                <h3 className="font-medium uppercase tracking-widest text-sm text-gray-800">All Products</h3>
                {editMode && <span className="text-[10px] font-semibold uppercase tracking-widest text-blue-500 animate-pulse bg-blue-50 px-3 py-1 rounded-full">⬆ Select a row to edit</span>}
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-center">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-300 divide-x divide-gray-300 text-center">
                            {editMode && <th className="px-6 py-4 text-[10px] font-semibold uppercase tracking-widest text-red-600 text-center">Select</th>}
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
                                <th key={h} className="px-6 py-4 text-[10px] font-semibold uppercase tracking-widest text-red-600 whitespace-nowrap text-center">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {products.map((p) => (
                            <tr
                                key={p.id}
                                className={`hover:bg-gray-50/50 transition-colors divide-x divide-gray-300 text-center ${editMode ? "cursor-pointer" : ""} ${selectedId === p.id ? "bg-blue-50/50" : ""}`}
                                onClick={() => editMode && handleSelectForEdit(p)}
                            >
                                {editMode && (
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center">
                                            <div className={`w-5 h-5 rounded-none flex items-center justify-center transition-colors border ${selectedId === p.id ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"}`}>
                                                {selectedId === p.id && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>}
                                            </div>
                                        </div>
                                    </td>
                                )}
                                <td className="px-6 py-4 font-mono text-xs text-gray-400 text-center" title={p.id}>
                                    {p.id.slice(-8)}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-700 uppercase tracking-wide text-xs text-center">{p.brand}</td>
                                <td className="px-6 py-4 font-medium text-gray-900 truncate max-w-[150px] text-center">{p.name}</td>
                                <td className="px-6 py-4 font-semibold text-gray-900 text-center">BDT {p.price.toLocaleString()}</td>
                                <td className="px-6 py-4 text-gray-500 uppercase text-xs text-center">{p.gender}</td>
                                <td className="px-6 py-4 text-gray-500 uppercase text-xs max-w-[80px] truncate text-center">{p.concentration}</td>
                                <td className="px-6 py-4 text-gray-500 text-center">{p.sizeMl}ml</td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center">
                                        {p.imageUrls[0] ? (
                                            <div className="w-10 h-10 rounded-none border border-gray-100 overflow-hidden relative shadow-sm">
                                                <Image src={p.imageUrls[0]} alt={p.name} fill sizes="40px" className="object-cover" />
                                            </div>
                                        ) : (
                                            <span className="text-gray-300 text-[10px] font-medium tracking-widest">NO IMG</span>
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                    { label: "Total Products", value: products.length.toString() },
                    { label: "Brands", value: Array.from(new Set(products.map(p => p.brand))).length.toString() },
                ].map(s => (
                    <div key={s.label} className="bg-white rounded-none border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center justify-center">
                        <p className="text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-2">{s.label}</p>
                        <p className="text-3xl font-light text-gray-900">{s.value}</p>
                    </div>
                ))}

                {/* Add Item Button */}
                <button type="button" onClick={handleAddClick} className="bg-white rounded-none border border-emerald-100 p-6 shadow-sm hover:shadow-md hover:bg-emerald-50 hover:border-emerald-200 transition-all text-emerald-600 flex items-center justify-center group">
                    <span className="text-lg font-medium tracking-wide flex items-center gap-2">
                        <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                        Add Item
                    </span>
                </button>

                {/* Edit Item Button */}
                <button type="button" onClick={handleEditClick} className={`rounded-none border p-6 shadow-sm hover:shadow-md transition-all flex items-center justify-center ${editMode ? "bg-blue-50 border-blue-200 text-blue-600" : "bg-white border-blue-100 text-blue-600 hover:bg-blue-50 hover:border-blue-200"}`}>
                    <span className="text-lg font-medium tracking-wide flex items-center gap-2">
                        {editMode ? "Cancel Edit" : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                Edit Item
                            </>
                        )}
                    </span>
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
