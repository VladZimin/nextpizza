'use client'

import {ArrowRight, ShoppingCart} from 'lucide-react'
import {Button} from '@/shared/components/ui'
import {cn} from '@/shared/lib/utils'
import {CartDrawer} from '@/shared/components/shared/cartDrawer'
import {useCartStore} from '@/shared/store'

interface CartButtonProps {
  className?: string
}

export const CartButton = ({className}: CartButtonProps) => {
  const {loading, cartItems, totalAmount} = useCartStore()
  return (
    <CartDrawer>
      <Button
        loading={loading}
        className={cn('group relative', {'w-[105px]': loading},className)}
      >
        <b>{totalAmount} ₽</b>
        <span className="h-full w-[1px] bg-white/30 mx-3"/>
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart size={16} className="relative" strokeWidth={2}/>
          <b>{cartItems.length}</b>
        </div>
        <ArrowRight className="w-6 absolute right-5 transition duration-300 -translate-x-2
                opacity-0 group-hover:opacity-100 group-hover:translate-x-0"/>
      </Button>
    </CartDrawer>
  )
}

