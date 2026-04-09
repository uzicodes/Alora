"use server";

import prisma from "@/lib/prisma";

export async function getUserProfile(clerkId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: clerkId },
      select: { phone: true, address: true },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

export async function updateUserProfile(clerkId: string, phone: string, address: string) {
  try {
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
    const orders = await prisma.order.findMany({
      where: { userId: clerkId },
      orderBy: { orderTime: 'desc' },
    });
    return orders;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return [];
  }
}
