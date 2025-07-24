import { prisma } from "@/shared/database/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Productos por categoría
        const productsByCategory = await prisma.product.groupBy({
            by: ['categoryId'],
            _count: {
                id: true,
            }
        })

        const categoriesData = await Promise.all(productsByCategory.map(async (group: { categoryId: number, _count: { id: number } }) => {
            const category = await prisma.category.findUnique({
                where: { id: group.categoryId }
            })

            return {
                categoryId: group.categoryId,
                categoryName: category?.name || "Unknown",
                productCount: group._count.id
            }
        }))

        // Estadísticas generales
        const [
            totalProducts,
            totalCategories,
            lowStockProducts,
            outOfStockProducts,
            topProducts,
            averagePrice,
            totalInventoryValue
        ] = await Promise.all([
            prisma.product.count(),
            prisma.category.count(),
            prisma.product.count({
                where: {
                    stock: {
                        lte: 10,
                        gt: 0
                    }
                }
            }),
            prisma.product.count({
                where: {
                    stock: 0
                }
            }),
            prisma.product.findMany({
                take: 5,
                orderBy: {
                    stock: 'desc'
                },
                include: {
                    category: true
                }
            }),
            prisma.product.aggregate({
                _avg: {
                    price: true
                }
            }),
            prisma.product.aggregate({
                _sum: {
                    price: true
                }
            })
        ])

        // Análisis de stock
        const stockAnalysis = await prisma.product.groupBy({
            by: ['categoryId'],
            _sum: {
                stock: true
            },
            _avg: {
                price: true
            }
        })

        const stockByCategory = await Promise.all(stockAnalysis.map(async (group) => {
            const category = await prisma.category.findUnique({
                where: { id: group.categoryId }
            })

            return {
                categoryName: category?.name || "Unknown",
                totalStock: group._sum.stock || 0,
                averagePrice: Math.round((group._avg.price || 0) * 100) / 100
            }
        }))

        const analytics = {
            overview: {
                totalProducts,
                totalCategories,
                lowStockProducts,
                outOfStockProducts,
                averagePrice: Math.round((averagePrice._avg.price || 0) * 100) / 100,
                totalInventoryValue: Math.round((totalInventoryValue._sum.price || 0) * 100) / 100
            },
            productsByCategory: categoriesData,
            stockByCategory,
            topProducts: topProducts.map(product => ({
                id: product.id,
                name: product.name,
                stock: product.stock,
                price: product.price,
                categoryName: product.category?.name || "Unknown"
            })),
            timestamp: new Date().toISOString()
        }

        return NextResponse.json(analytics, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch analytics:", error);
        return NextResponse.json({ status: "error", message: "Failed to fetch analytics" }, { status: 500 });
    }
}