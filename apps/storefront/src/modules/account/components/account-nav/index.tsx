"use client"

import { ArrowRightOnRectangle } from "@medusajs/icons"
import { useParams, usePathname } from "next/navigation"

import { signout } from "@lib/data/customer"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import MapPin from "@modules/common/icons/map-pin"
import Package from "@modules/common/icons/package"
import User from "@modules/common/icons/user"

const AccountNav = ({
                      customer,
                    }: {
  customer: HttpTypes.StoreCustomer | null
}) => {
  const route = usePathname()
  const { countryCode } = useParams() as {
    countryCode: string
  }

  return (
      <aside dir="rtl" className="w-full">
        {/* =========================================================
          MOBILE
      ========================================================== */}

        <div
            className="small:hidden"
            data-testid="mobile-account-nav"
        >
          {route !== `/${countryCode}/account` ? (
              <LocalizedClientLink
                  href="/account"
                  className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-[rgb(var(--color-border))]
              bg-[rgb(var(--color-surface))]
              px-4
              py-3
              text-sm
              font-semibold
              text-[rgb(var(--color-foreground))]
            "
                  data-testid="account-main-link"
              >
                <ChevronDown className="rotate-90" />
                <span>حساب کاربری</span>
              </LocalizedClientLink>
          ) : (
              <div
                  className="
              overflow-hidden
              rounded-2xl
              border
              border-[rgb(var(--color-border))]
              bg-[rgb(var(--color-surface))]
              shadow-[var(--shadow-card)]
            "
              >
                {/* Mobile profile header */}

                <div
                    className="
                bg-[rgb(var(--color-primary))]
                px-5
                py-5
              "
                >
                  <div className="flex items-center gap-3">
                    <div
                        className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[rgb(var(--color-accent))]
                    text-sm
                    font-black
                    text-[rgb(var(--color-primary))]
                  "
                    >
                      {(customer?.first_name?.charAt(0) || "A").toUpperCase()}
                    </div>

                    <div className="min-w-0 text-right">
                  <span className="block text-[10px] text-white/60">
                    حساب کاربری
                  </span>

                      <span className="mt-1 block truncate text-sm font-bold text-white">
                    سلام {customer?.first_name || "کاربر"} عزیز
                  </span>

                      {customer?.phone && (
                          <span
                              dir="ltr"
                              className="mt-1 block text-[10px] text-white/60"
                          >
                      {customer.phone}
                    </span>
                      )}
                    </div>
                  </div>
                </div>

                <ul className="divide-y divide-[rgb(var(--color-border))]">
                  <MobileNavItem
                      href="/account/profile"
                      icon={<User size={19} />}
                      label="پروفایل"
                      description="اطلاعات حساب کاربری"
                      data-testid="profile-link"
                  />

                  <MobileNavItem
                      href="/account/addresses"
                      icon={<MapPin size={19} />}
                      label="آدرس‌ها"
                      description="آدرس‌های ارسال و تحویل"
                      data-testid="addresses-link"
                  />

                  <MobileNavItem
                      href="/account/orders"
                      icon={<Package size={19} />}
                      label="سفارش‌ها"
                      description="تاریخچه سفارش‌های شما"
                      data-testid="orders-link"
                  />

                  {/* Logout */}

                  <li>
                    <form
                        action={signout.bind(null, countryCode)}
                    >
                      <button
                          type="submit"
                          className="
                      flex
                      w-full
                      items-center
                      justify-between
                      px-5
                      py-4
                      text-right
                      transition-colors
                      hover:bg-red-50
                    "
                          data-testid="logout-button"
                      >
                        <div className="flex items-center gap-3">
                      <span
                          className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-xl
                          bg-red-50
                          text-red-600
                        "
                      >
                        <ArrowRightOnRectangle className="h-[18px] w-[18px]" />
                      </span>

                          <div>
                        <span className="block text-sm font-bold text-red-600">
                          خروج از حساب
                        </span>

                            <span className="mt-0.5 block text-[10px] text-[rgb(var(--color-foreground-muted))]">
                          خروج امن از حساب کاربری
                        </span>
                          </div>
                        </div>

                        <ChevronDown className="-rotate-90 text-red-400" />
                      </button>
                    </form>
                  </li>
                </ul>
              </div>
          )}
        </div>

        {/* =========================================================
          DESKTOP
      ========================================================== */}

        <div
            className="hidden small:block"
            data-testid="account-nav"
        >
          <div
              className="
            overflow-hidden
            rounded-2xl
            border
            border-[rgb(var(--color-border))]
            bg-[rgb(var(--color-surface))]
            shadow-[var(--shadow-card)]
          "
          >
            {/* Header */}

            <div
                className="
              border-b
              border-[rgb(var(--color-border))]
              bg-[rgb(var(--color-primary))]
              px-5
              py-5
            "
            >
              <div className="flex items-center gap-3">
                <div
                    className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[rgb(var(--color-accent))]
                  text-sm
                  font-black
                  text-[rgb(var(--color-primary))]
                "
                >
                  {(customer?.first_name?.charAt(0) || "A").toUpperCase()}
                </div>

                <div className="min-w-0">
                <span className="block text-[10px] text-white/60">
                  حساب کاربری
                </span>

                  <span className="mt-1 block truncate text-sm font-bold text-white">
                  {customer?.first_name || "کاربر"}
                </span>

                  {customer?.phone && (
                      <span
                          dir="ltr"
                          className="mt-1 block truncate text-[10px] text-white/55"
                      >
                    {customer.phone}
                  </span>
                  )}
                </div>
              </div>
            </div>

            {/* Menu */}

            <nav className="p-3">
              <ul className="flex flex-col gap-1">
                <DesktopNavItem
                    href="/account"
                    route={route}
                    data-testid="overview-link"
                >
                  نمای کلی
                </DesktopNavItem>

                <DesktopNavItem
                    href="/account/profile"
                    route={route}
                    data-testid="profile-link"
                >
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  پروفایل
                </span>
                </DesktopNavItem>

                <DesktopNavItem
                    href="/account/addresses"
                    route={route}
                    data-testid="addresses-link"
                >
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  آدرس‌ها
                </span>
                </DesktopNavItem>

                <DesktopNavItem
                    href="/account/orders"
                    route={route}
                    data-testid="orders-link"
                >
                <span className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  سفارش‌ها
                </span>
                </DesktopNavItem>

                {/* Divider */}

                <li className="my-2 border-t border-[rgb(var(--color-border))]" />

                {/* Logout */}

                <li>
                  <form
                      action={signout.bind(null, countryCode)}
                  >
                    <button
                        type="submit"
                        className="
                      flex
                      w-full
                      items-center
                      gap-2
                      rounded-xl
                      px-4
                      py-3
                      text-right
                      text-sm
                      font-semibold
                      text-red-600
                      transition-all
                      duration-200
                      hover:bg-red-50
                    "
                        data-testid="logout-button"
                    >
                      <ArrowRightOnRectangle className="h-4 w-4" />
                      خروج از حساب
                    </button>
                  </form>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </aside>
  )
}

/* ===============================================================
   MOBILE NAV ITEM
=============================================================== */

type MobileNavItemProps = {
  href: string
  icon: React.ReactNode
  label: string
  description: string
  "data-testid"?: string
}

const MobileNavItem = ({
                         href,
                         icon,
                         label,
                         description,
                         "data-testid": dataTestId,
                       }: MobileNavItemProps) => {
  return (
      <li>
        <LocalizedClientLink
            href={href}
            className="
          group
          flex
          items-center
          justify-between
          px-5
          py-4
          transition-colors
          hover:bg-[rgb(var(--color-surface-muted))]
        "
            data-testid={dataTestId}
        >
          <div className="flex items-center gap-3">
          <span
              className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-[rgb(var(--color-primary)/0.07)]
              text-[rgb(var(--color-primary))]
              transition-colors
              group-hover:bg-[rgb(var(--color-primary))]
              group-hover:text-white
            "
          >
            {icon}
          </span>

            <div>
            <span className="block text-sm font-bold">
              {label}
            </span>

              <span className="mt-0.5 block text-[10px] text-[rgb(var(--color-foreground-muted))]">
              {description}
            </span>
            </div>
          </div>

          <ChevronDown className="-rotate-90 text-[rgb(var(--color-foreground-muted))]" />
        </LocalizedClientLink>
      </li>
  )
}

/* ===============================================================
   DESKTOP NAV ITEM
=============================================================== */

type DesktopNavItemProps = {
  href: string
  route: string
  children: React.ReactNode
  "data-testid"?: string
}

const DesktopNavItem = ({
                          href,
                          route,
                          children,
                          "data-testid": dataTestId,
                        }: DesktopNavItemProps) => {
  const {countryCode} = useParams() as {
    countryCode: string
  }

  const DesktopNavItem = ({
                            href,
                            route,
                            children,
                            "data-testid": dataTestId,
                          }: DesktopNavItemProps) => {
    const {countryCode} = useParams() as {
      countryCode: string
    }

    const active =
        route.split(`/${countryCode}`)[1] === href

    return (
        <li>
          <LocalizedClientLink
              href={href}
              className={
                active
                    ? `
              flex
              items-center
              rounded-xl
              bg-[rgb(var(--color-primary))]
              px-4
              py-3
              text-sm
              font-bold
              text-white
              shadow-sm
            `
                    : `
              flex
              items-center
              rounded-xl
              px-4
              py-3
              text-sm
              text-[rgb(var(--color-foreground-muted))]
              transition-all
              duration-200
              hover:bg-[rgb(var(--color-surface-muted))]
              hover:text-[rgb(var(--color-primary))]
            `
              }
              data-testid={dataTestId}
          >
            {children}
          </LocalizedClientLink>
        </li>
    )
  }
}

export default AccountNav