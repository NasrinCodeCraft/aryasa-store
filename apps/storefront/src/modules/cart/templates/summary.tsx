"use client"

import { Button, Heading } from "@modules/common/components/ui"

import CartTotals from "@modules/common/components/cart-totals"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  }

  if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  }

  return "payment"
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <aside
      dir="rtl"
      className="w-full"
    >
      <div
        className="
          sticky
          top-28
          overflow-hidden
          rounded-3xl
          border
          border-[rgb(var(--color-border))]
          bg-[rgb(var(--color-surface))]
          shadow-[var(--shadow-card)]
        "
      >
        {/* =====================================================
            HEADER
        ====================================================== */}

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
              <Heading
                level="h2"
                className="
                  text-lg
                  font-black
                  text-[rgb(var(--color-foreground))]
                "
              >
                خلاصه سبد خرید
              </Heading>

              <p
                className="
                  mt-1
                  text-[10px]
                  leading-5
                  text-[rgb(var(--color-foreground-muted))]
                "
              >
                بررسی هزینه سفارش قبل از ادامه
              </p>
            </div>

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
              "
            >
              🛒
            </div>
          </div>
        </div>

        {/* =====================================================
            DISCOUNT
        ====================================================== */}

        <div className="px-5 pt-5 sm:px-6">
          <div
            className="
              overflow-hidden
              rounded-2xl
              border
              border-[rgb(var(--color-border))]
              bg-[rgb(var(--color-surface-muted))]
              p-4
            "
          >
            <div className="mb-3">
              <h3
                className="
                  text-xs
                  font-black
                  text-[rgb(var(--color-foreground))]
                "
              >
                کد تخفیف دارید؟
              </h3>

              <p
                className="
                  mt-1
                  text-[10px]
                  leading-5
                  text-[rgb(var(--color-foreground-muted))]
                "
              >
                کد تخفیف خود را وارد کنید تا مبلغ نهایی محاسبه شود.
              </p>
            </div>

            <DiscountCode cart={cart} />
          </div>
        </div>

        {/* =====================================================
            TOTALS
        ====================================================== */}

        <div className="px-5 py-5 sm:px-6">
          <CartTotals totals={cart} />
        </div>

        {/* =====================================================
            CHECKOUT CTA
        ====================================================== */}

        <div
          className="
            border-t
            border-[rgb(var(--color-border))]
            bg-[rgb(var(--color-surface-muted))]
            p-5
            sm:p-6
          "
        >
          <LocalizedClientLink
            href={`/checkout?step=${step}`}
            className="block w-full"
            data-testid="checkout-button"
          >
            <Button
              className="
                group
                flex
                h-14
                w-full
                items-center
                justify-center
                gap-3
                rounded-2xl
                bg-[rgb(var(--color-primary))]
                text-sm
                font-black
                text-white
                shadow-[var(--shadow-card)]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:shadow-[var(--shadow-elevated)]
              "
            >
              <span>
                ادامه و ثبت سفارش
              </span>

              <span
                className="
                  transition-transform
                  duration-200
                  group-hover:-translate-x-1
                "
              >
                ←
              </span>
            </Button>
          </LocalizedClientLink>

          <p
            className="
              mt-3
              text-center
              text-[10px]
              leading-5
              text-[rgb(var(--color-foreground-muted))]
            "
          >
            در مرحله بعد اطلاعات ارسال و پرداخت را تکمیل می‌کنید.
          </p>
        </div>

        {/* =====================================================
            TRUST
        ====================================================== */}

        <div
          className="
            flex
            items-center
            gap-3
            border-t
            border-[rgb(var(--color-border))]
            px-5
            py-4
            sm:px-6
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
              bg-[rgb(var(--color-accent)/0.12)]
              text-xs
              font-black
              text-[rgb(var(--color-accent))]
            "
          >
            ✓
          </div>

          <p
            className="
              text-[10px]
              leading-5
              text-[rgb(var(--color-foreground-muted))]
            "
          >
            قیمت نهایی سفارش قبل از ثبت خرید به شما نمایش داده می‌شود.
          </p>
        </div>
      </div>
    </aside>
  )
}

export default Summary