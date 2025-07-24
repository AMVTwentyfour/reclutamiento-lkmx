import { prisma } from "@/shared/database/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // buscamos todos los productos
        const products = await prisma.product.findMany({
            orderBy: { id: 'asc' },
            include: { category: true } // incluir la categoría relacionada
        })
        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return NextResponse.json({ status: "error", message: "Failed to fetch products" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        // obtenemos los datos desde el request
        const data = await request.json();
        const product = await prisma.product.create({
            data: {
                name: data.name,
                price: data.price,
                stock: data.stock,
                categoryId: data.categoryId // se relaciona el producto a una categoría
            },
        })

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error("Failed to create product:", error);
        return NextResponse.json({ status: "error", message: "Failed to create product" }, { status: 500 });
    }
}