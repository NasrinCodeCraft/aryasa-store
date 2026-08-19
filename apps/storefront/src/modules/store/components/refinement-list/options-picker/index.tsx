"use client"

import * as Accordion from "@radix-ui/react-accordion"
import { useEffect, useState } from "react"

import { ChevronDownMini } from "@medusajs/icons"
import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import clsx from "clsx"

type OptionsPickerProps = {
  selectedValueIds: string[]
  setOptionValueIds: (valueIds: string[]) => void
}

const OptionsPicker = ({
  selectedValueIds,
  setOptionValueIds,
}: OptionsPickerProps) => {
  const [options, setOptions] = useState<HttpTypes.StoreProductOption[]>([])
  const [openItems, setOpenItems] = useState<string[]>([])

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await sdk.client.fetch<{
          product_options?: HttpTypes.StoreProductOption[]
        }>("/store/product-options", {
          method: "GET",
          query: {
            is_exclusive: false,
            fields: "*values",
          },
        })

        if (response?.product_options) {
          setOptions(response.product_options)
        }
      } catch (error) {
        console.error("Failed to fetch product options", error)
      }
    }

    fetchOptions()
  }, [])

  useEffect(() => {
    if (options.length) {
      setOpenItems(options.map((option) => option.id))
    }
  }, [options])

  if (!options.length) {
    return null
  }

  return (
    <div dir="rtl" className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between px-1">
        <span className="text-sm font-semibold text-[rgb(var(--color-foreground))]">
          فیلترها
        </span>
      </div>

      <Accordion.Root
        type="multiple"
        value={openItems}
        onValueChange={(values) => setOpenItems(values)}
        className="flex flex-col gap-y-3"
      >
        {options.map((option) => {
          const values =
            option.values
              ?.map((value) => ({
                id: value.id,
                label: value.value,
              }))
              .filter(
                (
                  value
                ): value is {
                  id: string
                  label: string
                } => !!value.id && !!value.label
              ) || []

          if (!values.length) {
            return null
          }

          const toggleValue = (valueId: string) => {
            const isSelected = selectedValueIds.includes(valueId)

            const nextSelections = isSelected
              ? selectedValueIds.filter((id) => id !== valueId)
              : [...selectedValueIds, valueId]

            setOptionValueIds(Array.from(new Set(nextSelections)))
          }

          const isOpen = openItems.includes(option.id)

          const selectedCount = values.filter((value) =>
            selectedValueIds.includes(value.id)
          ).length

          return (
            <Accordion.Item
              key={option.id}
              value={option.id}
              className="
                overflow-hidden
                rounded-2xl
                border
                border-[rgb(var(--color-border))]
                bg-[rgb(var(--color-surface))]
              "
            >
              <Accordion.Header>
                <Accordion.Trigger
                  className="
                    flex w-full
                    items-center justify-between
                    px-4 py-3
                    text-right
                  "
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[rgb(var(--color-foreground))]">
                      {option.title || "گزینه"}
                    </span>

                    {selectedCount > 0 && (
                      <span
                        className="
                          flex h-5 min-w-5
                          items-center justify-center
                          rounded-full
                          bg-[rgb(var(--color-primary))]
                          px-1.5
                          text-[10px]
                          font-bold
                          text-white
                        "
                      >
                        {selectedCount}
                      </span>
                    )}
                  </div>

                  <span
                    className={clsx(
                      `
                        flex h-7 w-7
                        items-center justify-center
                        rounded-lg
                        text-[rgb(var(--color-foreground-muted))]
                        transition-transform duration-200
                      `,
                      {
                        "rotate-180": isOpen,
                      }
                    )}
                  >
                    <ChevronDownMini />
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content className="px-4 pb-4 pt-1">
                <div className="flex flex-wrap gap-2">
                  {values.map((value) => {
                    const isSelected = selectedValueIds.includes(value.id)

                    return (
                      <button
                        key={value.id}
                        type="button"
                        onClick={() => toggleValue(value.id)}
                        className={clsx(
                          `
      rounded-xl
      border
      px-3 py-2
      text-xs font-medium
      transition-all duration-200
    `,
                          isSelected
                            ? `
        border-[rgb(var(--color-primary))]
        bg-[rgb(var(--color-primary)/0.08)]
        text-[rgb(var(--color-primary))]
        shadow-sm
      `
                            : `
        border-[rgb(var(--color-border))]
        bg-[rgb(var(--color-surface))]
        text-[rgb(var(--color-foreground-muted))]
        hover:border-[rgb(var(--color-primary))]
        hover:text-[rgb(var(--color-primary))]
      `
                        )}
                        aria-pressed={isSelected}
                      >
                        {value.label}
                      </button>
                    )
                  })}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          )
        })}
      </Accordion.Root>
    </div>
  )
}

export default OptionsPicker
