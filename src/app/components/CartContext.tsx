"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef, useMemo, type ReactNode } from "react";
import { useAuth } from "@clerk/nextjs";


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

    // Check if it's the new format with timestamp
    if (parsed && typeof parsed === "object" && "timestamp" in parsed && "items" in parsed) {
      const now = Date.now();
      const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

      if (now - parsed.timestamp > TWENTY_FOUR_HOURS) {
        localStorage.removeItem(CART_STORAGE_KEY);
        return [];
      }
      return parsed.items || [];
    }

    // Fallback for old format
    if (Array.isArray(parsed)) {
      return parsed;
    }

    return [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { isSignedIn } = useAuth();
  const prevIsSignedIn = useRef(isSignedIn);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setCartItems(getStoredCart());
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

  const addToCart = useCallback((item: Omit<CartItem, "quantity">) => {
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
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartItems((prev) => {
      const newItems = prev.filter((item) => item.id !== id);
      persistCart(newItems);
      return newItems;
    });
  }, []);

  const updateItemQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prev) => {
      const newItems = prev.map((item) => (item.id === id ? { ...item, quantity } : item));
      persistCart(newItems);
      return newItems;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  // Clear cart when the user logs out
  useEffect(() => {
    if (prevIsSignedIn.current === true && isSignedIn === false) {
      clearCart();
    }
    prevIsSignedIn.current = isSignedIn;
  }, [isSignedIn, clearCart]);

  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);

  const value = useMemo(
    () => ({ cartItems, addToCart, removeFromCart, updateItemQuantity, clearCart, cartCount }),
    [cartItems, addToCart, removeFromCart, updateItemQuantity, clearCart, cartCount]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
