"use client"

import { HttpTypes } from "@medusajs/types"
import { Container } from "@modules/common/components/ui"
import Checkbox from "@modules/common/components/checkbox"
import Input from "@modules/common/components/input"
import { mapKeys } from "lodash"
import React, { useEffect, useMemo, useState } from "react"

import AddressSelect from "../address-select"
import CountrySelect from "../country-select"

const ShippingAddress = ({
                           customer,
                           cart,
                           checked,
                           onChange,
                         }: {
  customer: HttpTypes.StoreCustomer | null
  cart: HttpTypes.StoreCart | null
  checked: boolean
  onChange: () => void
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({
    "shipping_address.first_name":
      cart?.shipping_address?.first_name || "",
    "shipping_address.last_name":
      cart?.shipping_address?.last_name || "",
    "shipping_address.address_1":
      cart?.shipping_address?.address_1 || "",
    "shipping_address.company":
      cart?.shipping_address?.company || "",
    "shipping_address.postal_code":
      cart?.shipping_address?.postal_code || "",
    "shipping_address.city":
      cart?.shipping_address?.city || "",
    "shipping_address.country_code":
      cart?.shipping_address?.country_code || "",
    "shipping_address.province":
      cart?.shipping_address?.province || "",
    "shipping_address.phone":
      cart?.shipping_address?.phone || "",
    email: cart?.email || "",
  })

  const countriesInRegion = useMemo(
    () => cart?.region?.countries?.map((c) => c.iso_2),
    [cart?.region]
  )

  const addressesInRegion = useMemo(
    () =>
      customer?.addresses.filter(
        (address) =>
          address.country_code &&
          countriesInRegion?.includes(address.country_code)
      ),
    [customer?.addresses, countriesInRegion]
  )

  const setFormAddress = (
    address?: HttpTypes.StoreCartAddress,
    email?: string
  ) => {
    if (address) {
      setFormData((prevState) => ({
        ...prevState,
        "shipping_address.first_name":
          address.first_name || "",
        "shipping_address.last_name":
          address.last_name || "",
        "shipping_address.address_1":
          address.address_1 || "",
        "shipping_address.company":
          address.company || "",
        "shipping_address.postal_code":
          address.postal_code || "",
        "shipping_address.city":
          address.city || "",
        "shipping_address.country_code":
          address.country_code || "",
        "shipping_address.province":
          address.province || "",
        "shipping_address.phone":
          address.phone || "",
      }))
    }

    if (email) {
      setFormData((prevState) => ({
        ...prevState,
        email,
      }))
    }
  }

  useEffect(() => {
    if (cart && cart.shipping_address) {
      setFormAddress(
        cart.shipping_address,
        cart.email
      )
    }

    if (cart && !cart.email && customer?.email) {
      setFormAddress(undefined, customer.email)
    }
  }, [cart, customer?.email])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div
      dir="rtl"
      className="w-full"
    >
      {/* =====================================================
          SAVED ADDRESSES
      ====================================================== */}

      {customer && (addressesInRegion?.length || 0) > 0 && (
        <Container
          className="
            mb-6
            overflow-hidden
            rounded-2xl
            border
            border-[rgb(var(--color-border))]
            bg-[rgb(var(--color-primary)/0.04)]
            p-4
            sm:p-5
          "
        >
          <div className="mb-4 flex items-start gap-3">
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
              ★
            </div>

            <div>
              <h3
                className="
                  text-sm
                  font-black
                  text-[rgb(var(--color-foreground))]
                "
              >
                آدرس‌های ذخیره‌شده
              </h3>

              <p
                className="
                  mt-1
                  text-[10px]
                  leading-5
                  text-[rgb(var(--color-foreground-muted))]
                "
              >
                یکی از آدرس‌های قبلی خود را انتخاب کنید.
              </p>
            </div>
          </div>

          <AddressSelect
            addresses={customer.addresses}
            addressInput={
              mapKeys(formData, (_, key) =>
                key.replace("shipping_address.", "")
              ) as unknown as HttpTypes.StoreCartAddress
            }
            onSelect={setFormAddress}
          />
        </Container>
      )}

      {/* =====================================================
          PERSONAL INFORMATION
      ====================================================== */}

      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          border-[rgb(var(--color-border))]
          bg-[rgb(var(--color-surface))]
        "
      >
        <div
          className="
            border-b
            border-[rgb(var(--color-border))]
            px-4
            py-4
            sm:px-5
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                bg-[rgb(var(--color-primary))]
                text-xs
                font-black
                text-white
              "
            >
              ۱
            </div>

            <div>
              <h3 className="text-sm font-black">
                اطلاعات گیرنده
              </h3>

              <p
                className="
                  mt-0.5
                  text-[10px]
                  text-[rgb(var(--color-foreground-muted))]
                "
              >
                نام و اطلاعات اصلی گیرنده سفارش
              </p>
            </div>
          </div>
        </div>

        <div
          className="
            grid
            grid-cols-1
            gap-4
            p-4
            sm:grid-cols-2
            sm:p-5
          "
        >
          <Input
            label="نام"
            name="shipping_address.first_name"
            autoComplete="given-name"
            value={formData["shipping_address.first_name"]}
            onChange={handleChange}
            required
            data-testid="shipping-first-name-input"
            className="h-12 rounded-xl"
          />

          <Input
            label="نام خانوادگی"
            name="shipping_address.last_name"
            autoComplete="family-name"
            value={formData["shipping_address.last_name"]}
            onChange={handleChange}
            required
            data-testid="shipping-last-name-input"
            className="h-12 rounded-xl"
          />

          <Input
            label="شماره تماس"
            name="shipping_address.phone"
            type="tel"
            autoComplete="tel"
            value={formData["shipping_address.phone"]}
            onChange={handleChange}
            required
            data-testid="shipping-phone-input"
            className="h-12 rounded-xl sm:col-span-2"
          />
        </div>
      </section>

      {/* =====================================================
          ADDRESS
      ====================================================== */}

      <section
        className="
          mt-4
          overflow-hidden
          rounded-2xl
          border
          border-[rgb(var(--color-border))]
          bg-[rgb(var(--color-surface))]
        "
      >
        <div
          className="
            border-b
            border-[rgb(var(--color-border))]
            px-4
            py-4
            sm:px-5
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                bg-[rgb(var(--color-primary))]
                text-xs
                font-black
                text-white
              "
            >
              ۲
            </div>

            <div>
              <h3 className="text-sm font-black">
                آدرس تحویل
              </h3>

              <p
                className="
                  mt-0.5
                  text-[10px]
                  text-[rgb(var(--color-foreground-muted))]
                "
              >
                سفارش به این آدرس ارسال خواهد شد.
              </p>
            </div>
          </div>
        </div>

        <div
          className="
            grid
            grid-cols-1
            gap-4
            p-4
            sm:grid-cols-2
            sm:p-5
          "
        >
          <Input
            label="آدرس"
            name="shipping_address.address_1"
            autoComplete="address-line1"
            value={formData["shipping_address.address_1"]}
            onChange={handleChange}
            required
            data-testid="shipping-address-input"
            className="h-12 rounded-xl sm:col-span-2"
          />

          <Input
            label="شرکت / پروژه"
            name="shipping_address.company"
            autoComplete="organization"
            value={formData["shipping_address.company"]}
            onChange={handleChange}
            data-testid="shipping-company-input"
            className="h-12 rounded-xl"
          />

          <Input
            label="کد پستی"
            name="shipping_address.postal_code"
            autoComplete="postal-code"
            value={formData["shipping_address.postal_code"]}
            onChange={handleChange}
            required
            data-testid="shipping-postal-code-input"
            className="h-12 rounded-xl"
          />

          <Input
            label="شهر"
            name="shipping_address.city"
            autoComplete="address-level2"
            value={formData["shipping_address.city"]}
            onChange={handleChange}
            required
            data-testid="shipping-city-input"
            className="h-12 rounded-xl"
          />

          <Input
            label="استان"
            name="shipping_address.province"
            autoComplete="address-level1"
            value={formData["shipping_address.province"]}
            onChange={handleChange}
            data-testid="shipping-province-input"
            className="h-12 rounded-xl"
          />

          <CountrySelect
            name="shipping_address.country_code"
            autoComplete="country"
            region={cart?.region}
            value={formData["shipping_address.country_code"]}
            onChange={handleChange}
            required
            data-testid="shipping-country-select"
          />
        </div>
      </section>

      {/* =====================================================
          BILLING ADDRESS
      ====================================================== */}

      <section
        className="
          mt-4
          overflow-hidden
          rounded-2xl
          border
          border-[rgb(var(--color-border))]
          bg-[rgb(var(--color-surface))]
        "
      >
        <div className="p-4 sm:p-5">
          <Checkbox
            label="آدرس صورت‌حساب با آدرس ارسال یکسان است"
            name="same_as_billing"
            checked={checked}
            onChange={onChange}
            data-testid="billing-address-checkbox"
          />

          <p
            className="
              mt-2
              pr-7
              text-[10px]
              leading-5
              text-[rgb(var(--color-foreground-muted))]
            "
          >
            اگر آدرس صورت‌حساب متفاوت است، این گزینه را غیرفعال کنید.
          </p>
        </div>
      </section>

      {/* =====================================================
          ACCOUNT / EMAIL
      ====================================================== */}

      <section
        className="
          mt-4
          overflow-hidden
          rounded-2xl
          border
          border-[rgb(var(--color-border))]
          bg-[rgb(var(--color-surface))]
        "
      >
        <div
          className="
            border-b
            border-[rgb(var(--color-border))]
            px-4
            py-4
            sm:px-5
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                bg-[rgb(var(--color-primary))]
                text-xs
                font-black
                text-white
              "
            >
              ۳
            </div>

            <div>
              <h3 className="text-sm font-black">
                اطلاعات ارتباطی
              </h3>

              <p
                className="
                  mt-0.5
                  text-[10px]
                  text-[rgb(var(--color-foreground-muted))]
                "
              >
                برای اطلاع‌رسانی سفارش استفاده می‌شود.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <Input
            label="ایمیل"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
            data-testid="shipping-email-input"
            className="h-12 rounded-xl"
          />

          <div
            className="
              mt-3
              flex
              items-center
              gap-2
              rounded-xl
              bg-[rgb(var(--color-surface-muted))]
              px-3
              py-3
            "
          >
            <span
              className="
                flex
                h-6
                w-6
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-[rgb(var(--color-accent)/0.12)]
                text-[10px]
                font-black
                text-[rgb(var(--color-accent))]
              "
            >
              i
            </span>

            <span
              className="
                text-[10px]
                leading-5
                text-[rgb(var(--color-foreground-muted))]
              "
            >
              اطلاعات سفارش و وضعیت ارسال به این ایمیل اطلاع داده می‌شود.
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ShippingAddress