import { NextResponse } from "next/server";

export async function POST(req: Request) {
    // You can retrieve the search params (like tran_id) if you want to verify the order in your database later.
    // const { searchParams } = new URL(req.url);
    // const tran_id = searchParams.get("tran_id");

    // Once payment is confirmed by SSLCommerz (this endpoint hit),
    // redirect the user back to the /success frontend page.
    
    // We use a 303 redirect so the browser correctly switches the POST request into a GET request
    // when navigating to the success page.
    const url = new URL("/success", req.url);
    return NextResponse.redirect(url, 303);
}
