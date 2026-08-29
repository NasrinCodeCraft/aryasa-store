import {
  MagnifyingGlass,
  BuildingStorefront,
  CubeSolid,
  Buildings,
  ShoppingBag,
  Tools,
} from "@medusajs/icons"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  const categories = [
    {
      title: "آجر",
      subtitle: "انواع آجر ساختمانی",
      href: "/store?category=brick",
      icon: BuildingStorefront,
    },
    {
      title: "سیمان",
      subtitle: "سیمان و مصالح پایه",
      href: "/store?category=cement",
      icon: CubeSolid,
    },
    {
      title: "گچ",
      subtitle: "گچ ساختمانی",
      href: "/store?category=gypsum",
      icon: Buildings,
    },
    {
      title: "بلوک",
      subtitle: "بلوک و قطعات ساختمانی",
      href: "/store?category=block",
      icon: BuildingStorefront,
    },
    {
      title: "شن و ماسه",
      subtitle: "مصالح دانه‌ای",
      href: "/store?category=gravel-and-sand",
      icon: CubeSolid,
    },
  ]

  return (
    <section
      dir="rtl"
      className="
        relative
        overflow-hidden
        border-b border-[rgb(var(--color-border))]
        bg-[rgb(var(--color-background))]
      "
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="
            absolute
            -right-40
            -top-40
            h-[520px]
            w-[520px]
            rounded-full
            bg-[rgb(var(--color-primary)/0.08)]
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-48
            -left-32
            h-[500px]
            w-[500px]
            rounded-full
            bg-[rgb(var(--color-accent)/0.08)]
            blur-3xl
          "
        />

        <div
          className="
            absolute
            right-1/2
            top-1/2
            h-[300px]
            w-[300px]
            -translate-y-1/2
            translate-x-1/2
            rounded-full
            bg-[rgb(var(--color-primary)/0.025)]
            blur-3xl
          "
        />
      </div>

      <div className="content-container relative z-10">
        <div
          className="
            flex
            min-h-[560px]
            items-center
            justify-center
            py-14
            sm:min-h-[620px]
            sm:py-20
            lg:min-h-[680px]
            lg:py-24
          "
        >
          <div className="w-full max-w-6xl">

            {/* Top badge */}
            <div className="mb-7 flex justify-center">
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[rgb(var(--color-accent)/0.35)]
                  bg-[rgb(var(--color-accent)/0.08)]
                  px-4
                  py-2
                  text-xs
                  font-bold
                  text-[rgb(var(--color-accent))]
                "
              >
                <span
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-[rgb(var(--color-accent))]
                  "
                />

                تأمین مطمئن مصالح ساختمانی
              </div>
            </div>

            {/* Heading */}
            <div className="mx-auto max-w-4xl text-center">
              <h1
                className="
                  text-4xl
                  font-black
                  leading-[1.35]
                  tracking-tight
                  text-[rgb(var(--color-foreground))]
                  sm:text-5xl
                  lg:text-6xl
                  xl:text-7xl
                "
              >
                مصالح مورد نیاز پروژه‌ات،
                <span
                  className="
                    mt-2
                    block
                    text-[rgb(var(--color-primary))]
                  "
                >
                  یکجا در آریاسا
                </span>
              </h1>

              <p
                className="
                  mx-auto
                  mt-6
                  max-w-2xl
                  text-sm
                  leading-7
                  text-[rgb(var(--color-foreground-muted))]
                  sm:text-base
                  sm:leading-8
                "
              >
                آجر، سیمان، گچ، بلوک، شن و ماسه و سایر مصالح ساختمانی
                را با تجربه‌ای ساده، سریع و مطمئن پیدا و سفارش دهید.
              </p>
            </div>

            {/* Search Card */}
            <div className="mx-auto mt-10 max-w-3xl">
              <LocalizedClientLink
                href="/store"
                className="
                  group
                  flex
                  min-h-[68px]
                  w-full
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-[rgb(var(--color-border))]
                  bg-[rgb(var(--color-surface))]
                  p-2
                  shadow-[var(--shadow-elevated)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-[rgb(var(--color-primary))]
                "
              >
                <div
                  className="
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[rgb(var(--color-primary)/0.08)]
                    text-[rgb(var(--color-primary))]
                    transition-colors
                    group-hover:bg-[rgb(var(--color-primary))]
                    group-hover:text-white
                  "
                >
                  <MagnifyingGlass className="h-6 w-6" />
                </div>

                <div className="min-w-0 flex-1 text-right">
                  <span
                    className="
                      block
                      truncate
                      text-sm
                      font-semibold
                      text-[rgb(var(--color-foreground))]
                    "
                  >
                    دنبال چه مصالحی هستید؟
                  </span>

                  <span
                    className="
                      mt-1
                      block
                      truncate
                      text-xs
                      text-[rgb(var(--color-foreground-muted))]
                    "
                  >
                    آجر، سیمان، گچ، بلوک و سایر مصالح را جستجو کنید
                  </span>
                </div>

                <span
                  className="
                    hidden
                    shrink-0
                    rounded-xl
                    bg-[rgb(var(--color-primary))]
                    px-6
                    py-3
                    text-sm
                    font-bold
                    text-white
                    transition-all
                    duration-200
                    group-hover:bg-[rgb(var(--color-primary-hover))]
                    sm:block
                  "
                >
                  جستجوی مصالح
                </span>
              </LocalizedClientLink>
            </div>

            {/* Popular categories */}
            <div className="mt-12">
              <div className="mb-4 flex items-center justify-between">
                <span
                  className="
                    text-xs
                    font-bold
                    text-[rgb(var(--color-foreground-muted))]
                  "
                >
                  دسته‌های پرطرفدار
                </span>

                <LocalizedClientLink
                  href="/categories"
                  className="
                    text-xs
                    font-semibold
                    text-[rgb(var(--color-primary))]
                    hover:underline
                  "
                >
                  مشاهده همه
                </LocalizedClientLink>
              </div>

              <div
                className="
                  grid
                  grid-cols-2
                  gap-3
                  sm:grid-cols-3
                  lg:grid-cols-5
                "
              >
                {categories.map((category) => {
                  const Icon = category.icon

                  return (
                    <LocalizedClientLink
                      key={category.title}
                      href={category.href}
                      className="
                        group
                        rounded-2xl
                        border
                        border-[rgb(var(--color-border))]
                        bg-[rgb(var(--color-surface))]
                        p-4
                        text-right
                        shadow-[var(--shadow-card)]
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:border-[rgb(var(--color-primary)/0.4)]
                        hover:shadow-[var(--shadow-elevated)]
                      "
                    >
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
                          transition-all
                          duration-300
                          group-hover:bg-[rgb(var(--color-primary))]
                          group-hover:text-white
                        "
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="mt-4">
                        <span
                          className="
                            block
                            text-sm
                            font-bold
                            text-[rgb(var(--color-foreground))]
                            transition-colors
                            group-hover:text-[rgb(var(--color-primary))]
                          "
                        >
                          {category.title}
                        </span>

                        <span
                          className="
                            mt-1
                            block
                            text-[10px]
                            leading-5
                            text-[rgb(var(--color-foreground-muted))]
                          "
                        >
                          {category.subtitle}
                        </span>
                      </div>
                    </LocalizedClientLink>
                  )
                })}
              </div>
            </div>

            {/* Trust row */}
            <div
              className="
                mx-auto
                mt-10
                grid
                max-w-4xl
                grid-cols-1
                divide-y
                divide-[rgb(var(--color-border))]
                overflow-hidden
                rounded-2xl
                border
                border-[rgb(var(--color-border))]
                bg-[rgb(var(--color-surface)/0.7)]
                sm:grid-cols-3
                sm:divide-x
                sm:divide-y-0
              "
            >
              <div className="flex items-center justify-center gap-3 p-4">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    bg-[rgb(var(--color-accent)/0.1)]
                    text-[rgb(var(--color-accent))]
                  "
                >
                  <ShoppingBag className="h-4 w-4" />
                </div>

                <div className="text-right">
                  <span className="block text-xs font-bold">
                    خرید آسان
                  </span>

                  <span className="mt-0.5 block text-[10px] text-[rgb(var(--color-foreground-muted))]">
                    انتخاب و سفارش سریع
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 p-4">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    bg-[rgb(var(--color-accent)/0.1)]
                    text-[rgb(var(--color-accent))]
                  "
                >
                  <BuildingStorefront className="h-4 w-4" />
                </div>

                <div className="text-right">
                  <span className="block text-xs font-bold">
                    تأمین مطمئن
                  </span>

                  <span className="mt-0.5 block text-[10px] text-[rgb(var(--color-foreground-muted))]">
                    مصالح مورد نیاز پروژه
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 p-4">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    bg-[rgb(var(--color-accent)/0.1)]
                    text-[rgb(var(--color-accent))]
                  "
                >
                  <Tools className="h-4 w-4" />
                </div>

                <div className="text-right">
                  <span className="block text-xs font-bold">
                    خدمات ساختمانی
                  </span>

                  <span className="mt-0.5 block text-[10px] text-[rgb(var(--color-foreground-muted))]">
                    خدمات مرتبط با پروژه
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero