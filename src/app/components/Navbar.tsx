"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useUser, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { useCart } from "./CartContext";

const BRANDS = [
  "Afnan", "Armaf", "Burberry", "Calvin Klein", "Chanel", "Creed",
  "Davidoff", "Dior", "Dolce & Gabbana", "Giorgio Armani", "Gucci",
  "Hugo Boss", "Jean Paul", "Lattafa", "Louis Vuitton", "Mancera",
  "Paco Rabanne", "Prada", "Ralph Lauren", "Rassasi", "Rayhaan",
  "Tom Ford", "Valentino", "Versace", "Victoria's Secret", "Xerjoff",
  "YSL", "Zara"
];

function useProductSearch(searchQuery: string) {
  const [productResults, setProductResults] = useState<any[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    if (searchQuery.trim().length > 0) {
      const fetchProducts = async () => {
        try {
          const res = await fetch(`/api/products/search?q=${encodeURIComponent(searchQuery)}`, {
            signal: controller.signal
          });
          if (res.ok) {
            const data = await res.json();
            if (active) setProductResults(data);
          }
        } catch (error: any) {
          if (error.name !== 'AbortError') {
            console.error("Error fetching products:", error);
          }
        }
      };

      const timeoutId = setTimeout(fetchProducts, 300);
      return () => {
        active = false;
        controller.abort();
        clearTimeout(timeoutId);
      };
    } else {
      let active = true;
      Promise.resolve().then(() => {
        if (active) setProductResults([]);
      });
      return () => {
        active = false;
        controller.abort();
      };
    }
  }, [searchQuery]);

  return productResults;
}

function DesktopLoginLink({ pathname }: { pathname: string }) {
  const { isSignedIn } = useUser();
  if (isSignedIn) return null;
  return (
    <li>
      <Link href="/login" className={pathname === "/login" ? "active-link" : ""} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
        LOGIN
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </Link>
    </li>
  );
}

function AccountNavButton() {
  const { isSignedIn, user } = useUser();
  if (isSignedIn && user) {
    return (
      <Link href="/profile" className="navbar-icon" id="navbar-account" aria-label="Account" style={{ display: 'flex', alignItems: 'center', padding: 0, justifyContent: 'center' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid black', overflow: 'hidden', position: 'relative' }}>
          <Image src={user.imageUrl} alt="Profile" fill sizes="32px" style={{ objectFit: 'cover' }} />
        </div>
      </Link>
    );
  }
  return (
    <Link href="/login" className="navbar-icon" id="navbar-account" aria-label="Account">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </Link>
  );
}

function MobileLoginLink({ onClick }: { onClick: () => void }) {
  const { isSignedIn } = useUser();
  if (isSignedIn) return null;
  return (
    <Link href="/login" onClick={onClick} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
      LOGIN
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17L17 7" />
        <path d="M7 7h10v10" />
      </svg>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount } = useCart();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileBrandsOpen, setMobileBrandsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const productResults = useProductSearch(searchQuery);

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>, brand: string) => {
    e.preventDefault();
    setSearchOpen(false);
    setSearchQuery('');
    setMobileOpen(false);

    const targetId = `brand-${brand.toLowerCase().replace(/ /g, "-").replace(/'/g, "")}`;
    const targetUrl = `/shop#${targetId}`;

    if (pathname === '/shop') {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', targetUrl);
      }
    } else {
      router.push(targetUrl);
    }
  };

  const handleProductClick = (e: React.MouseEvent<HTMLAnchorElement>, productId: string) => {
    e.preventDefault();
    setSearchOpen(false);
    setSearchQuery('');
    setMobileOpen(false);

    const targetId = `product-${productId}`;
    const targetUrl = `/shop#${targetId}`;

    if (pathname === '/shop') {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        window.history.pushState(null, '', targetUrl);
        el.classList.remove('search-highlight-active');
        void el.offsetWidth;
        el.classList.add('search-highlight-active');
        setTimeout(() => el.classList.remove('search-highlight-active'), 2500);
      } else {
        router.push(targetUrl);
      }
    } else {
      router.push(targetUrl);
    }
  };


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      timeoutId = setTimeout(() => setMobileBrandsOpen(false), 300); // Reset after transition
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [mobileOpen]);

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      {pathname !== '/' && <div style={{ height: 56 }} />}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
        {/* Logo */}
        <Link href="/" className="navbar-logo" id="navbar-logo">
          <Image
            src="/alora_BG.png"
            alt="Alora Logo"
            width={32}
            height={32}
            className="navbar-logo-img"
            style={{ width: 'auto', height: 'auto' }}
          />
          ALORA
        </Link>

        {/* Links + Icons */}
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
                  {BRANDS.map((brand) => (
                    <Link
                      key={brand}
                      href={`/shop#brand-${brand.toLowerCase().replace(/ /g, "-").replace(/'/g, "")}`}
                      className="brand-link"
                      onClick={(e) => handleBrandClick(e, brand)}
                    >
                      {brand}
                    </Link>
                  ))}
                </div>
              </div>
            </li>


            <ClerkLoading>
              <li>
                <Link href="/login" className={pathname === "/login" ? "active-link" : ""} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  LOGIN
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </Link>
              </li>
            </ClerkLoading>
            <ClerkLoaded>
              <DesktopLoginLink pathname={pathname} />
            </ClerkLoaded>
          </ul>

          {/* Icons */}
          <div className="navbar-icons">
            {/* Search Toggle */}
            <button
              type="button"
              className="navbar-icon"
              id="navbar-search"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Profile Icon / Avatar */}
            <ClerkLoading>
              <Link href="/login" className="navbar-icon" id="navbar-account" aria-label="Account">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
            </ClerkLoading>
            <ClerkLoaded>
              <AccountNavButton />
            </ClerkLoaded>

            {/* Cart (Always Visible) */}
            <Link href="/cart" className="navbar-icon" id="navbar-cart" aria-label="Cart" style={{ position: 'relative' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="cart-badge-count">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              type="button"
              className={`mobile-toggle border-0 bg-transparent p-1 ${mobileOpen ? "active" : ""}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              id="mobile-toggle"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Search Bar Popup */}
        <NavbarSearchPopup
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          productResults={productResults}
          handleBrandClick={handleBrandClick}
          handleProductClick={handleProductClick}
        />
      </nav>

      {/* Mobile Menu Overlay */}
      <NavbarMobileMenu
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        mobileBrandsOpen={mobileBrandsOpen}
        setMobileBrandsOpen={setMobileBrandsOpen}
        handleBrandClick={handleBrandClick}
      />
    </>
  );
}

function NavbarSearchPopup({
  searchOpen,
  setSearchOpen,
  searchQuery,
  setSearchQuery,
  productResults,
  handleBrandClick,
  handleProductClick,
}: {
  searchOpen: boolean;
  setSearchOpen: (o: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  productResults: any[];
  handleBrandClick: (e: React.MouseEvent<HTMLAnchorElement>, brand: string) => void;
  handleProductClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}) {
  return (
    <div className={`search-popup ${searchOpen ? "open" : ""}`} id="search-popup" role="search" aria-hidden={!searchOpen}>
      <div className="search-container">
        <input
          type="text"
          aria-label="Search"
          placeholder="Search for fragrances, brands..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="button" className="search-close" aria-label="Close search" onClick={() => { setSearchOpen(false); setSearchQuery(''); }}>
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {searchQuery.trim().length > 0 && (
          <div className="search-results navbar-search-results">
            {BRANDS.reduce<React.ReactNode[]>((acc, brand) => {
              if (brand.toLowerCase().includes(searchQuery.toLowerCase())) {
                acc.push(
                  <Link
                    key={brand}
                    href={`/shop#brand-${brand.toLowerCase().replace(/ /g, "-").replace(/'/g, "")}`}
                    style={{
                      padding: '12px 20px',
                      color: 'rgba(255, 255, 255, 0.8)',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      display: 'block',
                      transition: 'color 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#C28D10'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'}
                    onClick={(e) => handleBrandClick(e, brand)}
                  >
                    <span>{brand}</span>
                    <span style={{ fontSize: '10px', marginLeft: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Brand</span>
                  </Link>
                );
              }
              return acc;
            }, [])}

            {productResults.map(product => (
              <Link
                key={product.id}
                href={`/shop#product-${product.id}`}
                style={{
                  padding: '12px 20px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  display: 'block',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#C28D10'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'}
                onClick={(e) => handleProductClick(e, product.id)}
              >
                <span>{product.name}</span>
                <span style={{ fontSize: '10px', marginLeft: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Product</span>
              </Link>
            ))}

            {BRANDS.filter(brand => brand.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && productResults.length === 0 && (
              <div style={{ padding: '12px 20px', color: 'rgba(255, 255, 255, 0.5)', fontFamily: 'var(--font-body)', fontSize: '14px' }}>
                No results found for "{searchQuery}"
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function NavbarMobileMenu({
  mobileOpen,
  setMobileOpen,
  mobileBrandsOpen,
  setMobileBrandsOpen,
  handleBrandClick,
}: {
  mobileOpen: boolean;
  setMobileOpen: (o: boolean) => void;
  mobileBrandsOpen: boolean;
  setMobileBrandsOpen: (o: boolean) => void;
  handleBrandClick: (e: React.MouseEvent<HTMLAnchorElement>, brand: string) => void;
}) {
  return (
    <div className={`mobile-menu ${mobileOpen ? "active" : ""}`} id="mobile-menu">
      <Link href="/shop" onClick={() => setMobileOpen(false)}>Shop</Link>
      <Link href="/men" onClick={() => setMobileOpen(false)}>Men</Link>
      <Link href="/woman" onClick={() => setMobileOpen(false)}>Women</Link>
      <Link href="/unisex" onClick={() => setMobileOpen(false)}>Unisex</Link>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setMobileBrandsOpen(!mobileBrandsOpen);
        }}
        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        Brands
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          style={{ transform: mobileBrandsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>

      {mobileBrandsOpen && (
        <div className="navbar-mobile-brands">
          {BRANDS.map((brand) => (
            <Link
              key={brand}
              href={`/shop#brand-${brand.toLowerCase().replace(/ /g, "-").replace(/'/g, "")}`}
              onClick={(e) => handleBrandClick(e, brand)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                letterSpacing: '1px',
                textAlign: 'center',
                textTransform: 'none',
              }}
            >
              {brand}
            </Link>
          ))}
        </div>
      )}

      <ClerkLoading>
        <Link href="/login" onClick={() => setMobileOpen(false)} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
          LOGIN
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </Link>
      </ClerkLoading>
      <ClerkLoaded>
        <MobileLoginLink onClick={() => setMobileOpen(false)} />
      </ClerkLoaded>
    </div>
  );
}
