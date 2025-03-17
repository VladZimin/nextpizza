import {prisma} from '@/prisma/prisma-client'
import { ProductModal } from '@/shared/components/shared'
import {notFound} from 'next/navigation'

export default async function ProductModalSlot({params}: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(params.id)
    },
    include: {
      ingredients: true,
      variations: true
    }
  })

  if (!product) {
    return notFound()
  }

  return (
    <ProductModal product={product}/>
  )
}
