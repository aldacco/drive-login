"use client";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { getGoogleAuthUrl } from "@/utils/auth";
import axios from "axios";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const FETCH_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

export default function Home() {
  const router = useRouter();
  const [status, setStatus] = useState<string>(FETCH_STATUS.IDLE);

  const [pin, setPin] = useState<string>("");

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    setStatus(FETCH_STATUS.LOADING);

    try {
      await axios.get(`/authorize?pin=${pin}`);
    } catch (e) {
      console.log(e);
      setStatus(FETCH_STATUS.ERROR);
      return;
    }

    const redirectUri = `${location.origin}/callback`
    console.log(redirectUri)

    const url = getGoogleAuthUrl(pin, redirectUri);
    router.push(url);
  };

  const isIdle = status === FETCH_STATUS.IDLE;
  const isLoading = status === FETCH_STATUS.LOADING;
  const isError = status === FETCH_STATUS.ERROR;

  return (
    <main className="h-screen">
      <div className="flex h-[90%] justify-center items-center gap-10 p-2">
        <Card className="w-full max-w-md bg-muted/50 shadow-xl border-none rounded-md sm:p-6 ">
          <CardHeader>
            <CardTitle className="text-center relative">
              <span className="text-[#353132] font-bold text-3xl tracking-tighter leading-none pr-2">
                Kodi Sync
              </span>
              <Badge className="absolute align-text-top">v1.0.0</Badge>
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleAuth}>
            <CardContent className="grid gap-8">
              <CardDescription className="text-center grid">
                <span className="text-[#353132] font-bold text-xl tracking-tighter leading-none">
                  Activate your Kodi
                </span>
                <span>Enter the PIN shown on your Kodi device.</span>
              </CardDescription>
              <div>
                {isError && (
                  <span className="text-center text-destructive text-sm">
                    Invalid PIN. Please try again.
                  </span>
                )}
                <InputOTP
                  className="w-full"
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  inputMode="text"
                  onChange={(value) => {
                    setStatus(FETCH_STATUS.IDLE);
                    setPin(value);
                  }}
                >
                  <InputOTPGroup className="font-bold w-full">
                    <InputOTPSlot
                      className="text-xl w-1/6 h-14 bg-white"
                      index={0}
                    />
                    <InputOTPSlot
                      className="text-xl w-1/6 h-14 bg-white"
                      index={1}
                    />
                    <InputOTPSlot
                      className="text-xl w-1/6 h-14 bg-white"
                      index={2}
                    />
                    <InputOTPSlot
                      className="text-xl w-1/6 h-14 bg-white"
                      index={3}
                    />
                    <InputOTPSlot
                      className="text-xl w-1/6 h-14 bg-white"
                      index={4}
                    />
                    <InputOTPSlot
                      className="text-xl w-1/6 h-14 bg-white"
                      index={5}
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="h-14 w-full"
                size="lg"
                disabled={isLoading || !pin}
              >
                <span className="text-lg font-bold ">
                  {isLoading ? "Activating..." : "Activate Kodi"}
                </span>
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
      <footer className="flex items-center h-[10%]">
        <Link
          href="/privacy-policy"
          className={buttonVariants({ variant: "link" })}
        >
          Privacy Policy
        </Link>
        <Link
          href="/terms-and-conditions"
          className={buttonVariants({ variant: "link" })}
        >
          Terms and Conditions
        </Link>
      </footer>
    </main>
  );
}
