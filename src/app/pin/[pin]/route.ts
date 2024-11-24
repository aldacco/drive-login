import { UserData } from "@/type";
import { decodeCredentials } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { pin } }: { params: { pin: string } }
) {
  const userData = cacheInstance.get<UserData>(pin.toLocaleLowerCase());

  if (!userData) {
    return NextResponse.json("Message: Token Expired", {
      status: 404,
    });
  }

  const auth = req.headers.get("authorization");

  if (!auth) {
    return Response.json("", {
      status: 404,
    });
  }

  const [, authBasis] = auth?.split(" ");
  const { password } = decodeCredentials(authBasis);

  if (userData.password !== password) {
    return Response.json("", {
      status: 403,
    });
  }

  if (!userData.token) {
    return Response.json(null);
  }

  cacheInstance.del(pin.toLocaleLowerCase());
  return NextResponse.json(userData.token);
}
