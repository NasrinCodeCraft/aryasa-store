import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@modules/common/components/ui"

import Divider from "@modules/common/components/divider"

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder
}

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  const shippingMethod = order.shipping_methods?.[0]

  return (
    <section
      dir="rtl"
      className="
        w-full
        overflow-hidden
        rounded-[1.75rem]
        border
        border-[rgb(var(--color-border))]
        bg-[rgb(var(--color-surface))]
      "
    >
      {/* Header */}
      <div
        className="
          border-b
          border-[rgb(var(--color-border))]
          bg-[rgb(var(--color-surface-muted))]
          px-5
          py-5
          sm:px-6
        "
      >
        <div className="flex items-start gap-3">
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-[rgb(var(--color-primary)/0.10)]
              text-lg
              text-[rgb(var(--color-primary))]
            "
          >
            ◉
          </div>

          <div>
            <Heading
              level="h2"
              className="
                text-lg
                font-black
                text-[rgb(var(--color-foreground))]
              "
            >
              اطلاعات ارسال
            </Heading>

            <p
              className="
                mt-1
                text-[10px]
                leading-5
                text-[rgb(var(--color-foreground-muted))]
                sm:text-xs
              "
            >
              آدرس و اطلاعات تماس مربوط به تحویل سفارش
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Address */}
          <div
            className="
              rounded-2xl
              border
              border-[rgb(var(--color-border))]
              bg-[rgb(var(--color-background))]
              p-4
            "
            data-testid="shipping-address-summary"
          >
            <div className="mb-4 flex items-center gap-2">
              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-xl
                  bg-[rgb(var(--color-primary)/0.08)]
                  text-xs
                  font-black
                  text-[rgb(var(--color-primary))]
                "
              >
                ۱
              </span>

              <div>
                <p
                  className="
                    text-xs
                    font-black
                    text-[rgb(var(--color-foreground))]
                  "
                >
                  آدرس تحویل
                </p>

                <p
                  className="
                    text-[9px]
                    text-[rgb(var(--color-foreground-muted))]
                  "
                >
                  مقصد سفارش
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <Text className="text-sm font-bold text-[rgb(var(--color-foreground))]">
                {order.shipping_address?.first_name}{" "}
                {order.shipping_address?.last_name}
              </Text>

              {order.shipping_address?.company && (
                <Text className="text-xs text-[rgb(var(--color-foreground-muted))]">
                  {order.shipping_address.company}
                </Text>
              )}

              <Text className="text-xs leading-6 text-[rgb(var(--color-foreground-muted))]">
                {order.shipping_address?.address_1}
                {order.shipping_address?.address_2
                  ? `، ${order.shipping_address.address_2}`
                  : ""}
              </Text>

              <Text className="text-xs leading-6 text-[rgb(var(--color-foreground-muted))]">
                {order.shipping_address?.postal_code}{" "}
                {order.shipping_address?.city}
              </Text>

              {order.shipping_address?.province && (
                <Text className="text-xs leading-6 text-[rgb(var(--color-foreground-muted))]">
                  {order.shipping_address.province}
                </Text>
              )}

              <Text className="text-xs font-bold text-[rgb(var(--color-primary))]">
                {order.shipping_address?.country_code?.toUpperCase()}
              </Text>
            </div>
          </div>

          {/* Contact */}
          <div
            className="
              rounded-2xl
              border
              border-[rgb(var(--color-border))]
              bg-[rgb(var(--color-background))]
              p-4
            "
            data-testid="shipping-contact-summary"
          >
            <div className="mb-4 flex items-center gap-2">
              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-xl
                  bg-[rgb(var(--color-accent)/0.10)]
                  text-xs
                  font-black
                  text-[rgb(var(--color-accent))]
                "
              >
                ۲
              </span>

              <div>
                <p className="text-xs font-black text-[rgb(var(--color-foreground))]">
                  اطلاعات تماس
                </p>

                <p className="text-[9px] text-[rgb(var(--color-foreground-muted))]">
                  برای هماهنگی سفارش
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="mb-1 text-[9px] font-bold text-[rgb(var(--color-foreground-muted))]">
                  شماره تماس
                </p>

                <Text className="text-sm font-bold text-[rgb(var(--color-foreground))]">
                  {order.shipping_address?.phone || "ثبت نشده"}
                </Text>
              </div>

              <div>
                <p className="mb-1 text-[9px] font-bold text-[rgb(var(--color-foreground-muted))]">
                  ایمیل
                </p>

                <Text className="break-all text-xs text-[rgb(var(--color-foreground-muted))]">
                  {order.email || "ثبت نشده"}
                </Text>
              </div>
            </div>
          </div>

          {/* Shipping method */}
          <div
            className="
              rounded-2xl
              border
              border-[rgb(var(--color-border))]
              bg-[rgb(var(--color-background))]
              p-4
            "
            data-testid="shipping-method-summary"
          >
            <div className="mb-4 flex items-center gap-2">
              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-xl
                  bg-[rgb(var(--color-primary)/0.08)]
                  text-xs
                  font-black
                  text-[rgb(var(--color-primary))]
                "
              >
                ۳
              </span>

              <div>
                <p className="text-xs font-black text-[rgb(var(--color-foreground))]">
                  روش ارسال
                </p>

                <p className="text-[9px] text-[rgb(var(--color-foreground-muted))]">
                  نحوه تحویل سفارش
                </p>
              </div>
            </div>

            {shippingMethod ? (
              <div className="space-y-3">
                <div>
                  <p className="mb-1 text-[9px] font-bold text-[rgb(var(--color-foreground-muted))]">
                    روش انتخاب‌شده
                  </p>

                  <Text className="text-sm font-bold text-[rgb(var(--color-foreground))]">
                    {shippingMethod.name || "ارسال به محل پروژه"}
                  </Text>
                </div>

                <div>
                  <p className="mb-1 text-[9px] font-bold text-[rgb(var(--color-foreground-muted))]">
                    هزینه ارسال
                  </p>

                  <Text className="text-sm font-black text-[rgb(var(--color-primary))]">
                    {convertToLocale({
                      amount: shippingMethod.total ?? 0,
                      currency_code: order.currency_code,
                    })}
                  </Text>
                </div>
              </div>
            ) : (
              <div
                className="
                  rounded-2xl
                  border
                  border-dashed
                  border-[rgb(var(--color-primary)/0.20)]
                  bg-[rgb(var(--color-primary)/0.04)]
                  p-4
                "
              >
                <p className="text-sm font-black text-[rgb(var(--color-foreground))]">
                  هماهنگی ارسال با مشتری
                </p>

                <p className="mt-2 text-[10px] leading-5 text-[rgb(var(--color-foreground-muted))]">
                  هزینه و جزئیات ارسال پس از بررسی سفارش توسط
                  کارشناسان آریاسا با شما هماهنگ خواهد شد.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Contact note */}
        <div
          className="
            mt-5
            flex
            items-start
            gap-3
            rounded-2xl
            border
            border-[rgb(var(--color-border))]
            bg-[rgb(var(--color-surface-muted))]
            p-4
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[rgb(var(--color-accent)/0.10)]
              text-sm
              font-black
              text-[rgb(var(--color-accent))]
            "
          >
            ✓
          </div>

          <div>
            <p className="text-xs font-black text-[rgb(var(--color-foreground))]">
              هماهنگی نهایی
            </p>

            <p className="mt-1 text-[10px] leading-5 text-[rgb(var(--color-foreground-muted))]">
              اطلاعات این سفارش ثبت شده است. برای هماهنگی زمان،
              هزینه و نحوه ارسال، کارشناسان فروش با شما تماس
              خواهند گرفت.
            </p>
          </div>
        </div>
      </div>

      <Divider />
    </section>
  )
}

export default ShippingDetails