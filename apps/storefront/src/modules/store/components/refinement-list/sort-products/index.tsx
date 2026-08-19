"use client"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

type SortProductsProps = {
  sortBy: SortOptions
  setQueryParams: (name: string, value: string) => void
  "data-testid"?: string
}

const sortOptions = [
  {
    value: "created_at",
    label: "جدیدترین محصولات",
  },
  {
    value: "price_asc",
    label: "ارزان‌ترین",
  },
  {
    value: "price_desc",
    label: "گران‌ترین",
  },
]

const SortProducts = ({
                        "data-testid": dataTestId,
                        sortBy,
                        setQueryParams,
                      }: SortProductsProps) => {
  const handleChange = (value: string) => {
    setQueryParams("sortBy", value)
  }

  return (
    <div dir="rtl">
      <FilterRadioGroup
        title="مرتب‌سازی"
        items={sortOptions}
        value={sortBy}
        handleChange={handleChange}
        data-testid={dataTestId}
      />
    </div>
  )
}

export default SortProducts