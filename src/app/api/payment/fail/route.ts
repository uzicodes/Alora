import { NextResponse } from "next/server";

export async function POST(req: Request) {
    // Redirect the user back to checkout if the payment failed
    // Using 303 so it switches from POST to GET
    const url = new URL("/checkout", req.url);
    // Optionally append a query param so the frontend can read it and show a toast
    // url.searchParams.set("error", "Payment failed");
    return NextResponse.redirect(url, 303);
}
