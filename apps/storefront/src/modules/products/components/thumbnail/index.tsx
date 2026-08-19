import { clx } from "@modules/common/components/ui"
import Image from "next/image"
import React from "react"

import PlaceholderImage from "@modules/common/icons/placeholder-image"

type ThumbnailProps = {
  thumbnail?: string | null
  images?: { url?: string }[] | null
  size?: "small" | "medium" | "large" | "full" | "square"
  isFeatured?: boolean
  className?: string
  "data-testid"?: string
}

const Thumbnail: React.FC<ThumbnailProps> = ({
                                               thumbnail,
                                               images,
                                               size = "small",
                                               isFeatured,
                                               className,
                                               "data-testid": dataTestid,
                                             }) => {
  const initialImage = thumbnail || images?.[0]?.url

  return (
    <div
      className={clx(
        `
          relative
          w-full
          overflow-hidden
          bg-[rgb(var(--color-surface-muted))]
        `,
        {
          "aspect-[11/12]": isFeatured,
          "aspect-square": size === "square",
          "aspect-[4/5]": !isFeatured && size !== "square",
          "w-[180px]": size === "small",
          "w-[290px]": size === "medium",
          "w-[440px]": size === "large",
          "w-full": size === "full",
        },
        className
      )}
      data-testid={dataTestid}
    >
      {initialImage ? (
        <Image
          src={initialImage}
          alt=""
          fill
          draggable={false}
          quality={80}
          className="
            object-cover
            object-center
            transition-transform
            duration-500
            ease-out
            group-hover:scale-[1.04]
          "
          sizes="
            (max-width: 640px) 50vw,
            (max-width: 1024px) 33vw,
            25vw
          "
        />
      ) : (
        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-[rgb(var(--color-surface-muted))]
            text-[rgb(var(--color-foreground-muted))]
          "
        >
          <PlaceholderImage size={24} />
        </div>
      )}

      {/* Image overlay */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          bg-gradient-to-t
          from-black/10
          via-transparent
          to-transparent
          opacity-0
          transition-opacity duration-300
          group-hover:opacity-100
        "
      />
    </div>
  )
}

export default Thumbnail