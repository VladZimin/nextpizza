import {CartItemDto} from '@/shared/services/dto/cart.dto'

export const calcCartItemTotalPrice = (item: CartItemDto): number => {
  const ingredientsPrice = item.ingredients.reduce((acc, item) => acc + item.price, 0)

  return (ingredientsPrice + item.productVariation.price) * item.quantity
}