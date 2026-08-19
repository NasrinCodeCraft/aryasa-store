import { Suspense } from "react"

import { OptionValueIds } from "@lib/util/product-option-filters"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
                         sortBy,
                         page,
                         countryCode,
                         optionValueIds,
                       }: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  optionValueIds?: OptionValueIds
}) => {
  const pageNumber = page ? parseInt(page, 10) : 1
  const sort = sortBy || "created_at"

  return (
    <main dir="rtl" className="min-h-screen bg-[rgb(var(--color-background))]">
      {/* Header */}
      <section className="border-b border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))]">
        <div className="content-container py-10 sm:py-14">
          <span className="text-xs font-bold text-[rgb(var(--color-accent))]">
            فروشگاه آریاسا
          </span>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-[rgb(var(--color-foreground))] sm:text-4xl">
            فروشگاه مصالح ساختمانی
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[rgb(var(--color-foreground-muted))]">
            آجر، سیمان، گچ، بلوک، شن و ماسه و سایر مصالح مورد نیاز پروژه خود را
            پیدا کنید.
          </p>
        </div>
      </section>

      {/* Store */}
      <div className="content-container py-8 sm:py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">

          {/* Filters */}
          <aside className="w-full shrink-0 lg:w-[250px]">
            <div className="aryasa-card p-5">
              <div className="mb-5">
                <h2 className="text-base font-bold text-[rgb(var(--color-foreground))]">
                  فیلتر و مرتب‌سازی
                </h2>

                <p className="mt-1 text-xs text-[rgb(var(--color-foreground-muted))]">
                  محصولات را بر اساس نیاز خود محدود کنید
                </p>
              </div>

              <RefinementList sortBy={sort} />
            </div>
          </aside>

          {/* Products */}
          <section className="min-w-0 flex-1">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-[rgb(var(--color-foreground))]">
                  همه محصولات
                </h2>

                <p className="mt-1 text-xs text-[rgb(var(--color-foreground-muted))]">
                  جدیدترین مصالح موجود در فروشگاه
                </p>
              </div>
            </div>

            <Suspense
              key={`${sort}-${pageNumber}-${JSON.stringify(optionValueIds)}`}
              fallback={<SkeletonProductGrid />}
            >
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                countryCode={countryCode}
                optionValueIds={optionValueIds}
              />
            </Suspense>
          </section>
        </div>
      </div>
    </main>
  )
}

export default StoreTemplate