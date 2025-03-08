import {Cart, CartItem, Ingredient, Product, ProductVariation} from '@prisma/client'

export type CartItemDto = CartItem & {
  productVariation: ProductVariation & {
    product: Product
  },
  ingredients: Ingredient[]
}

export interface CartDto extends Cart {
  cartItems: CartItemDto[]
}