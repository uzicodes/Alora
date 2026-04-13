import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendOrderEmail } from "@/lib/mail";

export async function POST(req: Request) {
    try {
        // SSLCommerz sends form-data in the POST with the transaction details
        const formData = await req.formData();
        const tran_id = formData.get("tran_id") as string | null;
        const status = formData.get("status") as string | null;

        // pass tran_id in success_url
        const { searchParams } = new URL(req.url);
        const queryTranId = searchParams.get("tran_id");

        const transactionId = tran_id || queryTranId;

        if (!transactionId) {
            console.error("No tran_id received from SSLCommerz");
            return NextResponse.redirect(new URL("/checkout", req.url), 303);
        }

        if (status === 'VALID') {
            // Find the PENDING order & update its status to PAID
            const updatedOrder = await prisma.order.update({
                where: { trxId: transactionId },
                data: { paymentStatus: "PAID" },
            });

            // Call utility function to send a success email
            try {
                await sendOrderEmail(
                    updatedOrder.email,
                    updatedOrder.name,
                    transactionId,
                    updatedOrder.totalCost
                );
            } catch (emailError) {
                console.error("Failed to send order email:", emailError);
            }
        }

        // Redirect user to success page
        return NextResponse.redirect(new URL("/success", req.url), 303);

    } catch (error) {
        console.error("Payment success handler failed:", error);
        // Even if DB update fails, still redirect 
        return NextResponse.redirect(new URL("/success", req.url), 303);
    }
}
