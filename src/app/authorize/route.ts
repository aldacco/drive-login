import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const pin = searchParams.get("pin") as string;

  const data = cacheInstance.get(pin.toLocaleLowerCase());

  if (!data) {
    return NextResponse.json("Invalid PIN", {
      status: 401,
    });
  }

  return NextResponse.json("data", {
    status: 201,
  });
}
