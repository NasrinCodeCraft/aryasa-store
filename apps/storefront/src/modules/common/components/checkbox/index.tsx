"use client"

import { Checkbox, Label } from "@modules/common/components/ui"
import React from "react"

type CheckboxProps = {
  checked?: boolean
  onChange?: () => void
  label: string
  name?: string
  "data-testid"?: string
}

const CheckboxWithLabel: React.FC<CheckboxProps> = ({
                                                      checked = true,
                                                      onChange,
                                                      label,
                                                      name,
                                                      "data-testid": dataTestId,
                                                    }) => {
  const id = `checkbox-${name || "default"}`

  return (
    <div dir="rtl" className="w-full">
      <button
        type="button"
        onClick={onChange}
        className="
          group
          flex
          w-full
          items-center
          gap-3
          rounded-2xl
          border
          border-[rgb(var(--color-border))]
          bg-[rgb(var(--color-surface))]
          p-4
          text-right
          transition-all
          duration-200
          hover:border-[rgb(var(--color-primary)/0.28)]
          hover:bg-[rgb(var(--color-primary)/0.025)]
          focus:outline-none
          focus:ring-4
          focus:ring-[rgb(var(--color-primary)/0.08)]
        "
        aria-pressed={checked}
      >
        {/* Checkbox container */}

        <div
          className={`
            flex
            h-5
            w-5
            shrink-0
            items-center
            justify-center
            rounded-md
            border
            transition-all
            duration-200
            ${
            checked
              ? `
                  border-[rgb(var(--color-primary))]
                  bg-[rgb(var(--color-primary))]
                `
              : `
                  border-[rgb(var(--color-border))]
                  bg-[rgb(var(--color-background))]
                  group-hover:border-[rgb(var(--color-primary)/0.5)]
                `
          }
          `}
        >
          <Checkbox
            id={id}
            role="checkbox"
            checked={checked}
            readOnly
            aria-checked={checked}
            onClick={(event) => {
              event.stopPropagation()
              onChange?.()
            }}
            name={name}
            data-testid={dataTestId}
            className="
              pointer-events-none
              m-0
              h-5
              w-5
              opacity-0
            "
          />

          {checked && (
            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                flex
                h-5
                w-5
                items-center
                justify-center
                text-[11px]
                font-black
                text-white
              "
            >
              ✓
            </span>
          )}
        </div>

        {/* Text */}

        <div className="min-w-0 flex-1">
          <Label
            htmlFor={id}
            className="
              !transform-none
              !txt-medium
              block
              cursor-pointer
              text-sm
              font-bold
              text-[rgb(var(--color-foreground))]
            "
          >
            {label}
          </Label>

          <p
            className="
              mt-1
              text-[10px]
              leading-5
              text-[rgb(var(--color-foreground-muted))]
            "
          >
            برای ادامه، این گزینه را بر اساس نیاز خود فعال یا غیرفعال کنید.
          </p>
        </div>

        {/* Status */}

        <span
          className={`
            hidden
            shrink-0
            rounded-full
            px-2.5
            py-1
            text-[9px]
            font-bold
            sm:inline-flex
            ${
            checked
              ? `
                  bg-[rgb(var(--color-accent)/0.12)]
                  text-[rgb(var(--color-accent))]
                `
              : `
                  bg-[rgb(var(--color-surface-muted))]
                  text-[rgb(var(--color-foreground-muted))]
                `
          }
          `}
        >
          {checked ? "فعال" : "غیرفعال"}
        </span>
      </button>
    </div>
  )
}

export default CheckboxWithLabel