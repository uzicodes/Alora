import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { total, cus_name, cus_email, cus_phone, cartItems, userId } = await req.json();

        // Generate a unique transaction ID for this order
        const tran_id = `COD-${Date.now()}`;

        // Save a PENDING order to the database for COD
        await prisma.order.create({
            data: {
                userId: userId || "", // Ensure userId is provided or handled appropriately
                name: cus_name,
                email: cus_email,
                phone: cus_phone,
                items: cartItems,
                totalCost: total,
                paymentType: "COD",
                trxId: tran_id,
                paymentStatus: "PENDING", // PENDING since it's COD
            },
        });

        return NextResponse.json({ success: true, message: "Order placed successfully" });
    } catch (error) {
        console.error("Payment COD API failed:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
