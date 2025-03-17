import {CartItemProps} from '@/shared/components/shared/cartItemDeatails/cart-item-details.types'
import * as CartItem from './cartItemDeatails'
import {cn} from '@/shared/lib/utils'
import { CountButton } from './countButton'
import {Trash2Icon} from 'lucide-react'

interface CartDrawerItemProps extends CartItemProps {
  className?: string
  onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
  onClickRemoveItem: (id: number) => void;
}

export const CartDrawerItem = (
  {
    id,
    imageUrl,
    name,
    price,
    details,
    disabled,
    quantity,
    className,
    onClickCountButton,
    onClickRemoveItem,
  }: CartDrawerItemProps
) => {

  const updateItemQuantity = (type: 'plus' | 'minus') => {
    onClickCountButton(id, quantity, type)
  }

  return (
    <div className={cn('flex bg-white p-5 gap-6', {
      'opacity-50 pointer-events-none': disabled,
    }, className)}>
      <CartItem.Image src={imageUrl}/>
      <div className="flex-1">
        <CartItem.Info name={name} details={details}/>
        <hr className="my-3" />

        <div className="flex items-center justify-between">
          <CountButton onClick={updateItemQuantity} value={quantity} />

          <div className="flex items-center gap-3">
            <CartItem.Price value={price} />
            <Trash2Icon
              onClick={() => onClickRemoveItem(id)}
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

