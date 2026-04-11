"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { CartProvider } from "./CartContext";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith("/admin");

    if (isAdmin) {
        return (
            <CartProvider>
                {children}
            </CartProvider>
        );
    }

    return (
        <>
            <Navbar />
            <CartProvider>
                <main style={{ paddingTop: 56 }}>
                    {children}
                </main>
            </CartProvider>
            <Footer />
        </>
    );
}
