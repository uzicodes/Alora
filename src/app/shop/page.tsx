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

  // Sort brands alphabetically
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-david-libre uppercase tracking-[0.2em] mb-8 text-black">Brands Collections</h1>
        </header>

        <div className="flex flex-col gap-[60px] md:gap-[80px] w-full">
          {brandsData.map((brand) => (
            <section key={brand.name} id={`brand-${brand.name.toLowerCase().replace(/ /g, "-").replace(/'/g, "")}`} className="brand-section w-full scroll-mt-32">
              {/* Product cards grid */}
              <div
                className="grid gap-x-6 gap-y-8"
                style={{
                  gridTemplateColumns: 'repeat(auto-fit, 185px)',
                  justifyContent: 'center',
                }}
              >
                {/* Brand Header */}
                <div className="col-span-full mb-1 flex items-center justify-center gap-4 md:gap-8">
                  <hr className="flex-1 border-t-2 border-neutral-600" />
                  <h2 className="text-2xl md:text-3xl font-ubuntu uppercase tracking-[0.25em] text-[#C28D10] whitespace-nowrap text-center px-2">
                    {brand.name}
                  </h2>
                  <hr className="flex-1 border-t-2 border-neutral-600" />
                </div>

                {brand.products.map((product) => {
                  const image = product.imageUrls.length > 0 ? product.imageUrls[0] : "/alora_BG2.png";
                  const category = `${product.concentration} | ${product.gender} | ${product.sizeMl}ml`;
                  const formattedPrice = `BDT ${product.price}`;

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
                          variant="desktop"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex flex-col flex-grow text-center px-1 mt-5">
                        <h3 className="text-[13px] md:text-[14px] font-ubuntu font-semibold tracking-[0.05em] uppercase mb-1 text-neutral-900 group-hover/card:text-[#C28D10] transition-colors duration-300">
                          {product.name}
                        </h3>
                        <p className="text-[9px] text-neutral-500 mb-3 font-light tracking-wide uppercase flex flex-wrap items-center justify-center gap-1.5">
                          <span className="text-blue-500 font-medium">{product.concentration || ""}</span>
                          <span className="text-neutral-300">|</span>
                          <span className="text-red-600 font-medium">{product.gender || ""}</span>
                          <span className="text-neutral-300">|</span>
                          <span className="text-green-600 font-medium normal-case">{product.sizeMl}ml</span>
                        </p>
                        <p className="text-[12px] font-medium mt-auto text-black tracking-widest">
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
                        variant="mobile"
                      />
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