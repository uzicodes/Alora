"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useUser, useClerk } from "@clerk/nextjs";

const BRANDS = [
  "Afnan", "Armaf", "Burberry", "Calvin Klein", "Chanel", "Creed",
  "Davidoff", "Dior", "Dolce & Gabbana", "Giorgio Armani", "Gucci",
  "Hugo Boss", "Jean Paul", "Lattafa", "Louis Vuitton", "Mancera",
  "Paco Rabanne", "Prada", "Ralph Lauren", "Rassasi", "Rayhaan",
  "Tom Ford", "Valentino", "Versace", "Victoria's Secret", "Xerjoff",
  "YSL", "Zara"
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [productResults, setProductResults] = useState<any[]>([]);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const fetchProducts = async () => {
        try {
          const res = await fetch(`/api/products/search?q=${encodeURIComponent(searchQuery)}`);
          if (res.ok) {
            const data = await res.json();
            setProductResults(data);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      
      const timeoutId = setTimeout(fetchProducts, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setProductResults([]);
    }
  }, [searchQuery]);

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
        // Add transient class for highlighting in case :target is missed by pushState
        el.classList.remove('search-highlight-active');
        void el.offsetWidth; // trigger reflow
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
            <li><Link href="/about" className={pathname === "/about" ? "active-link" : ""}>About</Link></li>
            
            {!isSignedIn && (
              <li>
                <Link href="/login" className={pathname === "/login" ? "active-link" : ""} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>  
                  LOGIN
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> 
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </Link>
              </li>
            )}
          </ul>

          {/* Icons */}
          <div className="navbar-icons">
            {/* Search Toggle */}
            <button
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
            {isSignedIn && user ? (
              <Link href="/profile" className="navbar-icon" id="navbar-account" aria-label="Account" style={{ display: 'flex', alignItems: 'center', padding: 0, justifyContent: 'center' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid black', overflow: 'hidden' }}>
                  <img src={user.imageUrl} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </Link>
            ) : (
              <Link href="/login" className="navbar-icon" id="navbar-account" aria-label="Account">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"> 
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
            )}

            {/* Cart (Always Visible) */}
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
        <div className={`search-popup ${searchOpen ? "open" : ""}`} id="search-popup">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for fragrances, brands..."
              autoFocus={searchOpen}
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-close" onClick={() => { setSearchOpen(false); setSearchQuery(''); }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">   
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {searchQuery.trim().length > 0 && (
              <div 
                className="search-results" 
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.98)',
                  backdropFilter: 'blur(15px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderTop: 'none',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  marginTop: '10px',
                  zIndex: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '10px 0'
                }}
              >
                {BRANDS.filter(brand => brand.toLowerCase().includes(searchQuery.toLowerCase())).map(brand => (
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
                ))}
                
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
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${mobileOpen ? "active" : ""}`} id="mobile-menu">
        <Link href="/shop" onClick={() => setMobileOpen(false)}>Shop</Link>     
        <Link href="/men" onClick={() => setMobileOpen(false)}>Men</Link>       
        <Link href="/woman" onClick={() => setMobileOpen(false)}>Women</Link>   
        <Link href="/unisex" onClick={() => setMobileOpen(false)}>Unisex</Link> 
        <a href="#" onClick={(e) => e.preventDefault()}>Brands</a>
        <Link href="/about" onClick={() => setMobileOpen(false)}>About</Link>   
        <Link href="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
        {!isSignedIn && (
          <Link href="/login" onClick={() => setMobileOpen(false)} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
            LOGIN
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">       
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </Link>
        )}
      </div>
    </>
  );
}