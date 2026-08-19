import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductCard from "../product-card"

type ProductGridProps = {
  products: HttpTypes.StoreProduct[]
}

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <section dir="rtl" className="content-container py-16 sm:py-20">
      {/* Header */}
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-[rgb(var(--color-accent))]">
            محصولات منتخب
          </span>

          <h2 className="mt-2 text-2xl font-black sm:text-3xl">
            مصالح پرفروش
          </h2>

          <p className="mt-2 text-sm text-[rgb(var(--color-foreground-muted))]">
            محصولات مورد نیاز پروژه‌های ساختمانی
          </p>
        </div>
        <LocalizedClientLink
          href="/store"
          className="
            hidden rounded-xl px-4 py-2
            text-sm font-semibold
            text-[rgb(var(--color-primary))]
            transition-colors
            hover:bg-[rgb(var(--color-primary)/0.06)]
            sm:block
          "
        >
          مشاهده همه ←
        </LocalizedClientLink>
      </div>

      {/* Products */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      {/* Mobile */}
      <LocalizedClientLink
        href="/store"
        className="
          mt-5 flex items-center justify-center
          rounded-xl
          border border-[rgb(var(--color-border))]
          py-3
          text-sm font-semibold
          text-[rgb(var(--color-primary))]
          transition-colors
          hover:bg-[rgb(var(--color-primary)/0.05)]
          sm:hidden
        "
      >
        مشاهده همه محصولات
      </LocalizedClientLink>
    </section>
  )
}

export default ProductGrid