"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../components/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, updateItemQuantity, clearCart } = useCart();

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
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 20px' }}>
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <p className="text-gray-500 mb-2 font-body uppercase tracking-wider" style={{ color: '#000', fontWeight: 'bold', fontSize: '14px' }}>Your cart is currently empty</p>
          <p className="mb-8 font-body" style={{ color: '#555', fontSize: '12px', letterSpacing: '0.5px' }}>Looks like you haven&apos;t added any fragrances yet.</p>
          <Link href="/shop" className="btn-primary" style={{ 
            display: 'inline-flex',
            marginTop: '24px',
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
                    <p className="cart-item-price" style={{ fontWeight: '900', color: '#000' }}>BDT {item.price}</p>
                  </div>
                  <div className="cart-item-bottom">
                    <div className="quantity-selector" style={{ border: '2px solid #000', borderRadius: '4px' }}>
                      <button
                        className="quantity-btn decrease"
                        aria-label="Decrease quantity"
                        onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        style={{ fontWeight: 'bold' }}
                      >
                        −
                      </button>
                      <span className="quantity-num" style={{ fontWeight: 'bold' }}>{item.quantity}</span>
                      <button
                        className="quantity-btn increase"
                        aria-label="Increase quantity"
                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        style={{ fontWeight: 'bold' }}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="remove-btn-styled"
                      onClick={() => removeFromCart(item.id)}
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
              <span>BDT {subtotal}</span>
            </div>
            <div className="summary-row" style={{ fontWeight: '600' }}>
              <span>Shipping</span>
              <span>Complimentary</span>
            </div>
            <div className="summary-divider" style={{ borderTop: '2px solid #000' }}></div>
            <div className="summary-row summary-total" style={{ color: '#111', fontWeight: '900' }}>
              <span>Total</span>
              <span>BDT {total}</span>
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

            <button 
              onClick={clearCart}
              style={{
                display: 'block',
                margin: '24px auto 0',
                padding: '6px 16px',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: 'bold',
                color: '#ef4444',
                backgroundColor: '#fff',
                border: '2px solid #ef4444',
                boxShadow: '2px 2px 0px #ef4444',
                cursor: 'pointer',
                transition: 'all 0.1s'
              }}
              onMouseDown={(e) => { e.currentTarget.style.transform = 'translate(2px, 2px)'; e.currentTarget.style.boxShadow = '0px 0px 0px #ef4444'; }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '2px 2px 0px #ef4444'; }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#ef4444'; e.currentTarget.style.color = '#fff'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '2px 2px 0px #ef4444'; e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.color = '#ef4444'; }}
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}