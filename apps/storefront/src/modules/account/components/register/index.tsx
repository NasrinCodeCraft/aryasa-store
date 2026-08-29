"use client"

import { useState } from "react"
import { registerWithPhone } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import Input from "@modules/common/components/input"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    setError(null)

    if (!firstName.trim()) {
      setError("نام را وارد کنید")
      return
    }

    if (!lastName.trim()) {
      setError("نام خانوادگی را وارد کنید")
      return
    }

    const normalizedPhone = phone.replace(/\D/g, "")

    if (!/^09\d{9}$/.test(normalizedPhone)) {
      setError("شماره موبایل معتبر نیست")
      return
    }

    setLoading(true)

    const result = await registerWithPhone({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: normalizedPhone,
    })

    setLoading(false)

    if (result !== true) {
      setError(String(result))
      return
    }

    sessionStorage.setItem(
      "phone_auth_phone",
      normalizedPhone
    )

    window.location.href = "/verify-phone"
  }

  return (
    <div
      dir="rtl"
      className="w-full max-w-md"
      data-testid="register-page"
    >
      <div className="mb-8 text-center">
        <div
          className="
            mx-auto mb-5
            flex h-16 w-16
            items-center justify-center
            rounded-2xl
            bg-[rgb(var(--color-primary))]
            text-white
          "
        >
          <span className="text-2xl font-black">
            A
          </span>
        </div>

        <h1 className="text-2xl font-black">
          ساخت حساب آریاسا
        </h1>

        <p className="mt-3 text-sm leading-7 text-[rgb(var(--color-foreground-muted))]">
          برای ایجاد حساب، اطلاعات خود را وارد کنید.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="
          rounded-3xl
          border
          border-[rgb(var(--color-border))]
          bg-[rgb(var(--color-surface))]
          p-6
          shadow-[var(--shadow-card)]
          sm:p-8
        "
      >
        <div className="flex flex-col gap-5">
          <Input
            label="نام"
            name="first_name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <Input
            label="نام خانوادگی"
            name="last_name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <Input
            label="شماره موبایل"
            name="phone"
            type="tel"
            inputMode="numeric"
            dir="ltr"
            placeholder="09121234567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        {error && (
          <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="
            mt-6
            h-12
            w-full
            rounded-xl
            bg-[rgb(var(--color-primary))]
            text-sm
            font-bold
            text-white
            disabled:opacity-50
          "
        >
          {loading
            ? "در حال ثبت..."
            : "ایجاد حساب و دریافت کد"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        حساب دارید؟

        <button
          type="button"
          onClick={() =>
            setCurrentView(LOGIN_VIEW.SIGN_IN)
          }
          className="
            mr-2
            font-bold
            text-[rgb(var(--color-primary))]
          "
        >
          ورود با شماره موبایل
        </button>
      </div>
    </div>
  )
}

export default Register