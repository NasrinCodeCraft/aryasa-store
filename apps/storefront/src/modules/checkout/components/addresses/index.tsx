"use client"

import { setAddresses } from "@lib/data/cart"
import useToggleState from "@lib/hooks/use-toggle-state"
import compareAddresses from "@lib/util/compare-addresses"
import { CheckCircleSolid } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@modules/common/components/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState } from "react"

import BillingAddress from "../billing_address"
import ErrorMessage from "../error-message"
import ShippingAddress from "../shipping-address"
import Spinner from "@modules/common/icons/spinner"
import { SubmitButton } from "../submit-button"

const Addresses = ({
                     cart,
                     customer,
                   }: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "address"

  const { state: sameAsBilling, toggle: toggleSameAsBilling } =
    useToggleState(
      cart?.shipping_address && cart?.billing_address
        ? compareAddresses(
          cart.shipping_address,
          cart.billing_address
        )
        : true
    )

  const handleEdit = () => {
    router.push(`${pathname}?step=address`)
  }

  const [message, formAction] = useActionState(
    setAddresses,
    null
  )

  return (
    <section
      dir="rtl"
      className="
        overflow-hidden
        rounded-3xl
        border
        border-[rgb(var(--color-border))]
        bg-[rgb(var(--color-surface))]
        shadow-[var(--shadow-card)]
      "
    >
      {/* =========================================================
          HEADER
      ========================================================== */}

      <div
        className="
          border-b
          border-[rgb(var(--color-border))]
          px-5
          py-5
          sm:px-7
        "
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[rgb(var(--color-primary))]
                text-sm
                font-black
                text-white
              "
            >
              ۱
            </div>

            <div>
              <div className="flex items-center gap-2">
                <Heading
                  level="h2"
                  className="
                    text-base
                    font-black
                    text-[rgb(var(--color-foreground))]
                    sm:text-lg
                  "
                >
                  اطلاعات ارسال
                </Heading>

                {!isOpen && cart?.shipping_address && (
                  <CheckCircleSolid
                    className="
                      h-5
                      w-5
                      text-[rgb(var(--color-success))]
                    "
                  />
                )}
              </div>

              <p
                className="
                  mt-1
                  text-[10px]
                  leading-5
                  text-[rgb(var(--color-foreground-muted))]
                  sm:text-xs
                "
              >
                آدرس و اطلاعات تماس برای تحویل سفارش
              </p>
            </div>
          </div>

          {!isOpen && cart?.shipping_address && (
            <button
              type="button"
              onClick={handleEdit}
              className="
                shrink-0
                rounded-xl
                border
                border-[rgb(var(--color-border))]
                bg-[rgb(var(--color-background))]
                px-3
                py-2
                text-[10px]
                font-bold
                text-[rgb(var(--color-primary))]
                transition-all
                duration-200
                hover:border-[rgb(var(--color-primary)/0.35)]
                hover:bg-[rgb(var(--color-primary)/0.05)]
              "
              data-testid="edit-address-button"
            >
              ویرایش
            </button>
          )}
        </div>
      </div>

      {/* =========================================================
          ACTIVE FORM
      ========================================================== */}

      {isOpen ? (
        <form action={formAction}>
          <div className="p-5 sm:p-7">

            {/* Shipping */}

            <div
              className="
                overflow-hidden
                rounded-2xl
                border
                border-[rgb(var(--color-border))]
                bg-[rgb(var(--color-surface-muted))]
              "
            >
              <div
                className="
                  border-b
                  border-[rgb(var(--color-border))]
                  px-4
                  py-4
                "
              >
                <h3 className="text-sm font-black">
                  آدرس تحویل
                </h3>

                <p
                  className="
                    mt-1
                    text-[10px]
                    text-[rgb(var(--color-foreground-muted))]
                  "
                >
                  سفارش به این آدرس ارسال خواهد شد.
                </p>
              </div>

              <div className="p-4 sm:p-5">
                <ShippingAddress
                  customer={customer}
                  checked={sameAsBilling}
                  onChange={toggleSameAsBilling}
                  cart={cart}
                />
              </div>
            </div>

            {/* Same as billing indicator */}

            <div
              className="
                mt-4
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-[rgb(var(--color-border))]
                bg-[rgb(var(--color-background))]
                px-4
                py-3
              "
            >
              <button
                type="button"
                onClick={toggleSameAsBilling}
                className="
                  flex
                  h-5
                  w-5
                  shrink-0
                  items-center
                  justify-center
                  rounded-md
                  border
                  transition-all
                "
                aria-pressed={sameAsBilling}
              >
                {sameAsBilling ? (
                  <span
                    className="
                      flex
                      h-full
                      w-full
                      items-center
                      justify-center
                      rounded-md
                      bg-[rgb(var(--color-primary))]
                      text-[10px]
                      font-black
                      text-white
                    "
                  >
                    ✓
                  </span>
                ) : null}
              </button>

              <button
                type="button"
                onClick={toggleSameAsBilling}
                className="text-right"
              >
                <span className="block text-xs font-bold">
                  آدرس صورت‌حساب با آدرس ارسال یکسان است
                </span>

                <span
                  className="
                    mt-0.5
                    block
                    text-[10px]
                    text-[rgb(var(--color-foreground-muted))]
                  "
                >
                  برای آدرس متفاوت، این گزینه را غیرفعال کنید.
                </span>
              </button>
            </div>

            {/* Billing */}

            {!sameAsBilling && (
              <div className="mt-5">
                <div
                  className="
                    mb-4
                    flex
                    items-center
                    gap-3
                  "
                >
                  <div
                    className="
                      h-px
                      flex-1
                      bg-[rgb(var(--color-border))]
                    "
                  />

                  <h3
                    className="
                      shrink-0
                      text-sm
                      font-black
                      text-[rgb(var(--color-foreground))]
                    "
                  >
                    آدرس صورتحساب
                  </h3>

                  <div
                    className="
                      h-px
                      flex-1
                      bg-[rgb(var(--color-border))]
                    "
                  />
                </div>

                <div
                  className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[rgb(var(--color-border))]
                    bg-[rgb(var(--color-surface-muted))]
                    p-4
                    sm:p-5
                  "
                >
                  <BillingAddress cart={cart} />
                </div>
              </div>
            )}

            {/* Error */}

            <ErrorMessage
              error={message}
              data-testid="address-error-message"
            />

            {/* Continue */}

            <div
              className="
                mt-6
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div>
                <p className="text-xs font-bold">
                  آماده ادامه هستید؟
                </p>

                <p
                  className="
                    mt-1
                    text-[10px]
                    text-[rgb(var(--color-foreground-muted))]
                  "
                >
                  در مرحله بعد روش ارسال را انتخاب می‌کنید.
                </p>
              </div>

              <SubmitButton
                className="
                  h-12
                  w-full
                  rounded-xl
                  bg-[rgb(var(--color-primary))]
                  px-7
                  text-sm
                  font-black
                  text-white
                  shadow-[var(--shadow-card)]
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:shadow-[var(--shadow-elevated)]
                  sm:w-auto
                "
                data-testid="submit-address-button"
              >

                ثبت سفارش
                <span className="mr-2">←</span>
              </SubmitButton>
            </div>
          </div>
        </form>
      ) : (
        /* =======================================================
           COMPLETED / SUMMARY
        ======================================================== */

        <div className="p-5 sm:p-7">
          {cart && cart.shipping_address ? (
            <div className="space-y-4">

              {/* Shipping summary */}

              <div
                className="
                  rounded-2xl
                  border
                  border-[rgb(var(--color-border))]
                  bg-[rgb(var(--color-background))]
                  p-4
                  sm:p-5
                "
                data-testid="shipping-address-summary"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      bg-[rgb(var(--color-primary)/0.08)]
                      text-sm
                      text-[rgb(var(--color-primary))]
                    "
                  >
                    📍
                  </div>

                  <div>
                    <h3 className="text-sm font-black">
                      آدرس تحویل
                    </h3>

                    <p
                      className="
                        mt-0.5
                        text-[10px]
                        text-[rgb(var(--color-foreground-muted))]
                      "
                    >
                      مقصد سفارش
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-bold">
                    {cart.shipping_address.first_name}{" "}
                    {cart.shipping_address.last_name}
                  </p>

                  <p className="text-xs leading-6 text-[rgb(var(--color-foreground-muted))]">
                    {cart.shipping_address.address_1}{" "}
                    {cart.shipping_address.address_2}
                  </p>

                  <p className="text-xs leading-6 text-[rgb(var(--color-foreground-muted))]">
                    {cart.shipping_address.postal_code},{" "}
                    {cart.shipping_address.city}
                  </p>

                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      text-[rgb(var(--color-foreground-muted))]
                    "
                  >
                    {cart.shipping_address.country_code?.toUpperCase()}
                  </p>
                </div>
              </div>

              {/* Contact + Billing */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* Contact */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-[rgb(var(--color-border))]
                    bg-[rgb(var(--color-background))]
                    p-4
                  "
                  data-testid="shipping-contact-summary"
                >
                  <span
                    className="
                      block
                      text-[10px]
                      font-bold
                      text-[rgb(var(--color-foreground-muted))]
                    "
                  >
                    اطلاعات تماس
                  </span>

                  <div className="mt-3 space-y-2">
                    {cart.shipping_address.phone && (
                      <p
                        dir="ltr"
                        className="
                          text-right
                          text-xs
                          font-semibold
                        "
                      >
                        {cart.shipping_address.phone}
                      </p>
                    )}

                    {cart.email && (
                      <p
                        className="
                          break-all
                          text-xs
                          text-[rgb(var(--color-foreground-muted))]
                        "
                      >
                        {cart.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Billing */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-[rgb(var(--color-border))]
                    bg-[rgb(var(--color-background))]
                    p-4
                  "
                  data-testid="billing-address-summary"
                >
                  <span
                    className="
                      block
                      text-[10px]
                      font-bold
                      text-[rgb(var(--color-foreground-muted))]
                    "
                  >
                    آدرس صورتحساب
                  </span>

                  {sameAsBilling ? (
                    <div className="mt-3 flex items-center gap-2">
                      <span
                        className="
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-lg
                          bg-[rgb(var(--color-success)/0.1)]
                          text-xs
                          text-[rgb(var(--color-success))]
                        "
                      >
                        ✓
                      </span>

                      <p
                        className="
                          text-xs
                          font-semibold
                          text-[rgb(var(--color-foreground))]
                        "
                      >
                        همان آدرس تحویل
                      </p>
                    </div>
                  ) : (
                    <div className="mt-3 space-y-1">
                      <p className="text-xs font-bold">
                        {cart.billing_address?.first_name}{" "}
                        {cart.billing_address?.last_name}
                      </p>

                      <p className="text-xs leading-6 text-[rgb(var(--color-foreground-muted))]">
                        {cart.billing_address?.address_1}{" "}
                        {cart.billing_address?.address_2}
                      </p>

                      <p className="text-xs leading-6 text-[rgb(var(--color-foreground-muted))]">
                        {cart.billing_address?.postal_code},{" "}
                        {cart.billing_address?.city}
                      </p>

                      <p className="text-[10px] font-semibold text-[rgb(var(--color-foreground-muted))]">
                        {cart.billing_address?.country_code?.toUpperCase()}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Completed indicator */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-emerald-200
                  bg-emerald-50
                  px-4
                  py-3
                "
              >
                <div
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-xl
                    bg-emerald-100
                    text-sm
                    font-black
                    text-emerald-700
                  "
                >
                  ✓
                </div>

                <div>
                  <p className="text-xs font-bold text-emerald-800">
                    اطلاعات ارسال ثبت شد
                  </p>

                  <p className="mt-0.5 text-[10px] text-emerald-700">
                    برای تغییر اطلاعات روی دکمه ویرایش کلیک کنید.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="
                flex
                min-h-32
                items-center
                justify-center
              "
            >
              <Spinner />
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default Addresses