import {CartDto} from '@/shared/services/dto/cart.dto'
import {calcCartItemTotalPrice} from '@/shared/lib/calcCartItemTotalPrice'

export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  disabled?: boolean;
  pizzaSize?: number | null;
  pizzaType?: number | null;
  ingredients: Array<{ name: string; price: number }>;
};

interface ReturnProps {
  cartItems: CartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDto): ReturnProps => {

  const cartItems: CartStateItem[] = data.cartItems.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productVariation.product.name,
    imageUrl: item.productVariation.product.imageUrl,
    price: calcCartItemTotalPrice(item),
    pizzaSize: item.productVariation.size,
    pizzaType: item.productVariation.pizzaType,
    disabled: false,
    ingredients: item.ingredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price
    })),
  }))

  return {
    totalAmount: data.totalAmount,
    cartItems
  }
}