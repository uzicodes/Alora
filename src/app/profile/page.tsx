import React from "react";
import "./profile.css";

export default function ProfilePage() {
  return (
    <div className="profile-page">
      <div className="profile-container animate-fade-in-up">
        {/* Main Content */}
        <main className="profile-content">
          <header className="text-center" style={{ marginBottom: '25px' }}>
            <h1 className="text-4xl md:text-5xl font-david-libre uppercase tracking-[0.2em] mb-10 text-black">My Account</h1>
          </header>

          <div className="profile-welcome">
            <div className="profile-avatar">
              JD
            </div>
            <div className="profile-welcome-text">
              <h2>Welcome back, John Doe</h2>
            </div>
          </div>

          <div className="profile-sections">
            {/* Personal Data Section */}
            <div className="profile-section">
              <div className="profile-card-header">
                <h3 className="profile-section-title">Personal Data</h3>
                <button className="profile-card-edit">Edit</button>
              </div>
              <div className="profile-card">
                <div className="profile-grid-info">
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
                  <div className="profile-info-group">
                    <p className="profile-info-label">Address</p>
                    <p className="profile-info-value" style={{ lineHeight: '1.6' }}>
                      123 Luxury Lane, Suite 400<br />
                      Beverly Hills, CA 90210<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* My Orders Section */}
            <div className="profile-section">
              <div className="profile-card-header">
                <h3 className="profile-section-title">My Orders</h3>
              </div>
              <div className="profile-card table-card">
                <div className="table-responsive">
                  <table className="profile-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Items</th>
                        <th>Status</th>
                        <th style={{ textAlign: "right" }}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="profile-order-id">#ORD-0294</td>
                        <td className="text-muted">Oct 24, 2023</td>
                        <td className="text-muted">2 items</td>
                        <td><span className="status-badge">Delivered</span></td>
                        <td className="text-right fw-500">$349.00</td>
                      </tr>
                      <tr>
                        <td className="profile-order-id">#ORD-0182</td>
                        <td className="text-muted">Sep 12, 2023</td>
                        <td className="text-muted">1 item</td>
                        <td><span className="status-badge">Delivered</span></td>
                        <td className="text-right fw-500">$129.50</td>
                      </tr>
                      <tr>
                        <td className="profile-order-id">#ORD-0051</td>
                        <td className="text-muted">Jan 05, 2023</td>
                        <td className="text-muted">3 items</td>
                        <td><span className="status-badge">Delivered</span></td>
                        <td className="text-right fw-500">$540.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
