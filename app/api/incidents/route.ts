import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const resolvedParam = searchParams.get("resolved");

    console.log("🔍 Incoming GET /api/incidents");
    console.log("➡️ resolved param:", resolvedParam);

    let whereClause: Record<string, any> = {};
    if (resolvedParam === "false") whereClause.resolved = false;
    else if (resolvedParam === "true") whereClause.resolved = true;

    const incidents = await prisma.incident.findMany({
      where: whereClause,
      include: {
        camera: {
          select: {
            id: true,
            name: true,
            location: true,
          },
        },
      },
      orderBy: { tsStart: "desc" },
    });

    console.log("✅ incidents fetched:", incidents.length);

    return NextResponse.json(
      {
        success: true,
        count: incidents.length,
        incidents,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ /api/incidents error:", error.message || error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch incidents",
        detail: error.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
