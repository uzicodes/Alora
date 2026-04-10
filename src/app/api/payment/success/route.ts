import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        // 1. SSLCommerz sends form-data in the POST body with the transaction details
        const formData = await req.formData();
        const tran_id = formData.get("tran_id") as string | null;

        // Also try query params as a fallback (we pass tran_id in success_url)
        const { searchParams } = new URL(req.url);
        const queryTranId = searchParams.get("tran_id");

        const transactionId = tran_id || queryTranId;

        if (!transactionId) {
            console.error("No tran_id received from SSLCommerz");
            return NextResponse.redirect(new URL("/checkout", req.url), 303);
        }

        // 2. Find the PENDING order and update its status to PAID
        await prisma.order.update({
            where: { trxId: transactionId },
            data: { paymentStatus: "PAID" },
        });

        // 3. Redirect user to the frontend success page
        return NextResponse.redirect(new URL("/success", req.url), 303);

    } catch (error) {
        console.error("Payment success handler failed:", error);
        // Even if DB update fails, still redirect so user isn't stuck on a raw API page
        return NextResponse.redirect(new URL("/success", req.url), 303);
    }
}
