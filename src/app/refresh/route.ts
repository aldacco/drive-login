import { Token } from "@/type";
import { formDataToJson } from "@/utils";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.formData()
    const { refresh_token: refreshToken, provider } = formDataToJson(body)

    const { data: token } = await axios.post<Token>("https://oauth2.googleapis.com/token", {
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID as string,
        redirect_uri: `${process.env.NEXT_PUBLIC_CLIENT_URL}/callback`,
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
    })

    return NextResponse.json(token)
}