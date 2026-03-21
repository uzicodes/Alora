import Image from "next/image";

const unisexPerfumes = [
  // Tom Ford
  { id: "u-1", name: "Tobacco Vanille", brand: "Tom Ford", category: "Eau de Parfum, 50ml", price: 310, image: "/alora_BG2.png" },
  { id: "u-2", name: "Oud Wood", brand: "Tom Ford", category: "Eau de Parfum, 50ml", price: 295, image: "/alora_BG2.png" },
  { id: "u-3", name: "Lost Cherry", brand: "Tom Ford", category: "Eau de Parfum, 50ml", price: 350, image: "/alora_BG2.png" },
  { id: "u-4", name: "Bitter Peach", brand: "Tom Ford", category: "Eau de Parfum, 50ml", price: 350, image: "/alora_BG2.png" },
  { id: "u-5", name: "Neroli Portofino", brand: "Tom Ford", category: "Eau de Parfum, 50ml", price: 285, image: "/alora_BG2.png" },
  { id: "u-6", name: "Ombré Leather", brand: "Tom Ford", category: "Eau de Parfum, 100ml", price: 285, image: "/alora_BG2.png" },
  // Maison Francis Kurkdjian
  { id: "u-7", name: "Baccarat Rouge 540", brand: "Maison Francis Kurkdjian", category: "Eau de Parfum, 70ml", price: 325, image: "/alora_BG2.png" },
  { id: "u-8", name: "Oud Satin Mood", brand: "Maison Francis Kurkdjian", category: "Eau de Parfum, 70ml", price: 300, image: "/alora_BG2.png" },
  { id: "u-9", name: "Grand Soir", brand: "Maison Francis Kurkdjian", category: "Eau de Parfum, 70ml", price: 235, image: "/alora_BG2.png" },
  { id: "u-10", name: "Aqua Universalis", brand: "Maison Francis Kurkdjian", category: "Eau de Toilette, 70ml", price: 215, image: "/alora_BG2.png" },
  { id: "u-11", name: "Gentle Fluidity Silver", brand: "Maison Francis Kurkdjian", category: "Eau de Parfum, 70ml", price: 235, image: "/alora_BG2.png" },
  { id: "u-12", name: "Gentle Fluidity Gold", brand: "Maison Francis Kurkdjian", category: "Eau de Parfum, 70ml", price: 235, image: "/alora_BG2.png" },
  // Le Labo
  { id: "u-13", name: "Santal 33", brand: "Le Labo", category: "Eau de Parfum, 100ml", price: 320, image: "/alora_BG2.png" },
  { id: "u-14", name: "Another 13", brand: "Le Labo", category: "Eau de Parfum, 100ml", price: 320, image: "/alora_BG2.png" },
  { id: "u-15", name: "Thé Noir 29", brand: "Le Labo", category: "Eau de Parfum, 100ml", price: 320, image: "/alora_BG2.png" },
  { id: "u-16", name: "Bergamote 22", brand: "Le Labo", category: "Eau de Parfum, 100ml", price: 320, image: "/alora_BG2.png" },
  { id: "u-17", name: "Rose 31", brand: "Le Labo", category: "Eau de Parfum, 100ml", price: 320, image: "/alora_BG2.png" },
  { id: "u-18", name: "Baie 19", brand: "Le Labo", category: "Eau de Parfum, 100ml", price: 320, image: "/alora_BG2.png" },
  // Byredo
  { id: "u-19", name: "Gypsy Water", brand: "Byredo", category: "Eau de Parfum, 100ml", price: 290, image: "/alora_BG2.png" },
  { id: "u-20", name: "Mojave Ghost", brand: "Byredo", category: "Eau de Parfum, 100ml", price: 290, image: "/alora_BG2.png" },
  { id: "u-21", name: "Bal d'Afrique", brand: "Byredo", category: "Eau de Parfum, 100ml", price: 290, image: "/alora_BG2.png" },
  { id: "u-22", name: "Super Cedar", brand: "Byredo", category: "Eau de Parfum, 100ml", price: 290, image: "/alora_BG2.png" },
  { id: "u-23", name: "Bibliothèque", brand: "Byredo", category: "Eau de Parfum, 100ml", price: 290, image: "/alora_BG2.png" },
  { id: "u-24", name: "Eleventh Hour", brand: "Byredo", category: "Eau de Parfum, 100ml", price: 290, image: "/alora_BG2.png" },
  // Jo Malone
  { id: "u-25", name: "Wood Sage & Sea Salt", brand: "Jo Malone", category: "Cologne, 100ml", price: 165, image: "/alora_BG2.png" },
  { id: "u-26", name: "Myrrh & Tonka", brand: "Jo Malone", category: "Cologne Intense, 100ml", price: 220, image: "/alora_BG2.png" },
  { id: "u-27", name: "Oud & Bergamot", brand: "Jo Malone", category: "Cologne Intense, 100ml", price: 220, image: "/alora_BG2.png" },
  { id: "u-28", name: "Blackberry & Bay", brand: "Jo Malone", category: "Cologne, 100ml", price: 165, image: "/alora_BG2.png" },
  { id: "u-29", name: "Pomegranate Noir", brand: "Jo Malone", category: "Cologne, 100ml", price: 165, image: "/alora_BG2.png" },
  { id: "u-30", name: "Dark Amber & Ginger Lily", brand: "Jo Malone", category: "Cologne Intense, 100ml", price: 220, image: "/alora_BG2.png" },
  // Creed
  { id: "u-31", name: "Silver Mountain Water", brand: "Creed", category: "Eau de Parfum, 100ml", price: 410, image: "/alora_BG2.png" },
  { id: "u-32", name: "Virgin Island Water", brand: "Creed", category: "Eau de Parfum, 100ml", price: 410, image: "/alora_BG2.png" },
  { id: "u-33", name: "Millésime Impérial", brand: "Creed", category: "Eau de Parfum, 100ml", price: 410, image: "/alora_BG2.png" },
  { id: "u-34", name: "Original Santal", brand: "Creed", category: "Eau de Parfum, 100ml", price: 410, image: "/alora_BG2.png" },
  { id: "u-35", name: "Royal Water", brand: "Creed", category: "Eau de Parfum, 100ml", price: 410, image: "/alora_BG2.png" },
  { id: "u-36", name: "Pure White Cologne", brand: "Creed", category: "Eau de Parfum, 75ml", price: 545, image: "/alora_BG2.png" },
  // Diptyque
  { id: "u-37", name: "Do Son", brand: "Diptyque", category: "Eau de Parfum, 75ml", price: 205, image: "/alora_BG2.png" },
  { id: "u-38", name: "Philosykos", brand: "Diptyque", category: "Eau de Parfum, 75ml", price: 205, image: "/alora_BG2.png" },
  { id: "u-39", name: "Tam Dao", brand: "Diptyque", category: "Eau de Parfum, 75ml", price: 205, image: "/alora_BG2.png" },
  { id: "u-40", name: "Fleur de Peau", brand: "Diptyque", category: "Eau de Parfum, 75ml", price: 205, image: "/alora_BG2.png" },
  { id: "u-41", name: "Orphéon", brand: "Diptyque", category: "Eau de Parfum, 75ml", price: 205, image: "/alora_BG2.png" },
  { id: "u-42", name: "Eau Capitale", brand: "Diptyque", category: "Eau de Parfum, 75ml", price: 205, image: "/alora_BG2.png" },
  // Kilian
  { id: "u-43", name: "Angels' Share", brand: "Kilian", category: "Eau de Parfum, 50ml", price: 245, image: "/alora_BG2.png" },
  { id: "u-44", name: "Apple Brandy on the Rocks", brand: "Kilian", category: "Eau de Parfum, 50ml", price: 245, image: "/alora_BG2.png" },
  { id: "u-45", name: "Black Phantom", brand: "Kilian", category: "Eau de Parfum, 50ml", price: 275, image: "/alora_BG2.png" },
  { id: "u-46", name: "Intoxicated", brand: "Kilian", category: "Eau de Parfum, 50ml", price: 275, image: "/alora_BG2.png" },
  { id: "u-47", name: "Straight to Heaven", brand: "Kilian", category: "Eau de Parfum, 50ml", price: 275, image: "/alora_BG2.png" },
  { id: "u-48", name: "Love, Don't Be Shy", brand: "Kilian", category: "Eau de Parfum, 50ml", price: 275, image: "/alora_BG2.png" },
];


export default function UnisexPage() {
  return (
    <div className="min-h-screen bg-white text-black pb-32 pt-16 font-sans font-body">
      <div className="mx-auto w-full px-6 sm:px-10 md:px-16 lg:px-20">
        <header className="text-center" style={{ marginBottom: '50px' }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-david-libre uppercase tracking-[0.2em] mb-8 text-black underline underline-offset-[10px] decoration-[3px]">Unisex Collection</h1>
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
            {unisexPerfumes.map((product) => (
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
