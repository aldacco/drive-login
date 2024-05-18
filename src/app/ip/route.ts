import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    return new Response(req.ip ?? '127.0.0.1', {
        status: 200,
    })
}
