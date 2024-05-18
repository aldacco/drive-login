import { Token, UserData } from "@/type";
import RedisClient from "@/utils/redis";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code") as string
    const pin = searchParams.get("state") as string
    const scope = searchParams.get("scope") as string

    const { data: token } = await axios.post<Token>("https://oauth2.googleapis.com/token", {
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        redirect_uri: `${process.env.NEXT_PUBLIC_CLIENT_URL}/callback`,
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        scope,
    })

    if (!token) {
        return NextResponse.redirect("/")
    }

    const stringUserData = await RedisClient.get(pin) as string
    const userData = JSON.parse(stringUserData) as UserData

    const newUserData = {
        ...userData,
        token: token,
    }

    const ttl = await RedisClient.ttl(pin)
    await RedisClient.set(pin, JSON.stringify(newUserData), 'EX', ttl)

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_CLIENT_URL}/success`)
}
