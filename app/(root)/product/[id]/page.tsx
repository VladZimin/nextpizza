import {prisma} from '@/prisma/prisma-client'
import {notFound} from 'next/navigation'
import {Container, ProductForm} from '../../../../shared/components/shared'

export default async function ProductPage({params}: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(params.id)
    },
    include: {
      ingredients: true,
      variations: true,
      category: {
        include: {
          products: {
            include: {
              variations: true
            }
          }
        }
      }
    }
  })

  if (!product) {
    return notFound()
  }

  return (
    <Container className="flex flex-col my-10">
      <ProductForm product={product}/>
    </Container>
  )
}
