"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useCart } from "../components/CartContext";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const { clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    // Clear cart when landing on success page
    clearCart();
  }, [clearCart]);

  return (
    <div style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '20px',
      fontFamily: 'inherit'
    }}>
      <div 
        className="animate-fade-in-up"
        style={{
          backgroundColor: '#dcfce7',
          border: '3px solid #000',
          boxShadow: '8px 8px 0px #000',
          padding: '50px 30px',
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        <div style={{ 
          width: '80px', 
          height: '80px', 
          borderRadius: '50%', 
          backgroundColor: '#22c55e', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          border: '3px solid #000',
          boxShadow: '4px 4px 0px #000'
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        
        <h1 style={{ fontSize: '2.2rem', margin: '10px 0 0 0', fontWeight: 900, textTransform: 'uppercase', lineHeight: '1.1' }}>
          Payment Successful!
        </h1>
        
        <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#222', margin: 0, padding: '0 10px' }}>
          Thank you for your order. We are processing it and will reach out to you shortly.
        </p>

        <div style={{ display: 'flex', gap: '15px', marginTop: '20px', width: '100%', flexDirection: 'column' }}>
          <button
            onClick={() => router.push('/shop')}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: '#000',
              color: '#fff',
              fontSize: '1.2rem',
              fontWeight: 800,
              border: '2px solid #000',
              cursor: 'pointer',
              transition: 'all 0.1s ease',
              textTransform: 'uppercase',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#333'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#000'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Shop More
          </button>

          <button
            onClick={() => router.push('/')}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: '#fff',
              color: '#000',
              fontSize: '1.2rem',
              fontWeight: 800,
              border: '2px solid #000',
              boxShadow: '4px 4px 0px #000',
              cursor: 'pointer',
              transition: 'all 0.1s ease',
              textTransform: 'uppercase',
            }}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'translate(2px, 2px)'; e.currentTarget.style.boxShadow = '2px 2px 0px #000'; }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '4px 4px 0px #000'; }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f9f9f9'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; }}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
