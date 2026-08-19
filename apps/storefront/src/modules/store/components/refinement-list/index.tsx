"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useMemo } from "react"

import {
  OPTION_VALUE_QUERY_KEY,
  parseOptionValueIds,
} from "@lib/util/product-option-filters"

import OptionsPicker from "./options-picker"
import SortProducts, { SortOptions } from "./sort-products"

type RefinementListProps = {
  sortBy: SortOptions
  search?: boolean
  hideOptionsPicker?: boolean
  "data-testid"?: string
}

const RefinementList = ({
                          sortBy,
                          hideOptionsPicker = false,
                          "data-testid": dataTestId,
                        }: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateQueryParams = useCallback(
    (updater: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString())

      updater(params)

      // با تغییر فیلتر یا sort، برگرد به صفحه اول
      params.delete("page")

      const queryString = params.toString()

      router.push(
        queryString
          ? `${pathname}?${queryString}`
          : pathname
      )
    },
    [pathname, router, searchParams]
  )

  const setQueryParams = useCallback(
    (name: string, value: string) => {
      updateQueryParams((params) => {
        params.set(name, value)
      })
    },
    [updateQueryParams]
  )

  const selectedOptionValueIds = useMemo(
    () => parseOptionValueIds(searchParams),
    [searchParams]
  )

  const setOptionValueIds = useCallback(
    (valueIds: string[]) => {
      updateQueryParams((params) => {
        params.delete(OPTION_VALUE_QUERY_KEY)

        valueIds.forEach((valueId) => {
          params.append(
            OPTION_VALUE_QUERY_KEY,
            valueId
          )
        })
      })
    },
    [updateQueryParams]
  )

  return (
    <aside
      dir="rtl"
      className="
        w-full
        text-[rgb(var(--color-foreground))]
      "
      data-testid={dataTestId}
    >
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-black">
            فیلتر و مرتب‌سازی
          </h2>

          <p className="mt-1 text-[11px] text-[rgb(var(--color-foreground-muted))]">
            محصولات مورد نظر خود را پیدا کنید
          </p>
        </div>
      </div>

      {/* Sort */}
      <div
        className="
          rounded-xl
          border border-[rgb(var(--color-border))]
          bg-[rgb(var(--color-surface-muted))]
          p-3
        "
      >
        <div className="mb-2 text-xs font-bold">
          مرتب‌سازی
        </div>

        <SortProducts
          sortBy={sortBy}
          setQueryParams={setQueryParams}
          data-testid={dataTestId}
        />
      </div>

      {/* Options */}
      {!hideOptionsPicker && (
        <div className="mt-5">
          <div className="mb-3 text-xs font-bold">
            فیلتر محصولات
          </div>

          <OptionsPicker
            selectedValueIds={selectedOptionValueIds}
            setOptionValueIds={setOptionValueIds}
          />
        </div>
      )}
    </aside>
  )
}

export default RefinementList