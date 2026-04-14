"use client";

import { useState } from "react";
import { useCart } from "./CartContext";

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

export default function AddToCartButton({ id, name, price, image, category, sizeMl, concentration, variant = 'both' }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, name, price, image, category, sizeMl, concentration });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const label = added ? "Added ✓" : "Add to Cart";

  return (
    <>
      {/* Desktop Hover Add to Cart */}
      {(variant === 'both' || variant === 'desktop') && (
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transform translate-y-2 transition-all duration-300 ease-in-out group-hover/card:opacity-100 group-hover/card:translate-y-0 hidden lg:flex justify-center z-10">
          <button
            onClick={handleClick}
            className={`${added
                ? "bg-[#13382C] text-white"
                : "bg-[#C28D10] text-white hover:bg-[#13382C]"
              } uppercase text-[9px] font-bold tracking-[0.1em] py-2.5 px-4 w-full transition-colors duration-300`}
          >
            {label}
          </button>
        </div>
      )}

      {/* Mobile/Tablet minimal button */}
      {(variant === 'both' || variant === 'mobile') && (
        <button
          onClick={handleClick}
          className={`lg:hidden mt-5 border uppercase text-[9px] font-bold tracking-[0.1em] py-2.5 px-4 transition-colors duration-300 w-full ${added
              ? "border-[#13382C] text-[#13382C]"
              : "border-neutral-300 text-neutral-700 hover:border-[#13382C] hover:text-[#13382C]"
            }`}
        >
          {label}
        </button>
      )}
    </>
  );
}
