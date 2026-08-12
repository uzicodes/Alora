"use client";

import React, { useEffect } from "react";
import { useCart } from "../components/CartContext";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
// @ts-ignore
import styles from "./success.module.css";

function SuccessContent() {
  const { clearCart } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const transactionId =
    searchParams.get("tran_id") || searchParams.get("id") || "N/A";

  useEffect(() => {
    // Clear cart when landing on success page
    clearCart();
  }, [clearCart]);

  return (
    <div className={styles.container}>
      <div className={`${styles.card} animate-fade-in-up`}>
        <div className={styles.iconWrapper}>
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#c8ea32"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        <h1 className={styles.title}>
          {transactionId.startsWith("COD-")
            ? "Order Successful"
            : "Payment Successful!"}
        </h1>

        <p className={styles.description}>
          Thank you for your order. We are processing it. Check your mailbox for
          the order details.
        </p>

        <div className={styles.transactionBox}>
          <span className={styles.transactionLabel}>Transaction ID:</span>
          <span className={styles.transactionVal}>{transactionId}</span>
        </div>

        <div className={styles.btnGroup}>
          <button
            type="button"
            onClick={() => router.push("/shop")}
            className={styles.shopMoreBtn}
          >
            Shop More
          </button>

          <button
            type="button"
            onClick={() => router.push("/")}
            className={styles.backHomeBtn}
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
    <Suspense
      fallback={
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
