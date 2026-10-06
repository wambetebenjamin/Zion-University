import { NextRequest, NextResponse } from "next/server";
import { newsArticles } from "@/lib/data";
import { kvListGet } from "@/lib/kv";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const customArticles = await kvListGet("news:articles");
    const allArticles = [...customArticles, ...newsArticles];

    if (category && category !== "All") {
      const filtered = allArticles.filter(
        (a) => a.category.toLowerCase() === category.toLowerCase()
      );
      return NextResponse.json({ articles: filtered });
    }

    return NextResponse.json({ articles: allArticles });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to load news" },
      { status: 500 }
    );
  }
}
