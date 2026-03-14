import Image from "next/image";
import Link from "next/link";

const brandNames = [
  "Afnan", "Armaf", "Burberry", "Calvin Klein", "Chanel", "Creed",
  "Davidoff", "Dior", "Dolce & Gabbana", "Giorgio Armani", "Gucci",
  "Hugo Boss", "Jean Paul", "Lattafa", "Louis Vuitton", "Mancera",
  "Paco Rabanne", "Prada", "Ralph Lauren", "Rassasi", "Rayhaan",
  "Tom Ford", "Valentino", "Versace", "Victoria's Secret", "Xerjoff",
  "YSL", "Zara"
].sort((a, b) => a.localeCompare(b));

const brandsData = brandNames.map((brand, index) => {
  const isPremium = ["Chanel", "Creed", "Dior", "Louis Vuitton", "Mancera", "Tom Ford", "Xerjoff", "YSL", "Gucci", "Giorgio Armani", "Prada"].includes(brand);
  const basePrice = isPremium ? 220 : 65;

  return {
    name: brand,
    // Reduced to exactly 5 products to match the perfect center grid layout
    products: [
      { id: `br-${index}-1`, name: `${brand} Signature`, category: "Eau de Parfum, 100ml", price: basePrice + 45, image: "/alora_BG2.png" },
      { id: `br-${index}-2`, name: `${brand} Noir Absolu`, category: "Parfum, 50ml", price: basePrice + 95, image: "/alora_BG2.png" },
      { id: `br-${index}-3`, name: `${brand} Aqua Fresh`, category: "Eau de Toilette, 100ml", price: basePrice - 15, image: "/alora_BG2.png" },
      { id: `br-${index}-4`, name: `${brand} Oud Royale`, category: "Extrait de Parfum, 50ml", price: basePrice + 120, image: "/alora_BG2.png" },
      { id: `br-${index}-5`, name: `${brand} Rose Élixir`, category: "Eau de Parfum, 75ml", price: basePrice + 10, image: "/alora_BG2.png" },
      { id: `br-${index}-6`, name: `${brand} Velvet Gold`, category: "Eau de Parfum, 100ml", price: basePrice + 60, image: "/alora_BG2.png" },
    ]
  };
});

export default function ShopAllPage() {
  return (
    <div className="min-h-screen bg-white text-black pb-32 pt-64 px-6 sm:px-12 font-sans font-body">
      <div className="max-w-screen-xl mx-auto w-full flex flex-col items-center">
        <header className="mb-28 text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif uppercase tracking-[0.2em] mb-8 text-black">Our Collections</h1>
        </header>

        <div className="flex flex-col gap-[120px] md:gap-[160px] w-full">
          {brandsData.map((brand) => (
            <section key={brand.name} className="brand-section w-full flex flex-col items-center">
              <div className="mb-16 md:mb-20 flex items-center justify-center gap-6 md:gap-12 w-full group">
                <div className="h-[1px] bg-neutral-100 flex-grow"></div>
                <h2 className="text-2xl md:text-3xl font-serif uppercase tracking-[0.25em] text-[#C28D10] whitespace-nowrap text-center px-4">
                  {brand.name}
                </h2>
                <div className="h-[1px] bg-neutral-100 flex-grow"></div>
              </div>

              {/* Centered Grid block with fixed internal spacing */}
              <div className="w-full flex justify-center">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-[60px] md:gap-y-[80px] max-w-fit mx-auto relative">
                  {brand.products.map((product) => (
                    <div key={product.id} className="group/card flex flex-col cursor-pointer h-full w-[185px]">
                      <div className="relative aspect-[4/5] bg-[#f8f8f8] flex items-center justify-center border border-transparent transition-all duration-500 hover:border-[#C28D10] hover:shadow-[0_0_20px_rgba(194,141,16,0.1)]">
                        <div className="relative w-[50%] h-[50%]">
                          <Image
                            src={product.image}
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
                        <h3 className="text-[12px] md:text-[13px] font-serif tracking-[0.05em] uppercase mb-1 text-neutral-900 group-hover/card:text-[#C28D10] transition-colors duration-300">
                          {product.name}
                        </h3>
                        <p className="text-[9px] text-neutral-500 mb-3 font-light tracking-wide uppercase">
                          {product.category}
                        </p>
                        <p className="text-[12px] font-medium mt-auto text-black tracking-widest">
                          ${product.price}
                        </p>
                      </div>

                      {/* Mobile/Tablet always visible minimal button */}
                      <button className="lg:hidden mt-5 border border-neutral-300 text-neutral-700 uppercase text-[9px] font-bold tracking-[0.1em] py-2.5 px-4 hover:border-[#13382C] hover:text-[#13382C] transition-colors duration-300">
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}