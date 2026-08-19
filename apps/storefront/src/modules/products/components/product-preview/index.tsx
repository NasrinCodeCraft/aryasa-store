import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
                                               product,
                                               isFeatured,
                                               region: _region,
                                             }: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block"
    >
      <article
        dir="rtl"
        className="
          overflow-hidden
          rounded-2xl
          border border-[rgb(var(--color-border))]
          bg-[rgb(var(--color-surface))]
          shadow-[var(--shadow-card)]
          transition-all duration-300
          hover:-translate-y-1
          hover:shadow-[var(--shadow-elevated)]
        "
        data-testid="product-wrapper"
      >
        {/* Image */}
        <div className="relative overflow-hidden">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
          />

          {/* Status */}
          <span
            className="
              absolute right-3 top-3
              rounded-full
              bg-[rgb(var(--color-surface)/0.92)]
              px-3 py-1
              text-[10px]
              font-bold
              text-[rgb(var(--color-success))]
              shadow-sm
              backdrop-blur
            "
          >
            موجود
          </span>

          {/* Hover action */}
          <div
            className="
              pointer-events-none
              absolute bottom-3 left-3
              flex h-9 w-9
              translate-y-2 items-center justify-center
              rounded-xl
              bg-[rgb(var(--color-primary))]
              text-white
              opacity-0
              shadow-lg
              transition-all duration-300
              group-hover:translate-y-0
              group-hover:opacity-100
            "
          >
            ←
          </div>
        </div>

        {/* Information */}
        <div className="p-4 sm:p-5">
          <h3
            className="
              line-clamp-2
              min-h-[48px]
              text-sm
              font-bold
              leading-6
              text-[rgb(var(--color-foreground))]
              transition-colors
              group-hover:text-[rgb(var(--color-primary))]
            "
            data-testid="product-title"
          >
            {product.title}
          </h3>

          <div className="mt-4 flex items-end justify-between gap-3">
            <div>
              <span className="mb-1 block text-[10px] text-[rgb(var(--color-foreground-muted))]">
                قیمت
              </span>

              {cheapestPrice ? (
                <div className="text-sm font-black text-[rgb(var(--color-primary))]">
                  <PreviewPrice price={cheapestPrice} />
                </div>
              ) : (
                <span className="text-sm font-bold text-[rgb(var(--color-foreground-muted))]">
                  استعلام قیمت
                </span>
              )}
            </div>

            <span
              className="
                hidden
                text-xs
                font-semibold
                text-[rgb(var(--color-foreground-muted))]
                sm:block
              "
            >
              مشاهده محصول
            </span>
          </div>
        </div>
      </article>
    </LocalizedClientLink>
  )
}