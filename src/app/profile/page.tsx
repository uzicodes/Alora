"use client";

import React, { useEffect } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
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

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-start justify-center p-4 bg-white" style={{ paddingTop: '140px' }}>
        <p style={{ fontWeight: 'bold' }}>Loading...</p>
      </div>
    );
  }

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-start justify-center p-4 bg-white" style={{ paddingTop: '140px' }}>
      <div 
        style={{
          padding: '40px',
          background: 'lightblue',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          borderRadius: '5px',
          border: '2px solid black',
          boxShadow: '6px 6px black',
          width: '100%',
          maxWidth: '400px'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
          {user.imageUrl ? (
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', border: '2px solid black' }}>
              <img src={user.imageUrl} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ) : (
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'beige', border: '2px solid black', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              {user.firstName?.[0] || "U"}
            </div>
          )}
          
          <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#323232', margin: 0, textAlign: 'center' }}>
            {user.fullName}
          </h2>
          
          <p style={{ color: '#666', fontWeight: '600', fontSize: '15px', margin: 0 }}>
            {user.primaryEmailAddress?.emailAddress}
          </p>
        </div>

        <button 
          onClick={() => signOut({ redirectUrl: '/' })}
          style={{
            marginTop: '20px',
            width: '140px',
            height: '45px',
            borderRadius: '5px',
            border: '2px solid black',
            backgroundColor: 'beige',
            boxShadow: '4px 4px black',
            fontSize: '17px',
            fontWeight: '600',
            color: '#323232',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.boxShadow = '0px 0px black';
            e.currentTarget.style.transform = 'translate(3px, 3px)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.boxShadow = '4px 4px black';
            e.currentTarget.style.transform = 'none';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '4px 4px black';
            e.currentTarget.style.transform = 'none';
          }}
        >
          LOG OUT
        </button>
      </div>
    </div>
  );
}
