import {axiosInstance} from '@/shared/services/instance'
import {ApiRoutes} from '@/shared/services/const'
import {CartDto} from '@/shared/services/dto/cart.dto'

export const fetchCart = async (): Promise<CartDto> => {
  return (await axiosInstance.get<CartDto>(ApiRoutes.CART)).data;
}

export const updateCartItemQuantity = async (id: number, quantity: number): Promise<CartDto> => {
  return (await axiosInstance.patch<CartDto>(ApiRoutes.CART + id, {quantity})).data;
}

export const deleteCartItem = async (id: number): Promise<CartDto> => {
    return (await axiosInstance.delete<CartDto>(ApiRoutes.CART + id)).data;
}