import { listProductsWithSort } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { OptionValueIds } from "@lib/util/product-option-filters"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
}

export default async function PaginatedProducts({
                                                  sortBy,
                                                  page,
                                                  collectionId,
                                                  categoryId,
                                                  productsIds,
                                                  countryCode,
                                                  optionValueIds,
                                                }: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
  optionValueIds?: OptionValueIds
}) {
  const queryParams: PaginatedProductsParams = {
    limit: PRODUCT_LIMIT,
  }

  if (collectionId) {
    queryParams.collection_id = [collectionId]
  }

  if (categoryId) {
    queryParams.category_id = [categoryId]
  }

  if (productsIds?.length) {
    queryParams.id = productsIds
  }

  if (sortBy === "created_at") {
    queryParams.order = "created_at"
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const {
    response: { products, count },
  } = await listProductsWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
    optionValueIds,
  })

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  if (!products.length) {
    return (
      <div
        dir="rtl"
        className="
          flex min-h-[320px]
          items-center justify-center
          rounded-2xl
          border border-dashed
          border-[rgb(var(--color-border))]
          bg-[rgb(var(--color-surface))]
          px-6
          text-center
        "
      >
        <div>
          <div className="text-4xl">📦</div>

          <h3 className="mt-4 text-lg font-bold text-[rgb(var(--color-foreground))]">
            محصولی پیدا نشد
          </h3>

          <p className="mt-2 text-sm text-[rgb(var(--color-foreground-muted))]">
            فیلترهای انتخاب‌شده محصولی برای نمایش ندارند.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div dir="rtl">
      <div className="mb-5 flex items-center justify-between">
        <span className="text-xs text-[rgb(var(--color-foreground-muted))]">
          {count.toLocaleString("fa-IR")} محصول
        </span>
      </div>

      <ul
        className="
          grid w-full
          grid-cols-2
          gap-4
          sm:grid-cols-2
          md:grid-cols-3
          xl:grid-cols-4
          2xl:gap-5
        "
        data-testid="products-list"
      >
        {products.map((product) => (
          <li key={product.id} className="min-w-0">
            <ProductPreview
              product={product}
              region={region}
            />
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <Pagination
            data-testid="product-pagination"
            page={page}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  )
}