"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../components/CartContext";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import "./checkout.css";
import { getUserProfile } from "../profile/actions";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, clearCart } = useCart();
  const { user, isLoaded, isSignedIn } = useUser();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    postCode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.fullName || "",
        email: user.primaryEmailAddress?.emailAddress || "",
        phone: user.primaryPhoneNumber?.phoneNumber || "",
      }));

      // Fetch profile data from database
      getUserProfile(user.id).then((data) => {
        if (data && data.phone) {
          setFormData(prev => ({
            ...prev,
            phone: data.phone as string
          }));
        }
      });
    }
  }, [isLoaded, isSignedIn, user]);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal; // complimentary shipping

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[a-zA-Z]/g, "");
    if (val.length > 15) val = val.slice(0, 15);
    setFormData({ ...formData, phone: val });
  };

  const isShippingValid = formData.street.trim() !== "" && formData.city.trim() !== "" && formData.postCode.trim() !== "";
  const isContactValid = formData.fullName.trim() !== "" && formData.email.trim() !== "" && formData.phone.trim() !== "";
  const isFormValid = isShippingValid && isContactValid;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0 || !isFormValid) return;

    setIsSubmitting(true);

    if (paymentMethod === "card" || paymentMethod === "mobile") {
      try {
        const response = await fetch("/api/payment/init", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            total: total,
            cus_name: formData.fullName,
            cus_email: formData.email,
            cus_phone: formData.phone,
            street: formData.street,
            city: formData.city,
            postCode: formData.postCode,
            cartItems: cartItems,
            userId: user?.id,
          }),
        });

        const data = await response.json();

        if (data.success && data.url) {
          window.location.href = data.url;
        } else {
          alert("Failed to initialize payment gateway. Please try again.");
          setIsSubmitting(false);
          return;
        }
      } catch (error) {
        console.error("Gateway trigger failed:", error);
        alert("Something went wrong while connecting to the payment gateway.");
        setIsSubmitting(false);
        return;
      }
    }

    if (paymentMethod === "cod") {
      try {
        const response = await fetch("/api/payment/cod", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            total: total,
            cus_name: formData.fullName,
            cus_email: formData.email,
            cus_phone: formData.phone,
            street: formData.street,
            city: formData.city,
            postCode: formData.postCode,
            cartItems: cartItems,
            userId: user?.id,
          }),
        });

        const data = await response.json();

        if (data.success) {
          clearCart();
          setIsSubmitting(false);
          router.push(`/success?tran_id=${data.tran_id}`);
        } else {
          alert("Failed to create COD order. Please try again.");
          setIsSubmitting(false);
        }
      } catch (error) {
        console.error("COD order failed:", error);
        alert("Something went wrong while placing order.");
        setIsSubmitting(false);
      }
    }
  };

  if (cartItems.length === 0 && !isSubmitting) {
    return (
      <div className="checkout-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 className="checkout-title">Checkout</h1>
        <div style={{ marginTop: '40px', textAlign: 'center', border: '2px solid #000', padding: '40px', backgroundColor: 'beige', boxShadow: '6px 6px 0px #000' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '20px' }}>Your cart is empty. You cannot proceed to checkout.</p>
          <Link href="/shop" style={{ display: 'inline-block', padding: '12px 24px', backgroundColor: '#000', color: '#fff', fontWeight: 'bold' }}>
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button
          onClick={() => router.back()}
          className="back-btn"
          aria-label="Go back"
          style={{
            background: 'none',
            border: '2px solid #000',
            padding: '5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '2px 2px 0px #000',
            transition: '0.1s'
          }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'translate(1px, 1px)'; e.currentTarget.style.boxShadow = '1px 1px 0px #000'; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '2px 2px 0px #000'; }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <h1 className="checkout-title animate-fade-in-up" style={{ margin: 0 }}>Secure Checkout</h1>
      </div>

      <div className="checkout-layout">
        {/* Left: Checkout Form */}
        <div className="checkout-form-container animate-fade-in-up delay-200">
          <form id="checkout-form" onSubmit={handlePlaceOrder}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '2px solid #000', paddingBottom: '6px', marginBottom: '12px' }}>
              <h2 className="checkout-section-title" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: 0 }}>Contact Details</h2>
              {isSignedIn && (
                <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#555', marginBottom: '2px' }}>
                  If needed, update in <Link href="/profile" style={{ textDecoration: 'underline', color: '#e81c1cff' }}>Profile</Link>
                </span>
              )}
            </div>

            <div className="form-group">
              <label className="checkout-label">Full Name</label>
              <input type="text" name="fullName" className="checkout-input" value={formData.fullName} onChange={handleChange} required readOnly={!!isSignedIn} style={isSignedIn ? { backgroundColor: '#ebebeb', color: '#777', cursor: 'not-allowed', borderColor: '#aaa' } : {}} />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="checkout-label">Email Address</label>
                <input type="email" name="email" className="checkout-input" value={formData.email} onChange={handleChange} required readOnly={!!isSignedIn} style={isSignedIn ? { backgroundColor: '#ebebeb', color: '#777', cursor: 'not-allowed', borderColor: '#aaa' } : {}} />
              </div>
              <div className="form-group">
                <label className="checkout-label">Phone Number</label>
                <input type="text" name="phone" className="checkout-input" value={formData.phone} onChange={handlePhoneChange} required readOnly={!!isSignedIn} style={isSignedIn ? { backgroundColor: '#ebebeb', color: '#777', cursor: 'not-allowed', borderColor: '#aaa' } : {}} />
              </div>
            </div>

            <h2 className="checkout-section-title" style={{ marginTop: '30px' }}>
              Shipping Address <span style={{ color: '#e81c1cff' }}>*</span>
            </h2>
            <div className="form-row">
              <div className="form-group" style={{ flex: 2 }}>
                <label className="checkout-label">Street / House <span style={{ color: '#e81c1cff' }}>*</span></label>
                <input type="text" name="street" className="checkout-input" value={formData.street} onChange={handleChange} required />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="checkout-label">City <span style={{ color: '#e81c1cff' }}>*</span></label>
                <input type="text" name="city" className="checkout-input" value={formData.city} onChange={handleChange} required />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="checkout-label">Post Code <span style={{ color: '#e81c1cff' }}>*</span></label>
                <input type="text" name="postCode" className="checkout-input" value={formData.postCode} onChange={handleChange} required />
              </div>
            </div>

            <h2 className="checkout-section-title" style={{ marginTop: '30px' }}>Payment Method</h2>
            <div className="form-row">
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="cod" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', border: '2px solid #000', backgroundColor: paymentMethod === 'cod' ? '#dcfce7' : '#f9f9f9', fontWeight: 'bold', cursor: 'pointer', height: '100%', fontSize: '12px' }}>
                  <input type="radio" name="payment" value="cod" id="cod" checked={paymentMethod === 'cod'} onChange={handlePaymentChange} style={{ accentColor: '#000', width: '18px', height: '18px' }} />
                  Cash on Delivery (COD)
                </label>
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="card" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', border: '2px solid #000', backgroundColor: paymentMethod === 'card' ? '#dcfce7' : '#f9f9f9', fontWeight: 'bold', cursor: 'pointer', height: '100%', fontSize: '12px' }}>
                  <input type="radio" name="payment" value="card" id="card" checked={paymentMethod === 'card'} onChange={handlePaymentChange} style={{ accentColor: '#000', width: '18px', height: '18px' }} />
                  Credit / Debit Card
                </label>
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="mobile" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', border: '2px solid #000', backgroundColor: paymentMethod === 'mobile' ? '#dcfce7' : '#f9f9f9', fontWeight: 'bold', cursor: 'pointer', height: '100%', fontSize: '12px' }}>
                  <input type="radio" name="payment" value="mobile" id="mobile" checked={paymentMethod === 'mobile'} onChange={handlePaymentChange} style={{ accentColor: '#000', width: '18px', height: '18px' }} />
                  Mobile Banking
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="checkout-summary animate-fade-in-up delay-300">
          <h2 className="checkout-section-title" style={{ borderBottomColor: '#000', textAlign: 'center', fontSize: '20px', paddingBottom: '10px', marginBottom: '20px', textTransform: 'uppercase' }}>Order Summary</h2>

          <div style={{ marginBottom: '20px' }}>
            {cartItems.map((item) => (
              <div key={item.id} className="summary-item">
                <div className="summary-item-name">
                  {item.quantity}x {item.name}
                </div>
                <div>BDT {item.price * item.quantity}</div>
              </div>
            ))}
          </div>


          <div className="summary-item" style={{ border: 'none', color: '#000' }}>
            <span>Shipping</span>
            <span>Complimentary</span>
          </div>

          <div className="summary-total">
            <span>YOUR TOTAL</span>
            <span>BDT {total}</span>
          </div>

          <button
            type="submit"
            form="checkout-form"
            className="place-order-btn"
            disabled={isSubmitting || cartItems.length === 0 || !isFormValid}
            style={(!isFormValid && !isSubmitting && cartItems.length > 0) ? { backgroundColor: '#ccc', cursor: 'not-allowed', filter: 'grayscale(1)' } : {}}
          >
            {isSubmitting ? "PROCESSING..." : "PLACE ORDER"}
          </button>

          <p className="place-order-info">
            By placing your order, you agree to Alora's Terms & Conditions and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}