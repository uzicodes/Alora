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
  const total = subtotal;

  return (
    <div className="cart-page" style={{ paddingTop: '10px', paddingBottom: '40px', minHeight: '100vh', paddingLeft: '20px', paddingRight: '20px' }}>
      <div className="cart-header">
        <h1 className="cart-title text-lg animate-fade-in-up" style={{ fontWeight: '900', letterSpacing: '2px' }}>Your Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 animate-fade-in-up" style={{ 
          border: '2px solid #000', 
          boxShadow: '6px 6px 0px #000', 
          backgroundColor: 'beige', 
          padding: '40px', 
          borderRadius: '5px', 
          maxWidth: '500px', 
          margin: '0 auto' 
        }}>
          <p className="text-gray-500 mb-8 font-body uppercase tracking-wider" style={{ color: '#000', fontWeight: 'bold' }}>Your cart is empty.</p>
          <Link href="/shop" className="btn-primary" style={{ 
            display: 'inline-flex',
            border: '2px solid #000',
            boxShadow: '4px 4px 0px #000',
            backgroundColor: '#000',
            color: '#fff'
          }}>
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          {/* Left: Cart Items */}
          <div className="cart-items animate-fade-in-up delay-200">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item" style={{ 
                backgroundColor: '#ffffff', 
                padding: '12px 16px', 
                marginBottom: '16px', 
                border: '2px solid #000',     
                boxShadow: '4px 4px 0px #000', 
                borderRadius: '5px'
              }}>
                <div className="cart-item-image" style={{ border: '2px solid #000' }}>
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
                      <h3 className="cart-item-name" style={{ fontWeight: '900', color: '#000' }}>{item.name}</h3>
                      <p className="cart-item-category">{item.category}</p>
                    </div>
                    <p className="cart-item-price" style={{ fontWeight: '900', color: '#000' }}>${item.price.toFixed(2)}</p>
                  </div>
                  <div className="cart-item-bottom">
                    <div className="quantity-selector" style={{ border: '2px solid #000', borderRadius: '4px' }}>
                      <button
                        className="quantity-btn decrease"
                        aria-label="Decrease quantity"
                        onClick={() => decreaseQuantity(item.id)}
                        style={{ fontWeight: 'bold' }}
                      >
                        −
                      </button>
                      <span className="quantity-num" style={{ fontWeight: 'bold' }}>{item.quantity}</span>
                      <button
                        className="quantity-btn increase"
                        aria-label="Increase quantity"
                        onClick={() => increaseQuantity(item.id)}
                        style={{ fontWeight: 'bold' }}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="remove-btn-styled"
                      onClick={() => removeItem(item.id)}
                      style={{
                        padding: '6px 16px',
                        border: '2px solid #000',       
                        boxShadow: '2px 2px 0px #000',  
                        fontSize: '10px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        cursor: 'pointer',
                        backgroundColor: '#fff',
                        transition: 'all 0.1s',
                        fontWeight: 'bold'
                      }}
                      onMouseDown={(e) => { e.currentTarget.style.transform = 'translate(2px, 2px)'; e.currentTarget.style.boxShadow = '0px 0px 0px #000'; }}
                      onMouseUp={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '2px 2px 0px #000'; }}
                      onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '2px 2px 0px #000'; e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#000'; }}
                      onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#ff4d4d'; e.currentTarget.style.color = '#fff'; }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Order Summary */}
          <div className="cart-summary animate-fade-in-up delay-300" style={{ 
            backgroundColor: '#1DC475', 
            color: '#111',
            border: '2px solid #000',      
            boxShadow: '6px 6px 0px #000', 
            borderRadius: '5px',
            padding: '24px'
          }}>
            <h2 className="summary-title" style={{ color: '#111', borderBottom: '2px solid #000', fontWeight: '900' }}>Order Summary</h2>
            <div className="summary-row" style={{ fontWeight: '600' }}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row" style={{ fontWeight: '600' }}>
              <span>Shipping</span>
              <span>Complimentary</span>
            </div>
            <div className="summary-divider" style={{ borderTop: '2px solid #000' }}></div>
            <div className="summary-row summary-total" style={{ color: '#111', fontWeight: '900' }}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Link href="/checkout" className="btn-primary" style={{ 
              width: '100%', 
              marginTop: '24px', 
              justifyContent: 'center',
              border: '2px solid #000',
              boxShadow: '4px 4px 0px #000',
              backgroundColor: 'beige',
              color: '#000',
              fontWeight: '900',
              transition: 'all 0.1s'
            }}>
              Proceed to Checkout
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </Link>

            <div className="summary-footer" style={{ fontWeight: 'bold' }}>
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