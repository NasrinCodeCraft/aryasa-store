import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductCardProps = {
  product: HttpTypes.StoreProduct
}

const ProductCard = ({ product }: ProductCardProps) => {
  const price = product.variants?.[0]?.calculated_price

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block"
    >
      <article
        className="
          overflow-hidden rounded-2xl
          border border-[rgb(var(--color-border))]
          bg-[rgb(var(--color-surface))]
          shadow-[var(--shadow-card)]
          transition-all duration-300
          hover:-translate-y-1
          hover:shadow-[var(--shadow-elevated)]
        "
      >
        {/* Image */}
        <div
          className="
            relative aspect-square overflow-hidden
            bg-[rgb(var(--color-surface-muted))]
          "
        >
          {product.thumbnail ? (
            <img
              src={product.thumbnail}
              alt={product.title}
              className="
                h-full w-full object-cover
                transition-transform duration-500
                group-hover:scale-105
              "
            />
          ) : (
            <div
              className="
                flex h-full items-center justify-center
                text-sm
                text-[rgb(var(--color-foreground-muted))]
              "
            >
              تصویر محصول موجود نیست
            </div>
          )}

          {/* Badge */}
          <span
            className="
              absolute right-3 top-3
              rounded-full
              bg-[rgb(var(--color-surface)/0.92)]
              px-3 py-1.5
              text-[10px] font-bold
              text-[rgb(var(--color-success))]
              shadow-sm
              backdrop-blur
            "
          >
            موجود
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3
            className="
              line-clamp-2
              min-h-[48px]
              text-sm font-bold leading-6
              text-[rgb(var(--color-foreground))]
            "
          >
            {product.title}
          </h3>

          <div className="mt-4 flex items-end justify-between gap-3">
            <div>
              <span className="block text-[10px] text-[rgb(var(--color-foreground-muted))]">
                قیمت
              </span>

              <span
                className="
                  mt-1 block
                  text-base font-black
                  text-[rgb(var(--color-primary))]
                "
              >
                {price?.calculated_amount != null
                  ? price.calculated_amount.toLocaleString("fa-IR")
                  : "استعلام قیمت"}
              </span>

              {price?.calculated_amount != null && (
                <span className="text-[10px] text-[rgb(var(--color-foreground-muted))]">
                  {price.currency_code?.toUpperCase()}
                </span>
              )}
            </div>

            <span
              className="
                flex h-9 w-9 shrink-0
                items-center justify-center
                rounded-xl
                bg-[rgb(var(--color-primary))]
                text-white
                transition-all duration-200
                group-hover:-translate-x-1
              "
            >
              ←
            </span>
          </div>
        </div>
      </article>
    </LocalizedClientLink>
  )
}

export default ProductCard