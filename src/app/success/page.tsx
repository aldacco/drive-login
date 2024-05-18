"use client"
import { useRouter } from "next/navigation"

export default function SuccessPage() {
    const router = useRouter()
    return (
        <main className="flex min-h-screen flex-col items-center gap-10 p-24">
            <h1 className="text-4xl">Success</h1>
            <button
                className="flex items-center justify-center h-12 p-4 bg-[#29B6F6] rounded disabled:bg-gray-200"
                onClick={() =>
                    router.push("/")
                }
            >
                <span className="text-white">
                    Go to Home
                </span>
            </button>
        </main>
    )
}