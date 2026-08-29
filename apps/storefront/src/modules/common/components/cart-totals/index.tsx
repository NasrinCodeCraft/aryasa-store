"use client"

import { convertToLocale } from "@lib/util/money"
import React from "react"

type CartTotalsProps = {
  totals: {
    total?: number | null
    subtotal?: number | null
    tax_total?: number | null
    currency_code: string
    item_subtotal?: number | null
    shipping_subtotal?: number | null
    discount_subtotal?: number | null
  }
}

const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
  const {
    currency_code,
    total,
    tax_total,
    item_subtotal,
    shipping_subtotal,
    discount_subtotal,
  } = totals

  return (
    <div
      dir="rtl"
      className="
        w-full
        overflow-hidden
        rounded-3xl
        border border-[rgb(var(--color-border))]
        bg-[rgb(var(--color-surface))]
        shadow-[var(--shadow-card)]
      "
    >
      {/* Header */}
      <div
        className="
          border-b
          border-[rgb(var(--color-border))]
          px-5
          py-5
          sm:px-6
        "
      >
        <div className="flex items-center justify-between">
          <div>
            <h2
              className="
                text-base
                font-black
                text-[rgb(var(--color-foreground))]
              "
            >
              خلاصه سفارش
            </h2>

            <p
              className="
                mt-1
                text-[10px]
                text-[rgb(var(--color-foreground-muted))]
              "
            >
              جزئیات مبلغ سفارش شما
            </p>
          </div>

          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-[rgb(var(--color-primary)/0.08)]
              text-[rgb(var(--color-primary))]
            "
          >
            $
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4">

          {/* Items subtotal */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <span
                className="
                  block
                  text-xs
                  font-semibold
                  text-[rgb(var(--color-foreground))]
                "
              >
                مجموع کالاها
              </span>

              <span
                className="
                  mt-1
                  block
                  text-[10px]
                  text-[rgb(var(--color-foreground-muted))]
                "
              >
                بدون هزینه ارسال و مالیات
              </span>
            </div>

            <span
              className="
                shrink-0
                text-sm
                font-bold
                text-[rgb(var(--color-foreground))]
              "
              data-testid="cart-subtotal"
              data-value={item_subtotal || 0}
            >
              {convertToLocale({
                amount: item_subtotal ?? 0,
                currency_code,
              })}
            </span>
          </div>

          {/* Shipping */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <span
                className="
                  block
                  text-xs
                  font-semibold
                  text-[rgb(var(--color-foreground))]
                "
              >
                هزینه ارسال
              </span>

              <span
                className="
                  mt-1
                  block
                  text-[10px]
                  text-[rgb(var(--color-foreground-muted))]
                "
              >
                تحویل سفارش
              </span>
            </div>

            <span
              className="
                shrink-0
                text-sm
                font-bold
                text-[rgb(var(--color-foreground))]
              "
              data-testid="cart-shipping"
              data-value={shipping_subtotal || 0}
            >
              {convertToLocale({
                amount: shipping_subtotal ?? 0,
                currency_code,
              })}
            </span>
          </div>

          {/* Discount */}
          {!!discount_subtotal && discount_subtotal > 0 && (
            <div
              className="
                flex
                items-center
                justify-between
                gap-4
                rounded-2xl
                border
                border-emerald-200
                bg-emerald-50
                px-4
                py-3
              "
            >
              <div className="flex items-center gap-3">
                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    bg-emerald-100
                    text-xs
                    font-black
                    text-emerald-700
                  "
                >
                  %
                </span>

                <div>
                  <span
                    className="
                      block
                      text-xs
                      font-bold
                      text-emerald-800
                    "
                  >
                    تخفیف
                  </span>

                  <span
                    className="
                      mt-0.5
                      block
                      text-[10px]
                      text-emerald-700
                    "
                  >
                    مبلغ تخفیف اعمال شده
                  </span>
                </div>
              </div>

              <span
                className="
                  shrink-0
                  text-sm
                  font-black
                  text-emerald-700
                "
                data-testid="cart-discount"
                data-value={discount_subtotal || 0}
              >
                -
                {convertToLocale({
                  amount: discount_subtotal ?? 0,
                  currency_code,
                })}
              </span>
            </div>
          )}

          {/* Taxes */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <span
                className="
                  block
                  text-xs
                  font-semibold
                  text-[rgb(var(--color-foreground))]
                "
              >
                مالیات
              </span>

              <span
                className="
                  mt-1
                  block
                  text-[10px]
                  text-[rgb(var(--color-foreground-muted))]
                "
              >
                مالیات محاسبه‌شده سفارش
              </span>
            </div>

            <span
              className="
                shrink-0
                text-sm
                font-bold
                text-[rgb(var(--color-foreground))]
              "
              data-testid="cart-taxes"
              data-value={tax_total || 0}
            >
              {convertToLocale({
                amount: tax_total ?? 0,
                currency_code,
              })}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div
          className="
            my-6
            h-px
            bg-[rgb(var(--color-border))]
          "
        />

        {/* Total */}
        <div
          className="
            rounded-2xl
            bg-[rgb(var(--color-primary))]
            p-4
            sm:p-5
          "
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="block text-xs font-medium text-white/60">
                مبلغ قابل پرداخت
              </span>

              <span className="mt-1 block text-sm font-bold text-white">
                مجموع نهایی سفارش
              </span>
            </div>

            <div className="text-left">
              <span
                className="
                  block
                  text-xl
                  font-black
                  leading-none
                  text-[rgb(var(--color-accent))]
                  sm:text-2xl
                "
                data-testid="cart-total"
                data-value={total || 0}
              >
                {convertToLocale({
                  amount: total ?? 0,
                  currency_code,
                })}
              </span>

              <span
                className="
                  mt-2
                  block
                  text-[10px]
                  text-white/50
                "
              >
                تومان
              </span>
            </div>
          </div>
        </div>

        {/* Trust note */}
        <div
          className="
            mt-4
            flex
            items-center
            gap-2
            rounded-xl
            bg-[rgb(var(--color-surface-muted))]
            px-3
            py-3
          "
        >
          <span
            className="
              flex
              h-7
              w-7
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-[rgb(var(--color-accent)/0.12)]
              text-xs
              font-black
              text-[rgb(var(--color-accent))]
            "
          >
            ✓
          </span>

          <p
            className="
              text-[10px]
              leading-5
              text-[rgb(var(--color-foreground-muted))]
            "
          >
            مبلغ نهایی قبل از پرداخت به شما نمایش داده می‌شود.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CartTotals