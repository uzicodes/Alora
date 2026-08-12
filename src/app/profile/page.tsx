"use client";

import React, { useEffect, useState, useRef } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Image from "next/image";
import "./profile.css";
import { getUserProfile, updateUserProfile, getUserOrders } from "./actions";
import Loader from "../components/Loader";
import { useCart } from "../components/CartContext";



function OrderItemDropdown({ items }: { items: any }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!Array.isArray(items) || items.length === 0) {
    return <span className="ordered-item-name">N/A</span>;
  }

  return (
    <div className="order-items-dropdown-container">
      <button 
        type="button"
        className={`dropdown-toggle-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{items.length} {items.length === 1 ? 'ITEM' : 'ITEMS'}</span>
        <svg 
          width="12" height="12" viewBox="0 0 24 24" fill="none" 
          stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          className={`chevron-icon ${isOpen ? 'open' : ''}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      
      {isOpen && (
        <div className="dropdown-content animate-slide-down">
          {items.map((item: any) => (
            <div key={item.name} className="dropdown-item">
              <span className="item-qty">{item.quantity}x</span>
              <span className="item-name">{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProfilePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const { clearCart } = useCart();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [state, setState] = useState({
    phone: "",
    street: "",
    city: "",
    country: "",
    orders: [] as any[],
  });
  const { phone, street, city, country, orders } = state;

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;

    let isMounted = true;
    setIsLoadingData(true);

    Promise.all([
      getUserProfile(user.id),
      getUserOrders(user.id)
    ]).then(([data, fetchedOrders]) => {
      if (!isMounted) return;
      setState((prev) => {
        let newPhone = prev.phone;
        let newStreet = prev.street;
        let newCity = prev.city;
        let newCountry = prev.country;
        
        if (data) {
          newPhone = data.phone || "";
          if (data.address) {
            const parts = data.address.split(",").map((p: string) => p.trim());
            newStreet = parts[0] || "";
            newCity = parts[1] || "";
            newCountry = parts[2] || "";
          }
        }
        
        return {
          ...prev,
          phone: newPhone,
          street: newStreet,
          city: newCity,
          country: newCountry,
          orders: fetchedOrders || prev.orders,
        };
      });
      setIsLoadingData(false);
    });

    return () => {
      isMounted = false;
    };
  }, [isLoaded, isSignedIn, user?.id]);

  if (isLoaded && !isSignedIn) {
    redirect("/login");
  }

  if (!isLoaded || !isSignedIn || isLoadingData) {
    return <Loader />;
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[a-zA-Z]/g, "");
    if (val.length > 15) val = val.slice(0, 15);
    setState(prev => ({ ...prev, phone: val }));
  };

  const toggleEdit = async () => {
    if (isEditing) {
      // SAVE flow
      setIsSaving(true);
      const fullAddress = [street, city, country]
        .filter((part) => part.trim() !== "")
        .join(", ");
      
      const res = await updateUserProfile(user.id, phone, fullAddress);
      setIsSaving(false);
      if (res.success) {
        setIsEditing(false);
      } else {
        alert("Failed to update profile.");
      }
    } else {
      setIsEditing(true);
    }
  };

  const getFullAddressDisplay = () => {
    const raw = [street, city, country].filter((p) => p.trim() !== "").join(", ");
    return raw || "Not provided";
  };

  return (
    <div className="profile-page-wrapper font-space-grotesk">
      <div className="profile-dashboard">
        {/* LEFT COLUMN: IDENTITY */}
        <aside className="profile-sidebar">
          <div className="identity-card">
            <button 
              type="button"
              className="edit-profile-btn" 
              onClick={toggleEdit} 
              disabled={isSaving} 
              aria-label={isEditing ? "Save Profile" : "Edit Profile"}
            >
              {isEditing ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  {isSaving ? "SAVING..." : "SAVE"}
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                  EDIT
                </>
              )}
            </button>
            <div className="avatar-wrapper">
              <Image src={user.imageUrl} alt="Profile" width={100} height={100} className="avatar-img" />
            </div>
            <h2 className="user-name">{user.fullName}</h2>
            <p className="user-email">{user.primaryEmailAddress?.emailAddress}</p>
            
            <div className="contact-details">
              <div className="info-item">
                <span className="label">PHONE</span>
                {isEditing ? (
                  <input
                    type="text"
                    aria-label="Phone Number"
                    className="edit-input"
                    placeholder="Enter phone..."
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                ) : (
                  <span className="value">{phone || "Not provided"}</span>
                )}
              </div>
              <div className="info-item">
                <span className="label">ADDRESS</span>
                {isEditing ? (
                  <div className="address-inputs">
                    <input
                      type="text"
                      aria-label="Street or House"
                      className="edit-input"
                      placeholder="Street/House"
                      value={street}
                      onChange={(e) => setState(prev => ({ ...prev, street: e.target.value }))}
                    />
                    <input
                      type="text"
                      aria-label="City"
                      className="edit-input"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setState(prev => ({ ...prev, city: e.target.value }))}
                    />
                    <input
                      type="text"
                      aria-label="Country"
                      className="edit-input"
                      placeholder="Country"
                      value={country}
                      onChange={(e) => setState(prev => ({ ...prev, country: e.target.value }))}
                    />
                  </div>
                ) : (
                  <span className="value">{getFullAddressDisplay()}</span>
                )}
              </div>
            </div>

            <button type="button" className="logout-btn" onClick={() => {
              clearCart();
              signOut({ redirectUrl: '/' });
            }}>
              LOG OUT
            </button>
          </div>
        </aside>

        {/* RIGHT COLUMN: ORDERS */}
        <main className="profile-content">
          <div className="section-header">
            <h3 className="section-title">RECENT ORDERS</h3>
          </div>

          <div className="orders-container">
            {orders.length === 0 ? (
              <div className="empty-orders-box">
                <p style={{ fontWeight: 'bold' }}>You have no recent orders.</p>
              </div>
            ) : (
              <table className="orders-table">
                <thead>
                  <tr>
                    <th className="text-center">ORDER ID</th>
                    <th className="text-center">DATE</th>
                    <th className="text-center">ITEMS</th>
                    <th className="text-center">PAYMENT</th>
                    <th className="text-center">TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="text-center">#{order.id.slice(-8).toUpperCase()}</td>
                      <td className="text-center">{new Date(order.orderTime).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                      <td className="text-center">
                        <OrderItemDropdown items={order.items} />
                      </td>
                      <td className="text-center">{order.paymentType}</td>
                      <td className="text-center">৳ {order.totalCost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
