'use client'

import {Dialog} from '../../ui'
import {DialogContent} from '@/shared/components/ui/dialog'
import {cn} from '@/shared/lib/utils'
import {useRouter} from 'next/navigation'
import {ChoosePizzaForm, ChooseProductForm} from '@/shared/components/shared'
import {IProduct} from '@/@types/prisma'

interface ProductModalProps {
  className?: string
  product: IProduct
}

export const ProductModal = ({className, product}: ProductModalProps) => {
  const router = useRouter()
  const isPizzaForm = Boolean(product.variations[0].pizzaType)

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden', className)}>
        {
          isPizzaForm
            ? <ChoosePizzaForm
              imageUrl={product.imageUrl}
              name={product.name}
              ingredients={product.ingredients}
              items={product.variations}
            />
            : <ChooseProductForm imageUrl={product.imageUrl} name={product.name}/>
        }
      </DialogContent>
    </Dialog>
  )
}

