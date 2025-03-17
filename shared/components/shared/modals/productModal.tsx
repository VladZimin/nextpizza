'use client'

import {Dialog} from '../../ui'
import {DialogContent} from '@/shared/components/ui/dialog'
import {cn} from '@/shared/lib/utils'
import {ProductForm} from '@/shared/components/shared'
import {IProduct} from '@/@types/prisma'
import {useRouter} from 'next/navigation'

interface ProductModalProps {
  className?: string
  product: IProduct
}

export const ProductModal = ({className, product}: ProductModalProps) => {
  const router = useRouter()

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden', className)}>
        <ProductForm product={product} onSubmitSuccess={() => router.back()} />
      </DialogContent>
    </Dialog>
  )
}

