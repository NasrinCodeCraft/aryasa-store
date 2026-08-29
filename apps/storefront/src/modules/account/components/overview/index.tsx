import { Container } from "@modules/common/components/ui"
import ChevronDown from "@modules/common/icons/chevron-down"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null
  orders: HttpTypes.StoreOrder[] | null
}

const Overview = ({ customer, orders }: OverviewProps) => {
  const profileCompletion = getProfileCompletion(customer)
  const addressCount = customer?.addresses?.length || 0

  return (
    <div
      dir="rtl"
      className="w-full"
      data-testid="overview-page-wrapper"
    >
      {/* =========================================================
          HEADER
      ========================================================== */}

      <section
        className="
          overflow-hidden
          rounded-3xl
          border
          border-[rgb(var(--color-border))]
          bg-[rgb(var(--color-surface))]
          shadow-[var(--shadow-card)]
        "
      >
        <div
          className="
            relative
            overflow-hidden
            bg-[rgb(var(--color-primary))]
            px-6
            py-7
            sm:px-8
            sm:py-8
          "
        >
          {/* Decorative gold glow */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -left-16
              -top-20
              h-48
              w-48
              rounded-full
              bg-[rgb(var(--color-accent)/0.18)]
              blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-24
              right-1/3
              h-40
              w-40
              rounded-full
              bg-white/5
              blur-3xl
            "
          />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-xs font-medium text-white/65">
                حساب کاربری آریاسا
              </p>

              <h1
                className="
                  mt-1
                  text-2xl
                  font-black
                  text-white
                  sm:text-3xl
                "
                data-testid="welcome-message"
                data-value={customer?.first_name}
              >
                سلام {customer?.first_name || "کاربر"}،
              </h1>

              <p className="mt-2 text-xs leading-6 text-white/70">
                از اینجا می‌توانید سفارش‌ها و اطلاعات حساب خود را مدیریت کنید.
              </p>
            </div>

            {/* User identity */}

            <div
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-white/10
                bg-white/5
                px-4
                py-3
                backdrop-blur-sm
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
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
                <span className="block text-[10px] text-white/55">
                  شماره / حساب
                </span>

                <span
                  className="
                    mt-1
                    block
                    max-w-[200px]
                    truncate
                    text-xs
                    font-bold
                    text-white
                  "
                  data-testid="customer-email"
                  data-value={customer?.email}
                >
                  {customer?.phone || customer?.email || "-"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================
            STATS
        ======================================================== */}

        <div
          className="
            grid
            grid-cols-1
            divide-y
            divide-[rgb(var(--color-border))]
            sm:grid-cols-3
            sm:divide-x
            sm:divide-y-0
          "
        >
          {/* Profile */}

          <div className="p-5 sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="block text-xs text-[rgb(var(--color-foreground-muted))]">
                  تکمیل پروفایل
                </span>

                <div className="mt-2 flex items-end gap-2">
                  <span
                    className="
                      text-3xl
                      font-black
                      text-[rgb(var(--color-foreground))]
                    "
                    data-testid="customer-profile-completion"
                    data-value={profileCompletion}
                  >
                    {profileCompletion}%
                  </span>

                  <span className="pb-1 text-[10px] text-[rgb(var(--color-foreground-muted))]">
                    تکمیل شده
                  </span>
                </div>
              </div>

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-[rgb(var(--color-accent)/0.12)]
                  text-xs
                  font-black
                  text-[rgb(var(--color-accent))]
                "
              >
                {profileCompletion}%
              </div>
            </div>

            {/* Progress */}

            <div
              className="
                mt-4
                h-2
                overflow-hidden
                rounded-full
                bg-[rgb(var(--color-surface-muted))]
              "
            >
              <div
                className="
                  h-full
                  rounded-full
                  bg-[rgb(var(--color-accent))]
                  transition-all
                  duration-500
                "
                style={{
                  width: `${profileCompletion}%`,
                }}
              />
            </div>
          </div>

          {/* Addresses */}

          <div className="p-5 sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="block text-xs text-[rgb(var(--color-foreground-muted))]">
                  آدرس‌ها
                </span>

                <div className="mt-2 flex items-end gap-2">
                  <span
                    className="
                      text-3xl
                      font-black
                      text-[rgb(var(--color-foreground))]
                    "
                    data-testid="addresses-count"
                    data-value={addressCount}
                  >
                    {addressCount}
                  </span>

                  <span className="pb-1 text-[10px] text-[rgb(var(--color-foreground-muted))]">
                    آدرس ذخیره‌شده
                  </span>
                </div>
              </div>

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-[rgb(var(--color-primary)/0.08)]
                  text-sm
                  font-black
                  text-[rgb(var(--color-primary))]
                "
              >
                {addressCount}
              </div>
            </div>

            <LocalizedClientLink
              href="/account/addresses"
              className="
                mt-4
                inline-flex
                text-[11px]
                font-bold
                text-[rgb(var(--color-primary))]
                transition-colors
                hover:text-[rgb(var(--color-accent))]
              "
            >
              مدیریت آدرس‌ها
            </LocalizedClientLink>
          </div>

          {/* Orders */}

          <div className="p-5 sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="block text-xs text-[rgb(var(--color-foreground-muted))]">
                  سفارش‌ها
                </span>

                <div className="mt-2 flex items-end gap-2">
                  <span className="text-3xl font-black text-[rgb(var(--color-foreground))]">
                    {orders?.length || 0}
                  </span>

                  <span className="pb-1 text-[10px] text-[rgb(var(--color-foreground-muted))]">
                    سفارش
                  </span>
                </div>
              </div>

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-[rgb(var(--color-primary)/0.08)]
                  text-[rgb(var(--color-primary))]
                "
              >
                ↗
              </div>
            </div>

            <LocalizedClientLink
              href="/account/orders"
              className="
                mt-4
                inline-flex
                text-[11px]
                font-bold
                text-[rgb(var(--color-primary))]
                transition-colors
                hover:text-[rgb(var(--color-accent))]
              "
            >
              مشاهده سفارش‌ها
            </LocalizedClientLink>
          </div>
        </div>
      </section>

      {/* =========================================================
          RECENT ORDERS
      ========================================================== */}

      <section
        className="
          mt-6
          overflow-hidden
          rounded-3xl
          border
          border-[rgb(var(--color-border))]
          bg-[rgb(var(--color-surface))]
          shadow-[var(--shadow-card)]
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-[rgb(var(--color-border))]
            px-5
            py-5
            sm:px-6
          "
        >
          <div>
            <h2 className="text-base font-black text-[rgb(var(--color-foreground))]">
              سفارش‌های اخیر
            </h2>

            <p className="mt-1 text-[11px] text-[rgb(var(--color-foreground-muted))]">
              آخرین سفارش‌های ثبت‌شده شما
            </p>
          </div>

          <LocalizedClientLink
            href="/account/orders"
            className="
              text-[11px]
              font-bold
              text-[rgb(var(--color-primary))]
              hover:text-[rgb(var(--color-accent))]
            "
          >
            مشاهده همه
          </LocalizedClientLink>
        </div>

        <div className="p-4 sm:p-5">
          {orders && orders.length > 0 ? (
            <ul
              className="flex flex-col gap-3"
              data-testid="orders-wrapper"
            >
              {orders.slice(0, 5).map((order) => {
                return (
                  <li
                    key={order.id}
                    data-testid="order-wrapper"
                    data-value={order.id}
                  >
                    <LocalizedClientLink
                      href={`/account/orders/details/${order.id}`}
                      className="group block"
                    >
                      <Container
                        className="
                          flex
                          flex-col
                          gap-4
                          rounded-2xl
                          border
                          border-[rgb(var(--color-border))]
                          bg-[rgb(var(--color-background))]
                          p-4
                          transition-all
                          duration-200
                          group-hover:-translate-y-0.5
                          group-hover:border-[rgb(var(--color-primary)/0.35)]
                          group-hover:shadow-[var(--shadow-card)]
                          sm:flex-row
                          sm:items-center
                          sm:justify-between
                        "
                      >
                        {/* Order number */}

                        <div className="flex min-w-0 items-center gap-3">
                          <div
                            className="
                              flex
                              h-11
                              w-11
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              bg-[rgb(var(--color-primary))]
                              text-[11px]
                              font-black
                              text-white
                            "
                          >
                            #{order.display_id}
                          </div>

                          <div className="min-w-0">
                            <span className="block text-[10px] text-[rgb(var(--color-foreground-muted))]">
                              شماره سفارش
                            </span>

                            <span
                              className="
                                mt-1
                                block
                                truncate
                                text-sm
                                font-bold
                                text-[rgb(var(--color-foreground))]
                              "
                              data-testid="order-id"
                              data-value={order.display_id}
                            >
                              سفارش #{order.display_id}
                            </span>
                          </div>
                        </div>

                        {/* Meta */}

                        <div
                          className="
                            grid
                            grid-cols-2
                            gap-4
                            sm:flex
                            sm:items-center
                            sm:gap-8
                          "
                        >
                          <div>
                            <span className="block text-[10px] text-[rgb(var(--color-foreground-muted))]">
                              تاریخ
                            </span>

                            <span
                              className="mt-1 block text-xs font-semibold text-[rgb(var(--color-foreground))]"
                              data-testid="order-created-date"
                            >
                              {new Date(
                                order.created_at
                              ).toLocaleDateString("fa-IR")}
                            </span>
                          </div>

                          <div>
                            <span className="block text-[10px] text-[rgb(var(--color-foreground-muted))]">
                              مبلغ
                            </span>

                            <span
                              className="
                                mt-1
                                block
                                text-xs
                                font-black
                                text-[rgb(var(--color-primary))]
                              "
                              data-testid="order-amount"
                            >
                              {convertToLocale({
                                amount: order.total,
                                currency_code:
                                order.currency_code,
                              })}
                            </span>
                          </div>

                          <ChevronDown
                            className="
                              hidden
                              h-5
                              w-5
                              -rotate-90
                              text-[rgb(var(--color-foreground-muted))]
                              transition-transform
                              group-hover:-translate-x-1
                              sm:block
                            "
                          />
                        </div>
                      </Container>
                    </LocalizedClientLink>
                  </li>
                )
              })}
            </ul>
          ) : (
            <div
              className="
                flex
                flex-col
                items-center
                justify-center
                rounded-2xl
                border
                border-dashed
                border-[rgb(var(--color-border))]
                bg-[rgb(var(--color-background))]
                px-6
                py-12
                text-center
              "
              data-testid="no-orders-message"
            >
              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[rgb(var(--color-surface-muted))]
                  text-xl
                "
              >
                🛒
              </div>

              <h3 className="mt-4 text-sm font-black">
                هنوز سفارشی ثبت نکرده‌اید
              </h3>

              <p className="mt-2 max-w-xs text-xs leading-6 text-[rgb(var(--color-foreground-muted))]">
                محصولات مورد نیاز پروژه خود را ببینید و اولین
                سفارش خود را ثبت کنید.
              </p>

              <LocalizedClientLink
                href="/store"
                className="
                  mt-5
                  inline-flex
                  h-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-[rgb(var(--color-primary))]
                  px-5
                  text-xs
                  font-bold
                  text-white
                  transition-all
                  hover:-translate-y-0.5
                  hover:shadow-lg
                "
              >
                مشاهده محصولات
              </LocalizedClientLink>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          QUICK ACTIONS
      ========================================================== */}

      <section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <LocalizedClientLink
          href="/account/profile"
          className="
            group
            rounded-2xl
            border
            border-[rgb(var(--color-border))]
            bg-[rgb(var(--color-surface))]
            p-5
            shadow-[var(--shadow-card)]
            transition-all
            duration-200
            hover:-translate-y-1
            hover:border-[rgb(var(--color-primary)/0.3)]
            hover:shadow-[var(--shadow-elevated)]
          "
        >
          <span
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-[rgb(var(--color-primary)/0.08)]
              text-[rgb(var(--color-primary))]
            "
          >
            👤
          </span>

          <h3 className="mt-4 text-sm font-black">
            ویرایش پروفایل
          </h3>

          <p className="mt-1 text-[10px] leading-5 text-[rgb(var(--color-foreground-muted))]">
            اطلاعات حساب خود را مدیریت کنید.
          </p>
        </LocalizedClientLink>

        <LocalizedClientLink
          href="/account/addresses"
          className="
            group
            rounded-2xl
            border
            border-[rgb(var(--color-border))]
            bg-[rgb(var(--color-surface))]
            p-5
            shadow-[var(--shadow-card)]
            transition-all
            duration-200
            hover:-translate-y-1
            hover:border-[rgb(var(--color-primary)/0.3)]
            hover:shadow-[var(--shadow-elevated)]
          "
        >
          <span
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-[rgb(var(--color-primary)/0.08)]
              text-[rgb(var(--color-primary))]
            "
          >
            📍
          </span>

          <h3 className="mt-4 text-sm font-black">
            آدرس‌ها
          </h3>

          <p className="mt-1 text-[10px] leading-5 text-[rgb(var(--color-foreground-muted))]">
            آدرس‌های ارسال خود را مدیریت کنید.
          </p>
        </LocalizedClientLink>

        <LocalizedClientLink
          href="/store"
          className="
            group
            rounded-2xl
            border
            border-[rgb(var(--color-border))]
            bg-[rgb(var(--color-surface))]
            p-5
            shadow-[var(--shadow-card)]
            transition-all
            duration-200
            hover:-translate-y-1
            hover:border-[rgb(var(--color-primary)/0.3)]
            hover:shadow-[var(--shadow-elevated)]
          "
        >
          <span
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-[rgb(var(--color-accent)/0.12)]
              text-[rgb(var(--color-accent))]
            "
          >
            🛍
          </span>

          <h3 className="mt-4 text-sm font-black">
            ادامه خرید
          </h3>

          <p className="mt-1 text-[10px] leading-5 text-[rgb(var(--color-foreground-muted))]">
            مصالح مورد نیاز پروژه خود را پیدا کنید.
          </p>
        </LocalizedClientLink>
      </section>
    </div>
  )
}

const getProfileCompletion = (
  customer: HttpTypes.StoreCustomer | null
) => {
  let count = 0

  if (!customer) {
    return 0
  }

  if (customer.email) {
    count++
  }

  if (customer.first_name && customer.last_name) {
    count++
  }

  if (customer.phone) {
    count++
  }

  const billingAddress = customer.addresses?.find(
    (addr) => addr.is_default_billing
  )

  if (billingAddress) {
    count++
  }

  return (count / 4) * 100
}

export default Overview