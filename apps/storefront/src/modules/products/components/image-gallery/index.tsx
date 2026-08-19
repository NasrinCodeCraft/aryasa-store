import { HttpTypes } from "@medusajs/types"
import Image from "next/image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const validImages = images.filter((image) => image.url)

  if (!validImages.length) {
    return (
      <div
        dir="rtl"
        className="
          flex aspect-square w-full items-center justify-center
          rounded-3xl
          bg-[rgb(var(--color-surface-muted))]
          text-sm text-[rgb(var(--color-foreground-muted))]
        "
      >
        تصویر محصول موجود نیست
      </div>
    )
  }

  return (
    <div dir="rtl" className="w-full">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {validImages.map((image, index) => (
          <div
            key={image.id}
            className={`
              group relative overflow-hidden
              rounded-3xl
              border border-[rgb(var(--color-border))]
              bg-[rgb(var(--color-surface-muted))]
              shadow-[var(--shadow-card)]
              ${
              index === 0
                ? "sm:col-span-2 aspect-[16/10]"
                : "aspect-square"
            }
            `}
          >
            <Image
              src={image.url!}
              alt={`تصویر ${index + 1} محصول`}
              fill
              priority={index < 2}
              sizes="
                (max-width: 640px) 100vw,
                (max-width: 1024px) 50vw,
                800px
              "
              className="
                object-cover
                transition-transform duration-500
                group-hover:scale-105
              "
            />

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

            <span
              className="
                absolute bottom-3 right-3
                rounded-full
                bg-[rgb(var(--color-surface)/0.9)]
                px-3 py-1
                text-[10px] font-bold
                text-[rgb(var(--color-foreground))]
                opacity-0
                backdrop-blur
                transition-opacity duration-300
                group-hover:opacity-100
              "
            >
              تصویر {index + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageGallery