"use client";

import React, { useEffect, useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "./profile.css";
import { getUserProfile, updateUserProfile, getUserOrders } from "./actions";
import Loader from "../components/Loader";
import { useCart } from "../components/CartContext";



export default function ProfilePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const { clearCart } = useCart();

  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/login");
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    if (isLoaded && isSignedIn && user && !initialDataLoaded) {
      Promise.all([
        getUserProfile(user.id),
        getUserOrders(user.id)
      ]).then(([data, fetchedOrders]) => {
        if (data) {
          setPhone(data.phone || "");
          if (data.address) {
            const parts = data.address.split(",").map((p) => p.trim());
            setStreet(parts[0] || "");
            setCity(parts[1] || "");
            setCountry(parts[2] || "");
          }
        }
        if (fetchedOrders) {
          setOrders(fetchedOrders);
        }
        setInitialDataLoaded(true);
      });
    }
  }, [isLoaded, isSignedIn, user, initialDataLoaded]);

  if (!isLoaded || !isSignedIn || !initialDataLoaded) {
    return <Loader />;
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[a-zA-Z]/g, "");
    if (val.length > 15) val = val.slice(0, 15);
    setPhone(val);
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
    <div className="profile-page-wrapper">
      <div className="profile-dashboard">
        {/* LEFT COLUMN: IDENTITY */}
        <aside className="profile-sidebar">
          <div className="identity-card">
            <button 
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
              <img src={user.imageUrl} alt="Profile" className="avatar-img" />
            </div>
            <h2 className="user-name">{user.fullName}</h2>
            <p className="user-email">{user.primaryEmailAddress?.emailAddress}</p>
            
            <div className="contact-details">
              <div className="info-item">
                <span className="label">PHONE</span>
                {isEditing ? (
                  <input
                    type="text"
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
                      className="edit-input"
                      placeholder="Street/House"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                    />
                    <input
                      type="text"
                      className="edit-input"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <input
                      type="text"
                      className="edit-input"
                      placeholder="Country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>
                ) : (
                  <span className="value">{getFullAddressDisplay()}</span>
                )}
              </div>
            </div>

            <button className="logout-btn" onClick={() => {
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
              <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#f9f9f9', border: '2px solid #000' }}>
                <p style={{ fontWeight: 'bold' }}>You have no recent orders.</p>
              </div>
            ) : (
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>ORDER ID</th>
                    <th>DATE</th>
                    <th>STATUS</th>
                    <th className="text-center">TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>#{order.id.slice(-8).toUpperCase()}</td>
                      <td>{new Date(order.orderTime).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                      <td><span className="status-tag">PROCESSING</span></td>
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
