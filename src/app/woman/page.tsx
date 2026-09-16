import { getPaginatedProductsByGender } from "@/lib/products";
import InfiniteProductGrid from "../components/InfiniteProductGrid";

export const revalidate = 60;

export default async function WomanPage() {
  const { products, totalPages } = await getPaginatedProductsByGender("WOMEN", 1, 24);

  return (
    <div className="min-h-screen bg-white text-black pb-32 pt-16 font-body">
      <div className="mx-auto w-full px-6 sm:px-10 md:px-16 lg:px-20">
        <header className="text-center" style={{ marginBottom: "50px", paddingTop: "60px" }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-space-grotesk font-bold uppercase tracking-[0.02em] mb-8 text-black">
            Women&apos;s Collection
          </h1>
        </header>

        <InfiniteProductGrid
          gender="WOMEN"
          initialProducts={products}
          totalPages={totalPages}
        />

        <div className="h-20 md:h-32 w-full"></div>
      </div>
    </div>
  );
}
