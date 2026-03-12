import Image from "next/image";
import Link from "next/link";

export default function Cart() {
  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1 className="cart-title animate-fade-in-up">Your Cart</h1>
        <div className="section-divider animate-fade-in-up delay-100"></div>
      </div>

      <div className="cart-layout">
        {/* Left: Cart Items */}
        <div className="cart-items animate-fade-in-up delay-200">
          <div className="cart-item">
            <div className="cart-item-image">
              <Image 
                src="/alora_BG.png" 
                alt="Midnight Oud" 
                fill 
                sizes="120px"
                style={{ objectFit: 'cover' }} 
              />
            </div>
            <div className="cart-item-details">
              <div className="cart-item-top">
                <div>
                  <h3 className="cart-item-name">Midnight Oud</h3>
                  <p className="cart-item-category">Eau de Parfum • 50ml</p>
                </div>
                <p className="cart-item-price">$185.00</p>
              </div>
              <div className="cart-item-bottom">
                <div className="quantity-selector">
                  <button className="quantity-btn" aria-label="Decrease quantity">−</button>
                  <span className="quantity-num">1</span>
                  <button className="quantity-btn" aria-label="Increase quantity">+</button>
                </div>
                <button className="remove-btn">Remove</button>
              </div>
            </div>
          </div>

          <div className="cart-item">
            <div className="cart-item-image">
              <Image 
                src="/alora_BG2.png" 
                alt="Velvet Rose" 
                fill 
                sizes="120px"
                style={{ objectFit: 'cover' }} 
              />
            </div>
            <div className="cart-item-details">
              <div className="cart-item-top">
                <div>
                  <h3 className="cart-item-name">Velvet Rose</h3>
                  <p className="cart-item-category">Extrait de Parfum • 100ml</p>
                </div>
                <p className="cart-item-price">$220.00</p>
              </div>
              <div className="cart-item-bottom">
                <div className="quantity-selector">
                  <button className="quantity-btn" aria-label="Decrease quantity">−</button>
                  <span className="quantity-num">1</span>
                  <button className="quantity-btn" aria-label="Increase quantity">+</button>
                </div>
                <button className="remove-btn">Remove</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="cart-summary animate-fade-in-up delay-300">
          <h2 className="summary-title">Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>$405.00</span>
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
            <span>$405.00</span>
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
    </div>
  );
}
