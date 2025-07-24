import { NextResponse } from "next/server";
import { prisma } from "@/shared/database/prisma";

export async function GET() {
    try {
        const startTime = Date.now();
        
        // Test database connection
        const dbCheck = await prisma.$queryRaw`SELECT 1 as test`;
        const dbConnected = Array.isArray(dbCheck) && dbCheck.length > 0;
        
        // Get database stats
        const [productCount, categoryCount] = await Promise.all([
            prisma.product.count(),
            prisma.category.count()
        ]);
        
        // Calculate response time
        const responseTime = Date.now() - startTime;
        
        // Get system info
        const systemInfo = {
            nodeVersion: process.version,
            platform: process.platform,
            uptime: process.uptime(),
            memoryUsage: process.memoryUsage(),
            environment: process.env.NODE_ENV || 'development'
        };
        
        const healthCheck = {
            status: "healthy",
            timestamp: new Date().toISOString(),
            responseTime: `${responseTime}ms`,
            database: {
                status: dbConnected ? "connected" : "disconnected",
                stats: {
                    products: productCount,
                    categories: categoryCount
                }
            },
            system: {
                nodeVersion: systemInfo.nodeVersion,
                platform: systemInfo.platform,
                uptime: `${Math.floor(systemInfo.uptime / 60)} minutes`,
                memoryUsage: {
                    used: `${Math.round(systemInfo.memoryUsage.heapUsed / 1024 / 1024)}MB`,
                    total: `${Math.round(systemInfo.memoryUsage.heapTotal / 1024 / 1024)}MB`
                },
                environment: systemInfo.environment
            },
            services: {
                api: "operational",
                database: dbConnected ? "operational" : "degraded"
            }
        };
    
        return NextResponse.json(healthCheck, { status: 200 });
    } catch (error) {
        console.error("Health check failed:", error);
        
        const failedHealthCheck = {
            status: "unhealthy",
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : "Unknown error",
            services: {
                api: "operational",
                database: "failed"
            }
        };
        
        return NextResponse.json(failedHealthCheck, { status: 500 });
    }
}