import { headers } from "next/headers";

export const getIp = () => {
  const forWardedFor = headers().get("X-Forwarded-For");
  const realIp = headers().get("x-real-ip");

  if (forWardedFor) {
    return forWardedFor.split(",")[0].trim();
  }

  if (realIp) {
    return realIp.trim();
  }

  return null;
};
