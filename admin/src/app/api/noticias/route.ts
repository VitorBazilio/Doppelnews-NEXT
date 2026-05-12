import { NextResponse } from "next/server";
import { getLatestArticles } from "@doppelnews/shared/lib/articles";

export async function GET() {
  const articles = await getLatestArticles(50);

  return NextResponse.json({
    data: articles,
  });
}
