import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";
import prisma from "@/lib/prisma";

export default async function AdminDashboard() {
    const cookieStore = await cookies();
    const adminSession = cookieStore.get("admin_session");

    if (!adminSession || adminSession.value !== "authorized") {
        redirect("/admin/login");
    }

    // Fetch orders and products from DB in real-time
    const [orders, products] = await Promise.all([
        prisma.order.findMany({
            orderBy: { orderTime: 'desc' }
        }),
        prisma.product.findMany({
            orderBy: { brand: 'asc' }
        })
    ]);

    return (
        <AdminDashboardClient 
            initialOrders={JSON.parse(JSON.stringify(orders))} 
            initialProducts={JSON.parse(JSON.stringify(products))} 
        />
    );
}

