"use client"

import { Label } from "@modules/common/components/ui"
import React, {
  useEffect,
  useImperativeHandle,
  useState,
} from "react"

import Eye from "@modules/common/icons/eye"
import EyeOff from "@modules/common/icons/eye-off"

type InputProps = Omit<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
  "placeholder"
> & {
  label: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
  topLabel?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      name,
      label,
      touched: _touched,
      required,
      topLabel,
      className = "",
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null)

    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState(type)

    useEffect(() => {
      setInputType(
        type === "password" && showPassword
          ? "text"
          : type
      )
    }, [type, showPassword])

    useImperativeHandle(ref, () => inputRef.current!)

    const inputId = id || name

    return (
      <div className="flex w-full flex-col">
        {topLabel && (
          <Label
            htmlFor={inputId}
            className="
              mb-2
              block
              text-xs
              font-bold
              text-[rgb(var(--color-foreground))]
            "
          >
            {topLabel}
          </Label>
        )}

        <div className="relative w-full">
          <input
            {...props}
            ref={inputRef}
            id={inputId}
            name={name}
            type={inputType}
            required={required}
            disabled={disabled}
            placeholder=" "
            className={`
              peer
              block
              h-14
              w-full
              rounded-2xl
              border
              border-[rgb(var(--color-border))]
              bg-[rgb(var(--color-surface))]
              px-4
              text-sm
              text-[rgb(var(--color-foreground))]
              outline-none
              transition-all
              duration-200

              placeholder:text-transparent

              hover:border-[rgb(var(--color-primary)/0.35)]

              focus:border-[rgb(var(--color-primary))]
              focus:ring-4
              focus:ring-[rgb(var(--color-primary)/0.08)]

              disabled:cursor-not-allowed
              disabled:bg-[rgb(var(--color-surface-muted))]
              disabled:opacity-60

              ${type === "password" ? "pl-14" : ""}

              ${className}
            `}
          />

          <label
            htmlFor={inputId}
            className="
              w-max
              rounded-xl
              shadow-xs
              pointer-events-none
              absolute
              right-4
              top-1/2
              z-10
              -translate-y-1/2
              bg-[rgb(var(--color-surface))]
              px-1.5
              text-sm
              leading-none
              text-[rgb(var(--color-foreground-muted))]
              transition-all
              duration-200

              peer-focus:right-3
              peer-focus:top-0
              peer-focus:-translate-y-1/2
              peer-focus:text-[10px]
              peer-focus:font-bold
              peer-focus:text-[rgb(var(--color-primary))]

              peer-[:not(:placeholder-shown)]:right-3
              peer-[:not(:placeholder-shown)]:top-0
              peer-[:not(:placeholder-shown)]:-translate-y-1/2
              peer-[:not(:placeholder-shown)]:text-[10px]
              peer-[:not(:placeholder-shown)]:font-semibold
              peer-[:not(:placeholder-shown)]:text-[rgb(var(--color-foreground-muted))]
            "
          >
            {label}

            {required && (
              <span className="mr-1 text-red-500">
                *
              </span>
            )}
          </label>

          {type === "password" && (
            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
              disabled={disabled}
              aria-label={
                showPassword
                  ? "مخفی کردن رمز عبور"
                  : "نمایش رمز عبور"
              }
              className="
                absolute
                left-2
                top-1/2
                flex
                h-10
                w-10
                -translate-y-1/2
                items-center
                justify-center
                rounded-xl
                text-[rgb(var(--color-foreground-muted))]
                transition-all
                duration-200
                hover:bg-[rgb(var(--color-surface-muted))]
                hover:text-[rgb(var(--color-primary))]
                focus:outline-none
                focus:ring-2
                focus:ring-[rgb(var(--color-primary)/0.12)]
                disabled:pointer-events-none
                disabled:opacity-50
              "
            >
              {showPassword ? (
                <Eye className="h-[18px] w-[18px]" />
              ) : (
                <EyeOff className="h-[18px] w-[18px]" />
              )}
            </button>
          )}
        </div>
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input