"use client";

import { useState, useCallback } from "react";
import { useCart } from "./CartContext";
import Image from "next/image";
import { toast } from "sonner";

type AddToCartButtonProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  sizeMl: number;
  concentration: string;
  variant?: 'desktop' | 'mobile' | 'both';
};

/* ── Cart icon SVG ── */
const cartIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0"
  >
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

const checkIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ─── Main Component ─── */
export default function AddToCartButton({
  id,
  name,
  price,
  image,
  category,
  sizeMl,
  concentration,
  variant = "both",
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, name, price, image, category, sizeMl, concentration });
    setAdded(true);
    
    // Show Sonner custom toast
    toast.custom((t) => (
      <div className="bg-white rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.15)] border border-neutral-100 overflow-hidden w-75 sm:w-85 pointer-events-auto">
        {/* Top accent bar */}
        <div className="h-0.75 bg-linear-to-r from-[#C28D10] via-[#E2B84B] to-[#C28D10]" />

        <div className="p-4 flex items-center gap-3.5">
          {/* Checkmark circle */}
          <div className="shrink-0 w-9 h-9 rounded-full bg-[#13382C] flex items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-white"
            >
              <path
                d="M3.5 8.5L6.5 11.5L12.5 4.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Product info */}
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#13382C] mb-0.5">
              Added to Cart
            </p>
            <p className="text-[12px] text-neutral-700 font-medium truncate leading-tight">
              {name}
            </p>
            <p className="text-[11px] text-[#C28D10] font-semibold mt-0.5 tracking-wide">
              BDT {price}
            </p>
          </div>

          {/* Product thumbnail */}
          <div className="shrink-0 w-12.5 h-15 bg-[#f8f8f8] rounded-lg overflow-hidden relative border border-neutral-100">
            <Image
              src={image}
              alt={name}
              fill
              className="object-contain p-1"
              sizes="50px"
            />
          </div>
        </div>
      </div>
    ), { duration: 2500, position: 'bottom-right' });

    setTimeout(() => setAdded(false), 2000);
  };


  return (
    <>
      {/* Desktop Hover Add to Cart */}
      {(variant === "both" || variant === "desktop") && (
        <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 transform translate-y-2 transition-all duration-300 ease-in-out group-hover/card:opacity-100 group-hover/card:translate-y-0 hidden lg:flex justify-center z-10">
          <button
            type="button"
            onClick={handleClick}
            className={`flex items-center justify-center gap-2 uppercase text-[11px] font-bold tracking-[0.12em] py-2.5 px-4 w-full transition-all duration-300 rounded-sm ${
              added
                ? "bg-[#13382C] text-white shadow-[0_4px_12px_rgba(19,56,44,0.3)]"
                : "bg-[#C28D10] text-white hover:bg-[#13382C] shadow-[0_4px_12px_rgba(194,141,16,0.25)] hover:shadow-[0_4px_12px_rgba(19,56,44,0.3)]"
            }`}
          >
            {added ? checkIcon : cartIcon}
            <span>{added ? "Added" : "Add to Cart"}</span>
          </button>
        </div>
      )}

      {/* Mobile / Tablet button */}
      {(variant === "both" || variant === "mobile") && (
        <button
          type="button"
          onClick={handleClick}
          className={`lg:hidden mt-2 sm:mt-4 flex items-center justify-center gap-1 sm:gap-2 border uppercase text-[9px] sm:text-[11px] font-bold tracking-[0.1em] sm:tracking-[0.12em] py-1.5 sm:py-2.5 px-1 sm:px-4 transition-all duration-300 w-full rounded-sm ${
            added
              ? "border-[#13382C] bg-[#13382C] text-white shadow-[0_4px_12px_rgba(19,56,44,0.15)]"
              : "border-neutral-300 text-neutral-700 hover:border-[#13382C] hover:bg-[#13382C] hover:text-white hover:shadow-[0_4px_12px_rgba(19,56,44,0.15)]"
          }`}
        >
          {added ? checkIcon : cartIcon}
          <span>{added ? "Added" : "Add to Cart"}</span>
        </button>
      )}

    </>
  );
}
