import { UserData } from "@/type";
import { decodeCredentials } from "@/utils";
import RedisClient from "@/utils/redis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params: { pin } }: { params: { pin: string } }) {
    const auth = req.headers.get("authorization")
    if (!auth) {
        return Response.json('', {
            status: 404
        })
    }

    const [, authBasis] = auth?.split(" ")

    const { password } = decodeCredentials(authBasis)
    const ttl = await RedisClient.ttl(pin.toLocaleLowerCase());
    const stringUserData = await RedisClient.get(pin.toLocaleLowerCase()) as string
    const userData = JSON.parse(stringUserData) as UserData

    if (userData.password !== password) {
        return Response.json('', {
            status: 403
        })
    }

    if (userData.token) {
        return NextResponse.json(userData.token)
    }

    return NextResponse.json({})
}
