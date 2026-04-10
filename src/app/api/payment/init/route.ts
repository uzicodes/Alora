import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // 1. Grab the order details sent from your checkout page
        const { total, cus_name, cus_email, cus_phone } = await req.json();

        const store_id = process.env.SSLCOMMERZ_STORE_ID as string;
        const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD as string;

        // 2. Generate a unique transaction ID for this order
        const tran_id = `REF-${Date.now()}`;

        // 3. Format Data
        const formData = new URLSearchParams();
        formData.append("store_id", store_id);
        formData.append("store_passwd", store_passwd);
        formData.append("total_amount", total.toString());
        formData.append("currency", "BDT");
        formData.append("tran_id", tran_id);
        formData.append("success_url", `http://localhost:3000/api/payment/success?tran_id=${tran_id}`);
        formData.append("fail_url", "http://localhost:3000/api/payment/fail");
        formData.append("cancel_url", "http://localhost:3000/api/payment/cancel");

        // Customer Info
        formData.append("cus_name", cus_name);
        formData.append("cus_email", cus_email);
        formData.append("cus_add1", "Dhaka");
        formData.append("cus_city", "Dhaka");
        formData.append("cus_postcode", "1000");
        formData.append("cus_country", "Bangladesh");
        formData.append("cus_phone", cus_phone);

        // Shipping Info (THIS IS THE NEW PART FIXING YOUR ERROR)
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

        // 4. Hit the SSLCommerz Sandbox API directly
        const response = await fetch("https://sandbox.sslcommerz.com/gwprocess/v4/api.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(),
        });

        const apiResponse = await response.json();

        // 5. Return the payment link to the frontend
        if (apiResponse?.status === "SUCCESS" && apiResponse?.GatewayPageURL) {
            return NextResponse.json({ success: true, url: apiResponse.GatewayPageURL });
        } else {
            console.error("SSLCommerz API Error:", apiResponse);
            return NextResponse.json({ success: false, message: "Failed to generate payment link" }, { status: 400 });
        }
    } catch (error) {
        console.error("Payment Init API failed:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}