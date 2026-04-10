import { NextResponse } from "next/server";
// @ts-ignore
import SSLCommerzPayment from "sslcommerz-lts";

export async function POST(req: Request) {
    try {
        // 1. Grab the order details sent from your checkout page
        const { total, cus_name, cus_email, cus_phone } = await req.json();

        const store_id = process.env.STORE_ID;
        const store_passwd = process.env.STORE_PASSWORD;
        const is_live = false; // Keep this false for Sandbox testing!

        // 2. Generate a unique transaction ID for this order
        const tran_id = `REF-${Date.now()}`;

        // 3. Format the data exactly how SSLCommerz expects it
        const data = {
            total_amount: total,
            currency: "BDT",
            tran_id: tran_id,
            success_url: `http://localhost:3000/api/payment/success?tran_id=${tran_id}`,
            fail_url: "http://localhost:3000/api/payment/fail",
            cancel_url: "http://localhost:3000/api/payment/cancel",
            ipn_url: "http://localhost:3000/api/payment/ipn",
            shipping_method: "Courier",
            product_name: "Alora Products",
            product_category: "Fragrance",
            product_profile: "general",
            cus_name: cus_name,
            cus_email: cus_email,
            cus_add1: "Dhaka",
            cus_city: "Dhaka",
            cus_postcode: "1000",
            cus_country: "Bangladesh",
            cus_phone: cus_phone,
            ship_name: cus_name,
            ship_add1: "Dhaka",
            ship_city: "Dhaka",
            ship_postcode: 1000,
            ship_country: "Bangladesh",
        };

        // 4. Initialize the payment
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        const apiResponse = await sslcz.init(data);

        // 5. Return the payment link to the frontend
        if (apiResponse?.GatewayPageURL) {
            return NextResponse.json({ success: true, url: apiResponse.GatewayPageURL });
        } else {
            console.error("SSLCommerz Error:", apiResponse);
            return NextResponse.json({ success: false, message: "Failed to generate payment link" }, { status: 400 });
        }
    } catch (error) {
        console.error("Payment Init API failed:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}