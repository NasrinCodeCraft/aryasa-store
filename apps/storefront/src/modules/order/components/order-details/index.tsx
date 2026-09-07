import { HttpTypes } from "@medusajs/types"
import { Text } from "@modules/common/components/ui"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
}

const OrderDetails = ({
                        order,
                        showStatus = false,
                      }: OrderDetailsProps) => {
  const formatStatus = (value?: string | null) => {
    if (!value) return "نامشخص"

    return value
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const createdDate = new Date(order.created_at)

  const formattedDate = createdDate.toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const formattedTime = createdDate.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div
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
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold text-[rgb(var(--color-foreground-muted))]">
              سفارش شما با موفقیت ثبت شد
            </p>

            <h3 className="mt-1 text-lg font-black text-[rgb(var(--color-foreground))]">
              جزئیات سفارش
            </h3>
          </div>

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
              text-sm
              font-black
              text-[rgb(var(--color-primary))]
            "
          >
            ✓
          </div>
        </div>
      </div>

      {/* Order information */}
      <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2 sm:p-6">
        {/* Order number */}
        <div
          className="
            rounded-2xl
            border
            border-[rgb(var(--color-border))]
            bg-[rgb(var(--color-background))]
            p-4
          "
        >
          <p className="text-[10px] font-bold text-[rgb(var(--color-foreground-muted))]">
            شماره سفارش
          </p>

          <p
            className="
              mt-1
              text-sm
              font-black
              tracking-wide
              text-[rgb(var(--color-primary))]
            "
            data-testid="order-id"
          >
            #{order.display_id}
          </p>
        </div>

        {/* Date */}
        <div
          className="
            rounded-2xl
            border
            border-[rgb(var(--color-border))]
            bg-[rgb(var(--color-background))]
            p-4
          "
        >
          <p className="text-[10px] font-bold text-[rgb(var(--color-foreground-muted))]">
            تاریخ ثبت سفارش
          </p>

          <p
            className="
              mt-1
              text-sm
              font-bold
              text-[rgb(var(--color-foreground))]
            "
            data-testid="order-date"
          >
            {formattedDate}
          </p>

          <p className="mt-1 text-[10px] text-[rgb(var(--color-foreground-muted))]">
            ساعت {formattedTime}
          </p>
        </div>

        {/* Email */}
        <div
          className="
            rounded-2xl
            border
            border-[rgb(var(--color-border))]
            bg-[rgb(var(--color-background))]
            p-4
            sm:col-span-2
          "
        >
          <p className="text-[10px] font-bold text-[rgb(var(--color-foreground-muted))]">
            ایمیل ثبت‌شده
          </p>

          <Text
            className="
              mt-1
              break-all
              text-sm
              font-semibold
              text-[rgb(var(--color-foreground))]
            "
            data-testid="order-email"
          >
            {order.email}
          </Text>

          <p className="mt-2 text-[10px] leading-5 text-[rgb(var(--color-foreground-muted))]">
            اطلاعات سفارش در این ایمیل ثبت شده است.
          </p>
        </div>
      </div>

      {/* Status */}
      {showStatus && (
        <div
          className="
            border-t
            border-[rgb(var(--color-border))]
            px-5
            py-5
            sm:px-6
          "
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Fulfillment */}
            <div className="flex items-center justify-between rounded-2xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-background))] px-4 py-3">
              <div>
                <p className="text-[10px] text-[rgb(var(--color-foreground-muted))]">
                  وضعیت سفارش
                </p>

                <p
                  className="mt-1 text-xs font-black text-[rgb(var(--color-foreground))]"
                  data-testid="order-status"
                >
                  {formatStatus(order.fulfillment_status)}
                </p>
              </div>

              <span
                className="
                  rounded-xl
                  bg-[rgb(var(--color-primary)/0.08)]
                  px-3
                  py-1.5
                  text-[10px]
                  font-black
                  text-[rgb(var(--color-primary))]
                "
              >
                سفارش
              </span>
            </div>

            {/* Payment */}
            <div className="flex items-center justify-between rounded-2xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-background))] px-4 py-3">
              <div>
                <p className="text-[10px] text-[rgb(var(--color-foreground-muted))]">
                  وضعیت پرداخت
                </p>

                <p
                  className="mt-1 text-xs font-black text-[rgb(var(--color-foreground))]"
                  data-testid="order-payment-status"
                >
                  {formatStatus(order.payment_status)}
                </p>
              </div>

              <span
                className="
                  rounded-xl
                  bg-[rgb(var(--color-accent)/0.10)]
                  px-3
                  py-1.5
                  text-[10px]
                  font-black
                  text-[rgb(var(--color-accent))]
                "
              >
                پرداخت
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderDetails