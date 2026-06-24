"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getUserProfile(clerkId: string) {
  try {
    const { userId } = await auth();
    console.log("[getUserProfile] auth userId:", userId, "| client clerkId:", clerkId);
    if (!userId || userId !== clerkId) {
      console.log("[getUserProfile] UNAUTHORIZED — mismatch or null");
      throw new Error("Unauthorized");
    }
    const user = await prisma.user.findUnique({
      where: { id: clerkId },
      select: { phone: true, address: true },
    });
    console.log("[getUserProfile] DB result:", user);
    return user;
  } catch (error) {
    console.error("[getUserProfile] ERROR:", error);
    return null;
  }
}

export async function updateUserProfile(clerkId: string, phone: string, address: string) {
  try {
    const { userId } = await auth();
    if (!userId || userId !== clerkId) {
      throw new Error("Unauthorized");
    }
    await prisma.user.update({
      where: { id: clerkId },
      data: { phone, address },
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return { success: false };
  }
}

export async function getUserOrders(clerkId: string) {
  try {
    const { userId } = await auth();
    console.log("[getUserOrders] auth userId:", userId, "| client clerkId:", clerkId);
    if (!userId || userId !== clerkId) {
      console.log("[getUserOrders] UNAUTHORIZED — mismatch or null");
      throw new Error("Unauthorized");
    }
    const orders = await prisma.order.findMany({
      where: { userId: clerkId },
      orderBy: { orderTime: 'desc' },
    });
    console.log("[getUserOrders] Found", orders.length, "orders");
    return orders;
  } catch (error) {
    console.error("[getUserOrders] ERROR:", error);
    return [];
  }
}

