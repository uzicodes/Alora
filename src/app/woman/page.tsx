import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

export default async function WomanPage() {
  const products = await prisma.product.findMany({
    where: { gender: 'WOMAN' },
  });

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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-david-libre uppercase tracking-[0.2em] mb-8 text-black underline underline-offset-[10px] decoration-[3px]">Women&apos;s Collection</h1>
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
                  const image = product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : "/alora_BG2.png";
                  const category = `${product.concentration}, ${product.sizeMl}ml`;
                  const formattedPrice = `BDT ${product.price}`;

                  return (
                    <div key={product.id} className="group/card flex flex-col cursor-pointer h-full w-[185px]">
                      <div className="relative aspect-[4/5] bg-[#f8f8f8] flex items-center justify-center border border-transparent transition-all duration-500 hover:border-[#C28D10] hover:shadow-[0_0_20px_rgba(194,141,16,0.1)]">
                        <div className="relative w-[90%] h-[90%]">
                          <Image
                            src={image}
                            alt={product.name}
                            fill
                            className="object-contain transition-transform duration-700 ease-out group-hover/card:scale-110 drop-shadow-md"
                          />
                        </div>

                        {/* Desktop Hover Add to Cart */}
                        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transform translate-y-2 transition-all duration-300 ease-in-out group-hover/card:opacity-100 group-hover/card:translate-y-0 hidden lg:flex justify-center z-10">
                          <button className="bg-[#C28D10] text-white uppercase text-[9px] font-bold tracking-[0.1em] py-2.5 px-4 w-full hover:bg-[#13382C] transition-colors duration-300">
                            Add to Cart
                          </button>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex flex-col flex-grow text-center px-1 mt-5">
                        <h3 className="text-[12px] md:text-[13px] font-ubuntu font-semibold tracking-[0.05em] uppercase mb-1 text-neutral-900 group-hover/card:text-[#C28D10] transition-colors duration-300">
                          {product.name}
                        </h3>
                        <p className="text-[9px] text-neutral-500 mb-3 font-light tracking-wide uppercase">
                          {category}
                        </p>
                        <p className="text-[12px] font-medium mt-auto text-black tracking-widest">
                          {formattedPrice}
                        </p>
                      </div>

                      {/* Mobile/Tablet always visible minimal button */}
                      <button className="lg:hidden mt-5 border border-neutral-300 text-neutral-700 uppercase text-[9px] font-bold tracking-[0.1em] py-2.5 px-4 hover:border-[#13382C] hover:text-[#13382C] transition-colors duration-300">
                        Add to Cart
                      </button>
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
