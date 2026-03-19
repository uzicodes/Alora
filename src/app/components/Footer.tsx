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
          {/* Instagram */}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          {/* Twitter / X */}
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </a>
          {/* Pinterest */}
          <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" aria-label="Pinterest" className="text-gray-400 hover:text-white transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.25 2.67 7.87 6.42 9.29-.09-.78-.17-1.98.04-2.83.19-.77 1.2-5.08 1.2-5.08s-.31-.61-.31-1.52c0-1.42.82-2.49 1.85-2.49.87 0 1.29.66 1.29 1.44 0 .88-.56 2.19-.85 3.41-.24 1.02.51 1.85 1.52 1.85 1.82 0 3.22-1.92 3.22-4.69 0-2.45-1.76-4.17-4.28-4.17-2.91 0-4.62 2.19-4.62 4.44 0 .88.34 1.82.76 2.34.08.1.09.19.07.29-.08.32-.25 1.02-.28 1.16-.04.19-.15.23-.35.14-1.31-.61-2.13-2.52-2.13-4.06 0-3.31 2.41-6.35 6.94-6.35 3.64 0 6.47 2.6 6.47 6.07 0 3.62-2.28 6.53-5.45 6.53-1.06 0-2.07-.55-2.41-1.21l-.66 2.5c-.24.91-.88 2.05-1.31 2.75A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
