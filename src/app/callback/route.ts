import { Token, UserData } from "@/type";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  const { searchParams } = new URL(request.url);

  const [pin, clientId, clientSecret] = searchParams
    .get("state")
    ?.split("|") as string[];
  const code = searchParams.get("code") as string;
  const scope = searchParams.get("scope") as string;
  const redirect_uri = `${request.nextUrl.origin}/callback`;

  const { data: token } = await axios.post<Token>(
    "https://oauth2.googleapis.com/token",
    {
      client_id: clientId ?? (process.env.GOOGLE_CLIENT_ID as string),
      client_secret:
        clientSecret ?? (process.env.GOOGLE_CLIENT_SECRET as string),
      grant_type: "authorization_code",
      redirect_uri,
      code,
      scope,
    }
  );

  if (!token) {
    return NextResponse.redirect("/");
  }

  const userData = cacheInstance.get(pin.toLowerCase()) as UserData;

  const newUserData = {
    ...userData,
    token: token,
  };

  const ttl = cacheInstance.getTtl(pin.toLowerCase());

  if (!ttl) {
    return NextResponse.redirect("/");
  }

  cacheInstance.set(pin.toLowerCase(), newUserData, ttl);

  return NextResponse.redirect(`${request.nextUrl.origin}/success`);
}
