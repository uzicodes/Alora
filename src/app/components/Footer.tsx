"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");

  if (pathname.startsWith("/admin")) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Welcome to the House of Alora VIP Registry!");
    setEmail("");
  };

  return (
    <footer className="font-space-grotesk" style={{ display: "block", width: "100%", backgroundColor: "#0a0c10", borderTop: "1px solid rgba(255, 255, 255, 0.05)", borderRadius: "32px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 32px 20px 32px", display: "flex", flexDirection: "column" }}>

        {/* Row 1: Logo and Newsletter */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", marginBottom: "40px" }}>
          <h2 className="font-kharaissa text-white" style={{ fontSize: "clamp(80px, 14vw, 160px)", fontWeight: "normal", letterSpacing: "0.2em", margin: "0", fontFamily: "var(--font-kharaissa)", lineHeight: 1.1 }}>ALORA</h2>
        </div>

        {/* Row 2: Grid Links */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "60px", width: "100%", marginBottom: "40px" }}>
          {/* Column 1 */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h4 style={{ fontSize: "10px", letterSpacing: "2px", color: "#C2B280", textTransform: "uppercase", margin: "0 0 32px 0", fontWeight: 600 }}>Collections</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <Link href="/shop" style={{ color: "#aaa", fontSize: "14px", textDecoration: "none", fontWeight: 300 }} className="hover:text-[#C2B280] transition-colors">All Fragrances</Link>
              <Link href="#" style={{ color: "#aaa", fontSize: "14px", textDecoration: "none", fontWeight: 300 }} className="hover:text-[#C2B280] transition-colors">Haute Parfumerie</Link>
              <Link href="#" style={{ color: "#aaa", fontSize: "14px", textDecoration: "none", fontWeight: 300 }} className="hover:text-[#C2B280] transition-colors">New Arrivals</Link>
              <Link href="#" style={{ color: "#aaa", fontSize: "14px", textDecoration: "none", fontWeight: 300 }} className="hover:text-[#C2B280] transition-colors">Bestsellers</Link>
            </div>
          </div>

          {/* Column 2 */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h4 style={{ fontSize: "10px", letterSpacing: "2px", color: "#C2B280", textTransform: "uppercase", margin: "0 0 32px 0", fontWeight: 600 }}>The House</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <Link href="/about" style={{ color: "#aaa", fontSize: "14px", textDecoration: "none", fontWeight: 300 }} className="hover:text-[#C2B280] transition-colors">Our Story</Link>
              <Link href="#" style={{ color: "#aaa", fontSize: "14px", textDecoration: "none", fontWeight: 300 }} className="hover:text-[#C2B280] transition-colors">Sustainability</Link>
              <Link href="#" style={{ color: "#aaa", fontSize: "14px", textDecoration: "none", fontWeight: 300 }} className="hover:text-[#C2B280] transition-colors">Press & Media</Link>
              <Link href="#" style={{ color: "#aaa", fontSize: "14px", textDecoration: "none", fontWeight: 300 }} className="hover:text-[#C2B280] transition-colors">Careers</Link>
            </div>
          </div>

          {/* Column 3 */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h4 style={{ fontSize: "10px", letterSpacing: "2px", color: "#C2B280", textTransform: "uppercase", margin: "0 0 32px 0", fontWeight: 600 }}>Client Care</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <Link href="#" style={{ color: "#aaa", fontSize: "14px", textDecoration: "none", fontWeight: 300 }} className="hover:text-[#C2B280] transition-colors">Contact Concierge</Link>
              <Link href="#" style={{ color: "#aaa", fontSize: "14px", textDecoration: "none", fontWeight: 300 }} className="hover:text-[#C2B280] transition-colors">Track Your Order</Link>
              <Link href="#" style={{ color: "#aaa", fontSize: "14px", textDecoration: "none", fontWeight: 300 }} className="hover:text-[#C2B280] transition-colors">Shipping & Returns</Link>
              <Link href="#" style={{ color: "#aaa", fontSize: "14px", textDecoration: "none", fontWeight: 300 }} className="hover:text-[#C2B280] transition-colors">FAQ</Link>
            </div>
          </div>

          {/* Column 4 */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h4 style={{ fontSize: "10px", letterSpacing: "2px", color: "#C2B280", textTransform: "uppercase", margin: "0 0 32px 0", fontWeight: 600 }}>Flagship Boutique</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <span style={{ color: "#aaa", fontSize: "14px", fontWeight: 300, lineHeight: 1.6 }}>Road 79, Gulshan 2<br />Dhaka 1212</span>
              <a href="#" style={{ color: "#aaa", fontSize: "14px", textDecoration: "none", fontWeight: 300 }} className="hover:text-[#C2B280] transition-colors">+880 1700 000 000</a>
              <a href="#" style={{ color: "#aaa", fontSize: "14px", textDecoration: "none", fontWeight: 300 }} className="hover:text-[#C2B280] transition-colors">concierge@alora.com</a>
            </div>
          </div>
        </div>

        {/* Row 3: Bottom Bar */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "40px", gap: "24px" }}>
          <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
            <a href="#" style={{ color: "#666" }} className="hover:text-[#C2B280] transition-colors">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            </a>
            <a href="#" style={{ color: "#666" }} className="hover:text-[#C2B280] transition-colors">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
            <a href="#" style={{ color: "#666" }} className="hover:text-[#C2B280] transition-colors">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            </a>
            <span style={{ color: "#222" }}>|</span>
            <a href="/admin/login" style={{ color: "#666", fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", textDecoration: "none", fontWeight: 600 }} className="hover:text-[#C2B280] transition-colors">
              Admin Portal
            </a>
          </div>

          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "24px", fontSize: "10px", letterSpacing: "2px", color: "#666", textTransform: "uppercase", fontWeight: 600 }}>
            <span>&copy; {new Date().getFullYear()} ALORA FRAGRANCES</span>
            <span style={{ color: "#333" }} className="hidden md:inline">•</span>
            <Link href="#" style={{ color: "#666", textDecoration: "none" }} className="hover:text-[#C2B280] transition-colors">Privacy</Link>
            <Link href="#" style={{ color: "#666", textDecoration: "none" }} className="hover:text-[#C2B280] transition-colors">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
