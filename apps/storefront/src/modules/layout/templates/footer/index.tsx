import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ArrowUpRightMini, ChevronDownMini } from "@medusajs/icons"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })

  const productCategories = await listCategories()

  const currentYear = new Date().getFullYear()

  return (
    <footer
      dir="rtl"
      className="
        relative
        mt-20
        w-full
        overflow-hidden
        border-t
        border-[rgb(var(--color-border))]
        bg-[rgb(var(--color-primary))]
        text-white
      "
    >
      {/* Decorative background */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="
            absolute
            -left-32
            -top-32
            h-[360px]
            w-[360px]
            rounded-full
            bg-[rgb(var(--color-accent)/0.08)]
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-40
            right-1/3
            h-[420px]
            w-[420px]
            rounded-full
            bg-white/[0.03]
            blur-3xl
          "
        />

        <div
          className="
            absolute
            inset-x-0
            top-0
            h-px
            bg-gradient-to-l
            from-transparent
            via-[rgb(var(--color-accent)/0.35)]
            to-transparent
          "
        />
      </div>

      <div className="content-container relative z-10">

        {/* =====================================================
            TOP CTA
        ====================================================== */}

        <div
          className="
            flex
            flex-col
            gap-6
            border-b
            border-white/10
            py-10
            sm:flex-row
            sm:items-center
            sm:justify-between
            lg:py-12
          "
        >
          <div className="max-w-2xl">
            <div
              className="
                mb-3
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[rgb(var(--color-accent)/0.25)]
                bg-[rgb(var(--color-accent)/0.08)]
                px-3
                py-1.5
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[rgb(var(--color-accent))]
                "
              />

              <span
                className="
                  text-[10px]
                  font-bold
                  text-[rgb(var(--color-accent))]
                "
              >
                آریاسا
              </span>
            </div>

            <h2
              className="
                text-xl
                font-black
                leading-8
                sm:text-2xl
              "
            >
              تأمین مطمئن مصالح برای پروژه شما
            </h2>

            <p
              className="
                mt-2
                max-w-xl
                text-xs
                leading-6
                text-white/60
                sm:text-sm
              "
            >
              آریاسا، بستری برای پیدا کردن و سفارش آسان مصالح
              ساختمانی مورد نیاز پروژه شما.
            </p>
          </div>

          <LocalizedClientLink
            href="/store"
            className="
              group
              inline-flex
              h-12
              w-full
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[rgb(var(--color-accent))]
              px-6
              text-sm
              font-black
              text-[rgb(var(--color-primary))]
              shadow-lg
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:shadow-xl
              sm:w-auto
            "
          >
            مشاهده محصولات

            <ArrowUpRightMini
              className="
                h-4
                w-4
                transition-transform
                duration-200
                group-hover:-translate-y-0.5
              "
            />
          </LocalizedClientLink>
        </div>

        {/* =====================================================
            MAIN FOOTER
        ====================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-10
            py-12
            sm:grid-cols-2
            lg:grid-cols-[1.1fr_1fr_1fr_0.8fr]
            lg:gap-12
            lg:py-16
          "
        >

          {/* ===================================================
              BRAND
          ==================================================== */}

          <div>
            <LocalizedClientLink
              href="/"
              className="
                inline-flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[rgb(var(--color-accent))]
                  text-lg
                  font-black
                  text-[rgb(var(--color-primary))]
                  shadow-lg
                "
              >
                A
              </div>

              <div>
                <div className="text-xl font-black tracking-tight">
                  ARYASA
                </div>

                <div className="mt-1 text-[10px] text-white/50">
                  تأمین مصالح ساختمانی
                </div>
              </div>
            </LocalizedClientLink>

            <p
              className="
                mt-6
                max-w-sm
                text-xs
                leading-7
                text-white/55
              "
            >
              مرجع آنلاین تهیه مصالح ساختمانی با هدف ساده‌تر
              کردن خرید برای پروژه‌های کوچک و بزرگ.
            </p>

            {/* Trust */}

            <div
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-white/10
                bg-white/[0.04]
                px-3
                py-2.5
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
                  text-[rgb(var(--color-accent))]
                "
              >
                ✓
              </span>

              <span className="text-[10px] text-white/65">
                خرید و تأمین ساده‌تر مصالح
              </span>
            </div>
          </div>

          {/* ===================================================
              CATEGORIES
          ==================================================== */}

          {productCategories && productCategories.length > 0 && (
            <div>
              <div className="mb-5">
                <h3 className="text-sm font-black">
                  دسته‌بندی مصالح
                </h3>

                <div
                  className="
                    mt-2
                    h-0.5
                    w-8
                    rounded-full
                    bg-[rgb(var(--color-accent))]
                  "
                />
              </div>

              <ul
                className="flex flex-col gap-2.5"
                data-testid="footer-categories"
              >
                {productCategories.slice(0, 7).map((category) => {
                  if (category.parent_category) {
                    return null
                  }

                  const children =
                    category.category_children?.filter(
                      (child) => child.id
                    ) || []

                  return (
                    <li key={category.id}>
                      <LocalizedClientLink
                        href={`/categories/${category.handle}`}
                        className="
                          group
                          flex
                          items-center
                          justify-between
                          text-xs
                          font-semibold
                          text-white/65
                          transition-colors
                          duration-200
                          hover:text-[rgb(var(--color-accent))]
                        "
                        data-testid="category-link"
                      >
                        <span>
                          {category.name}
                        </span>

                        {children.length > 0 && (
                          <ChevronDownMini
                            className="
                              h-3.5
                              w-3.5
                              text-white/30
                              transition-transform
                              duration-200
                              group-hover:-translate-x-0.5
                            "
                          />
                        )}
                      </LocalizedClientLink>

                      {children.length > 0 && (
                        <ul className="mr-3 mt-2 flex flex-col gap-2 border-r border-white/10 pr-3">
                          {children
                            .slice(0, 4)
                            .map((child) => (
                              <li key={child.id}>
                                <LocalizedClientLink
                                  href={`/categories/${child.handle}`}
                                  className="
                                    block
                                    text-[10px]
                                    leading-5
                                    text-white/40
                                    transition-colors
                                    hover:text-white/80
                                  "
                                  data-testid="category-link"
                                >
                                  {child.name}
                                </LocalizedClientLink>
                              </li>
                            ))}
                        </ul>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {/* ===================================================
              COLLECTIONS
          ==================================================== */}

          {collections && collections.length > 0 && (
            <div>
              <div className="mb-5">
                <h3 className="text-sm font-black">
                  مجموعه‌ها
                </h3>

                <div
                  className="
                    mt-2
                    h-0.5
                    w-8
                    rounded-full
                    bg-[rgb(var(--color-accent))]
                  "
                />
              </div>

              <ul className="flex flex-col gap-2.5">
                {collections.slice(0, 7).map((collection) => (
                  <li key={collection.id}>
                    <LocalizedClientLink
                      href={`/collections/${collection.handle}`}
                      className="
                        group
                        flex
                        items-center
                        justify-between
                        text-xs
                        text-white/60
                        transition-colors
                        duration-200
                        hover:text-[rgb(var(--color-accent))]
                      "
                    >
                      <span>
                        {collection.title}
                      </span>

                      <ArrowUpRightMini
                        className="
                          h-3.5
                          w-3.5
                          text-white/20
                          transition-transform
                          duration-200
                          group-hover:-translate-y-0.5
                        "
                      />
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ===================================================
              QUICK LINKS
          ==================================================== */}

          <div>
            <div className="mb-5">
              <h3 className="text-sm font-black">
                دسترسی سریع
              </h3>

              <div
                className="
                  mt-2
                  h-0.5
                  w-8
                  rounded-full
                  bg-[rgb(var(--color-accent))]
                "
              />
            </div>

            <ul className="flex flex-col gap-3">
              <li>
                <LocalizedClientLink
                  href="/"
                  className="
                    text-xs
                    text-white/60
                    transition-colors
                    hover:text-[rgb(var(--color-accent))]
                  "
                >
                  صفحه اصلی
                </LocalizedClientLink>
              </li>

              <li>
                <LocalizedClientLink
                  href="/store"
                  className="
                    text-xs
                    text-white/60
                    transition-colors
                    hover:text-[rgb(var(--color-accent))]
                  "
                >
                  فروشگاه
                </LocalizedClientLink>
              </li>

              <li>
                <LocalizedClientLink
                  href="/categories"
                  className="
                    text-xs
                    text-white/60
                    transition-colors
                    hover:text-[rgb(var(--color-accent))]
                  "
                >
                  همه دسته‌بندی‌ها
                </LocalizedClientLink>
              </li>

              <li>
                <LocalizedClientLink
                  href="/services"
                  className="
                    text-xs
                    text-white/60
                    transition-colors
                    hover:text-[rgb(var(--color-accent))]
                  "
                >
                  خدمات ما
                </LocalizedClientLink>
              </li>

              <li>
                <LocalizedClientLink
                  href="/account"
                  className="
                    text-xs
                    text-white/60
                    transition-colors
                    hover:text-[rgb(var(--color-accent))]
                  "
                >
                  حساب کاربری
                </LocalizedClientLink>
              </li>
            </ul>

            {/* Contact */}

            <div
              className="
                mt-7
                rounded-2xl
                border
                border-white/10
                bg-white/[0.04]
                p-4
              "
            >
              <span className="block text-[10px] text-white/40">
                نیاز به راهنمایی دارید؟
              </span>

              <a
                href="tel:+989000000000"
                dir="ltr"
                className="
                  mt-2
                  block
                  text-sm
                  font-black
                  text-[rgb(var(--color-accent))]
                  transition-opacity
                  hover:opacity-80
                "
              >
                ۰۹۰۰ ۰۰۰ ۰۰۰۰
              </a>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM
        ====================================================== */}

        <div
          className="
            flex
            flex-col
            gap-4
            border-t
            border-white/10
            py-6
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p
            className="
              text-[10px]
              leading-5
              text-white/40
            "
          >
            © {currentYear} آریاسا — تمامی حقوق محفوظ است.
          </p>

          <div className="flex items-center gap-5">
            <LocalizedClientLink
              href="/content/privacy-policy"
              className="
                text-[10px]
                text-white/40
                transition-colors
                hover:text-white/75
              "
            >
              حریم خصوصی
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/content/terms-of-use"
              className="
                text-[10px]
                text-white/40
                transition-colors
                hover:text-white/75
              "
            >
              قوانین استفاده
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </footer>
  )
}