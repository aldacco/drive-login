import { Token } from "@/type";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const provider = searchParams.get("provider") as string
    const refreshToken = searchParams.get("refresh_token") as string

    const { data: token } = await axios.post<Token>("https://oauth2.googleapis.com/token", {
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID as string,
        redirect_uri: `${process.env.NEXT_PUBLIC_CLIENT_URL}/callback`,
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
    })

    return NextResponse.json(token)
}