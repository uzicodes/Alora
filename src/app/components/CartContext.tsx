"use client";

import { createContext, use, useState, useEffect, useRef, type ReactNode } from "react";
import { useAuth, ClerkLoaded } from "@clerk/nextjs";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  sizeMl: number;
  concentration: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "alora-cart";

function getStoredCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);

    // Check if it's the format with timestamp
    if (parsed && typeof parsed === "object" && "timestamp" in parsed && "items" in parsed) {
      const now = Date.now();
      const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

      if (now - parsed.timestamp > TWENTY_FOUR_HOURS) {
        localStorage.removeItem(CART_STORAGE_KEY);
        return [];
      }
      return parsed.items || [];
    }

    // Fallback for array format
    if (Array.isArray(parsed)) {
      return parsed;
    }

    return [];
  } catch {
    return [];
  }
}

function CartAuthSync({ clearCart }: { clearCart: () => void }) {
  const { isSignedIn, isLoaded } = useAuth();
  const prevSignedIn = useRef<boolean | undefined>(undefined);

  useEffect(() => {
    if (!isLoaded) return;
    if (prevSignedIn.current !== undefined && prevSignedIn.current !== isSignedIn) {
      clearCart();
    }
    prevSignedIn.current = isSignedIn;
  }, [isSignedIn, isLoaded, clearCart]);

  return null;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(getStoredCart);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === CART_STORAGE_KEY) {
        setCartItems(getStoredCart());
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    let mounted = true;
    const items = getStoredCart();
    if (mounted && items.length > 0) {
      setCartItems(items);
    }
    return () => { mounted = false; };
  }, []);

  const persistCart = (items: CartItem[]) => {
    if (typeof window !== "undefined") {
      const dataToStore = {
        items,
        timestamp: Date.now(),
      };
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(dataToStore));
    }
  };

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      let newItems;
      if (existing) {
        newItems = prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        newItems = [...prev, { ...item, quantity: 1 }];
      }
      persistCart(newItems);
      return newItems;
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => {
      const newItems = prev.filter((item) => item.id !== id);
      persistCart(newItems);
      return newItems;
    });
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prev) => {
      const newItems = prev.map((item) => (item.id === id ? { ...item, quantity } : item));
      persistCart(newItems);
      return newItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const value = { cartItems, addToCart, removeFromCart, updateItemQuantity, clearCart, cartCount };

  return (
    <CartContext.Provider value={value}>
      <ClerkLoaded>
        <CartAuthSync clearCart={clearCart} />
      </ClerkLoaded>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = use(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
