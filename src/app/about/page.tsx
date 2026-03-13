export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 px-10 max-w-[1200px] mx-auto text-[#111]">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl font-light tracking-wide uppercase">About Us</h1>
        <div className="w-10 h-[1px] bg-gray-300 mx-auto mt-6"></div>
      </div>
      <div className="max-w-3xl mx-auto">
        <p className="font-body text-sm md:text-base leading-relaxed text-gray-600 mb-6 text-center">
          Founded on the belief that fragrance is an extension of identity,
          Alora combines centuries-old artisanal techniques with contemporary design.
          Every bottle is a masterpiece — from the hand-selected raw materials sourced
          across five continents, to the meticulous blending process that can take
          up to three years to perfect.
        </p>
        <p className="font-body text-sm md:text-base leading-relaxed text-gray-600 text-center">
          We believe luxury should be felt, not just seen. That&apos;s why each Alora
          scent is designed to evolve with you throughout the day, revealing new layers
          and leaving an unforgettable impression.
        </p>
      </div>
    </div>
  );
}
