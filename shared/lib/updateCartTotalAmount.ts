import {prisma} from '@/prisma/prisma-client'
import {calcCartItemTotalPrice} from '@/shared/lib/calcCartItemTotalPrice'

export const updateCartTotalAmount = async (token: string) => {
  const userCart = await prisma.cart.findFirst({
    where: {
      token
    },
    include: {
      cartItems: {
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          productVariation: {
            include: {
              product: true
            },
          },
          ingredients: true
        }
      }
    }
  })

  if (!userCart) {
    return
  }

  const totalAmount = userCart.cartItems.reduce((acc, item) => acc + calcCartItemTotalPrice(item), 0)

  return prisma.cart.update({
    where: {
      id: userCart.id
    },
    data: {
      totalAmount
    },
    include: {
      cartItems: {
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          productVariation: {
            include: {
              product: true
            },
          },
          ingredients: true
        }
      }
    }
  })
}