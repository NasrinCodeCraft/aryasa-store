"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

import { MagnifyingGlass } from "@medusajs/icons"

export default function SearchForm() {
  const router = useRouter()

  const [query, setQuery] = useState("")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const value = query.trim()

    if (!value) {
      router.push("/store")
      return
    }

    router.push(`/store?q=${encodeURIComponent(value)}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        relative
        mx-auto
        w-full
        max-w-2xl
      "
    >
      <div
        className="
          flex
          h-12
          items-center
          overflow-hidden
          rounded-2xl
          border
          border-[rgb(var(--color-border))]
          bg-[rgb(var(--color-background))]
          transition-all
          duration-200
          focus-within:border-[rgb(var(--color-primary))]
          focus-within:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]
        "
      >
        <MagnifyingGlass
          className="
            mr-4
            h-5
            w-5
            shrink-0
            text-[rgb(var(--color-foreground-muted))]
          "
        />

        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="جستجوی آجر، سیمان، گچ، بلوک و مصالح..."
          className="
            min-w-0
            flex-1
            bg-transparent
            px-3
            text-sm
            text-[rgb(var(--color-foreground))]
            outline-none
            placeholder:text-[rgb(var(--color-foreground-muted))]
          "
          dir="rtl"
          aria-label="جستجوی محصولات"
        />

        <button
          type="submit"
          className="
            ml-1
            mr-2
            flex
            h-9
            min-w-9
            items-center
            justify-center
            rounded-xl
            bg-[rgb(var(--color-primary))]
            px-4
            text-xs
            font-bold
            text-white
            transition-all
            hover:opacity-90
            active:scale-95
          "
          aria-label="جستجو"
        >
          <span className="hidden sm:inline">
            جستجو
          </span>

          <MagnifyingGlass className="h-4 w-4 sm:hidden" />
        </button>
      </div>
    </form>
  )
}