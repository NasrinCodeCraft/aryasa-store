"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@modules/common/components/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import {
  ShoppingCart,
  X,
  ArrowLeft,
} from "@medusajs/icons"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

type CartDropdownProps = {
  cart?: HttpTypes.StoreCart | null
}

const CartDropdown = ({ cart: cartState }: CartDropdownProps) => {
  const pathname = usePathname()

  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)
  const [activeTimer, setActiveTimer] = useState<
    ReturnType<typeof setTimeout> | null
  >(null)

  const totalItems =
    cartState?.items?.reduce(
      (acc, item) => acc + (item.quantity ?? 0),
      0
    ) ?? 0

  const subtotal = cartState?.subtotal ?? 0

  const previousItemCount = useRef(totalItems)

  const open = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
      setActiveTimer(null)
    }

    setCartDropdownOpen(true)
  }

  const close = () => {
    setCartDropdownOpen(false)

    if (activeTimer) {
      clearTimeout(activeTimer)
      setActiveTimer(null)
    }
  }

  const timedOpen = () => {
    open()

    const timer = setTimeout(() => {
      setCartDropdownOpen(false)
      setActiveTimer(null)
    }, 5000)

    setActiveTimer(timer)
  }

  /*
   * وقتی محصولی به سبد اضافه/حذف می‌شود،
   * dropdown به صورت خودکار باز می‌شود.
   */
  useEffect(() => {
    if (
      previousItemCount.current !== totalItems &&
      !pathname.includes("/cart")
    ) {
      timedOpen()
    }

    previousItemCount.current = totalItems

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, pathname])

  /*
   * Cleanup
   */
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  return (
    <div
      className="relative h-full"
      onMouseEnter={open}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        {({ open: headlessOpen }) => (
          <>
            {/* =====================================================
                CART BUTTON
            ===================================================== */}

            <PopoverButton
              className="
                group
                relative
                flex
                h-11
                items-center
                gap-2
                rounded-xl
                px-3
                outline-none
                transition-all
                duration-200
                hover:bg-[rgb(var(--color-surface-muted))]
                focus-visible:ring-2
                focus-visible:ring-[rgb(var(--color-accent))]
              "
              aria-label={`سبد خرید، ${totalItems} کالا`}
            >
              <span
                className={`
                  relative
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  transition-all
                  duration-200
                  ${
                  headlessOpen || cartDropdownOpen
                    ? "bg-[rgb(var(--color-primary))] text-white"
                    : "bg-[rgb(var(--color-surface-muted))] text-[rgb(var(--color-foreground))]"
                }
                `}
              >
                <ShoppingCart className="h-[19px] w-[19px]" />

                {/* Count badge */}
                {totalItems > 0 && (
                  <span
                    className="
                      absolute
                      -right-1
                      -top-1
                      flex
                      h-[19px]
                      min-w-[19px]
                      items-center
                      justify-center
                      rounded-full
                      border-2
                      border-[rgb(var(--color-surface))]
                      bg-[rgb(var(--color-accent))]
                      px-1
                      text-[10px]
                      font-black
                      leading-none
                      text-[rgb(var(--color-primary))]
                    "
                  >
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </span>

              <span className="hidden xl:flex flex-col items-start leading-none">
                <span className="text-[10px] font-medium text-[rgb(var(--color-foreground-muted))]">
                  سبد خرید
                </span>

                <span className="mt-1 text-xs font-bold text-[rgb(var(--color-foreground))]">
                  {totalItems === 0
                    ? "خالی است"
                    : `${totalItems} کالا`}
                </span>
              </span>
            </PopoverButton>

            {/* =====================================================
                DROPDOWN
            ===================================================== */}

            <Transition
              as={Fragment}
              show={cartDropdownOpen || headlessOpen}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-2 scale-[0.98]"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-2 scale-[0.98]"
            >
              <PopoverPanel
                static
                className="
                  absolute
                  left-0
                  top-[calc(100%+14px)]
                  z-[100]
                  w-[min(420px,calc(100vw-24px))]
                  overflow-hidden
                  rounded-2xl
                  border
                  border-[rgb(var(--color-border))]
                  bg-[rgb(var(--color-surface))]
                  text-[rgb(var(--color-foreground))]
                  shadow-[var(--shadow-elevated)]
                  ring-1
                  ring-black/[0.03]
                "
                data-testid="nav-cart-dropdown"
              >
                {/* =================================================
                    HEADER
                ================================================= */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-[rgb(var(--color-border))]
                    px-5
                    py-4
                  "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        bg-[rgb(var(--color-primary))]
                        text-white
                      "
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </div>

                    <div>
                      <h3 className="text-sm font-black">
                        سبد خرید
                      </h3>

                      <p className="mt-0.5 text-[10px] text-[rgb(var(--color-foreground-muted))]">
                        {totalItems === 0
                          ? "سبد شما خالی است"
                          : `${totalItems} کالا در سبد شما`}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={close}
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-lg
                      text-[rgb(var(--color-foreground-muted))]
                      transition-colors
                      hover:bg-[rgb(var(--color-surface-muted))]
                      hover:text-[rgb(var(--color-foreground))]
                    "
                    aria-label="بستن"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* =================================================
                    EMPTY CART
                ================================================= */}

                {!cartState?.items?.length ? (
                  <div className="px-6 py-12 text-center">
                    <div
                      className="
                        mx-auto
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-2xl
                        bg-[rgb(var(--color-surface-muted))]
                        text-[rgb(var(--color-primary))]
                      "
                    >
                      <ShoppingCart className="h-7 w-7" />
                    </div>

                    <h3 className="mt-5 text-sm font-black">
                      سبد خرید شما خالی است
                    </h3>

                    <p
                      className="
                        mx-auto
                        mt-2
                        max-w-[250px]
                        text-xs
                        leading-6
                        text-[rgb(var(--color-foreground-muted))]
                      "
                    >
                      محصولات مورد نیاز پروژه خود را انتخاب کنید
                      و برای سفارش به سبد خرید اضافه کنید.
                    </p>

                    <LocalizedClientLink href="/store">
                      <Button
                        onClick={close}
                        className="
                          mt-6
                          h-11
                          w-full
                          rounded-xl
                          bg-[rgb(var(--color-primary))]
                          text-sm
                          font-bold
                          text-white
                          transition-all
                          duration-200
                          hover:-translate-y-0.5
                          hover:shadow-lg
                        "
                      >
                        مشاهده محصولات
                      </Button>
                    </LocalizedClientLink>
                  </div>
                ) : (
                  <>
                    {/* =============================================
                        ITEMS
                    ============================================= */}

                    <div
                      className="
                        max-h-[390px]
                        overflow-y-auto
                        px-4
                        py-3
                        no-scrollbar
                      "
                    >
                      {cartState.items
                        .slice()
                        .sort((a, b) =>
                          (a.created_at ?? "") >
                          (b.created_at ?? "")
                            ? -1
                            : 1
                        )
                        .map((item) => (
                          <div
                            key={item.id}
                            className="
                              group
                              flex
                              gap-3
                              border-b
                              border-[rgb(var(--color-border))]
                              py-4
                              last:border-b-0
                            "
                            data-testid="cart-item"
                          >
                            {/* Product image */}

                            <LocalizedClientLink
                              href={`/products/${item.product_handle}`}
                              className="
                                h-[76px]
                                w-[76px]
                                shrink-0
                                overflow-hidden
                                rounded-xl
                                bg-[rgb(var(--color-surface-muted))]
                              "
                            >
                              <Thumbnail
                                thumbnail={item.thumbnail}
                                images={item.variant?.product?.images}
                                size="square"
                              />
                            </LocalizedClientLink>

                            {/* Product info */}

                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <div className="min-w-0">
                                  <LocalizedClientLink
                                    href={`/products/${item.product_handle}`}
                                    className="
                                      block
                                      truncate
                                      text-xs
                                      font-bold
                                      transition-colors
                                      hover:text-[rgb(var(--color-primary))]
                                    "
                                    data-testid="product-link"
                                  >
                                    {item.title}
                                  </LocalizedClientLink>

                                  <div className="mt-1 text-[10px] text-[rgb(var(--color-foreground-muted))]">
                                    <LineItemOptions
                                      variant={item.variant}
                                      data-testid="cart-item-variant"
                                      data-value={item.variant}
                                    />
                                  </div>
                                </div>

                                <div className="shrink-0 text-left">
                                  <LineItemPrice
                                    item={item}
                                    style="tight"
                                    currencyCode={cartState.currency_code}
                                  />
                                </div>
                              </div>

                              <div className="mt-3 flex items-center justify-between">
                                <div
                                  className="
                                    rounded-lg
                                    bg-[rgb(var(--color-surface-muted))]
                                    px-2.5
                                    py-1.5
                                    text-[10px]
                                    font-semibold
                                    text-[rgb(var(--color-foreground-muted))]
                                  "
                                  data-testid="cart-item-quantity"
                                  data-value={item.quantity}
                                >
                                  تعداد: {item.quantity}
                                </div>

                                <DeleteButton
                                  id={item.id}
                                  className="
                                    text-[10px]
                                    font-semibold
                                    text-[rgb(var(--color-danger))]
                                    opacity-70
                                    transition-opacity
                                    hover:opacity-100
                                  "
                                  data-testid="cart-item-remove-button"
                                >
                                  حذف
                                </DeleteButton>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* =============================================
                        FOOTER
                    ============================================= */}

                    <div
                      className="
                        border-t
                        border-[rgb(var(--color-border))]
                        bg-[rgb(var(--color-surface-muted))]
                        px-5
                        py-4
                      "
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="block text-[10px] text-[rgb(var(--color-foreground-muted))]">
                            جمع سبد خرید
                          </span>

                          <span className="mt-1 block text-[10px] text-[rgb(var(--color-foreground-muted))]">
                            بدون احتساب مالیات
                          </span>
                        </div>

                        <span
                          className="
                            text-lg
                            font-black
                            text-[rgb(var(--color-primary))]
                          "
                          data-testid="cart-subtotal"
                          data-value={subtotal}
                        >
                          {convertToLocale({
                            amount: subtotal,
                            currency_code: cartState.currency_code,
                          })}
                        </span>
                      </div>

                      <LocalizedClientLink
                        href="/cart"
                        className="mt-4 block"
                      >
                        <Button
                          onClick={close}
                          size="large"
                          className="
                            flex
                            h-12
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-[rgb(var(--color-primary))]
                            text-sm
                            font-bold
                            text-white
                            shadow-sm
                            transition-all
                            duration-200
                            hover:-translate-y-0.5
                            hover:shadow-[var(--shadow-elevated)]
                          "
                          data-testid="go-to-cart-button"
                        >
                          <span>مشاهده سبد خرید</span>

                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                      </LocalizedClientLink>
                    </div>
                  </>
                )}
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}

export default CartDropdown