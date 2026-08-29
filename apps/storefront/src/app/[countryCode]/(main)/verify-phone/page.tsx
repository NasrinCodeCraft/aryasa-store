"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

import { verifyOtp } from "@lib/data/customer"

export default function VerifyPhonePage() {
  const router = useRouter()
  const params = useParams()

  const countryCode = params.countryCode as string

  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const savedPhone = sessionStorage.getItem("phone_auth_phone")

    if (!savedPhone) {
      router.replace(`/${countryCode}/account`)
      return
    }

    setPhone(savedPhone)
  }, [countryCode, router])

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    setError("")

    if (otp.length !== 6) {
      setError("کد ۶ رقمی را وارد کنید")
      return
    }

    setLoading(true)

    const result = await verifyOtp({
      phone,
      otp,
      countryCode,
    })

    setLoading(false)

    if (!result.success) {
      setError(result.error)
      return
    }

    sessionStorage.removeItem("phone_auth_phone")

    router.replace(result.redirectTo)
    router.refresh()
  }

  return (
    <main
      dir="rtl"
      className="
        min-h-[calc(100vh-160px)]
        flex items-center justify-center
        bg-[rgb(var(--color-background))]
        px-4 py-12
      "
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div
            className="
              mx-auto
              flex h-16 w-16
              items-center justify-center
              rounded-2xl
              bg-[rgb(var(--color-primary))]
              text-2xl
              font-black
              text-[rgb(var(--color-accent))]
              shadow-lg
            "
          >
            A
          </div>

          <h1 className="mt-6 text-2xl font-black">
            تأیید شماره موبایل
          </h1>

          <p className="mt-3 text-sm text-[rgb(var(--color-foreground-muted))]">
            کد تأیید ارسال‌شده به شماره زیر را وارد کنید
          </p>

          <p className="mt-2 font-bold" dir="ltr">
            {phone}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="
            rounded-3xl
            border border-[rgb(var(--color-border))]
            bg-[rgb(var(--color-surface))]
            p-6 sm:p-8
            shadow-[var(--shadow-elevated)]
          "
        >
          <label
            htmlFor="otp"
            className="mb-3 block text-sm font-bold"
          >
            کد تأیید
          </label>

          <input
            id="otp"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={otp}
            onChange={(e) =>
              setOtp(
                e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 6)
              )
            }
            dir="ltr"
            className="
              h-14
              w-full
              rounded-2xl
              border
              border-[rgb(var(--color-border))]
              bg-[rgb(var(--color-background))]
              text-center
              text-2xl
              font-black
              tracking-[0.6em]
              outline-none
              focus:border-[rgb(var(--color-primary))]
              focus:ring-4
              focus:ring-[rgb(var(--color-primary)/0.08)]
            "
          />

          {error && (
            <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="
              mt-6
              h-12
              w-full
              rounded-xl
              bg-[rgb(var(--color-primary))]
              text-white
              font-bold
              disabled:opacity-50
            "
          >
            {loading ? "در حال بررسی..." : "تأیید و ورود"}
          </button>

          <button
            type="button"
            onClick={() =>
              router.replace(`/${countryCode}/account`)
            }
            className="
              mt-5
              w-full
              text-sm
              text-[rgb(var(--color-foreground-muted))]
              hover:text-[rgb(var(--color-primary))]
            "
          >
            تغییر شماره موبایل
          </button>
        </form>
      </div>
    </main>
  )
}