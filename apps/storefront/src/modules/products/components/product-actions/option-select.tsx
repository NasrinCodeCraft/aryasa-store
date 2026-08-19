import { HttpTypes } from "@medusajs/types"
import { clx } from "@modules/common/components/ui"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
                                                     option,
                                                     current,
                                                     updateOption,
                                                     title,
                                                     "data-testid": dataTestId,
                                                     disabled,
                                                   }) => {
  const filteredOptions = (option.values ?? [])
    .map((v) => v.value)
    .filter(Boolean)

  return (
    <div dir="rtl" className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-[rgb(var(--color-foreground))]">
          {title}
        </span>

        {current && (
          <span className="text-xs text-[rgb(var(--color-foreground-muted))]">
            انتخاب شده: {current}
          </span>
        )}
      </div>

      <div
        className="grid grid-cols-2 gap-2 sm:grid-cols-3"
        data-testid={dataTestId}
      >
        {filteredOptions.map((value) => {
          const isSelected = value === current

          return (
            <button
              key={value}
              type="button"
              onClick={() => updateOption(option.id, value)}
              disabled={disabled}
              aria-pressed={isSelected}
              className={clx(
                "relative min-h-11 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--color-primary)/0.25)] disabled:cursor-not-allowed disabled:opacity-50",
                isSelected
                  ? "border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary)/0.07)] text-[rgb(var(--color-primary))] shadow-sm"
                  : "border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] text-[rgb(var(--color-foreground))] hover:-translate-y-0.5 hover:border-[rgb(var(--color-primary)/0.5)] hover:bg-[rgb(var(--color-primary)/0.03)]"
              )}
              data-testid="option-button"
            >
              <span>{value}</span>

              {isSelected && (
                <span
                  aria-hidden="true"
                  className="absolute left-2 top-2 h-2 w-2 rounded-full bg-[rgb(var(--color-primary))]"
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect