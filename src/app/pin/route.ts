import { encodeCredentials, formDataToJson, generatePassword, generatePin } from "@/utils";
import RedisClient from "@/utils/redis";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.formData()
    const { provider } = formDataToJson(body)

    const owner = req.ip ?? "127.0.0.1"
    const password = generatePassword(128)

    let pin = ''
    let pinExists = 1

    while (pinExists) {
        pin = generatePin()
        pinExists = await RedisClient.exists(pin)
    }

    const data = {
        pin,
        password: encodeCredentials(owner, password),
        provider,
        owner,
    }

    await RedisClient.set(pin, JSON.stringify(data), 'EX', 120);

    return Response.json(data)
}

