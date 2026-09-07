import { HttpTypes } from "@medusajs/types"
import Addresses from "@modules/checkout/components/addresses"

export default async function CheckoutForm({
                                             cart,
                                             customer,
                                           }: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) {
  if (!cart) {
    return null
  }

  return (
    <div className="w-full">
      <Addresses
        cart={cart}
        customer={customer}
      />
    </div>
  )
}