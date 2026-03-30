"use client";

import React, { useEffect } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "./profile.css";

export default function ProfilePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/login");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 bg-white">
        <p style={{ fontWeight: 'bold' }}>Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-page-wrapper">
      <div className="profile-dashboard">
        
        {/* LEFT COLUMN: IDENTITY */}
        <aside className="profile-sidebar">
          <div className="identity-card">            <button className="edit-profile-btn" aria-label="Edit Profile">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
              EDIT
            </button>
            <div className="avatar-wrapper">
              <img src={user.imageUrl} alt="Profile" className="avatar-img" />
            </div>
            <h2 className="user-name">{user.fullName}</h2>
            <p className="user-email">{user.primaryEmailAddress?.emailAddress}</p>
            
            <div className="contact-details">
              <div className="info-item">
                <span className="label">PHONE</span>
                <span className="value">{user.primaryPhoneNumber?.phoneNumber || "Not provided"}</span>
              </div>
              <div className="info-item">
                <span className="label">ADDRESS</span>
                <span className="value">123 Fragrance Lane, Dhaka, Bangladesh</span>
              </div>
            </div>

            <button className="logout-btn" onClick={() => signOut({ redirectUrl: '/' })}>
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
            {/* Table for Orders */}
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
                <tr>
                  <td>#AL-9921</td>
                  <td>Mar 28, 2026</td>
                  <td><span className="status-tag">SHIPPED</span></td>
                  <td className="text-center">৳ 12,500</td>
                </tr>
                <tr>
                  <td>#AL-9845</td>
                  <td>Feb 15, 2026</td>
                  <td><span className="status-tag">DELIVERED</span></td>
                  <td className="text-center">৳ 8,200</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>

      </div>
    </div>
  );
}
