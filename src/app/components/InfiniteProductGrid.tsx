"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { normalizeImageUrl } from "@/lib/imageUrl";
import type { ProductItem } from "@/lib/products";
import AddToCartButton from "./AddToCartButton";
import { loadMoreProducts } from "@/app/actions/products";

interface InfiniteProductGridProps {
  gender: string;
  initialProducts: ProductItem[];
  totalPages: number;
}

export default function InfiniteProductGrid({
  gender,
  initialProducts,
  totalPages,
}: InfiniteProductGridProps) {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(totalPages > 1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Sync state if initialProducts changes (e.g. on navigation)
  useEffect(() => {
    setProducts(initialProducts);
    setPage(1);
    setHasMore(totalPages > 1);
  }, [initialProducts, totalPages]);

  const loadNext = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const nextPage = page + 1;
      const res = await loadMoreProducts(gender, nextPage);

      setProducts((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const newUnique = res.products.filter((p) => !existingIds.has(p.id));
        return [...prev, ...newUnique];
      });

      setPage(nextPage);
      setHasMore(res.hasMore);
    } catch (error) {
      console.error("Failed to load more products:", error);
    } finally {
      setIsLoading(false);
    }
  }, [gender, page, hasMore, isLoading]);

  useEffect(() => {
    if (!hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadNext();
        }
      },
      {
        rootMargin: "300px", // Trigger 300px before reaching the bottom for smooth scroll
      }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [hasMore, isLoading, loadNext]);

  return (
    <div className="w-full">
      {/* Product cards grid */}
      <div className="flex flex-wrap justify-center gap-x-2 gap-y-8 md:gap-x-6 md:gap-y-20">
        {products.map((product, index) => {
          const image =
            product.imageUrls && product.imageUrls.length > 0
              ? normalizeImageUrl(product.imageUrls[0])
              : "/alora_BG2.png";
          const category = `${product.concentration} | ${product.brand} | ${product.sizeMl}ml`;
          const formattedPrice = `BDT ${product.price}`;

          return (
            <div
              key={product.id}
              id={`product-${product.id}`}
              className="group/card flex flex-col cursor-pointer h-full w-[calc(33.33%-6px)] sm:w-[calc(25%-6px)] md:w-[185px] relative"
            >
              {product.topNotes && product.topNotes.length > 0 && (
                <div className="absolute -top-5 left-0 right-0 z-10 flex justify-center opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 pointer-events-none px-2">
                  <span className="text-[8px] text-center text-black tracking-wide font-semibold px-1 uppercase">
                    {product.topNotes.join(" · ")}
                  </span>
                </div>
              )}
              <div className="group relative aspect-[4/5] bg-[#f8f8f8] flex items-center justify-center border border-transparent transition-all duration-500 hover:border-[#C28D10] hover:bg-[#f0fdf4] hover:shadow-[0_0_20px_rgba(194,141,16,0.1)] overflow-hidden">
                <div className="relative w-[80%] h-[80%]">
                  <Image
                    src={image}
                    alt={product.name}
                    fill
                    priority={index < 6}
                    unoptimized={image.includes("res.cloudinary.com")}
                    sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 185px"
                    className="object-contain transition-transform duration-700 ease-out group-hover/card:scale-110 drop-shadow-md"
                  />
                </div>

                {/* Desktop Hover Add to Cart */}
                <AddToCartButton
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={image}
                  category={category}
                  sizeMl={product.sizeMl}
                  concentration={product.concentration}
                  variant="desktop"
                />
              </div>

              {/* Details */}
              <div className="flex flex-col grow text-center px-0.5 md:px-1 mt-3 md:mt-5">
                <h3 className="text-[13px] md:text-[16px] leading-tight md:leading-snug font-space-grotesk font-bold tracking-[0.05em] uppercase mb-1 text-neutral-900 group-hover/card:text-[#C28D10] transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-[8px] md:text-[9px] text-neutral-500 mb-2 md:mb-3 font-light tracking-wide uppercase flex flex-wrap items-center justify-center gap-0.5 md:gap-1.5">
                  <span className="text-blue-500 font-medium">{product.concentration || ""}</span>
                  <span className="text-neutral-300">|</span>
                  <span className="text-red-600 font-normal text-[8px] md:text-[11px]">{product.brand || ""}</span>
                  <span className="text-neutral-300">|</span>
                  <span className="text-green-600 font-medium normal-case">{product.sizeMl}ml</span>
                </p>
                <p className="text-[10px] md:text-[12px] font-medium mt-auto text-black tracking-widest">
                  {formattedPrice}
                </p>
              </div>

              {/* Mobile Add to Cart */}
              <AddToCartButton
                id={product.id}
                name={product.name}
                price={product.price}
                image={image}
                category={category}
                sizeMl={product.sizeMl}
                concentration={product.concentration}
                variant="mobile"
              />
            </div>
          );
        })}
      </div>

      {/* Sentinel trigger element */}
      <div ref={sentinelRef} className="h-4 w-full" aria-hidden="true" />

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex items-center justify-center py-12 gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#C28D10] animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#C28D10] animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#C28D10] animate-bounce" />
        </div>
      )}

      {/* End of products banner */}
      {!hasMore && products.length > 0 && (
        <div className="text-center text-xs tracking-widest text-neutral-400 uppercase mt-16">
          You have viewed all {products.length} fragrances
        </div>
      )}
    </div>
  );
}

