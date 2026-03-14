import Image from "next/image";
import Link from "next/link";

const brandsData = [
  {
    name: "Tom Ford",
    products: [
      { id: "tf1", name: "Oud Wood", category: "Eau de Parfum, 50ml", price: 295, image: "/alora_BG.png" },
      { id: "tf2", name: "Tobacco Vanille", category: "Eau de Parfum, 50ml", price: 295, image: "/alora_BG2.png" },
      { id: "tf3", name: "Lost Cherry", category: "Eau de Parfum, 50ml", price: 395, image: "/alora_BG.png" },
      { id: "tf4", name: "Tuscan Leather", category: "Eau de Parfum, 50ml", price: 295, image: "/alora_BG2.png" },
      { id: "tf5", name: "Neroli Portofino", category: "Eau de Parfum, 50ml", price: 295, image: "/alora_BG.png" },
    ]
  },
  {
    name: "Creed",
    products: [
      { id: "cr1", name: "Aventus", category: "Eau de Parfum, 100ml", price: 495, image: "/alora_BG2.png" },
      { id: "cr2", name: "Green Irish Tweed", category: "Eau de Parfum, 100ml", price: 470, image: "/alora_BG.png" },
      { id: "cr3", name: "Silver Mountain Water", category: "Eau de Parfum, 100ml", price: 470, image: "/alora_BG2.png" },
      { id: "cr4", name: "Millesime Imperial", category: "Eau de Parfum, 100ml", price: 470, image: "/alora_BG.png" },
      { id: "cr5", name: "Virgin Island Water", category: "Eau de Parfum, 100ml", price: 470, image: "/alora_BG2.png" },
    ]
  },
  {
    name: "Maison Francis Kurkdjian",
    products: [
      { id: "mfk1", name: "Baccarat Rouge 540", category: "Eau de Parfum, 70ml", price: 325, image: "/alora_BG.png" },
      { id: "mfk2", name: "Grand Soir", category: "Eau de Parfum, 70ml", price: 235, image: "/alora_BG2.png" },
      { id: "mfk3", name: "Oud Satin Mood", category: "Eau de Parfum, 70ml", price: 300, image: "/alora_BG.png" },
      { id: "mfk4", name: "Aqua Universalis", category: "Eau de Toilette, 70ml", price: 235, image: "/alora_BG2.png" },
      { id: "mfk5", name: "L'Homme À la rose", category: "Eau de Parfum, 70ml", price: 275, image: "/alora_BG.png" },
    ]
  },
  {
    name: "Byredo",
    products: [
      { id: "by1", name: "Gypsy Water", category: "Eau de Parfum, 50ml", price: 225, image: "/alora_BG2.png" },
      { id: "by2", name: "Bal d'Afrique", category: "Eau de Parfum, 50ml", price: 225, image: "/alora_BG.png" },
      { id: "by3", name: "Mojave Ghost", category: "Eau de Parfum, 50ml", price: 225, image: "/alora_BG2.png" },
      { id: "by4", name: "Super Cedar", category: "Eau de Parfum, 50ml", price: 225, image: "/alora_BG.png" },
      { id: "by5", name: "Rose of No Man's Land", category: "Eau de Parfum, 50ml", price: 225, image: "/alora_BG2.png" },
    ]
  },
  {
    name: "Le Labo",
    products: [
      { id: "ll1", name: "Santal 33", category: "Eau de Parfum, 50ml", price: 230, image: "/alora_BG.png" },
      { id: "ll2", name: "Another 13", category: "Eau de Parfum, 50ml", price: 230, image: "/alora_BG2.png" },
      { id: "ll3", name: "Bergamote 22", category: "Eau de Parfum, 50ml", price: 230, image: "/alora_BG.png" },
      { id: "ll4", name: "Rose 31", category: "Eau de Parfum, 50ml", price: 230, image: "/alora_BG2.png" },
      { id: "ll5", name: "The Noir 29", category: "Eau de Parfum, 50ml", price: 230, image: "/alora_BG.png" },
    ]
  }
];

export default function ShopAllPage() {
  return (
    <div className="min-h-screen bg-black text-white pb-32 pt-40 px-6 sm:px-10 lg:px-16 font-sans font-body">
      <div className="max-w-screen-2xl mx-auto">
        <header className="mb-24 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif uppercase tracking-[0.2em] mb-8 text-white">Our Collections</h1>
          <div className="w-16 h-[2px] bg-[#C28D10] mx-auto"></div>
        </header>

        <div className="flex flex-col gap-[120px] md:gap-[160px]">
          {brandsData.map((brand) => (
            <section key={brand.name} className="brand-section">
              <div className="mb-16 md:mb-20 flex items-center gap-6 md:gap-8">
                <h2 className="text-2xl md:text-3xl font-serif uppercase tracking-[0.15em] text-[#C28D10]">
                  {brand.name}
                </h2>
                <div className="h-[1px] bg-neutral-800 flex-grow relative"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-[60px] md:gap-y-[80px] z-10 relative">
                {brand.products.map((product) => (
                  <div key={product.id} className="group flex flex-col cursor-pointer h-full">
                    <div className="relative aspect-[4/5] bg-[#0a0a0a] flex items-center justify-center border border-neutral-800/80 transition-all duration-500 hover:border-[#C28D10] hover:shadow-[0_0_20px_rgba(194,141,16,0.1)]">
                      {/* Inner wrapper to restrict image size */}
                      <div className="relative w-2/3 h-2/3 max-w-[180px]">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain transition-transform duration-700 ease-out group-hover:scale-110 drop-shadow-2xl"
                        />
                      </div>
                      
                      {/* Desktop Hover Add to Cart */}
                      <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transform translate-y-2 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 hidden lg:flex justify-center z-10">
                        <button className="bg-[#C28D10] text-black uppercase text-xs font-bold tracking-[0.15em] py-3 px-6 w-full hover:bg-white transition-colors duration-300">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                    
                    {/* Details */}
                    <div className="flex flex-col flex-grow text-center lg:text-left px-1 mt-6">
                      <h3 className="text-sm md:text-[15px] font-serif tracking-[0.1em] uppercase mb-2 text-neutral-100 group-hover:text-[#C28D10] transition-colors duration-300">
                        {product.name}
                      </h3>
                      <p className="text-xs text-neutral-400 mb-4 font-light tracking-wide uppercase">
                        {product.category}
                      </p>
                      <p className="text-sm font-medium mt-auto text-white tracking-widest">
                        ${product.price}
                      </p>
                    </div>
                    
                    {/* Mobile/Tablet always visible minimal button */}
                    <button className="lg:hidden mt-6 border border-neutral-800 text-neutral-300 uppercase text-xs font-bold tracking-[0.1em] py-3 px-4 hover:border-[#C28D10] hover:text-[#C28D10] transition-colors duration-300">
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
