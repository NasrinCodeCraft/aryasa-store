"use client"

import { HttpTypes } from "@medusajs/types"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "اطلاعات محصول",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "ارسال و مرجوعی",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div
      dir="rtl"
      className="
        mt-8 w-full
        rounded-2xl
        border border-[rgb(var(--color-border))]
        bg-[rgb(var(--color-surface))]
        px-4 sm:px-6
      "
    >
      <Accordion type="multiple">
        {tabs.map((tab) => (
          <Accordion.Item
            key={tab.label}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  const items = [
    {
      label: "جنس محصول",
      value: product.material || "-",
    },
    {
      label: "کشور سازنده",
      value: product.origin_country || "-",
    },
    {
      label: "نوع محصول",
      value: product.type?.value || "-",
    },
    {
      label: "وزن",
      value: product.weight ? `${product.weight} گرم` : "-",
    },
    {
      label: "ابعاد",
      value:
        product.length && product.width && product.height
          ? `${product.length} × ${product.width} × ${product.height}`
          : "-",
    },
  ]

  return (
    <div className="py-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.label}
            className="
              rounded-xl
              bg-[rgb(var(--color-surface-muted))]
              px-4 py-3
            "
          >
            <span className="block text-xs text-[rgb(var(--color-foreground-muted))]">
              {item.label}
            </span>

            <span className="mt-1 block text-sm font-semibold text-[rgb(var(--color-foreground))]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  const items = [
    {
      icon: <FastDelivery />,
      title: "ارسال سریع",
      description: "ارسال سفارش به محل پروژه با هماهنگی قبلی.",
    },
    {
      icon: <Refresh />,
      title: "تعویض آسان",
      description: "در صورت وجود مشکل، درخواست بررسی و تعویض سفارش امکان‌پذیر است.",
    },
    {
      icon: <Back />,
      title: "مرجوعی",
      description: "شرایط مرجوعی بر اساس نوع محصول و وضعیت سفارش انجام می‌شود.",
    },
  ]

  return (
    <div className="py-6">
      <div className="grid gap-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="
              flex items-start gap-4
              rounded-xl
              bg-[rgb(var(--color-surface-muted))]
              p-4
            "
          >
            <div
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-xl
                bg-[rgb(var(--color-primary)/0.08)]
                text-[rgb(var(--color-primary))]
              "
            >
              {item.icon}
            </div>

            <div>
              <h3 className="text-sm font-bold">
                {item.title}
              </h3>

              <p className="mt-1 text-xs leading-6 text-[rgb(var(--color-foreground-muted))]">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductTabs