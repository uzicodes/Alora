import type { Metadata } from "next";
import { Space_Grotesk, Jost } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./components/CartContext";
import SmoothScroll from "./components/SmoothScroll";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});


const jostFont = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

const davidLibre = localFont({
  src: "../../public/fonts/DavidLibre.woff2",
  variable: "--font-david-libre",
  display: "swap",
});

const kharaissa = localFont({
  src: "../../public/fonts/Kharaissa.woff2",
  variable: "--font-kharaissa",
  display: "swap",
});

const blackKastile = localFont({
  src: "../../public/fonts/Black Kastile Modern.woff2",
  variable: "--font-black-kastile",
  display: "swap",
});

const lumien = localFont({
  src: "../../public/fonts/Lumien-Regular.woff2",
  variable: "--font-lumien",
  display: "swap",
});

export const metadata: Metadata = {
  title: "A L O R A",
  description: "Experience the essence of luxury with Alora's curated fragrance collection.",
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon.ico" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
        <body
          className={`${jostFont.variable} ${spaceGrotesk.variable} ${davidLibre.variable} ${kharaissa.variable} ${blackKastile.variable} ${lumien.variable} antialiased`}
          suppressHydrationWarning
        >
          <ScrollToTop />
          <Toaster position="bottom-right" richColors />
          <CartProvider>
            <SmoothScroll>
              <Navbar />
              <main>
                {children}
              </main>
              <Footer />
            </SmoothScroll>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
