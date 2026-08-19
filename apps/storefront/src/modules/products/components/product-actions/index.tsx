"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@modules/common/components/ui"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams, usePathname, useSearchParams, useRouter } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt) => {
    if (varopt.option_id) {
      acc[varopt.option_id] = varopt.value
    }

    return acc
  }, {})
}

export default function ProductActions({
                                         product,
                                         disabled,
                                       }: ProductActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [quantity, setQuantity] = useState(1)

  const [options, setOptions] = useState<Record<string, string | undefined>>(
    {}
  )

  const [isAdding, setIsAdding] = useState(false)

  const countryCode = useParams().countryCode as string

  /* ---------------------------------------------
     Default variant
  --------------------------------------------- */

  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(
        product.variants[0].options
      )

      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  /* ---------------------------------------------
     Selected variant
  --------------------------------------------- */

  const selectedVariant = useMemo(() => {
    if (!product.variants?.length) {
      return
    }

    return product.variants.find((variant) => {
      const variantOptions = optionsAsKeymap(variant.options)

      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  /* ---------------------------------------------
     Option selection
  --------------------------------------------- */

  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  /* ---------------------------------------------
     Valid variant
  --------------------------------------------- */

  const isValidVariant = useMemo(() => {
    return product.variants?.some((variant) => {
      const variantOptions = optionsAsKeymap(variant.options)

      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  /* ---------------------------------------------
     URL variant
  --------------------------------------------- */

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    const value = isValidVariant ? selectedVariant?.id : null

    if (params.get("v_id") === value) {
      return
    }

    if (value) {
      params.set("v_id", value)
    } else {
      params.delete("v_id")
    }

    const query = params.toString()

    router.replace(query ? `${pathname}?${query}` : pathname)
  }, [
    selectedVariant,
    isValidVariant,
    pathname,
    router,
    searchParams,
  ])

  /* ---------------------------------------------
     Stock
  --------------------------------------------- */

  const inStock = useMemo(() => {
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    if (selectedVariant?.allow_backorder) {
      return true
    }

    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant.inventory_quantity || 0) > 0
    ) {
      return true
    }

    return false
  }, [selectedVariant])

  /* ---------------------------------------------
     Intersection
  --------------------------------------------- */

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  /* ---------------------------------------------
     Add to cart
  --------------------------------------------- */

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) {
      return
    }

    setIsAdding(true)

    try {
      await addToCart({
        variantId: selectedVariant.id,
        quantity,
        countryCode,
      })
    } finally {
      setIsAdding(false)
    }
  }

  /* ---------------------------------------------
     Button state
  --------------------------------------------- */

  const buttonLabel = !selectedVariant
    ? "انتخاب نوع محصول"
    : !inStock || !isValidVariant
      ? "ناموجود"
      : isAdding
        ? "در حال افزودن..."
        : "افزودن به سبد خرید"

  return (
    <>
      <div
        ref={actionsRef}
        className="flex flex-col gap-5"
        dir="rtl"
      >
        {/* Options */}
        {(product.variants?.length ?? 0) > 1 && (
          <div className="space-y-5">
            {(product.options || []).map((option) => (
              <div
                key={option.id}
                className="
                  rounded-2xl
                  border border-[rgb(var(--color-border))]
                  bg-[rgb(var(--color-surface-muted))]
                  p-4
                "
              >
                <OptionSelect
                  option={option}
                  current={options[option.id]}
                  updateOption={setOptionValue}
                  title={option.title ?? ""}
                  data-testid="product-options"
                  disabled={!!disabled || isAdding}
                />
              </div>
            ))}
          </div>
        )}

        {/* Price */}
        <div
          className="
            rounded-2xl
            border border-[rgb(var(--color-border))]
            bg-[rgb(var(--color-surface-muted))]
            px-5 py-4
          "
        >
          <span className="mb-2 block text-xs text-[rgb(var(--color-foreground-muted))]">
            قیمت محصول
          </span>

          <div className="text-xl font-black text-[rgb(var(--color-primary))]">
            <ProductPrice
              product={product}
              variant={selectedVariant}
            />
          </div>
        </div>

        {/* Stock */}
        <div className="flex items-center gap-2 px-1">
          <span
            className={`
              h-2.5 w-2.5 rounded-full
              ${
              inStock
                ? "bg-[rgb(var(--color-success))]"
                : "bg-[rgb(var(--color-danger))]"
            }
            `}
          />

          <span
            className={`
              text-xs font-semibold
              ${
              inStock
                ? "text-[rgb(var(--color-success))]"
                : "text-[rgb(var(--color-danger))]"
            }
            `}
          >
            {inStock ? "موجود و آماده سفارش" : "در حال حاضر موجود نیست"}
          </span>
        </div>


        <div className="flex items-center justify-between rounded-2xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] p-2">
  <span className="px-3 text-sm font-semibold text-[rgb(var(--color-foreground))]">
    تعداد
  </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setQuantity((prev) => prev + 1)}
              disabled={!!disabled || isAdding}
              className="
        flex h-10 w-10 items-center justify-center
        rounded-xl
        bg-[rgb(var(--color-surface-muted))]
        text-lg font-bold
        transition
        hover:bg-[rgb(var(--color-primary)/0.08)]
        disabled:opacity-50
      "
            >
              +
            </button>

            <span className="flex h-10 min-w-12 items-center justify-center rounded-xl border border-[rgb(var(--color-border))] text-sm font-bold">
      {quantity}
    </span>

            <button
              type="button"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              disabled={quantity <= 1 || !!disabled || isAdding}
              className="
        flex h-10 w-10 items-center justify-center
        rounded-xl
        bg-[rgb(var(--color-surface-muted))]
        text-lg font-bold
        transition
        hover:bg-[rgb(var(--color-primary)/0.08)]
        disabled:opacity-40
      "
            >
              −
            </button>
          </div>
        </div>

        {/* Add to cart */}
        <Button
          onClick={handleAddToCart}
          disabled={
            !inStock ||
            !selectedVariant ||
            !!disabled ||
            isAdding ||
            !isValidVariant
          }
          variant="primary"
          isLoading={isAdding}
          data-testid="add-product-button"
          className="
            h-14
            w-full
            rounded-2xl
            text-sm
            font-bold
            shadow-[var(--shadow-card)]
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:shadow-[var(--shadow-elevated)]
          "
        >
          {buttonLabel}
        </Button>

        {/* Trust information */}
        <div
          className="
            grid grid-cols-2
            gap-2
            border-t border-[rgb(var(--color-border))]
            pt-5
          "
        >
          <div className="rounded-xl bg-[rgb(var(--color-surface-muted))] p-3">
            <span className="block text-xs font-bold">
              ارسال مطمئن
            </span>

            <span className="mt-1 block text-[10px] text-[rgb(var(--color-foreground-muted))]">
              تحویل در محل پروژه
            </span>
          </div>

          <div className="rounded-xl bg-[rgb(var(--color-surface-muted))] p-3">
            <span className="block text-xs font-bold">
              خرید امن
            </span>

            <span className="mt-1 block text-[10px] text-[rgb(var(--color-foreground-muted))]">
              پرداخت امن و مطمئن
            </span>
          </div>
        </div>
      </div>

      <MobileActions
        product={product}
        variant={selectedVariant}
        options={options}
        updateOptions={setOptionValue}
        inStock={inStock}
        handleAddToCart={handleAddToCart}
        isAdding={isAdding}
        show={!inView}
        optionsDisabled={!!disabled || isAdding}
      />
    </>
  )
}