import { NextResponse } from "next/server";
import { buildAuthNotImplementedPayload } from "@doppelnews/shared/lib/auth";

export async function POST() {
  return NextResponse.json(
    buildAuthNotImplementedPayload(),
    { status: 501 },
  );
}
