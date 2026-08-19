"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, ArrowRight } from "@medusajs/icons"

type PaginationProps = {
  page: number
  totalPages: number
  "data-testid"?: string
}

const Pagination = ({
                      page,
                      totalPages,
                      "data-testid": dataTestId,
                    }: PaginationProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const goToPage = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages || nextPage === page) {
      return
    }

    const params = new URLSearchParams(searchParams.toString())
    params.set("page", String(nextPage))

    router.push(`${pathname}?${params.toString()}`)
  }

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  )

  return (
    <nav
      dir="rtl"
      aria-label="صفحه‌بندی محصولات"
      data-testid={dataTestId}
      className="flex items-center justify-center gap-2"
    >
      {/* Next */}
      <button
        type="button"
        onClick={() => goToPage(page - 1)}
        disabled={page === 1}
        aria-label="صفحه قبلی"
        className="
          flex h-10 w-10 items-center justify-center
          rounded-xl
          border border-[rgb(var(--color-border))]
          bg-[rgb(var(--color-surface))]
          text-[rgb(var(--color-foreground))]
          transition-all duration-200
          hover:border-[rgb(var(--color-primary))]
          hover:text-[rgb(var(--color-primary))]
          disabled:pointer-events-none
          disabled:opacity-40
        "
      >
        <ArrowRight className="h-4 w-4" />
      </button>

      {/* Pages */}
      <div className="flex items-center gap-1">
        {pages.map((pageNumber) => {
          const active = pageNumber === page

          return (
            <button
              key={pageNumber}
              type="button"
              onClick={() => goToPage(pageNumber)}
              aria-current={active ? "page" : undefined}
              className={`
                flex h-10 min-w-10 items-center justify-center
                rounded-xl px-3
                text-sm font-semibold
                transition-all duration-200
                ${
                active
                  ? "bg-[rgb(var(--color-primary))] text-white shadow-sm"
                  : "text-[rgb(var(--color-foreground-muted))] hover:bg-[rgb(var(--color-primary)/0.06)] hover:text-[rgb(var(--color-primary))]"
              }
              `}
            >
              {pageNumber.toLocaleString("fa-IR")}
            </button>
          )
        })}
      </div>

      {/* Previous */}
      <button
        type="button"
        onClick={() => goToPage(page + 1)}
        disabled={page === totalPages}
        aria-label="صفحه بعدی"
        className="
          flex h-10 w-10 items-center justify-center
          rounded-xl
          border border-[rgb(var(--color-border))]
          bg-[rgb(var(--color-surface))]
          text-[rgb(var(--color-foreground))]
          transition-all duration-200
          hover:border-[rgb(var(--color-primary))]
          hover:text-[rgb(var(--color-primary))]
          disabled:pointer-events-none
          disabled:opacity-40
        "
      >
        <ArrowLeft className="h-4 w-4" />
      </button>
    </nav>
  )
}

export default Pagination