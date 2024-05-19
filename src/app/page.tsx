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
  const [clientId, setClientId] = useState<string>("")
  const [clientSecret, setClientSecret] = useState<string>("")

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault()
    setStatus(FETCH_STATUS.LOADING)

    try {
      await axios.get(`/authorize?pin=${pin}`)
    } catch (e) {
      setStatus(FETCH_STATUS.ERROR)
      return
    }
    const url = getGoogleAuthUrl(pin, clientId, clientSecret)
    router.push(url)
  }

  const isIdle = status === FETCH_STATUS.IDLE
  const isLoading = status === FETCH_STATUS.LOADING
  const isError = status === FETCH_STATUS.ERROR
  const [showAdvance, setShowAdvance] = useState<boolean>(false)

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <h1 className="text-4xl font-medium">Authenticate Your Kodi</h1>
      <form onSubmit={handleAuth}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <input
              className="h-12 rounded px-4 border text-xl"
              placeholder="PIN"
              onChange={(e) => {
                setStatus(FETCH_STATUS.IDLE)
                setPin(e.target.value)
              }}
            />
            <span className="font-bold text-sm text-red-500 px-4">
              {
                isError && "Invalid PIN"
              }
            </span>
            <span
              onClick={() => setShowAdvance(!showAdvance)}
              className="text-sm text-gray-500 px-4 cursor-pointer"
            >
              Advance options
            </span>
          </div>
          {showAdvance && (
            <div className="grid gap-1">
              <input
                className="h-12 rounded px-4 border text-xl"
                placeholder="Client ID"
                onChange={(e) => {
                  setStatus(FETCH_STATUS.IDLE)
                  setClientId(e.target.value)
                }}
              />
              <input
                className="h-12 rounded px-4 border text-xl"
                placeholder="Client Secret"
                onChange={(e) => {
                  setStatus(FETCH_STATUS.IDLE)
                  setClientSecret(e.target.value)
                }}
              />
            </div>
          )}
          <button
            className="flex items-center justify-center h-12 p-4 bg-[#29B6F6] rounded disabled:bg-gray-200"
            type="submit"
            disabled={isLoading}
          >
            <span className="text-white">
              GO
            </span>
          </button>
        </div>

      </form>
    </main>
  );
}
