import {prisma} from '@/prisma/prisma-client'
import {NextRequest, NextResponse} from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value

    if (!token) {
      return NextResponse.json({totalAmount: 0, cartItems: []})
    }

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

    return NextResponse.json(userCart)
  } catch (e) {
    console.log(e)
  }
}