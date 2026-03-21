import Image from "next/image";

const menPerfumes = [
  // Dior
  { id: "m-1", name: "Sauvage", brand: "Dior", category: "Eau de Toilette, 100ml", price: 150, image: "/alora_BG2.png" },
  { id: "m-2", name: "Sauvage Elixir", brand: "Dior", category: "Elixir, 60ml", price: 210, image: "/alora_BG2.png" },
  { id: "m-3", name: "Homme Intense", brand: "Dior", category: "Eau de Parfum, 100ml", price: 165, image: "/alora_BG2.png" },
  { id: "m-4", name: "Sauvage Parfum", brand: "Dior", category: "Parfum, 100ml", price: 195, image: "/alora_BG2.png" },
  { id: "m-5", name: "Fahrenheit", brand: "Dior", category: "Eau de Toilette, 100ml", price: 130, image: "/alora_BG2.png" },
  { id: "m-6", name: "Eau Sauvage", brand: "Dior", category: "Eau de Toilette, 100ml", price: 120, image: "/alora_BG2.png" },
  // Chanel
  { id: "m-7", name: "Bleu de Chanel", brand: "Chanel", category: "Eau de Parfum, 100ml", price: 175, image: "/alora_BG2.png" },
  { id: "m-8", name: "Allure Homme Sport", brand: "Chanel", category: "Eau de Toilette, 100ml", price: 155, image: "/alora_BG2.png" },
  { id: "m-9", name: "Platinum Égoïste", brand: "Chanel", category: "Eau de Toilette, 100ml", price: 145, image: "/alora_BG2.png" },
  { id: "m-10", name: "Allure Homme", brand: "Chanel", category: "Eau de Toilette, 100ml", price: 140, image: "/alora_BG2.png" },
  { id: "m-11", name: "Bleu Parfum", brand: "Chanel", category: "Parfum, 100ml", price: 210, image: "/alora_BG2.png" },
  { id: "m-12", name: "Antaeus", brand: "Chanel", category: "Eau de Toilette, 100ml", price: 135, image: "/alora_BG2.png" },
  // Tom Ford
  { id: "m-13", name: "Ombré Leather", brand: "Tom Ford", category: "Eau de Parfum, 100ml", price: 285, image: "/alora_BG2.png" },
  { id: "m-14", name: "Noir Extreme", brand: "Tom Ford", category: "Eau de Parfum, 100ml", price: 260, image: "/alora_BG2.png" },
  { id: "m-15", name: "Tobacco Vanille", brand: "Tom Ford", category: "Eau de Parfum, 50ml", price: 310, image: "/alora_BG2.png" },
  { id: "m-16", name: "Tuscan Leather", brand: "Tom Ford", category: "Eau de Parfum, 50ml", price: 295, image: "/alora_BG2.png" },
  { id: "m-17", name: "Noir Anthracite", brand: "Tom Ford", category: "Eau de Parfum, 100ml", price: 250, image: "/alora_BG2.png" },
  { id: "m-18", name: "Beau de Jour", brand: "Tom Ford", category: "Eau de Parfum, 100ml", price: 270, image: "/alora_BG2.png" },
  // Creed
  { id: "m-19", name: "Aventus", brand: "Creed", category: "Eau de Parfum, 100ml", price: 445, image: "/alora_BG2.png" },
  { id: "m-20", name: "Green Irish Tweed", brand: "Creed", category: "Eau de Parfum, 100ml", price: 380, image: "/alora_BG2.png" },
  { id: "m-21", name: "Viking", brand: "Creed", category: "Eau de Parfum, 100ml", price: 395, image: "/alora_BG2.png" },
  { id: "m-22", name: "Silver Mountain", brand: "Creed", category: "Eau de Parfum, 100ml", price: 410, image: "/alora_BG2.png" },
  { id: "m-23", name: "Royal Oud", brand: "Creed", category: "Eau de Parfum, 75ml", price: 425, image: "/alora_BG2.png" },
  { id: "m-24", name: "Himalaya", brand: "Creed", category: "Eau de Parfum, 75ml", price: 370, image: "/alora_BG2.png" },
  // Versace
  { id: "m-25", name: "Eros", brand: "Versace", category: "Eau de Toilette, 100ml", price: 95, image: "/alora_BG2.png" },
  { id: "m-26", name: "Dylan Blue", brand: "Versace", category: "Eau de Toilette, 100ml", price: 90, image: "/alora_BG2.png" },
  { id: "m-27", name: "Pour Homme", brand: "Versace", category: "Eau de Toilette, 100ml", price: 80, image: "/alora_BG2.png" },
  { id: "m-28", name: "Eros Flame", brand: "Versace", category: "Eau de Parfum, 100ml", price: 105, image: "/alora_BG2.png" },
  { id: "m-29", name: "The Dreamer", brand: "Versace", category: "Eau de Toilette, 100ml", price: 65, image: "/alora_BG2.png" },
  { id: "m-30", name: "Man Eau Fraîche", brand: "Versace", category: "Eau de Toilette, 100ml", price: 75, image: "/alora_BG2.png" },
  // Paco Rabanne
  { id: "m-31", name: "1 Million", brand: "Paco Rabanne", category: "Eau de Toilette, 100ml", price: 95, image: "/alora_BG2.png" },
  { id: "m-32", name: "Invictus", brand: "Paco Rabanne", category: "Eau de Toilette, 100ml", price: 90, image: "/alora_BG2.png" },
  { id: "m-33", name: "Phantom", brand: "Paco Rabanne", category: "Eau de Toilette, 100ml", price: 105, image: "/alora_BG2.png" },
  { id: "m-34", name: "1 Million Parfum", brand: "Paco Rabanne", category: "Parfum, 100ml", price: 120, image: "/alora_BG2.png" },
  { id: "m-35", name: "Invictus Victory", brand: "Paco Rabanne", category: "Eau de Parfum, 100ml", price: 110, image: "/alora_BG2.png" },
  { id: "m-36", name: "1 Million Lucky", brand: "Paco Rabanne", category: "Eau de Toilette, 100ml", price: 85, image: "/alora_BG2.png" },
  // Giorgio Armani
  { id: "m-37", name: "Acqua di Giò", brand: "Giorgio Armani", category: "Eau de Parfum, 125ml", price: 140, image: "/alora_BG2.png" },
  { id: "m-38", name: "Armani Code", brand: "Giorgio Armani", category: "Eau de Toilette, 75ml", price: 110, image: "/alora_BG2.png" },
  { id: "m-39", name: "Stronger With You", brand: "Giorgio Armani", category: "Eau de Parfum, 100ml", price: 125, image: "/alora_BG2.png" },
  { id: "m-40", name: "Acqua di Giò Profumo", brand: "Giorgio Armani", category: "Parfum, 75ml", price: 160, image: "/alora_BG2.png" },
  { id: "m-41", name: "Code Absolu", brand: "Giorgio Armani", category: "Eau de Parfum, 60ml", price: 135, image: "/alora_BG2.png" },
  { id: "m-42", name: "Armani Privé Oud Royal", brand: "Giorgio Armani", category: "Eau de Parfum, 100ml", price: 290, image: "/alora_BG2.png" },
  // YSL
  { id: "m-43", name: "Y Le Parfum", brand: "YSL", category: "Eau de Parfum, 100ml", price: 145, image: "/alora_BG2.png" },
  { id: "m-44", name: "La Nuit de L'Homme", brand: "YSL", category: "Eau de Toilette, 100ml", price: 130, image: "/alora_BG2.png" },
  { id: "m-45", name: "L'Homme", brand: "YSL", category: "Eau de Toilette, 100ml", price: 120, image: "/alora_BG2.png" },
  { id: "m-46", name: "Y Eau de Toilette", brand: "YSL", category: "Eau de Toilette, 100ml", price: 110, image: "/alora_BG2.png" },
  { id: "m-47", name: "La Nuit Intense", brand: "YSL", category: "Eau de Parfum, 100ml", price: 155, image: "/alora_BG2.png" },
  { id: "m-48", name: "Kouros", brand: "YSL", category: "Eau de Toilette, 100ml", price: 95, image: "/alora_BG2.png" },
];



export default function MenPage() {
  return (
    <div className="min-h-screen bg-white text-black pb-32 pt-16 font-sans font-body">
      <div className="mx-auto w-full px-6 sm:px-10 md:px-16 lg:px-20">
        <header className="text-center" style={{ marginBottom: '50px' }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-david-libre uppercase tracking-[0.2em] mb-8 text-black underline underline-offset-[10px] decoration-[3px]">Men&apos;s Collection</h1>
        </header>


        <div className="w-full">
          {/* Product cards grid */}
          <div
            className="grid gap-x-6 gap-y-[60px] md:gap-y-[80px]"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, 185px)',
              justifyContent: 'center',
            }}
          >
            {menPerfumes.map((product) => (
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
                  <h3 className="text-[12px] md:text-[13px] font-ubuntu font-semibold tracking-[0.05em] uppercase mb-1 text-neutral-900 group-hover/card:text-[#C28D10] transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-[9px] text-neutral-500 mb-1 font-ubuntu font-light tracking-wide uppercase">
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
        </div>
        <div className="h-20 md:h-32 w-full"></div>
      </div>
    </div>
  );
}
