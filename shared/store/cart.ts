import {create} from 'zustand'
import {Api} from '@/shared/services/api-client'
import {CartStateItem, getCartDetails} from '@/shared/lib/getCartDetails'
import {CreateCartItemValues} from '@/shared/services/dto/cart.dto'

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  cartItems: CartStateItem[];
  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  addCartItem: (values: CreateCartItemValues) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  error: false,
  loading: true,
  totalAmount: 0,
  fetchCartItems: async () => {
    try {
      set({ loading: true });
      const data = await Api.cart.fetchCart()
      set(getCartDetails(data))
    } catch (e) {
      console.log(e)
    } finally {
      set({ loading: false });
    }
  },
  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set({ loading: true });
      const data = await Api.cart.updateCartItemQuantity(id, quantity)
      set(getCartDetails(data))
    } catch (e) {
      console.log(e)
    } finally {
      set({ loading: false });
    }
  },
  removeCartItem: async (id: number) => {
    try {
      set(state => ({
        loading: true,
        cartItems: state.cartItems.map(item => (item.id === id ? {...item, disabled: true} : item))
      }));
      const data = await Api.cart.deleteCartItem(id)
      set(getCartDetails(data))
    } catch (e) {
      console.log(e)
    } finally {
      set({ loading: false });
    }
  },
  addCartItem: async (values: CreateCartItemValues) => {
    try {
      set({ loading: true });
      const data = await Api.cart.addCartItem(values)
      set(getCartDetails(data))
    } catch (e) {
      console.log(e)
    } finally {
      set({ loading: false });
    }
  },
}))
