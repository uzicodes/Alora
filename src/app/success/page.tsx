"use client";

import React, { useEffect } from "react";
import { useCart } from "../components/CartContext";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const { clearCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const transactionId = searchParams.get('tran_id') || searchParams.get('id') || "N/A";

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
          {transactionId.startsWith('COD-') ? 'Order Successful' : 'Payment Successful!'}
        </h1>

        <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#222', margin: 0, padding: '0 10px' }}>
          Thank you for your order. We are processing it. Check your mailbox for the Order Details.
        </p>

        <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#333', margin: '15px 0 0 0', textAlign: 'center' }}>
          <span style={{ color: 'red' }}>Transaction ID:</span> <span style={{ fontWeight: 900, fontFamily: 'monospace', textDecoration: 'underline' }}>{transactionId}</span>
        </p>

        <div style={{ display: 'flex', gap: '15px', marginTop: '20px', width: '100%', flexDirection: 'row' }}>
          <button
            onClick={() => router.push('/shop')}
            style={{
              flex: 1,
              padding: '15px',
              backgroundColor: '#000',
              color: '#fff',
              fontSize: '1rem',
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
              flex: 1,
              padding: '15px',
              backgroundColor: '#fff',
              color: '#000',
              fontSize: '1rem',
              fontWeight: 800,
              border: '2px solid #000',
              cursor: 'pointer',
              transition: 'all 0.1s ease',
              textTransform: 'uppercase',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f9f9f9'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
