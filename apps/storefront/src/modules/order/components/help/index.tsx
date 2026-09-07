import { Heading } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"

const Help = () => {
  return (
    <section
      dir="rtl"
      className="
        overflow-hidden
        rounded-[1.75rem]
        border
        border-[rgb(var(--color-border))]
        bg-[rgb(var(--color-surface))]
      "
    >
      {/* Header */}
      <div
        className="
          border-b
          border-[rgb(var(--color-border))]
          bg-[rgb(var(--color-surface-muted))]
          px-5
          py-5
          sm:px-6
        "
      >
        <div className="flex items-start gap-3">
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-[rgb(var(--color-primary)/0.10)]
              text-lg
              font-black
              text-[rgb(var(--color-primary))]
            "
          >
            ?
          </div>

          <div>
            <Heading
              level="h2"
              className="
                text-lg
                font-black
                text-[rgb(var(--color-foreground))]
              "
            >
              نیاز به کمک دارید؟
            </Heading>

            <p
              className="
                mt-1
                text-[10px]
                leading-5
                text-[rgb(var(--color-foreground-muted))]
                sm:text-xs
              "
            >
              برای پیگیری سفارش یا دریافت راهنمایی با ما در ارتباط باشید.
            </p>
          </div>
        </div>
      </div>

      {/* Support options */}
      <div className="space-y-3 p-5 sm:p-6">
        <LocalizedClientLink
          href="/contact"
          className="
            group
            flex
            items-center
            justify-between
            gap-4
            rounded-2xl
            border
            border-[rgb(var(--color-border))]
            bg-[rgb(var(--color-background))]
            px-4
            py-4
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:border-[rgb(var(--color-primary)/0.35)]
            hover:bg-[rgb(var(--color-primary)/0.03)]
            hover:shadow-[var(--shadow-card)]
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-[rgb(var(--color-primary)/0.08)]
                text-sm
                font-black
                text-[rgb(var(--color-primary))]
                transition-transform
                duration-200
                group-hover:scale-105
              "
            >
              ↗
            </div>

            <div>
              <p className="text-sm font-black text-[rgb(var(--color-foreground))]">
                تماس با ما
              </p>

              <p className="mt-1 text-[10px] leading-5 text-[rgb(var(--color-foreground-muted))]">
                سؤال یا مشکلی درباره سفارش دارید؟
              </p>
            </div>
          </div>

          <span
            className="
              text-lg
              text-[rgb(var(--color-foreground-muted))]
              transition-transform
              duration-200
              group-hover:-translate-x-1
            "
          >
            ←
          </span>
        </LocalizedClientLink>

        <LocalizedClientLink
          href="/contact"
          className="
            group
            flex
            items-center
            justify-between
            gap-4
            rounded-2xl
            border
            border-[rgb(var(--color-border))]
            bg-[rgb(var(--color-background))]
            px-4
            py-4
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:border-[rgb(var(--color-accent)/0.35)]
            hover:bg-[rgb(var(--color-accent)/0.03)]
            hover:shadow-[var(--shadow-card)]
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-[rgb(var(--color-accent)/0.10)]
                text-sm
                font-black
                text-[rgb(var(--color-accent))]
                transition-transform
                duration-200
                group-hover:scale-105
              "
            >
              ↺
            </div>

            <div>
              <p className="text-sm font-black text-[rgb(var(--color-foreground))]">
                مرجوعی و تعویض
              </p>

              <p className="mt-1 text-[10px] leading-5 text-[rgb(var(--color-foreground-muted))]">
                شرایط و نحوه درخواست مرجوعی را ببینید.
              </p>
            </div>
          </div>

          <span
            className="
              text-lg
              text-[rgb(var(--color-foreground-muted))]
              transition-transform
              duration-200
              group-hover:-translate-x-1
            "
          >
            ←
          </span>
        </LocalizedClientLink>

        {/* reassurance */}
        <div
          className="
            mt-2
            flex
            items-start
            gap-3
            rounded-2xl
            border
            border-[rgb(var(--color-primary)/0.12)]
            bg-[rgb(var(--color-primary)/0.04)]
            p-4
          "
        >
          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[rgb(var(--color-primary)/0.10)]
              text-xs
              font-black
              text-[rgb(var(--color-primary))]
            "
          >
            ✓
          </div>

          <p className="text-[10px] leading-5 text-[rgb(var(--color-foreground-muted))]">
            سفارش شما ثبت شده است. در صورت نیاز به پیگیری، کافی است
            با کارشناسان آریاسا تماس بگیرید.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Help