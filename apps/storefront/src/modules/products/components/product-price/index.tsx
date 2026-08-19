import { clx } from "@modules/common/components/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
                                       product,
                                       variant,
                                     }: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return (
      <div
        className="
          h-10 w-32
          animate-pulse
          rounded-xl
          bg-[rgb(var(--color-surface-muted))]
        "
      />
    )
  }

  const isSale = selectedPrice.price_type === "sale"

  return (
    <div
      dir="rtl"
      className="flex flex-col gap-1"
    >
      <div className="flex items-baseline gap-2">
        {!variant && (
          <span className="text-xs text-[rgb(var(--color-foreground-muted))]">
            از
          </span>
        )}

        <span
          className={clx(
            "text-xl font-black tracking-tight",
            isSale
              ? "text-[rgb(var(--color-danger))]"
              : "text-[rgb(var(--color-primary))]"
          )}
          data-testid="product-price"
          data-value={selectedPrice.calculated_price_number}
        >
          {selectedPrice.calculated_price}
        </span>
      </div>

      {isSale && (
        <div className="flex items-center gap-2">
          <span
            className="
              text-xs
              text-[rgb(var(--color-foreground-muted))]
              line-through
            "
            data-testid="original-product-price"
            data-value={selectedPrice.original_price_number}
          >
            {selectedPrice.original_price}
          </span>

          <span
            className="
              rounded-full
              bg-[rgb(var(--color-danger)/0.08)]
              px-2 py-0.5
              text-[10px] font-bold
              text-[rgb(var(--color-danger))]
            "
          >
            {selectedPrice.percentage_diff}% تخفیف
          </span>
        </div>
      )}
    </div>
  )
}