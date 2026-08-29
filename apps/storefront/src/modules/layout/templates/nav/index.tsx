import { Suspense } from "react"

import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { listCategories } from "@lib/data/categories"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import SearchForm from "@modules/layout/components/search-form"

import {
  MagnifyingGlass,
  Lifebuoy,
  Gift,
  User,
  MapPin,
  Phone,
  ChevronDownMini,
  BuildingStorefront,
  Buildings,
  CubeSolid,
  ShoppingBag,
  Tag,
  Tools,
} from "@medusajs/icons"

import Image from "next/image"

export default async function Nav() {
  const [regions, locales, currentLocale, categories] = await Promise.all([
    listRegions(),
    listLocales(),
    getLocale(),
    listCategories({
      limit: 20,
      fields: "id,name,handle",
    }),
  ])

  return (
    <header
      dir="rtl"
      className="
        sticky top-0 z-50 w-full
        bg-[rgb(var(--color-surface))]
        shadow-[0_2px_20px_rgba(0,0,0,0.06)]
      "
    >
      {/* =====================================================
          TOP BAR
      ====================================================== */}

      <div
        className="
          hidden lg:block
          bg-[rgb(var(--color-primary))]
          text-white
        "
      >
        <div className="content-container">
          <div
            className="
              flex h-9
              items-center
              justify-between
              text-[11px]
              font-medium
            "
          >
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-[rgb(var(--color-accent))]" />
                <span>ارسال به سراسر کشور</span>
              </div>

              <div className="h-4 w-px bg-white/20" />

              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-[rgb(var(--color-accent))]" />
                <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <LocalizedClientLink
                href="/orders"
                className="flex items-center gap-2 transition-colors hover:text-[rgb(var(--color-accent))]"
              >
                <span className="text-[rgb(var(--color-accent))]">●</span>
                پیگیری سفارش
              </LocalizedClientLink>

              <LocalizedClientLink
                href="/help"
                className="
    flex items-center gap-2
    transition-colors
    hover:text-[rgb(var(--color-accent))]
  "
              >
                <Lifebuoy className="h-3.5 w-3.5 text-[rgb(var(--color-accent))]" />
                راهنمای خرید
              </LocalizedClientLink>

              <LocalizedClientLink
                href="/special-offers"
                className="
                  flex items-center gap-2
                  font-bold
                  text-[rgb(var(--color-accent))]
                  transition-opacity
                  hover:opacity-80
                "
              >
                <Gift className="h-3.5 w-3.5" />
                تخفیف‌های ویژه
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN HEADER
      ====================================================== */}

      <div className="border-b border-[rgb(var(--color-border))]">
        <div className="content-container">
          <div
            className="
              flex
              min-h-[76px]
              items-center
              gap-4
              py-3
              lg:gap-8
            "
          >
            {/* Mobile menu */}

            <div className="lg:hidden">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
              />
            </div>

            {/* =================================================
                LOGO
            ================================================== */}

            <LocalizedClientLink
              href="/"
              className="
                flex
                shrink-0
                items-center
              "
            >

              <Image
                  src="/images/aryasa-logo.png"
                  alt="آریاسا"
                  width={100}
                  height={50}
              />
              <div className="hidden sm:block">
                <div
                  className="
                    text-xl
                    font-black
                    tracking-tight
                    text-[rgb(var(--color-foreground))]
                  "
                >
                  ARYASA
                </div>

                <div
                  className="
                    mt-0.5
                    text-[10px]
                    font-medium
                    text-[rgb(var(--color-foreground-muted))]
                  "
                >
                  تامین مصالح ساختمانی
                </div>
              </div>
            </LocalizedClientLink>

            {/* =================================================
                SEARCH
            ================================================== */}

            <div className="min-w-0 flex-1">
              <SearchForm />
            </div>

            {/* =================================================
                ACCOUNT
            ================================================== */}

            <LocalizedClientLink
              href="/account"
              className="
                hidden
                shrink-0
                items-center
                gap-3
                rounded-2xl
                border
                border-[rgb(var(--color-border))]
                px-4
                py-2.5
                transition-all
                hover:border-[rgb(var(--color-accent))]
                hover:bg-[rgb(var(--color-surface-muted))]
                sm:flex
              "
            >
              <User
                className="
                  h-5
                  w-5
                  text-[rgb(var(--color-primary))]
                "
              />

              <div className="hidden xl:block">
                <span
                  className="
                    block
                    text-[10px]
                    text-[rgb(var(--color-foreground-muted))]
                  "
                >
                  حساب کاربری
                </span>

                <span
                  className="
                    block
                    text-xs
                    font-bold
                    text-[rgb(var(--color-foreground))]
                  "
                >
                  ورود / ثبت‌نام
                </span>
              </div>
            </LocalizedClientLink>

            {/* =================================================
                CART
            ================================================== */}

            <Suspense
              fallback={
                <LocalizedClientLink
                  href="/cart"
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-[rgb(var(--color-border))]
                  "
                >
                  <span className="text-sm">🛒</span>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </div>
      </div>

      {/* =====================================================
    CATEGORY NAVIGATION
====================================================== */}

      <div
          className="
    hidden
    border-b border-[rgb(var(--color-border))]
    bg-[rgb(var(--color-surface))]
    lg:block
  "
      >
        <div className="content-container">
          <nav
              className="
        flex
        h-[64px]
        items-center
        gap-2
        overflow-x-auto
        no-scrollbar
      "
          >
            {/* All Categories */}

            <LocalizedClientLink
                href="/categories"
                className="
          group
          flex
          h-11
          shrink-0
          items-center
          gap-2.5
          rounded-xl
          bg-[rgb(var(--color-primary))]
          px-4
          text-xs
          font-bold
          text-white
          shadow-sm
          transition-all
          duration-200
          hover:-translate-y-0.5
          hover:shadow-[var(--shadow-elevated)]
        "
            >
        <span
            className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-lg
            bg-[rgb(var(--color-accent))]
            text-[rgb(var(--color-primary))]
          "
        >
          <Buildings className="h-4 w-4" />
        </span>

              <span>همه دسته‌بندی‌ها</span>

              <ChevronDownMini
                  className="
            h-4
            w-4
            transition-transform
            duration-200
            group-hover:rotate-180
          "
              />
            </LocalizedClientLink>

            {/* Divider */}

            <div
                className="
          mx-1
          h-7
          w-px
          shrink-0
          bg-[rgb(var(--color-border))]
        "
            />

            {/* All Products */}

            <LocalizedClientLink
                href="/store"
                className="
          group
          flex
          h-11
          shrink-0
          items-center
          gap-2
          rounded-xl
          px-4
          text-xs
          font-bold
          text-[rgb(var(--color-primary))]
          transition-all
          duration-200
          hover:bg-[rgb(var(--color-surface-muted))]
        "
            >
              <ShoppingBag
                  className="
            h-4
            w-4
            transition-transform
            duration-200
            group-hover:-translate-y-0.5
          "
              />

              <span>همه محصولات</span>
            </LocalizedClientLink>

            {/* Real Categories */}

            {categories?.map((category, index) => {
              const categoryIcons = [
                BuildingStorefront,
                CubeSolid,
                Buildings,
                ShoppingBag,
                Tag,
                Tools,
              ]

              const CategoryIcon =
                  categoryIcons[index % categoryIcons.length]

              return (
                  <LocalizedClientLink
                      key={category.id}
                      href={`/categories/${category.handle}`}
                      className="
              group
              flex
              h-11
              shrink-0
              items-center
              gap-2
              rounded-xl
              px-4
              text-xs
              font-semibold
              text-[rgb(var(--color-foreground-muted))]
              transition-all
              duration-200
              hover:bg-[rgb(var(--color-surface-muted))]
              hover:text-[rgb(var(--color-primary))]
            "
                  >
                    <CategoryIcon
                        className="
                h-4
                w-4
                transition-transform
                duration-200
                group-hover:-translate-y-0.5
              "
                    />

                    <span>{category.name}</span>
                  </LocalizedClientLink>
              )
            })}

            {/* Divider */}

            <div
                className="
          mx-1
          h-7
          w-px
          shrink-0
          bg-[rgb(var(--color-border))]
        "
            />

            {/* Services */}

            <LocalizedClientLink
                href="/services"
                className="
          group
          flex
          h-11
          shrink-0
          items-center
          gap-2
          rounded-xl
          px-4
          text-xs
          font-semibold
          text-[rgb(var(--color-foreground-muted))]
          transition-all
          duration-200
          hover:bg-[rgb(var(--color-surface-muted))]
          hover:text-[rgb(var(--color-primary))]
        "
            >
              <Tools
                  className="
            h-4
            w-4
            transition-transform
            duration-200
            group-hover:rotate-12
          "
              />

              <span>خدمات ما</span>
            </LocalizedClientLink>
          </nav>
        </div>
      </div>

    </header>
  )
}
