"use client";

import { createContext, use, useCallback, useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
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
const EMPTY_CART: CartItem[] = [];

// Caching structure to maintain reference stability required by useSyncExternalStore
let cachedRawString: string | null = null;
let cachedSnapshot: CartItem[] = EMPTY_CART;

function getStoredCartSnapshot(): CartItem[] {
  if (typeof window === "undefined") return EMPTY_CART;
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored === cachedRawString) {
      return cachedSnapshot;
    }
    cachedRawString = stored;
    if (!stored) {
      cachedSnapshot = EMPTY_CART;
      return cachedSnapshot;
    }

    const parsed = JSON.parse(stored);

    // Check if it's the format with timestamp
    if (parsed && typeof parsed === "object" && "timestamp" in parsed && "items" in parsed) {
      const now = Date.now();
      const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

      if (now - parsed.timestamp > TWENTY_FOUR_HOURS) {
        localStorage.removeItem(CART_STORAGE_KEY);
        cachedSnapshot = EMPTY_CART;
        return cachedSnapshot;
      }
      cachedSnapshot = parsed.items || EMPTY_CART;
      return cachedSnapshot;
    }

    // Fallback for array format
    if (Array.isArray(parsed)) {
      cachedSnapshot = parsed;
      return cachedSnapshot;
    }

    cachedSnapshot = EMPTY_CART;
    return cachedSnapshot;
  } catch {
    cachedSnapshot = EMPTY_CART;
    return cachedSnapshot;
  }
}

function getServerSnapshot(): CartItem[] {
  return EMPTY_CART;
}

function subscribeToCart(callback: () => void): () => void {
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === CART_STORAGE_KEY) {
      callback();
    }
  };
  const handleCustomUpdate = () => callback();

  window.addEventListener("storage", handleStorageChange);
  window.addEventListener("cart-storage-update", handleCustomUpdate);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
    window.removeEventListener("cart-storage-update", handleCustomUpdate);
  };
}

function CartAuthSync() {
  const { isSignedIn, isLoaded } = useAuth();
  const { clearCart } = useCart();
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
  const cartItems = useSyncExternalStore(
    subscribeToCart,
    getStoredCartSnapshot,
    getServerSnapshot
  );

  const persistCart = useCallback((items: CartItem[]) => {
    if (typeof window !== "undefined") {
      const dataToStore = {
        items,
        timestamp: Date.now(),
      };
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(dataToStore));
      window.dispatchEvent(new Event("cart-storage-update"));
    }
  }, []);

  const addToCart = useCallback((item: Omit<CartItem, "quantity">) => {
    const current = getStoredCartSnapshot();
    const existing = current.find((i) => i.id === item.id);
    let newItems: CartItem[];
    if (existing) {
      newItems = current.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      newItems = [...current, { ...item, quantity: 1 }];
    }
    persistCart(newItems);
  }, [persistCart]);

  const removeFromCart = useCallback((id: string) => {
    const current = getStoredCartSnapshot();
    const newItems = current.filter((item) => item.id !== id);
    persistCart(newItems);
  }, [persistCart]);

  const updateItemQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return;
    const current = getStoredCartSnapshot();
    const newItems = current.map((item) => (item.id === id ? { ...item, quantity } : item));
    persistCart(newItems);
  }, [persistCart]);

  const clearCart = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(CART_STORAGE_KEY);
      window.dispatchEvent(new Event("cart-storage-update"));
    }
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const value = { cartItems, addToCart, removeFromCart, updateItemQuantity, clearCart, cartCount };

  return (
    <CartContext.Provider value={value}>
      <ClerkLoaded>
        <CartAuthSync />
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
