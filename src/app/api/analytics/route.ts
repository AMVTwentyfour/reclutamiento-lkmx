import { prisma } from "@/shared/database/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const result = await prisma.product.groupBy({
            by: ['categoryId'],
            _count: {
                id: true,
            }
        })

        const data = await Promise.all(result.map(async (group: { categoryId: number, _count: { id: number } }) => {
            const category = await prisma.category.findUnique({
                where: { id: group.categoryId }
            })

            return {
                categoryId: group.categoryId,
                categoryName: category?.name || "Unknown",
                productCount: group._count.id
            }
        }))

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch analytics:", error);
        return NextResponse.json({ status: "error", message: "Failed to fetch analytics" }, { status: 500 });
    }
}