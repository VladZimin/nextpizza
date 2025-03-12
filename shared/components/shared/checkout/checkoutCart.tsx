import {Trash2} from 'lucide-react'
import {CheckoutCartItem, CheckoutSkeleton} from './'
import {getCartItemDetails} from '@/shared/lib'
import {PizzaSize, PizzaType} from '@/shared/constants/pizza'
import {CartStateItem} from '@/shared/lib/getCartDetails'
import { WhiteBlock } from '../whiteBlock'

interface Props {
  className?: string
  cartItems: CartStateItem[]
  updateQuantity: (id: number, quantity: number, type: 'plus' | 'minus') => void,
  removeCartItem: (id: number) => Promise<void>,
  totalAmount: number,
  loading?: boolean,
}

export const CheckoutCart = (
  {
    className,
    cartItems,
    updateQuantity,
    removeCartItem,
    totalAmount,
    loading,
  }: Props) => {
  return (
    <WhiteBlock
      className={className}
      title={'1. Корзина'}
      endAdornment={
        totalAmount > 0 && (
          <button type={'button'} className="flex items-center gap-3 text-gray-400 hover:text-gray-600">
            <Trash2 size={16}/>
            Очистить корзину
          </button>
        )
      }
    >
      {
        loading
          ? [...Array(4)].map((_, index) => <CheckoutSkeleton key={index}/>)
          : cartItems.map((item) => (
              <CheckoutCartItem
                className={'mb-2'}
                id={item.id}
                key={item.id}
                details={getCartItemDetails(
                  item.ingredients,
                  item.pizzaSize as PizzaSize,
                  item.pizzaType as PizzaType
                )}
                disabled={item.disabled}
                imageUrl={item.imageUrl}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                onClickCountButton={updateQuantity}
                onClickRemoveItem={removeCartItem}
              />
            )
          )
      }
    </WhiteBlock>
  )
}

