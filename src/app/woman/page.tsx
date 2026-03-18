import Image from "next/image";

const womenPerfumes = [
  // Chanel
  { id: "w-1", name: "N°5", brand: "Chanel", category: "Eau de Parfum, 100ml", price: 185, image: "/alora_BG2.png" },
  { id: "w-2", name: "Coco Mademoiselle", brand: "Chanel", category: "Eau de Parfum, 100ml", price: 170, image: "/alora_BG2.png" },
  { id: "w-3", name: "Chance Eau Tendre", brand: "Chanel", category: "Eau de Toilette, 100ml", price: 155, image: "/alora_BG2.png" },
  { id: "w-4", name: "Gabrielle", brand: "Chanel", category: "Eau de Parfum, 100ml", price: 165, image: "/alora_BG2.png" },
  { id: "w-5", name: "N°5 L'Eau", brand: "Chanel", category: "Eau de Toilette, 100ml", price: 150, image: "/alora_BG2.png" },
  { id: "w-6", name: "Chance Eau Fraîche", brand: "Chanel", category: "Eau de Toilette, 100ml", price: 145, image: "/alora_BG2.png" },
  // Dior
  { id: "w-7", name: "Miss Dior", brand: "Dior", category: "Eau de Parfum, 100ml", price: 160, image: "/alora_BG2.png" },
  { id: "w-8", name: "J'adore", brand: "Dior", category: "Eau de Parfum, 100ml", price: 175, image: "/alora_BG2.png" },
  { id: "w-9", name: "Joy", brand: "Dior", category: "Eau de Parfum, 90ml", price: 155, image: "/alora_BG2.png" },
  { id: "w-10", name: "Miss Dior Blooming", brand: "Dior", category: "Eau de Toilette, 100ml", price: 140, image: "/alora_BG2.png" },
  { id: "w-11", name: "J'adore Infinissime", brand: "Dior", category: "Eau de Parfum, 100ml", price: 195, image: "/alora_BG2.png" },
  { id: "w-12", name: "Dior Addict", brand: "Dior", category: "Eau de Parfum, 100ml", price: 150, image: "/alora_BG2.png" },
  // YSL
  { id: "w-13", name: "Black Opium", brand: "YSL", category: "Eau de Parfum, 90ml", price: 140, image: "/alora_BG2.png" },
  { id: "w-14", name: "Libre", brand: "YSL", category: "Eau de Parfum, 90ml", price: 145, image: "/alora_BG2.png" },
  { id: "w-15", name: "Mon Paris", brand: "YSL", category: "Eau de Parfum, 90ml", price: 130, image: "/alora_BG2.png" },
  { id: "w-16", name: "Black Opium Intense", brand: "YSL", category: "Eau de Parfum, 90ml", price: 155, image: "/alora_BG2.png" },
  { id: "w-17", name: "Libre Intense", brand: "YSL", category: "Eau de Parfum, 90ml", price: 160, image: "/alora_BG2.png" },
  { id: "w-18", name: "Manifesto", brand: "YSL", category: "Eau de Parfum, 90ml", price: 120, image: "/alora_BG2.png" },
  // Tom Ford
  { id: "w-19", name: "Black Orchid", brand: "Tom Ford", category: "Eau de Parfum, 100ml", price: 280, image: "/alora_BG2.png" },
  { id: "w-20", name: "Velvet Orchid", brand: "Tom Ford", category: "Eau de Parfum, 100ml", price: 265, image: "/alora_BG2.png" },
  { id: "w-21", name: "Lost Cherry", brand: "Tom Ford", category: "Eau de Parfum, 50ml", price: 350, image: "/alora_BG2.png" },
  { id: "w-22", name: "Jasmin Rouge", brand: "Tom Ford", category: "Eau de Parfum, 50ml", price: 295, image: "/alora_BG2.png" },
  { id: "w-23", name: "Rose Prick", brand: "Tom Ford", category: "Eau de Parfum, 50ml", price: 320, image: "/alora_BG2.png" },
  { id: "w-24", name: "Soleil Blanc", brand: "Tom Ford", category: "Eau de Parfum, 50ml", price: 275, image: "/alora_BG2.png" },
  // Gucci
  { id: "w-25", name: "Bloom", brand: "Gucci", category: "Eau de Parfum, 100ml", price: 140, image: "/alora_BG2.png" },
  { id: "w-26", name: "Flora Gorgeous", brand: "Gucci", category: "Eau de Parfum, 100ml", price: 135, image: "/alora_BG2.png" },
  { id: "w-27", name: "Guilty Pour Femme", brand: "Gucci", category: "Eau de Parfum, 90ml", price: 130, image: "/alora_BG2.png" },
  { id: "w-28", name: "Bloom Ambrosia", brand: "Gucci", category: "Eau de Parfum, 100ml", price: 155, image: "/alora_BG2.png" },
  { id: "w-29", name: "Mémoire d'une Odeur", brand: "Gucci", category: "Eau de Parfum, 100ml", price: 110, image: "/alora_BG2.png" },
  { id: "w-30", name: "Flora Gardenia", brand: "Gucci", category: "Eau de Toilette, 100ml", price: 120, image: "/alora_BG2.png" },
  // Lancôme
  { id: "w-31", name: "La Vie Est Belle", brand: "Lancôme", category: "Eau de Parfum, 100ml", price: 145, image: "/alora_BG2.png" },
  { id: "w-32", name: "Idôle", brand: "Lancôme", category: "Eau de Parfum, 75ml", price: 130, image: "/alora_BG2.png" },
  { id: "w-33", name: "Trésor", brand: "Lancôme", category: "Eau de Parfum, 100ml", price: 120, image: "/alora_BG2.png" },
  { id: "w-34", name: "La Nuit Trésor", brand: "Lancôme", category: "Eau de Parfum, 100ml", price: 140, image: "/alora_BG2.png" },
  { id: "w-35", name: "Miracle", brand: "Lancôme", category: "Eau de Parfum, 100ml", price: 105, image: "/alora_BG2.png" },
  { id: "w-36", name: "Idôle Intense", brand: "Lancôme", category: "Eau de Parfum, 75ml", price: 150, image: "/alora_BG2.png" },
  // Versace
  { id: "w-37", name: "Bright Crystal", brand: "Versace", category: "Eau de Toilette, 90ml", price: 85, image: "/alora_BG2.png" },
  { id: "w-38", name: "Crystal Noir", brand: "Versace", category: "Eau de Toilette, 90ml", price: 90, image: "/alora_BG2.png" },
  { id: "w-39", name: "Yellow Diamond", brand: "Versace", category: "Eau de Toilette, 90ml", price: 80, image: "/alora_BG2.png" },
  { id: "w-40", name: "Bright Crystal Absolu", brand: "Versace", category: "Eau de Parfum, 90ml", price: 105, image: "/alora_BG2.png" },
  { id: "w-41", name: "Pour Femme Dylan Blue", brand: "Versace", category: "Eau de Parfum, 100ml", price: 95, image: "/alora_BG2.png" },
  { id: "w-42", name: "Eros Pour Femme", brand: "Versace", category: "Eau de Parfum, 100ml", price: 100, image: "/alora_BG2.png" },
  // Victoria's Secret
  { id: "w-43", name: "Bombshell", brand: "Victoria's Secret", category: "Eau de Parfum, 100ml", price: 75, image: "/alora_BG2.png" },
  { id: "w-44", name: "Tease", brand: "Victoria's Secret", category: "Eau de Parfum, 100ml", price: 70, image: "/alora_BG2.png" },
  { id: "w-45", name: "Very Sexy", brand: "Victoria's Secret", category: "Eau de Parfum, 100ml", price: 72, image: "/alora_BG2.png" },
  { id: "w-46", name: "Bombshell Intense", brand: "Victoria's Secret", category: "Eau de Parfum, 100ml", price: 85, image: "/alora_BG2.png" },
  { id: "w-47", name: "Love", brand: "Victoria's Secret", category: "Eau de Parfum, 100ml", price: 68, image: "/alora_BG2.png" },
  { id: "w-48", name: "Heavenly", brand: "Victoria's Secret", category: "Eau de Parfum, 100ml", price: 65, image: "/alora_BG2.png" },
];

// Group perfumes by brand
const brandGroups = womenPerfumes.reduce((groups, perfume) => {
  if (!groups[perfume.brand]) groups[perfume.brand] = [];
  groups[perfume.brand].push(perfume);
  return groups;
}, {} as Record<string, typeof womenPerfumes>);

export default function WomanPage() {
  return (
    <div className="min-h-screen bg-white text-black pb-32 pt-64 font-sans font-body">
      <div className="mx-auto w-full px-6 sm:px-10 md:px-16 lg:px-20">
        <header className="mb-28 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif uppercase tracking-[0.2em] mb-8 text-black">Women&apos;s Collection</h1>
        </header>

        <div className="flex flex-col gap-[60px] md:gap-[80px] w-full">
          {Object.entries(brandGroups).map(([brand, products]) => (
            <section key={brand} className="brand-section w-full">
              <div className="mb-10 md:mb-12 flex items-center justify-center gap-6 md:gap-12 w-full">
                <div className="h-[1px] bg-neutral-200 flex-grow"></div>
                <h2 className="text-2xl md:text-3xl font-serif uppercase tracking-[0.25em] text-[#C28D10] whitespace-nowrap text-center px-4">
                  {brand}
                </h2>
                <div className="h-[1px] bg-neutral-200 flex-grow"></div>
              </div>

              {/* Product cards grid */}
              <div
                className="grid gap-x-6 gap-y-[60px] md:gap-y-[80px]"
                style={{
                  gridTemplateColumns: 'repeat(auto-fit, 185px)',
                  justifyContent: 'center',
                }}
              >
                {products.map((product) => (
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
                      <p className="text-[9px] text-neutral-500 mb-1 font-light tracking-wide uppercase">
                        {product.brand}
                      </p>
                      <p className="text-[9px] text-neutral-400 mb-3 font-light tracking-wide uppercase">
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
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
