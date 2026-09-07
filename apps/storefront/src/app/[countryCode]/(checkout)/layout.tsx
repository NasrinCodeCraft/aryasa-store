import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import Image from "next/image"

export default function CheckoutLayout({
                                         children,
                                       }: {
  children: React.ReactNode
}) {
  return (
    <div
      dir="rtl"
      className="
        min-h-screen
        w-full
        bg-[rgb(var(--color-background))]
      "
    >
      {/* =====================================================
          CHECKOUT HEADER
      ====================================================== */}

      <header
        className="
          sticky
          top-0
          z-50
          w-full
          border-b
          border-[rgb(var(--color-border))]
          bg-[rgb(var(--color-surface))]/95
          backdrop-blur-xl
        "
      >
        <nav
          className="
            content-container
            flex
            h-[72px]
            items-center
            justify-between
          "
        >
          {/* Back to cart */}

          <div className="flex flex-1 basis-0 justify-start">
            <LocalizedClientLink
              href="/cart"
              className="
                group
                inline-flex
                items-center
                gap-2
                rounded-xl
                px-2
                py-2
                text-xs
                font-bold
                text-[rgb(var(--color-foreground-muted))]
                transition-all
                duration-200
                hover:bg-[rgb(var(--color-surface-muted))]
                hover:text-[rgb(var(--color-primary))]
              "
              data-testid="back-to-cart-link"
            >
              <ChevronDown
                className="
                  h-4
                  w-4
                  -rotate-90
                  transition-transform
                  duration-200
                  group-hover:translate-x-0.5
                "
              />

              <span className="hidden sm:inline">
                بازگشت به سبد خرید
              </span>

              <span className="sm:hidden">
                بازگشت
              </span>
            </LocalizedClientLink>
          </div>

          {/* Brand */}

          <LocalizedClientLink
            href="/"
            className="
              flex
              shrink-0
              flex-col
              items-center
              justify-center
              leading-none
            "
            data-testid="store-link"
          >
            <Image
              src="/images/aryasa-logo.png"
              alt="آریاسا"
              width={100}
              height={50}
            />
          </LocalizedClientLink>

          {/* Secure checkout */}

          <div className="flex flex-1 basis-0 justify-end">
            <div
              className="
                hidden
                items-center
                gap-2
                rounded-xl
                border
                border-[rgb(var(--color-border))]
                bg-[rgb(var(--color-surface-muted))]
                px-3
                py-2
                sm:flex
              "
            >
              <span
                className="
                  flex
                  h-6
                  w-6
                  items-center
                  justify-center
                  rounded-lg
                  bg-[rgb(var(--color-accent)/0.12)]
                  text-[10px]
                  font-black
                  text-[rgb(var(--color-accent))]
                "
              >
                ✓
              </span>

              <span
                className="
                  text-[10px]
                  font-semibold
                  text-[rgb(var(--color-foreground-muted))]
                "
              >
                خرید امن
              </span>
            </div>
          </div>
        </nav>
      </header>

      {/* =====================================================
          CHECKOUT CONTENT
      ====================================================== */}

      <main
        className="
          relative
          w-full
        "
        data-testid="checkout-container"
      >
        <div className="content-container py-6 sm:py-10">
          {children}
        </div>
      </main>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer
        className="
          mt-8
          border-t
          border-[rgb(var(--color-border))]
          bg-[rgb(var(--color-surface))]
        "
      >
        <div
          className="
            content-container
            flex
            flex-col
            items-center
            justify-between
            gap-3
            py-5
            sm:flex-row
          "
        >
          <p
            className="
              text-[10px]
              leading-5
              text-[rgb(var(--color-foreground-muted))]
            "
          >
            پرداخت و ثبت سفارش در آریاسا
          </p>

          <p
            className="
              text-[10px]
              leading-5
              text-[rgb(var(--color-foreground-muted))]
            "
          >
            © {new Date().getFullYear()} آریاسا
          </p>
        </div>
      </footer>
    </div>
  )
}