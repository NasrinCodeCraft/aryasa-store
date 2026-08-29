"use client"

import { useState } from "react"
import { loginWithPhone } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import Input from "@modules/common/components/input"
import { SubmitButton } from "@modules/checkout/components/submit-button"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [phone, setPhone] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setError(null)
    setLoading(true)

    const phoneValue = String(formData.get("phone") || "").trim()

    if (!phoneValue) {
      setError("لطفاً شماره موبایل خود را وارد کنید")
      setLoading(false)
      return
    }

    const result = await loginWithPhone(phoneValue)

    if (result !== true) {
      setError(result)
      setLoading(false)
      return
    }

    // فعلاً شماره را در sessionStorage نگه می‌داریم
    sessionStorage.setItem("phone_auth_phone", phoneValue)

    window.location.href = "/verify-phone"
  }

  return (
    <div
      dir="rtl"
      className="w-full max-w-md"
      data-testid="login-page"
    >
      {/* Header */}
      <div className="mb-8 text-center">
        <div
          className="
            mx-auto mb-5
            flex h-16 w-16
            items-center justify-center
            rounded-2xl
            bg-[rgb(var(--color-primary))]
            text-white
            shadow-lg
          "
        >
          <span className="text-2xl font-black">
            A
          </span>
        </div>

        <h1
          className="
            text-2xl
            font-black
            text-[rgb(var(--color-foreground))]
          "
        >
          ورود به آریاسا
        </h1>

        <p
          className="
            mt-3
            text-sm
            leading-7
            text-[rgb(var(--color-foreground-muted))]
          "
        >
          برای ورود یا ساخت حساب، شماره موبایل خود را وارد کنید.
        </p>
      </div>

      {/* Form */}
      <form
        action={handleSubmit}
        className="
          rounded-3xl
          border border-[rgb(var(--color-border))]
          bg-[rgb(var(--color-surface))]
          p-6
          shadow-[var(--shadow-card)]
          sm:p-8
        "
      >
        <div className="flex flex-col gap-3">
          <Input
            label="شماره موبایل"
            name="phone"
            type="tel"
            inputMode="numeric"
            placeholder="مثلاً 09121234567"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            data-testid="phone-input"
          />
        </div>

        {error && (
          <div
            className="
              mt-4
              rounded-xl
              border border-red-200
              bg-red-50
              px-4 py-3
              text-sm
              leading-6
              text-red-700
            "
          >
            {error}
          </div>
        )}

        <SubmitButton
          className="
            mt-6
            h-12
            w-full
            rounded-xl
            bg-[rgb(var(--color-primary))]
            text-sm
            font-bold
            text-white
            transition-all
            hover:-translate-y-0.5
            hover:shadow-lg
          "
          data-testid="sign-in-button"
          disabled={loading}
        >
          {loading ? "در حال ارسال..." : "دریافت کد تأیید"}
        </SubmitButton>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[rgb(var(--color-border))]" />

          <span className="text-xs text-[rgb(var(--color-foreground-muted))]">
            ورود امن با موبایل
          </span>

          <div className="h-px flex-1 bg-[rgb(var(--color-border))]" />
        </div>

        <p
          className="
            text-center
            text-xs
            leading-6
            text-[rgb(var(--color-foreground-muted))]
          "
        >
          کد تأیید برای شماره موبایل شما ارسال می‌شود.
        </p>
      </form>

      {/* Register */}
      <div className="mt-6 text-center">
        <span className="text-sm text-[rgb(var(--color-foreground-muted))]">
          هنوز حساب کاربری ندارید؟
        </span>

        <button
          type="button"
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="
            mr-2
            text-sm
            font-bold
            text-[rgb(var(--color-primary))]
            hover:underline
          "
          data-testid="register-button"
        >
          ثبت‌نام کنید
        </button>
      </div>
    </div>
  )
}

export default Login