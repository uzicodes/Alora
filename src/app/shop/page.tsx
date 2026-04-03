import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import AddToCartButton from "../components/AddToCartButton";

export default async function ShopAllPage() {
  const products = await prisma.product.findMany();

  // Group products by brand
  const brandMap: Record<string, typeof products> = {};
  for (const product of products) {
    if (!brandMap[product.brand]) {
      brandMap[product.brand] = [];
    }
    brandMap[product.brand].push(product);
  }

  // Sort brands alphabetically A-Z
  const brandsData = Object.keys(brandMap)
    .sort((a, b) => a.localeCompare(b))
    .map((brand) => ({
      name: brand,
      products: brandMap[brand],
    }));

  return (
    <div className="min-h-screen bg-white text-black pb-32 pt-16 font-sans font-body">
      <div className="mx-auto w-full px-6 sm:px-10 md:px-16 lg:px-20">
        <header className="text-center" style={{ marginBottom: '50px' }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-david-libre uppercase tracking-[0.2em] mb-8 text-black">Our Collections</h1>
        </header>

        <div className="flex flex-col gap-[60px] md:gap-[80px] w-full">
          {brandsData.map((brand) => (
            <section key={brand.name} id={`brand-${brand.name.toLowerCase().replace(/ /g, "-").replace(/'/g, "")}`} className="brand-section w-full scroll-mt-32">
              <div className="mb-10 md:mb-12 flex items-center justify-center gap-6 md:gap-12 w-full">
                <hr className="w-20 md:w-40 border-t-2 border-neutral-600 shrink-0" />
                <h2 className="text-2xl md:text-3xl font-ubuntu uppercase tracking-[0.25em] text-[#C28D10] whitespace-nowrap text-center px-4">
                  {brand.name}
                </h2>
                <hr className="w-20 md:w-40 border-t-2 border-neutral-600 shrink-0" />
              </div>

              {/* Product cards grid */}
              <div
                className="grid gap-x-6 gap-y-[60px] md:gap-y-[80px]"
                style={{
                  gridTemplateColumns: 'repeat(auto-fit, 185px)',
                  justifyContent: 'center',
                }}
              >
                {brand.products.map((product) => {
                  const image = product.imageUrls.length > 0 ? product.imageUrls[0] : "/alora_BG2.png";
                  const category = `${product.concentration}, ${product.sizeMl}ml`;
                  const formattedPrice = `BDT ${product.price}`;
                  const gender = product.gender;

                  return (
                    <div key={product.id} className="group/card flex flex-col cursor-pointer h-full w-[185px]">
                      <div className="relative aspect-[4/5] bg-[#f8f8f8] flex items-center justify-center border border-transparent transition-all duration-500 hover:border-[#C28D10] hover:shadow-[0_0_20px_rgba(194,141,16,0.1)]">
                        <div className="relative w-[90%] h-[90%]">    {/* ratio in product card */}
                          <Image
                            src={image}
                            alt={product.name}
                            fill
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
                        />
                      </div>

                      {/* Details */}
                      <div className="flex flex-col flex-grow text-center px-1 mt-5">
                        <h3 className="text-[12px] md:text-[13px] font-ubuntu font-semibold tracking-[0.05em] uppercase mb-1 text-neutral-900 group-hover/card:text-[#C28D10] transition-colors duration-300">
                          {product.name}
                        </h3>
                        <p className="text-[9px] text-neutral-500 mb-3 font-light tracking-wide uppercase flex items-center justify-center gap-1.5">
                          <span>{product.concentration}</span>
                          <span className="text-neutral-300">|</span>
                          <span>{product.sizeMl}ml</span>
                          <span className="text-neutral-300">|</span>
                          <span>{gender}</span>
                        </p>
                        <p className="text-[12px] font-medium mt-auto text-black tracking-widest">
                          {formattedPrice}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
        <div className="h-20 md:h-32 w-full"></div>
      </div>
    </div>
  );
}