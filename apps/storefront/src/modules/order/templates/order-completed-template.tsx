import { cookies as nextCookies } from "next/headers"
import { HttpTypes } from "@medusajs/types"

import CartTotals from "@modules/common/components/cart-totals"
import Items from "@modules/order/components/items"
import Help from "@modules/order/components/help"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import ShippingDetails from "@modules/order/components/shipping-details"
import PaymentDetails from "@modules/order/components/payment-details"
import OrderDetails from "@modules/order/components/order-details"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export default async function OrderCompletedTemplate({
                                                       order,
                                                     }: OrderCompletedTemplateProps) {
  const cookies = await nextCookies()
  const isOnboarding =
    cookies.get("_medusa_onboarding")?.value === "true"

  return (
    <main
      dir="rtl"
      className="min-h-[calc(100vh-64px)] bg-[rgb(var(--color-background))]"
      data-testid="order-complete-container"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* =========================
            SUCCESS HERO
        ========================== */}
        <section className="mb-8 overflow-hidden rounded-[2rem] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] shadow-[var(--shadow-card)]">
          <div className="relative overflow-hidden px-6 py-10 text-center sm:px-10 sm:py-14">
            {/* decorative background */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-[rgb(var(--color-primary)/0.06)]" />
            <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-[rgb(var(--color-accent)/0.06)]" />

            <div className="relative">
              {/* success icon */}
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[rgb(var(--color-success)/0.12)]">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[rgb(var(--color-success))] text-xl font-black text-white">
                  ✓
                </div>
              </div>

              <p className="mb-2 text-xs font-bold text-[rgb(var(--color-success))]">
                سفارش با موفقیت ثبت شد
              </p>

              <h1 className="text-2xl font-black tracking-tight text-[rgb(var(--color-foreground))] sm:text-4xl">
                ممنون از خرید شما
              </h1>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[rgb(var(--color-foreground-muted))]">
                سفارش شما با موفقیت در سیستم ثبت شده است.
                کارشناسان آریاسا برای هماهنگی نهایی با شما تماس
                خواهند گرفت.
              </p>

              {/* order number */}
              <div className="mx-auto mt-7 inline-flex items-center gap-3 rounded-2xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface-muted))] px-4 py-3">
                <span className="text-[10px] font-bold text-[rgb(var(--color-foreground-muted))]">
                  شماره سفارش
                </span>

                <span className="text-sm font-black tracking-wide text-[rgb(var(--color-primary))]">
                  #{order.display_id}
                </span>
              </div>
            </div>
          </div>
        </section>

        {isOnboarding && (
          <div className="mb-8">
            <OnboardingCta orderId={order.id} />
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_0.9fr]">
          {/* =========================
              MAIN CONTENT
          ========================== */}
          <div className="space-y-6">
            {/* Order details */}
            <section className="overflow-hidden rounded-[2rem] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] shadow-[var(--shadow-card)]">
              <div className="border-b border-[rgb(var(--color-border))] px-5 py-5 sm:px-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgb(var(--color-primary)/0.08)] text-sm font-black text-[rgb(var(--color-primary))]">
                    ۱
                  </div>

                  <div>
                    <h2 className="text-base font-black text-[rgb(var(--color-foreground))] sm:text-lg">
                      اطلاعات سفارش
                    </h2>

                    <p className="mt-1 text-[10px] leading-5 text-[rgb(var(--color-foreground-muted))]">
                      جزئیات ثبت سفارش شما
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <OrderDetails order={order} />
              </div>
            </section>

            {/* Items */}
            <section className="overflow-hidden rounded-[2rem] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] shadow-[var(--shadow-card)]">
              <div className="border-b border-[rgb(var(--color-border))] px-5 py-5 sm:px-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgb(var(--color-primary)/0.08)] text-sm font-black text-[rgb(var(--color-primary))]">
                    ۲
                  </div>

                  <div>
                    <h2 className="text-base font-black text-[rgb(var(--color-foreground))] sm:text-lg">
                      محصولات سفارش
                    </h2>

                    <p className="mt-1 text-[10px] leading-5 text-[rgb(var(--color-foreground-muted))]">
                      اقلام ثبت‌شده در این سفارش
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <Items order={order} />
              </div>
            </section>

            {/* Shipping */}
            <section className="overflow-hidden rounded-[2rem] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] shadow-[var(--shadow-card)]">
              <div className="border-b border-[rgb(var(--color-border))] px-5 py-5 sm:px-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgb(var(--color-accent)/0.10)] text-sm font-black text-[rgb(var(--color-accent))]">
                    ۳
                  </div>

                  <div>
                    <h2 className="text-base font-black text-[rgb(var(--color-foreground))] sm:text-lg">
                      اطلاعات ارسال
                    </h2>

                    <p className="mt-1 text-[10px] leading-5 text-[rgb(var(--color-foreground-muted))]">
                      محل تحویل و هماهنگی ارسال
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <ShippingDetails order={order} />
              </div>
            </section>

            {/* Payment */}
            {/*<section className="overflow-hidden rounded-[2rem] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] shadow-[var(--shadow-card)]">*/}
            {/*  <div className="border-b border-[rgb(var(--color-border))] px-5 py-5 sm:px-7">*/}
            {/*    <div className="flex items-center gap-3">*/}
            {/*      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgb(var(--color-primary)/0.08)] text-sm font-black text-[rgb(var(--color-primary))]">*/}
            {/*        ۴*/}
            {/*      </div>*/}

            {/*      <div>*/}
            {/*        <h2 className="text-base font-black text-[rgb(var(--color-foreground))] sm:text-lg">*/}
            {/*          وضعیت پرداخت*/}
            {/*        </h2>*/}

            {/*        <p className="mt-1 text-[10px] leading-5 text-[rgb(var(--color-foreground-muted))]">*/}
            {/*          وضعیت پرداخت سفارش*/}
            {/*        </p>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}

            {/*  <div className="p-5 sm:p-7">*/}
            {/*    <PaymentDetails order={order} />*/}
            {/*  </div>*/}
            {/*</section>*/}
          </div>

          {/* =========================
              SIDEBAR
          ========================== */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="space-y-6">
              {/* Summary */}
              <section className="overflow-hidden rounded-[2rem] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] shadow-[var(--shadow-card)]">
                <div className="border-b border-[rgb(var(--color-border))] px-5 py-5 sm:px-6">
                  <h2 className="text-base font-black text-[rgb(var(--color-foreground))]">
                    خلاصه سفارش
                  </h2>

                  <p className="mt-1 text-[10px] text-[rgb(var(--color-foreground-muted))]">
                    مبلغ نهایی سفارش
                  </p>
                </div>

                <div className="p-5 sm:p-6">
                  <CartTotals totals={order} />
                </div>
              </section>

              {/* Status */}
              <section className="rounded-[2rem] border border-[rgb(var(--color-primary)/0.12)] bg-[rgb(var(--color-primary)/0.05)] p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[rgb(var(--color-primary)/0.10)] text-[rgb(var(--color-primary))]">
                    ✓
                  </div>

                  <div>
                    <h3 className="text-sm font-black text-[rgb(var(--color-foreground))]">
                      ثبت سفارش شما انجام شد
                    </h3>

                    <p className="mt-1 text-[11px] leading-6 text-[rgb(var(--color-foreground-muted))]">
                      سفارش برای بررسی و هماهنگی به تیم فروش
                      ارسال شده است.
                    </p>
                  </div>
                </div>
              </section>

              {/* Help */}
              <section className="overflow-hidden rounded-[2rem] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] shadow-[var(--shadow-card)]">
                <div className="p-5 sm:p-6">
                  <Help />
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}