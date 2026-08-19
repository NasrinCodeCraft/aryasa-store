import { Label, RadioGroup, Text, clx } from "@modules/common/components/ui"

type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: string
  handleChange: (value: string) => void
  "data-testid"?: string
}

const FilterRadioGroup = ({
                            title,
                            items,
                            value,
                            handleChange,
                            "data-testid": dataTestId,
                          }: FilterRadioGroupProps) => {
  return (
    <div dir="rtl" className="flex flex-col gap-4">
      <Text className="text-sm font-bold text-[rgb(var(--color-foreground))]">
        {title}
      </Text>

      <RadioGroup
        data-testid={dataTestId}
        className="flex flex-col gap-2"
      >
        {items.map((item) => {
          const active = item.value === value

          return (
            <div key={item.value}>
              <RadioGroup.Item
                id={item.value}
                value={item.value}
                checked={active}
                onChange={() => handleChange(item.value)}
                className="peer sr-only"
              />

              <Label
                htmlFor={item.value}
                data-testid="radio-label"
                data-active={active}
                className={clx(
                  "flex w-full cursor-pointer items-center justify-between",
                  "rounded-xl border px-4 py-3",
                  "text-sm transition-all duration-200",
                  "hover:border-[rgb(var(--color-primary)/0.35)]",
                  "hover:bg-[rgb(var(--color-primary)/0.04)]",
                  {
                    "border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary)/0.07)] text-[rgb(var(--color-primary))] font-semibold":
                    active,
                    "border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] text-[rgb(var(--color-foreground-muted))]":
                      !active,
                  }
                )}
              >
                <span>{item.label}</span>

                <span
                  className={clx(
                    "flex h-5 w-5 items-center justify-center rounded-full border-2",
                    "transition-all duration-200",
                    {
                      "border-[rgb(var(--color-primary))]":
                      active,
                      "border-[rgb(var(--color-border))]":
                        !active,
                    }
                  )}
                >
                  {active && (
                    <span className="h-2 w-2 rounded-full bg-[rgb(var(--color-primary))]" />
                  )}
                </span>
              </Label>
            </div>
          )
        })}
      </RadioGroup>
    </div>
  )
}

export default FilterRadioGroup