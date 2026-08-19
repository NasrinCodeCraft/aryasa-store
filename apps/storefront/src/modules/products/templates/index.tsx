import React, { Suspense } from "react"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"

import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
                                                           product,
                                                           region,
                                                           countryCode,
                                                           images,
                                                         }) => {
  if (!product?.id) {
    return notFound()
  }

  return (
    <main dir="rtl" className="bg-[rgb(var(--color-background))]">
      {/* Product */}
      <section
        className="content-container py-6 sm:py-10 lg:py-14"
        data-testid="product-container"
      >
        {/* Breadcrumb */}
        <div className="mb-6 text-xs text-[rgb(var(--color-foreground-muted))]">
          فروشگاه
          <span className="mx-2">/</span>
          {product.title}
        </div>

        <div
          className="
            grid grid-cols-1 gap-8
            lg:grid-cols-[1.15fr_0.85fr]
            lg:items-start
            lg:gap-12
          "
        >
          {/* Gallery */}
          <div
            className="
              order-1
              overflow-hidden
              rounded-3xl
              border border-[rgb(var(--color-border))]
              bg-[rgb(var(--color-surface))]
              p-2 sm:p-4
              shadow-[var(--shadow-card)]
            "
          >
            <ImageGallery images={images} />
          </div>

          {/* Product information */}
          <div className="order-2 lg:sticky lg:top-28">
            <div
              className="
                rounded-3xl
                border border-[rgb(var(--color-border))]
                bg-[rgb(var(--color-surface))]
                p-5 sm:p-7
                shadow-[var(--shadow-card)]
              "
            >
              <ProductInfo product={product} />

              <div className="my-6 h-px bg-[rgb(var(--color-border))]" />

              <Suspense
                fallback={
                  <ProductActions
                    disabled
                    product={product}
                    region={region}
                  />
                }
              >
                <ProductActionsWrapper
                  id={product.id}
                  region={region}
                />
              </Suspense>

              <ProductOnboardingCta />
            </div>

            {/* Tabs */}
            <div
              className="
                mt-5
                rounded-3xl
                border border-[rgb(var(--color-border))]
                bg-[rgb(var(--color-surface))]
                p-5 sm:p-7
              "
            >
              <ProductTabs product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      <section
        className="
          border-t
          border-[rgb(var(--color-border))]
          bg-[rgb(var(--color-surface-muted))]
          py-14 sm:py-20
        "
        data-testid="related-products-container"
      >
        <div className="content-container">
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts
              product={product}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </section>
    </main>
  )
}

export default ProductTemplate