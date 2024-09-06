import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log(req.ip);
  return new Response(req.ip ?? "127.0.0.1", {
    status: 200,
  });
}
