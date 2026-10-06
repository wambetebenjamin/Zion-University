import { NextResponse } from "next/server";
import { upcomingEvents } from "@/lib/data";
import { kvListGet } from "@/lib/kv";

export async function GET() {
  try {
    const customEvents = await kvListGet("events:custom");
    const allEvents = [...customEvents, ...upcomingEvents];
    return NextResponse.json({ events: allEvents });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to load events" },
      { status: 500 }
    );
  }
}
