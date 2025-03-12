import {useCartStore} from '@/shared/store'
import {useEffect} from 'react'
import {CartStateItem} from '@/shared/lib/getCartDetails'
import {CreateCartItemValues} from '@/shared/services/dto/cart.dto'

type ReturnProps = {
  totalAmount: number;
  cartItems: CartStateItem[];
  loading: boolean;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
  addCartItem: (values: CreateCartItemValues) => Promise<void>;
};
export const useCart = (): ReturnProps => {
  const cartStore = useCartStore()

  useEffect(() => {
    cartStore.fetchCartItems()
  }, [])
  return cartStore
}