import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
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

        // Invalidate all cached product lists across /men, /woman, /unisex, and /shop
        revalidateTag("products", "max");

        return NextResponse.json({ success: true, product: structuredClone(product) });
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

        // Invalidate all cached product lists across /men, /woman, /unisex, and /shop
        revalidateTag("products", "max");

        return NextResponse.json({ success: true, product: structuredClone(product) });
    } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}

// Delete an existing product
export async function DELETE(req: Request) {
    try {
        const cookieStore = await cookies();
        const adminSession = cookieStore.get("admin_session");
        if (!adminSession || adminSession.value !== "authorized") {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        let id = searchParams.get("id");

        if (!id) {
            try {
                const body = await req.json();
                id = body.id;
            } catch {
                // Body might be empty if id was passed in query
            }
        }

        if (!id) {
            return NextResponse.json({ success: false, message: "Product ID is required" }, { status: 400 });
        }

        await prisma.product.delete({
            where: { id },
        });

        // Invalidate all cached product lists across /men, /woman, /unisex, and /shop
        revalidateTag("products", "max");

        return NextResponse.json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
