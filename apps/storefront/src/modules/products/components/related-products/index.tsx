import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"

import ProductPreview from "../product-preview"

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

export default async function RelatedProducts({
                                                product,
                                                countryCode,
                                              }: RelatedProductsProps) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const queryParams: HttpTypes.StoreProductListParams = {
    region_id: region.id,
    is_giftcard: false,
    limit: 8,
  }

  if (product.collection_id) {
    queryParams.collection_id = [product.collection_id]
  }

  if (product.tags?.length) {
    queryParams.tag_id = product.tags
      .map((tag) => tag.id)
      .filter(Boolean) as string[]
  }

  const products = await listProducts({
    queryParams,
    countryCode,
  }).then(({ response }) =>
    response.products.filter(
      (relatedProduct) => relatedProduct.id !== product.id
    )
  )

  if (!products.length) {
    return null
  }

  return (
    <section
      dir="rtl"
      className="content-container py-16 sm:py-20"
    >
      {/* Header */}
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[rgb(var(--color-primary))]">
            پیشنهاد برای شما
          </span>

          <h2 className="mt-2 text-2xl font-black sm:text-3xl">
            محصولات مشابه
          </h2>

          <p className="mt-2 text-sm text-[rgb(var(--color-foreground-muted))]">
            محصولات دیگری که ممکن است برای پروژه شما مناسب باشند
          </p>
        </div>
      </div>

      {/* Products */}
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {products.slice(0, 8).map((relatedProduct) => (
          <li key={relatedProduct.id}>
            <ProductPreview
              product={relatedProduct}
              region={region}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}