import type { Metadata } from "next";
import { Geist, Geist_Mono, Ubuntu } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./components/CartContext";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ubuntuFont = Ubuntu({
  variable: "--font-ubuntu",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
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
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
            rel="stylesheet"
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${ubuntuFont.variable} ${davidLibre.variable} ${kharaissa.variable} ${blackKastile.variable} ${lumien.variable} antialiased`}
        >
          <ScrollToTop />
          <Toaster position="bottom-right" richColors />
          <CartProvider>
            <Navbar />
            <main>
              {children}
            </main>
            <Footer />
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
