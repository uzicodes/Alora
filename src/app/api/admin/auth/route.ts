import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const { password } = await req.json();
        const correctPassword = process.env.ADMIN_PASSWORD;

        if (password === correctPassword) {
            // Create a secure cookie that expires in 24 hours
            const cookieStore = await cookies();
            cookieStore.set("admin_session", "authorized", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24, // 1 day
                path: "/",
            });

            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, message: "Invalid password" }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}