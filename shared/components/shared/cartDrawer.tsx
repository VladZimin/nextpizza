'use client'

import {ArrowRight} from 'lucide-react'
import {Button} from '@/shared/components/ui'
import {cn} from '@/shared/lib/utils'
import {ReactNode, useEffect} from 'react'
import {Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger,} from '@/shared/components/ui/sheet'
import Link from 'next/link'
import {CartDrawerItem} from '@/shared/components/shared/cartDrawerItem'
import {getCartItemDetails} from '@/shared/lib'
import {useCartStore} from '@/shared/store'
import {PizzaSize, PizzaType} from '@/shared/constants/pizza'

interface CartDrawerProps {
  className?: string
  children: ReactNode
}

export const CartDrawer = ({className, children}: CartDrawerProps) => {
  const {
    fetchCartItems,
    updateItemQuantity,
    removeCartItem,
    totalAmount,
    cartItems
  } = useCartStore()

  useEffect(() => {
    fetchCartItems()
  }, [])

  const updateQuantity = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
    updateItemQuantity(id, newQuantity)
  }
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className={cn('flex flex-col justify-between pb-0 bg-[#F4F1EE]', className)}>
        <SheetHeader>
          <SheetTitle>
            В корзине <span className="font-bold">{cartItems.length} товар(а)</span>
          </SheetTitle>
        </SheetHeader>
        <div className="-mx-6 mt-5 overflow-auto scrollbar flex-1">
          {cartItems.map((item) => (
            <CartDrawerItem key={item.id}
                            className={'mb-2'}
                            id={item.id}
                            details={item.pizzaSize
                              ? getCartItemDetails(
                                item.pizzaSize as PizzaSize,
                                item.pizzaType as PizzaType,
                                item.ingredients)
                              : ''}
                            imageUrl={item.imageUrl}
                            name={item.name}
                            price={item.price}
                            quantity={item.quantity}
                            onClickCountButton={updateQuantity}
                            onClickRemoveItem={removeCartItem}
            />
          ))}
        </div>
        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
                    <span className="flex flex-1 text-lg text-neutral-500">
                      Итого
                      <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"/>
                    </span>

              <span className="font-bold text-lg">{totalAmount} ₽</span>
            </div>

            <Link href="/cart">
              <Button
                className="w-full h-12 text-base">
                Оформить заказ
                <ArrowRight className="w-5 ml-2"/>
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

