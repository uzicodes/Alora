import Image from "next/image";
import prisma from "@/lib/prisma";
import { normalizeImageUrl } from "@/lib/imageUrl";
import AddToCartButton from "../components/AddToCartButton";

export const dynamic = "force-dynamic";


export default async function UnisexPage() {
  const products = await prisma.product.findMany({
    where: { gender: 'UNISEX' },
    orderBy: [{ brand: 'asc' }, { name: 'asc' }]
  });

  return (
    <div className="min-h-screen bg-white text-black pb-32 pt-16 font-sans">
      <div className="mx-auto w-full px-6 sm:px-10 md:px-16 lg:px-20">
        <header className="text-center" style={{ marginBottom: '50px', paddingTop: '60px' }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-space-grotesk font-bold uppercase tracking-[0.02em] mb-8 text-black">Unisex Collection</h1>
        </header>

        <div className="w-full">
          {/* Product cards grid */}
          <div
            className="flex flex-wrap justify-center gap-x-2 gap-y-8 md:gap-x-6 md:gap-y-20"
          >
            {products.map((product) => {
              const image =
                product.imageUrls && product.imageUrls.length > 0
                  ? normalizeImageUrl(product.imageUrls[0])
                  : "/alora_BG2.png";
              const category = `${product.concentration} | ${product.brand} | ${product.sizeMl}ml`;
              const formattedPrice = `BDT ${product.price}`;

              return (
                <div key={product.id} id={`product-${product.id}`} className="group/card flex flex-col cursor-pointer h-full w-[calc(33.33%-6px)] sm:w-[calc(25%-6px)] md:w-[185px] relative">
                  {product.topNotes && product.topNotes.length > 0 && (
                    <div className="absolute -top-5 left-0 right-0 z-10 flex justify-center opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 pointer-events-none px-2">
                      <span className="text-[8px] text-center text-black tracking-wide font-semibold px-1 uppercase">
                        {product.topNotes.join(' · ')}
                      </span>
                    </div>
                  )}
                  <div className="group relative aspect-[4/5] bg-[#f8f8f8] flex items-center justify-center border border-transparent transition-all duration-500 hover:border-[#C28D10] hover:bg-[#f0fdf4] hover:shadow-[0_0_20px_rgba(194,141,16,0.1)] overflow-hidden">
                    <div className="relative w-[80%] h-[80%]">
                      <Image
                        src={image}
                        alt={product.name}
                        fill
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
        </div>
        <div className="h-20 md:h-32 w-full"></div>
      </div>
    </div>
  );
}
