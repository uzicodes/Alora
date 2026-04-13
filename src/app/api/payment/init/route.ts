import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const baseUrl = process.env.NODE_ENV === 'production' ? 'https://aloraa.vercel.app' : 'http://localhost:3000';
    try {
        // Grab all order details from checkout page
        const { total, cus_name, cus_email, cus_phone, street, city, postCode, cartItems, userId } = await req.json();

        const store_id = process.env.SSLCOMMERZ_STORE_ID as string;
        const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD as string;

        // Generate a unique transaction ID for this order
        const tran_id = `REF-${Date.now()}`;
        const shippingAddress = `${street}, ${city}, ${postCode}`;


        // Save a PENDING order to the database BEFORE calling SSLCommerz
        await prisma.order.create({
            data: {
                userId: userId,
                name: cus_name,
                email: cus_email,
                phone: cus_phone,
                address: shippingAddress,
                items: cartItems,       // as JSON (array)
                totalCost: total,
                paymentType: "SSLCommerz",
                trxId: tran_id,
                paymentStatus: "PENDING",
            },
        });

        // Format Data for SSLCommerz
        const formData = new URLSearchParams();
        formData.append("store_id", store_id);
        formData.append("store_passwd", store_passwd);
        formData.append("total_amount", total.toString());
        formData.append("currency", "BDT");
        formData.append("tran_id", tran_id);
        formData.append("success_url", `${baseUrl}/api/payment/success?tran_id=${tran_id}`);
        formData.append("fail_url", `${baseUrl}/api/payment/fail?tran_id=${tran_id}`);
        formData.append("cancel_url", `${baseUrl}/api/payment/cancel?tran_id=${tran_id}`);

        // Customer Info
        formData.append("cus_name", cus_name);
        formData.append("cus_email", cus_email);
        formData.append("cus_add1", "Dhaka");
        formData.append("cus_city", "Dhaka");
        formData.append("cus_postcode", "1000");
        formData.append("cus_country", "Bangladesh");
        formData.append("cus_phone", cus_phone);

        // Shipping Info
        formData.append("shipping_method", "Courier");
        formData.append("ship_name", cus_name);
        formData.append("ship_add1", "Dhaka");
        formData.append("ship_city", "Dhaka");
        formData.append("ship_postcode", "1000");
        formData.append("ship_country", "Bangladesh");

        // Product Info
        formData.append("product_name", "Alora Products");
        formData.append("product_category", "Fragrance");
        formData.append("product_profile", "general");

        // Hit SSLCommerz Sandbox API
        const response = await fetch("https://sandbox.sslcommerz.com/gwprocess/v4/api.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(),
        });

        const apiResponse = await response.json();

        // Return payment link to frontend
        if (apiResponse?.status === "SUCCESS" && apiResponse?.GatewayPageURL) {
            return NextResponse.json({ success: true, url: apiResponse.GatewayPageURL });
        } else {
            // If SSLCommerz fails, update the order status to FAILED
            await prisma.order.update({
                where: { trxId: tran_id },
                data: { paymentStatus: "FAILED" },
            });
            console.error("SSLCommerz API Error:", apiResponse);
            return NextResponse.json({ success: false, message: "Failed to generate payment link" }, { status: 400 });
        }
    } catch (error) {
        console.error("Payment Init API failed:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}