import { NextResponse } from "next/server";
import { buildUploadNotImplementedPayload } from "@doppelnews/shared/lib/upload";

export async function POST() {
  return NextResponse.json(
    buildUploadNotImplementedPayload(),
    { status: 501 },
  );
}
