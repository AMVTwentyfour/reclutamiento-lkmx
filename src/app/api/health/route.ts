import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Simulate a health check
        const healthCheck = {
        status: "ok",
        timestamp: new Date().toISOString(),
        };
    
        return NextResponse.json(healthCheck, { status: 200 });
    } catch (error) {
        console.error("Health check failed:", error);
        return NextResponse.json({ status: "error", message: "Health check failed" }, { status: 500 });
    }
}