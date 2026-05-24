import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer 
      className="footer bg-[#1a1f2e] text-white" 
      id="footer"
      style={{
        margin: '24px',
        borderRadius: '24px',
        overflow: 'hidden'
      }}
    >
      <div className="footer-content max-w-[1200px] mx-auto px-6 md:px-10 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
        <div className="footer-brand">
          <Link href="/" className="navbar-logo flex items-center gap-2 mb-4" style={{ textDecoration: "none" }}>
            <Image
              src="/alora_BG.png"
              alt="Alora Logo"
              width={32}
              height={32}
              className="navbar-logo-img"
            />
            <span className="text-xl font-bold text-yellow-400">ALORA</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            Luxury fragrances crafted for those who refuse to blend in.
            Every scent tells a story.
          </p>
          <div className="flex gap-4 mt-4">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">
              <i className="fab fa-instagram"></i>
            </Link>
          </div>
        </div>

        <div className="footer-column">
          <h4 className="text-green-400 uppercase tracking-wider font-semibold mb-4">Categories</h4>
          <ul className="flex flex-col gap-3">
            <li><Link href="/shop" className="text-gray-400 hover:text-white transition-colors text-sm">All Fragrances</Link></li>
            <li><Link href="/collections" className="text-gray-400 hover:text-white transition-colors text-sm">Collections</Link></li>
            <li><Link href="/shop?category=new" className="text-gray-400 hover:text-white transition-colors text-sm">New Arrivals</Link></li>
            <li><Link href="/shop?category=bestsellers" className="text-gray-400 hover:text-white transition-colors text-sm">Bestsellers</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4 className="text-green-400 uppercase tracking-wider font-semibold mb-4">Our Services</h4>
          <ul className="flex flex-col gap-3">
            <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">Track Order</Link></li>
            <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Delivery Info</Link></li>
            <li><Link href="/careers" className="text-gray-400 hover:text-white transition-colors text-sm">Help & FAQs</Link></li>
            <li><Link href="/press" className="text-gray-400 hover:text-white transition-colors text-sm">Contact Support</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="text-green-400 uppercase tracking-wider font-semibold mb-4">Get In Touch</h4>
          <ul className="flex flex-col gap-4">
            <li className="flex items-start gap-3">
              <span className="text-yellow-400">📍</span>
              <span className="text-gray-400 text-sm">Gulshan 2, Dhaka 1212</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400">📱</span>
              <span className="text-gray-400 text-sm">+880 1700 000 000</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-yellow-400">⏰</span>
              <span className="text-gray-400 text-sm">Daily: 09:00 - 23:00</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom border-t border-white/10 px-6 md:px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 text-xs">&copy; 2026 Alora. All rights reserved.</p>
        <div className="footer-links flex gap-6">
          <Link href="/privacy" className="text-gray-500 hover:text-white text-xs transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="text-gray-500 hover:text-white text-xs transition-colors">
            Terms
          </Link>
          <Link href="/cookies" className="text-gray-500 hover:text-white text-xs transition-colors">
            Cookies
          </Link>
        </div>
        <div className="footer-developer flex gap-3">
          <Link href="#" className="text-gray-500 hover:text-white text-xs transition-colors">
            <i className="fab fa-github"></i>
          </Link>
          <Link href="#" className="text-gray-500 hover:text-white text-xs transition-colors">
            <i className="fab fa-gitlab"></i>
          </Link>
          <Link href="#" className="text-gray-500 hover:text-white text-xs transition-colors">
            <i className="fab fa-code-branch"></i>
          </Link>
          <Link href="#" className="text-gray-500 hover:text-white text-xs transition-colors">
            <i className="fas fa-envelope"></i>
          </Link>
        </div>
      </div>
    </footer>
  );
}
