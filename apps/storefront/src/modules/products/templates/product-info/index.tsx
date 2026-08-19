import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info" dir="rtl">
      <div className="flex flex-col gap-y-5">
        {/* Category */}
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="
              w-fit
              rounded-full
              border border-[rgb(var(--color-accent)/0.35)]
              bg-[rgb(var(--color-accent)/0.08)]
              px-3 py-1.5
              text-xs font-semibold
              text-[rgb(var(--color-accent))]
              transition-colors
              hover:bg-[rgb(var(--color-accent)/0.14)]
            "
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}

        {/* Title */}
        <Heading
          level="h1"
          className="
            text-2xl
            font-black
            leading-[1.5]
            tracking-tight
            text-[rgb(var(--color-foreground))]
            sm:text-3xl
            lg:text-4xl
          "
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        {/* Short divider */}
        <div className="h-1 w-12 rounded-full bg-[rgb(var(--color-accent))]" />

        {/* Description */}
        {product.description && (
          <div>
            <h2 className="mb-2 text-sm font-bold text-[rgb(var(--color-foreground))]">
              درباره محصول
            </h2>

            <Text
              className="
                whitespace-pre-line
                text-sm
                leading-7
                text-[rgb(var(--color-foreground-muted))]
                sm:text-base
                sm:leading-8
              "
              data-testid="product-description"
            >
              {product.description}
            </Text>
          </div>
        )}

        {/* Product information */}
        <div
          className="
            mt-2
            grid grid-cols-2
            gap-3
            border-t border-[rgb(var(--color-border))]
            pt-5
          "
        >
          <div
            className="
              rounded-2xl
              bg-[rgb(var(--color-surface-muted))]
              p-4
            "
          >
            <span className="block text-[10px] text-[rgb(var(--color-foreground-muted))]">
              وضعیت
            </span>

            <span className="mt-1 block text-sm font-bold text-[rgb(var(--color-success))]">
              موجود
            </span>
          </div>

          <div
            className="
              rounded-2xl
              bg-[rgb(var(--color-surface-muted))]
              p-4
            "
          >
            <span className="block text-[10px] text-[rgb(var(--color-foreground-muted))]">
              نوع محصول
            </span>

            <span className="mt-1 block text-sm font-bold text-[rgb(var(--color-foreground))]">
              مصالح ساختمانی
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo