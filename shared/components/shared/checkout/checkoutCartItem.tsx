'use client'

import {cn} from '@/shared/lib/utils'
import {X} from 'lucide-react'
import {CartItemProps} from '../cartItemDeatails/cart-item-details.types'
import * as CartItemDetails from '../cartItemDeatails'

interface Props extends CartItemProps {
  className?: string
  onClickCountButton?: (id: number, quantity: number, type: 'plus' | 'minus') => void;
  onClickRemoveItem?: (id: number) => void;
}

export const CheckoutCartItem = (
  {
    id,
    name,
    price,
    imageUrl,
    quantity,
    className,
    details,
    disabled,
    onClickCountButton,
    onClickRemoveItem,
  }: Props
) => {

  const updateItemQuantity = (type: 'plus' | 'minus') => {
    onClickCountButton?.(id, quantity, type)
  }

  return (
    <div className={cn('flex items-center justify-between', {
      'opacity-50 pointer-events-none': disabled
    }, className)}>
      <div className="flex items-center gap-5 flex-1">
        <CartItemDetails.Image src={imageUrl}/>
        <CartItemDetails.Info name={name} details={details}/>
      </div>

      <CartItemDetails.Price value={price}/>

      <div className="flex items-center gap-5 ml-20">
        <CartItemDetails.CountButton onClick={updateItemQuantity} value={quantity}/>
        <button onClick={() => onClickRemoveItem?.(id)}>
          <X className="text-gray-400 cursor-pointer hover:text-gray-600" size={20}/>
        </button>
      </div>
    </div>
  )
}
