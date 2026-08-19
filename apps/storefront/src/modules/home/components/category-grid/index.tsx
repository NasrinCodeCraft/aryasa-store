import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Category = {
  id: string
  name: string
  handle: string
}

type CategoryGridProps = {
  categories: Category[]
}

const categoryMeta: Record<
  string,
  {
    label: string
    description: string
    icon: string
  }
> = {
  brick: {
    label: "آجر",
    description: "انواع آجر ساختمانی",
    icon: "▦",
  },
  cement: {
    label: "سیمان",
    description: "سیمان و مواد پایه",
    icon: "◈",
  },
  gypsum: {
    label: "گچ",
    description: "گچ و مصالح گچی",
    icon: "◇",
  },
  block: {
    label: "بلوک",
    description: "بلوک‌های ساختمانی",
    icon: "▤",
  },
  "gravel-and-sand": {
    label: "شن و ماسه",
    description: "مصالح دانه‌ای",
    icon: "⌁",
  },
  "mortar-and-adhesive": {
    label: "ملات و چسب",
    description: "چسب و ملات ساختمانی",
    icon: "◌",
  },
  "other-materials": {
    label: "سایر مصالح",
    description: "سایر محصولات ساختمانی",
    icon: "＋",
  },
}

const CategoryGrid = ({ categories }: CategoryGridProps) => {
  const visibleCategories = categories.filter(
    (category) => categoryMeta[category.handle.toLowerCase()]
  )

  return (
    <section dir="rtl" className="content-container py-16 sm:py-20">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
    <span className="text-xs font-semibold text-[rgb(var(--color-accent))]">
    دسته‌بندی محصولات
  </span>

          <h2 className="mt-2 text-2xl font-black tracking-tight text-[rgb(var(--color-foreground))] sm:text-3xl">
            مصالح مورد نیاز پروژه
          </h2>

          <p className="mt-2 text-sm text-[rgb(var(--color-foreground-muted))]">
            سریع‌تر محصول مورد نیازتان را پیدا کنید
          </p>
        </div>

        <LocalizedClientLink
          href="/store"
          className="hidden rounded-xl px-4 py-2 text-sm font-semibold text-[rgb(var(--color-primary))] transition hover:bg-[rgb(var(--color-primary)/0.06)] sm:block"
        >
          مشاهده همه →
        </LocalizedClientLink>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {visibleCategories.map((category) => {
          const meta = categoryMeta[category.handle.toLowerCase()]

          return (
            <LocalizedClientLink
              key={category.id}
              href={`/store?category=${category.handle}`}
              className="
        group relative overflow-hidden
        min-h-[150px]
        rounded-2xl
        border border-[rgb(var(--color-border))]
        bg-[rgb(var(--color-surface))]
        p-5
        transition-all duration-300
        hover:-translate-y-1
        hover:border-[rgb(var(--color-primary)/0.25)]
        hover:shadow-[var(--shadow-elevated)]
        "
            >
              <div
                className="
        flex h-11 w-11 items-center justify-center
        rounded-xl
        bg-[rgb(var(--color-primary)/0.07)]
        text-xl
        text-[rgb(var(--color-primary))]
        transition-all duration-300
        group-hover:bg-[rgb(var(--color-primary))]
        group-hover:text-white
        "
              >
                {meta.icon}
              </div>

              <div className="mt-7">
                <h3 className="text-base font-bold text-[rgb(var(--color-foreground))]">
                  {meta.label}
                </h3>

                <p className="mt-1 text-xs text-[rgb(var(--color-foreground-muted))]">
                  {meta.description}
                </p>
              </div>

              <span
                className="
        absolute bottom-5 left-5
        text-sm
        text-[rgb(var(--color-foreground-muted))]
        transition-all duration-300
        group-hover:-translate-x-1
        group-hover:text-[rgb(var(--color-primary))]
        "
              >
                ←
              </span>
            </LocalizedClientLink>
          )
        })}
      </div>

      <LocalizedClientLink
        href="/store"
        className="
  mt-4 flex items-center justify-center
  rounded-xl border border-[rgb(var(--color-border))]
  py-3 text-sm font-semibold
  text-[rgb(var(--color-primary))]
  sm:hidden
  "
      >
        مشاهده همه محصولات
      </LocalizedClientLink>
    </section>
  )
}

export default CategoryGrid