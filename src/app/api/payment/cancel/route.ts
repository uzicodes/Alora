import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const tran_id = formData.get("tran_id") as string | null;

        const { searchParams } = new URL(req.url);
        const queryTranId = searchParams.get("tran_id");
        const transactionId = tran_id || queryTranId;

        if (transactionId) {
            await prisma.order.update({
                where: { trxId: transactionId },
                data: { paymentStatus: "CANCELLED" },
            });
        }
    } catch (error) {
        console.error("Payment cancel handler error:", error);
    }

    return NextResponse.redirect(new URL("/checkout", req.url), 303);
}
