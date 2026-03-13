import React from "react";
import "./profile.css";

export default function ProfilePage() {
  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1 className="profile-title">My Account</h1>
      </div>

      <div className="profile-layout">
        {/* Sidebar Navigation */}
        <aside className="profile-sidebar">
          <nav className="profile-nav">
            <a href="#" className="profile-nav-link active">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile Overview
            </a>
            <a href="#" className="profile-nav-link">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              My Orders
            </a>
            <a href="#" className="profile-nav-link">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Wishlist
            </a>
            <a href="#" className="profile-nav-link">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Address Book
            </a>
            <a href="#" className="profile-nav-link">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Payment Methods
            </a>
            <a href="#" className="profile-nav-link logout">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="profile-content">
          <div className="profile-welcome">
            <div className="profile-avatar">
              JD
            </div>
            <div className="profile-welcome-text">
              <h2>Welcome back, John Doe</h2>
              <p>johndoe@example.com</p>
            </div>
          </div>

          <div className="profile-cards">
            {/* Profile Details Card */}
            <div className="profile-card">
              <div className="profile-card-header">
                <h3 className="profile-card-title">Personal Data</h3>
                <button className="profile-card-edit">Edit</button>
              </div>
              <div className="profile-info-group">
                <p className="profile-info-label">Name</p>
                <p className="profile-info-value">John Doe</p>
              </div>
              <div className="profile-info-group">
                <p className="profile-info-label">Email</p>
                <p className="profile-info-value">johndoe@example.com</p>
              </div>
              <div className="profile-info-group">
                <p className="profile-info-label">Phone</p>
                <p className="profile-info-value">+1 (555) 123-4567</p>
              </div>
            </div>

            {/* Default Address Card */}
            <div className="profile-card">
              <div className="profile-card-header">
                <h3 className="profile-card-title">Default Address</h3>
                <button className="profile-card-edit">Edit</button>
              </div>
              <div className="profile-info-group">
                <p className="profile-info-value">John Doe</p>
                <p className="profile-info-value" style={{color: '#777', marginTop: '4px'}}>123 Luxury Lane, Suite 400</p>
                <p className="profile-info-value" style={{color: '#777', marginTop: '4px'}}>Beverly Hills, CA 90210</p>
                <p className="profile-info-value" style={{color: '#777', marginTop: '4px'}}>United States</p>
              </div>
            </div>
          </div>

          {/* Recent Orders Overview */}
          <div className="profile-orders">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 className="profile-orders-title" style={{ borderBottom: "none", margin: 0 }}>Recent Orders</h3>
              <a href="#" className="profile-card-edit" style={{ textDecoration: "none" }}>View All</a>
            </div>
            
            <table className="profile-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="profile-order-id">#ORD-0294</td>
                  <td style={{ color: "#777" }}>Oct 24, 2023</td>
                  <td>
                    <span className="status-badge">Delivered</span>
                  </td>
                  <td style={{ textAlign: "right", fontWeight: 500 }}>$349.00</td>
                </tr>
                <tr>
                  <td className="profile-order-id">#ORD-0182</td>
                  <td style={{ color: "#777" }}>Sep 12, 2023</td>
                  <td>
                    <span className="status-badge">Delivered</span>
                  </td>
                  <td style={{ textAlign: "right", fontWeight: 500 }}>$129.50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
