"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../components/CartContext";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Cart() {
  const { cartItems, removeFromCart, updateItemQuantity, clearCart } =
    useCart();
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  const handleCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    if (!isSignedIn) {
      toast.error("Please login to proceed to checkout", {
        id: "auth-checkout-toast",
        duration: 3000,
        style: {
          border: "1px solid rgba(194, 178, 128, 0.3)",
          padding: "16px",
          color: "#f0ece6",
          backgroundColor: "#0A2A1F",
          fontWeight: "bold",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
          borderRadius: "8px",
          fontSize: "14px",
        },
      });

      // Delay navigation a bit so the user can see the toast
      setTimeout(() => {
        router.push("/login");
      }, 1500);
      return;
    }

    router.push("/checkout");
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal;

  return (
    <div className="cart-page font-space-grotesk">
      <div className="cart-header">
        <h1 className="cart-title animate-fade-in-up">YOUR CART</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty-box animate-fade-in-up">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#c8ea32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ margin: "0 auto 20px" }}
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <p className="cart-empty-title">Your cart is currently empty</p>
          <p className="cart-empty-desc">
            Looks like you haven&apos;t added any fragrances yet.
          </p>
          <Link href="/shop" className="cart-empty-btn">
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
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="cart-item-details">
                  <div className="cart-item-top">
                    <div>
                      <h3 className="cart-item-name">{item.name}</h3>
                      <p className="cart-item-category">{item.category}</p>
                    </div>
                    <p className="cart-item-price">BDT {item.price}</p>
                  </div>
                  <div className="cart-item-bottom">
                    <div className="quantity-selector">
                      <button
                        type="button"
                        className="quantity-btn decrease"
                        aria-label="Decrease quantity"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span className="quantity-num">{item.quantity}</span>
                      <button
                        type="button"
                        className="quantity-btn increase"
                        aria-label="Increase quantity"
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Order Summary */}
          <div className="cart-summary cart-summary-card animate-fade-in-up delay-300">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>BDT {subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span style={{ color: "#c8ea32" }}>Complimentary</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>BDT {total}</span>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="summary-checkout-btn"
            >
              Proceed to Checkout
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginLeft: "8px" }}
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </button>

            <div className="summary-footer">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>Secure Checkout</span>
            </div>

            <button type="button" onClick={clearCart} className="clear-cart-btn">
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}