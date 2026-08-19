import { MagnifyingGlass } from "@medusajs/icons"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  const categories = [
    { title: "آجر", href: "/store?category=brick" },
    { title: "سیمان", href: "/store?category=cement" },
    { title: "گچ", href: "/store?category=gypsum" },
    { title: "بلوک", href: "/store?category=block" },
    { title: "شن و ماسه", href: "/store?category=gravel-and-sand" },
  ]

  return (
    <section
      dir="rtl"
      className="
        relative overflow-hidden
        border-b border-[rgb(var(--color-border))]
        bg-[rgb(var(--color-background))]
      "
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 overflow-hidden
        "
      >
        <div
          className="
            absolute -right-32 -top-32
            h-[420px] w-[420px]
            rounded-full
            bg-[rgb(var(--color-primary)/0.06)]
            blur-3xl
          "
        />

        <div
          className="
            absolute -bottom-40 -left-20
            h-[360px] w-[360px]
            rounded-full
            bg-[rgb(var(--color-accent)/0.08)]
            blur-3xl
          "
        />
      </div>

      <div className="content-container relative z-10">
        <div
          className="
            flex min-h-[520px]
            items-center justify-center
            py-16 sm:py-20 lg:min-h-[590px] lg:py-24
          "
        >
          <div className="w-full max-w-4xl text-center">

            {/* Small label */}
            <div className="mb-6 flex justify-center">
              <span
                className="
                  inline-flex items-center
                  rounded-full
                  border border-[rgb(var(--color-border))]
                  bg-[rgb(var(--color-surface))]
                  px-4 py-2
                  text-xs font-semibold
                  text-[rgb(var(--color-foreground-muted))]
                  shadow-sm
                "
              >
                تأمین مطمئن مصالح ساختمانی
              </span>
            </div>

            {/* Main heading */}
            <h1
              className="
                mx-auto max-w-3xl
                text-4xl font-black leading-[1.35]
                tracking-tight
                text-[rgb(var(--color-foreground))]
                sm:text-5xl
                lg:text-6xl
              "
            >
              همه مصالح مورد نیاز ساخت‌وساز،
              <span className="block mt-2 text-[rgb(var(--color-primary))]">
                یکجا در آریاسا
              </span>
            </h1>

            {/* Description */}
            <p
              className="
                mx-auto mt-6 max-w-2xl
                text-sm leading-7
                text-[rgb(var(--color-foreground-muted))]
                sm:text-base sm:leading-8
              "
            >
              آجر، سیمان، گچ، بلوک، شن و ماسه و سایر مصالح ساختمانی
              را با دسترسی آسان و تجربه خرید ساده پیدا کنید.
            </p>

            {/* Search */}
            <div className="mx-auto mt-9 w-full max-w-2xl">
              <LocalizedClientLink
                href="/store"
                className="
                  group flex h-14 w-full
                  items-center gap-3
                  rounded-2xl
                  border
                  border-[rgb(var(--color-border))]
                  bg-[rgb(var(--color-surface))]
                  px-5
                  text-right
                  shadow-[var(--shadow-card)]
                  transition-all duration-200
                  hover:border-[rgb(var(--color-primary))]
                  hover:shadow-[var(--shadow-elevated)]
                "
              >
                <MagnifyingGlass
                  className="
                    h-5 w-5 shrink-0
                    text-[rgb(var(--color-foreground-muted))]
                    transition-colors
                    group-hover:text-[rgb(var(--color-primary))]
                  "
                />

                <span
                  className="
                    flex-1
                    text-sm
                    text-[rgb(var(--color-foreground-muted))]
                  "
                >
                  جستجوی آجر، سیمان، گچ، بلوک و سایر مصالح...
                </span>

                <span
                  className="
                    hidden sm:inline-flex
                    rounded-xl
                    bg-[rgb(var(--color-primary))]
                    px-5 py-2.5
                    text-sm font-semibold
                    text-white
                    transition-colors
                    group-hover:bg-[rgb(var(--color-primary-hover))]
                  "
                >
                  جستجو
                </span>
              </LocalizedClientLink>
            </div>

            {/* Categories */}
            <div
              className="
                mt-8
                flex flex-wrap
                items-center justify-center
                gap-2
                sm:gap-3
              "
            >
              {categories.map((category) => (
                <LocalizedClientLink
                  key={category.title}
                  href={category.href}
                  className="
                    rounded-full
                    border
                    border-[rgb(var(--color-border))]
                    bg-[rgb(var(--color-surface))]
                    px-4 py-2
                    text-xs font-medium
                    text-[rgb(var(--color-foreground))]
                    transition-all duration-200
                    hover:-translate-y-0.5
                    hover:border-[rgb(var(--color-primary))]
                    hover:text-[rgb(var(--color-primary))]
                  "
                >
                  {category.title}
                </LocalizedClientLink>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero