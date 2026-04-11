import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer bg-black text-white" id="footer">
      <div className="footer-content max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-6">
        <div className="footer-brand">
          <Link href="/" className="navbar-logo" style={{ marginBottom: "1rem", textDecoration: "none" }}>
            <Image
              src="/alora_BG.png"
              alt="Alora Logo"
              width={32}
              height={32}
              className="navbar-logo-img"
            />
            ALORA
          </Link>
          <p className="text-gray-400">
            Luxury fragrances crafted for those who refuse to blend in.
            Every scent tells a story.
          </p>
        </div>

        <div className="footer-column">
          <h4 className="text-white">Shop</h4>
          <ul className="flex flex-col gap-2">
            <li><Link href="/shop" className="text-gray-400 hover:text-white transition-colors">All Fragrances</Link></li>
            <li><Link href="/collections" className="text-gray-400 hover:text-white transition-colors">Collections</Link></li>
            <li><Link href="/shop?category=new" className="text-gray-400 hover:text-white transition-colors">New Arrivals</Link></li>
            <li><Link href="/shop?category=bestsellers" className="text-gray-400 hover:text-white transition-colors">Bestsellers</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="text-white">Company</h4>
          <ul className="flex flex-col gap-2">
            <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            <li><Link href="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
            <li><Link href="/press" className="text-gray-400 hover:text-white transition-colors">Press</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="text-white">Help</h4>
          <ul className="flex flex-col gap-2">
            <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
            <li><Link href="/shipping" className="text-gray-400 hover:text-white transition-colors">Shipping</Link></li>
            <li><Link href="/returns" className="text-gray-400 hover:text-white transition-colors">Returns</Link></li>
            <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom border-t border-white/10 pt-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-sm">&copy; 2026 Alora. All rights reserved.</p>
        <div className="footer-social flex gap-4">
          <Link
            href="/admin/login"
            className="text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:text-white border border-white/10 hover:border-white/40 px-4 py-2 transition-all duration-300"
          >
            Admin Access
          </Link>
        </div>
      </div>
    </footer>
  );
}
