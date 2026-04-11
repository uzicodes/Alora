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

    // Fetch orders, products and users from DB in real-time
    const [orders, products, users] = await Promise.all([
        prisma.order.findMany({
            orderBy: { orderTime: 'desc' }
        }),
        prisma.product.findMany({
            orderBy: { brand: 'asc' }
        }),
        prisma.user.findMany({
            include: {
                orders: {
                    select: { id: true, orderTime: true },
                    orderBy: { orderTime: 'desc' }
                },
                _count: {
                    select: { orders: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        })
    ]);

    return (
        <AdminDashboardClient 
            initialOrders={JSON.parse(JSON.stringify(orders))} 
            initialProducts={JSON.parse(JSON.stringify(products))} 
            initialUsers={JSON.parse(JSON.stringify(users))}
        />
    );
}

