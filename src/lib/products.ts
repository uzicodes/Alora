import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";

export interface ProductItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  sizeMl: number;
  concentration: string;
  gender: string;
  imageUrls: string[];
  topNotes: string[];
}

export interface PaginatedProductsResult {
  products: ProductItem[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

/**
 * Cached, paginated data access function for category collections.
 * Uses Next.js unstable_cache tagged with 'products' and category-specific tags.
 */
export async function getPaginatedProductsByGender(
  gender: string,
  page: number = 1,
  pageSize: number = 24
): Promise<PaginatedProductsResult> {
  const normalizedGender = gender.toUpperCase();
  const safePage = Math.max(1, page);
  const safePageSize = Math.max(1, Math.min(pageSize, 100));

  const fetchProducts = unstable_cache(
    async (targetGender: string, p: number, limit: number) => {
      const skip = (p - 1) * limit;

      const [products, totalCount] = await Promise.all([
        prisma.product.findMany({
          where: { gender: targetGender },
          orderBy: [{ brand: "asc" }, { name: "asc" }],
          skip,
          take: limit,
          select: {
            id: true,
            name: true,
            brand: true,
            price: true,
            sizeMl: true,
            concentration: true,
            gender: true,
            imageUrls: true,
            topNotes: true,
          },
        }),
        prisma.product.count({
          where: { gender: targetGender },
        }),
      ]);

      return {
        products,
        totalCount,
        totalPages: Math.ceil(totalCount / limit) || 1,
        currentPage: p,
        pageSize: limit,
      };
    },
    [`products-${normalizedGender.toLowerCase()}-page-${safePage}-limit-${safePageSize}`],
    {
      tags: ["products", `products-${normalizedGender.toLowerCase()}`],
      revalidate: 60,
    }
  );

  return fetchProducts(normalizedGender, safePage, safePageSize);
}

