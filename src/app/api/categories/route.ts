import { prisma } from "@/shared/database/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // buscamos todas las categorías
        const categories = await prisma.category.findMany({
            orderBy: { id: 'asc'}
        })
        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        return NextResponse.json({ status: "error", message: "Failed to fetch categories" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        // obtenemos los datos del cuerpo de la solicitud
        const data = await request.json();
        const category = await prisma.category.create({
            data: { name: data.name }
        })
        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        console.error("Failed to create category:", error);
        return NextResponse.json({ status: "error", message: "Failed to create category" }, { status: 500 });
    }
}