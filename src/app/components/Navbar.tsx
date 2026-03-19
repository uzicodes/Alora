"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
        {/* Logo */}
        <Link href="/" className="navbar-logo" id="navbar-logo">
          <Image
            src="/alora_BG.png"
            alt="Alora Logo"
            width={32}
            height={32}
            className="navbar-logo-img"
          />
          ALORA
        </Link>

        {/* Right Section: Links + Icons */}
        <div className="navbar-right-group">
          {/* Nav Links */}
          <ul className="navbar-links" id="navbar-links">
            <li><Link href="/shop" className={pathname === "/shop" ? "active-link" : ""}>Shop</Link></li>
            <li><Link href="/men" className={pathname === "/men" ? "active-link" : ""}>Men</Link></li>
            <li><Link href="/woman" className={pathname === "/woman" ? "active-link" : ""}>Women</Link></li>
            <li><Link href="/unisex" className={pathname === "/unisex" ? "active-link" : ""}>Unisex</Link></li>
            <li className="nav-item-dropdown">
              <a href="#" onClick={(e) => e.preventDefault()}>Brands</a>
              <div className="dropdown-menu">
                <div className="brands-grid">
                  {[
                    "Afnan", "Armaf", "Burberry", "Calvin Klein", "Chanel", "Creed",
                    "Davidoff", "Dior", "Dolce & Gabbana", "Giorgio Armani", "Gucci",
                    "Hugo Boss", "Jean Paul", "Lattafa", "Louis Vuitton", "Mancera",
                    "Paco Rabanne", "Prada", "Ralph Lauren", "Rassasi", "Rayhaan",
                    "Tom Ford", "Valentino", "Versace", "Victoria's Secret", "Xerjoff",
                    "YSL", "Zara"
                  ].map((brand) => (
                    <Link
                      key={brand}
                      href={`/shop#brand-${brand.toLowerCase().replace(/ /g, "-").replace(/'/g, "")}`}
                      className="brand-link"
                    >
                      {brand}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>

          {/* Icons */}
          <div className="navbar-icons">
            {/* Search Toggle */}
            <button
              className={`navbar-icon ${searchOpen ? 'active' : ''}`}
              id="navbar-search"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Account */}
            <Link href="/profile" className="navbar-icon" id="navbar-account" aria-label="Account">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>

            {/* Cart */}
            <Link href="/cart" className="navbar-icon" id="navbar-cart" aria-label="Cart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </Link>

            {/* Mobile Toggle */}
            <div
              className={`mobile-toggle ${mobileOpen ? "active" : ""}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              id="mobile-toggle"
              role="button"
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        {/* Search Bar Popup */}
        <div className={`search-popup ${searchOpen ? 'open' : ''}`} id="search-popup">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for fragrances, brands..."
              autoFocus={searchOpen}
              className="search-input"
            />
            <button className="search-close" onClick={() => setSearchOpen(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`} id="mobile-menu">
        <Link href="/shop" onClick={() => setMobileOpen(false)}>Shop</Link>
        <Link href="/men" onClick={() => setMobileOpen(false)}>Men</Link>
        <Link href="/woman" onClick={() => setMobileOpen(false)}>Women</Link>
        <Link href="/unisex" onClick={() => setMobileOpen(false)}>Unisex</Link>
        <a href="#" onClick={(e) => e.preventDefault()}>Brands</a>
        <Link href="/about" onClick={() => setMobileOpen(false)}>About</Link>
        <Link href="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
      </div>
    </>
  );
}
