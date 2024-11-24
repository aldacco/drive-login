import { getIp } from "@/lib/get-ip";
import {
  encodeCredentials,
  formDataToJson,
  generatePassword,
  generatePin,
} from "@/utils";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.formData();
  const { provider } = formDataToJson(body);

  const owner = getIp() ?? "127.0.0.1";

  const password = generatePassword(128);

  let pin = "";
  let pinExists = 1;

  while (pinExists) {
    pin = generatePin();
    pinExists = Number(cacheInstance.has(pin));
  }

  const data = {
    pin,
    password: encodeCredentials(owner, password),
    provider,
    owner,
  };

  cacheInstance.set(pin, data, 120);

  return Response.json(data);
}
