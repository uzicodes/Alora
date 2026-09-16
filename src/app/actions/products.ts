"use server";

import { getPaginatedProductsByGender, ProductItem } from "@/lib/products";

export interface LoadMoreResponse {
  products: ProductItem[];
  totalPages: number;
  hasMore: boolean;
}

/**
 * Server Action to load the next batch of products for infinite scrolling.
 */
export async function loadMoreProducts(
  gender: string,
  page: number,
  pageSize: number = 24
): Promise<LoadMoreResponse> {
  const result = await getPaginatedProductsByGender(gender, page, pageSize);

  return {
    products: result.products,
    totalPages: result.totalPages,
    hasMore: page < result.totalPages,
  };
}

