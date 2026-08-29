"use client"

import { Badge, Heading, Input, Label, Text } from "@modules/common/components/ui"
import React from "react"

import { applyPromotions } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import Trash from "@modules/common/icons/trash"
import ErrorMessage from "../error-message"
import { SubmitButton } from "../submit-button"

type DiscountCodeProps = {
  cart: HttpTypes.StoreCart
}

const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState("")

  const { promotions = [] } = cart

  const removePromotionCode = async (code: string) => {
    const validPromotions = promotions.filter(
      (promotion) => promotion.code !== code
    )

    await applyPromotions(
      validPromotions
        .filter((promotion) => promotion.code !== undefined)
        .map((promotion) => promotion.code!)
    )
  }

  const addPromotionCode = async (formData: FormData) => {
    setErrorMessage("")

    const code = formData.get("code")

    if (!code) {
      return
    }

    const input = document.getElementById(
      "promotion-input"
    ) as HTMLInputElement

    const codes = promotions
      .filter((promotion) => promotion.code !== undefined)
      .map((promotion) => promotion.code!)

    codes.push(code.toString())

    try {
      await applyPromotions(codes)
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : String(error)
      )
    }

    if (input) {
      input.value = ""
    }
  }

  return (
    <div
      dir="rtl"
      className="w-full"
      data-testid="discount-code"
    >
      {/* =====================================================
          DISCOUNT HEADER
      ====================================================== */}

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[rgb(var(--color-primary)/0.08)]
              text-sm
              font-black
              text-[rgb(var(--color-primary))]
            "
          >
            %
          </div>

          <div>
            <Heading
              level="h3"
              className="
                text-sm
                font-black
                text-[rgb(var(--color-foreground))]
              "
            >
              کد تخفیف
            </Heading>

            <p
              className="
                mt-1
                text-[10px]
                leading-5
                text-[rgb(var(--color-foreground-muted))]
              "
            >
              کد تخفیف یا پیشنهاد ویژه خود را وارد کنید.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsOpen((previous) => !previous)
            setErrorMessage("")
          }}
          className="
            shrink-0
            rounded-xl
            border
            border-[rgb(var(--color-border))]
            bg-[rgb(var(--color-surface))]
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
          data-testid="add-discount-button"
        >
          {isOpen ? "بستن" : "افزودن کد"}
        </button>
      </div>

      {/* =====================================================
          INPUT
      ====================================================== */}

      {isOpen && (
        <form
          action={(formData) => addPromotionCode(formData)}
          className="
            mt-4
            rounded-2xl
            border
            border-[rgb(var(--color-border))]
            bg-[rgb(var(--color-surface-muted))]
            p-3
          "
        >
          <Label
            htmlFor="promotion-input"
            className="
              mb-2
              block
              text-[10px]
              font-bold
              text-[rgb(var(--color-foreground-muted))]
            "
          >
            کد تخفیف
          </Label>

          <div className="flex gap-2">
            <Input
              id="promotion-input"
              name="code"
              type="text"
              autoFocus
              placeholder="مثلاً ARYASA10"
              className="
                h-11
                min-w-0
                flex-1
                rounded-xl
                border-[rgb(var(--color-border))]
                bg-[rgb(var(--color-surface))]
                text-sm
              "
              data-testid="discount-input"
            />

            <SubmitButton
              variant="secondary"
              className="
                h-11
                shrink-0
                rounded-xl
                border
                border-[rgb(var(--color-primary))]
                bg-[rgb(var(--color-primary))]
                px-4
                text-xs
                font-bold
                text-emerald-700
                transition-all
                hover:opacity-90
              "
              data-testid="discount-apply-button"
            >
              اعمال
            </SubmitButton>
          </div>

          {errorMessage && (
            <div className="mt-3">
              <ErrorMessage
                error={errorMessage}
                data-testid="discount-error-message"
              />
            </div>
          )}
        </form>
      )}

      {/* =====================================================
          APPLIED PROMOTIONS
      ====================================================== */}

      {promotions.length > 0 && (
        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <span
              className="
                text-xs
                font-black
                text-[rgb(var(--color-foreground))]
              "
            >
              تخفیف‌های اعمال‌شده
            </span>

            <span
              className="
                rounded-full
                bg-[rgb(var(--color-accent)/0.12)]
                px-2.5
                py-1
                text-[9px]
                font-bold
                text-[rgb(var(--color-accent))]
              "
            >
              {promotions.length} مورد
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {promotions.map((promotion) => {
              const applicationMethod = promotion.application_method

              return (
                <div
                  key={promotion.id}
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                    rounded-2xl
                    border
                    border-emerald-200
                    bg-emerald-50
                    p-3
                  "
                  data-testid="discount-row"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-emerald-100
                        text-xs
                        font-black
                        text-emerald-700
                      "
                    >
                      %
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <Badge
                          color={
                            promotion.is_automatic
                              ? "green"
                              : "grey"
                          }
                        >
                          {promotion.code}
                        </Badge>

                        {promotion.is_automatic && (
                          <span className="text-[9px] font-medium text-emerald-700">
                            خودکار
                          </span>
                        )}
                      </div>

                      {applicationMethod?.value !== undefined &&
                        applicationMethod.currency_code !== undefined && (
                          <span
                            className="
                              mt-1
                              block
                              text-[10px]
                              font-semibold
                              text-emerald-700
                            "
                          >
                            {applicationMethod.type === "percentage"
                              ? `${applicationMethod.value}% تخفیف`
                              : `${convertToLocale({
                                amount:
                                  +applicationMethod.value,
                                currency_code:
                                applicationMethod.currency_code,
                              })} تخفیف`}
                          </span>
                        )}
                    </div>
                  </div>

                  {!promotion.is_automatic && (
                    <button
                      type="button"
                      className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        text-emerald-700
                        transition-colors
                        hover:bg-red-100
                        hover:text-red-600
                      "
                      onClick={() => {
                        if (!promotion.code) {
                          return
                        }

                        removePromotionCode(promotion.code)
                      }}
                      aria-label={`حذف کد تخفیف ${promotion.code}`}
                      data-testid="remove-discount-button"
                    >
                      <Trash size={14} />
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default DiscountCode