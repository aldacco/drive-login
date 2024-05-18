"use client"
import { getGoogleAuthUrl } from "@/utils/auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const FETCH_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
}

export default function Home() {
  const router = useRouter()
  const [status, setStatus] = useState<string>(FETCH_STATUS.IDLE)

  const [pin, setPin] = useState<string>("")

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault()
    setStatus(FETCH_STATUS.LOADING)

    try {
      await axios.get(`/authorize?pin=${pin}`)
    } catch (e) {
      setStatus(FETCH_STATUS.ERROR)
      return
    }
    const url = getGoogleAuthUrl(pin)
    router.push(url)
  }

  const isIdle = status === FETCH_STATUS.IDLE
  const isLoading = status === FETCH_STATUS.LOADING
  const isError = status === FETCH_STATUS.ERROR

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <h1 className="text-4xl font-medium">Authenticate Your Kodi</h1>
      <form onSubmit={handleAuth}>
        <div className="flex gap-2">
          <input
            className="h-12 rounded px-4 border text-xl"
            placeholder="PIN"
            onChange={(e) => {
              setStatus(FETCH_STATUS.IDLE)
              setPin(e.target.value)
            }}
          />

          <button
            className="flex items-center h-12 p-4 bg-[#29B6F6] rounded disabled:bg-gray-200"
            type="submit"
            disabled={isLoading}
          >
            <span className="text-white">
              GO
            </span>
          </button>
        </div>
        <span className="font-bold text-sm text-red-500 p-4">
          {
            isError && "Invalid PIN"
          }
        </span>
      </form>
    </main>
  );
}
