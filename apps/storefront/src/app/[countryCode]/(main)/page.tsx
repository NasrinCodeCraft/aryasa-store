import { Metadata } from "next"

import { listCategories } from "@lib/data/categories"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"

import Hero from "@modules/home/components/hero"
import CategoryGrid from "@modules/home/components/category-grid"
import ProductGrid from "@modules/home/components/product-grid"

export const metadata: Metadata = {
  title: "AryaSA | مصالح ساختمانی",
  description:
    "فروش آنلاین مصالح ساختمانی؛ آجر، سیمان، گچ، بلوک، شن و ماسه و سایر مصالح.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await props.params

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const categories = await listCategories({
    limit: 20,
  })

  const { response } = await listProducts({
    regionId: region.id,
    queryParams: {
      limit: 8,
    },
  })

  const products = response.products

  return (
    <>
      <Hero />

      <CategoryGrid categories={categories} />

      <ProductGrid products={products} />
    </>
  )
}