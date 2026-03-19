"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type CartItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
};

const initialCart: CartItem[] = [
  {
    id: "item-1",
    name: "Midnight Oud",
    category: "Eau de Parfum • 50ml",
    price: 185.00,
    quantity: 1,
    image: "/alora_BG2.png",
  },
  {
    id: "item-2",
    name: "Velvet Rose",
    category: "Extrait de Parfum • 100ml",
    price: 220.00,
    quantity: 1,
    image: "/alora_BG2.png",
  }
];

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCart);

  const increaseQuantity = (id: string) => {
    setCartItems(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (id: string) => {
    setCartItems(prev => prev.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal; // Assuming shipping is complimentary

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1 className="cart-title animate-fade-in-up">Your Cart</h1>
        <div className="section-divider animate-fade-in-up delay-100"></div>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 animate-fade-in-up">
          <p className="text-gray-500 mb-8 font-body uppercase tracking-wider">Your cart is empty.</p>
          <Link href="/shop" className="btn-primary" style={{ display: 'inline-flex' }}>
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          {/* Left: Cart Items */}
          <div className="cart-items animate-fade-in-up delay-200">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="120px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="cart-item-details">
                  <div className="cart-item-top">
                    <div>
                      <h3 className="cart-item-name">{item.name}</h3>
                      <p className="cart-item-category">{item.category}</p>
                    </div>
                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="cart-item-bottom">
                    <div className="quantity-selector">
                      <button
                        className="quantity-btn decrease"
                        aria-label="Decrease quantity"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        −
                      </button>
                      <span className="quantity-num">{item.quantity}</span>
                      <button
                        className="quantity-btn increase"
                        aria-label="Increase quantity"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Order Summary */}
          <div className="cart-summary animate-fade-in-up delay-300">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Complimentary</span>
            </div>
            <div className="summary-row">
              <span>Taxes</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Link href="/checkout" className="btn-primary" style={{ width: '100%', marginTop: '24px', justifyContent: 'center' }}>
              Proceed to Checkout
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </Link>

            <div className="summary-footer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
