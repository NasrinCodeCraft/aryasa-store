import { Suspense } from "react"

import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { listCategories } from "@lib/data/categories"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

import { MagnifyingGlass, User, ShoppingCart } from "@medusajs/icons"
import Image from "next/image"

import aryasaLogo from "../../../../../public/images/aryasa-logo.png"

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
        border-b border-[rgb(var(--color-border))]
        bg-[rgb(var(--color-surface))]/95
        backdrop-blur-xl
      "
    >
      <div className="content-container">
        <div className="flex h-20 items-center gap-5">
          {/* Mobile */}
          <div className="lg:hidden">
            <SideMenu
              regions={regions}
              locales={locales}
              currentLocale={currentLocale}
            />
          </div>

          {/* Logo */}
          <LocalizedClientLink
            href="/"
            className="flex items-center gap-3 shrink-0"
          >
            <Image src={aryasaLogo.src} alt="" width={100} height={50} />
          </LocalizedClientLink>

          {/* Categories */}
          <nav className="hidden xl:flex items-center gap-6 mr-5">
            <LocalizedClientLink
              href="/store"
              className="
                text-sm font-bold
                hover:text-[rgb(var(--color-primary))]
              "
            >
              همه محصولات
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/categories"
              className="
                text-sm font-bold
                hover:text-[rgb(var(--color-primary))]
              "
            >
              مصالح ساختمانی
            </LocalizedClientLink>

            <LocalizedClientLink
              href="/services"
              className="
                text-sm font-bold
                hover:text-[rgb(var(--color-primary))]
              "
            >
              خدمات ما
            </LocalizedClientLink>
          </nav>

          {/* Search */}
          <div className="flex-1 hidden md:block">
            <div
              className="
flex h-12
items-center
gap-3
rounded-2xl
border
border-[#0B1F3A]/10
bg-white
px-5
shadow-sm
transition-all
hover:shadow-md
focus-within:ring-2
focus-within:ring-[#C8A45D]
"
            >
              <MagnifyingGlass
                className="
                  h-5 w-5
                  text-[rgb(var(--color-foreground-muted))]
                "
              />

              <span
                className="
                  text-sm
                  text-[rgb(var(--color-foreground-muted))]
                "
              >
                جستجوی آجر، سیمان، گچ، بلوک و مصالح...
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <LocalizedClientLink
              href="/account"
              className="
                hidden sm:flex
                h-11 w-11
                items-center justify-center
                rounded-xl
                hover:bg-[rgb(var(--color-background))]
              "
            >
              <User className="h-5 w-5" />
            </LocalizedClientLink>

            <Suspense fallback={<ShoppingCart className="h-5 w-5" />}>
              <CartButton />
            </Suspense>
          </div>
        </div>

        {/* Category Bar */}

        <div
          className="
            hidden lg:flex
            h-12
            items-center
            gap-7
            overflow-x-auto
            border-t
            border-[rgb(var(--color-border))]
          "
        >
          {categories?.map((category) => (
            <LocalizedClientLink
              key={category.id}
              href={`/categories/${category.handle}`}
              className="
                shrink-0
                text-sm
                font-medium
                text-[rgb(var(--color-foreground-muted))]
                hover:text-[rgb(var(--color-primary))]
              "
            >
              {category.name}
            </LocalizedClientLink>
          ))}
        </div>
      </div>
    </header>
  )
}
