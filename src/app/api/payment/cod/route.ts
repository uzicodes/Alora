import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendOrderEmail } from "@/lib/mail";

export async function POST(req: Request) {
    try {
        const { total, cus_name, cus_email, cus_phone, street, city, postCode, cartItems, userId } = await req.json();

        // Generate a unique transaction ID for this order
        const tran_id = `COD-${Date.now()}`;
        const shippingAddress = `${street}, ${city}, ${postCode}`;
        // Prisma Client has been generated with 'address' field.

        // Save a PENDING order to the database for COD
        const createdOrder = await prisma.order.create({
            data: {
                userId: userId || "", // Ensure userId is provided or handled appropriately
                name: cus_name,
                email: cus_email,
                phone: cus_phone,
                address: shippingAddress,
                items: cartItems,
                totalCost: total,
                paymentType: "COD",
                trxId: tran_id,
                paymentStatus: "PENDING", // COD
            },
        });

        // Send order confirmation email
        try {
            await sendOrderEmail(createdOrder);
        } catch (emailError) {
            console.error("Failed to send COD order email:", emailError);
        }

        return NextResponse.json({ success: true, message: "Order placed successfully" });
    } catch (error) {
        console.error("Payment COD API failed:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
