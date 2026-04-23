import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { normalizeImageUrls } from "@/lib/imageUrl";

// Create a new product
export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const adminSession = cookieStore.get("admin_session");
        if (!adminSession || adminSession.value !== "authorized") {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { name, brand, price, sizeMl, concentration, gender, imageUrls } = body;

        const product = await prisma.product.create({
            data: {
                name,
                brand,
                price: parseFloat(price),
                sizeMl: parseInt(sizeMl),
                concentration,
                gender,
                imageUrls: normalizeImageUrls(
                    Array.isArray(imageUrls) ? imageUrls : imageUrls ? [imageUrls] : []
                ),
            },
        });

        return NextResponse.json({ success: true, product: JSON.parse(JSON.stringify(product)) });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}

// Update an existing product
export async function PUT(req: Request) {
    try {
        const cookieStore = await cookies();
        const adminSession = cookieStore.get("admin_session");
        if (!adminSession || adminSession.value !== "authorized") {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { id, name, brand, price, sizeMl, concentration, gender, imageUrls } = body;

        if (!id) {
            return NextResponse.json({ success: false, message: "Product ID is required" }, { status: 400 });
        }

        const product = await prisma.product.update({
            where: { id },
            data: {
                name,
                brand,
                price: parseFloat(price),
                sizeMl: parseInt(sizeMl),
                concentration,
                gender,
                imageUrls: normalizeImageUrls(
                    Array.isArray(imageUrls) ? imageUrls : imageUrls ? [imageUrls] : []
                ),
            },
        });

        return NextResponse.json({ success: true, product: JSON.parse(JSON.stringify(product)) });
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
