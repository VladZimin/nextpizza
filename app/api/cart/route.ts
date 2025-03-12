import {prisma} from '@/prisma/prisma-client'
import {NextRequest, NextResponse} from 'next/server'
import {findOrCreateCart, updateCartTotalAmount} from '@/shared/lib'
import {CreateCartItemValues} from '@/shared/services/dto/cart.dto'

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
    console.log('CART_GET: ', e)
    return NextResponse.json({message: 'Не удалось получить корзину', e}, {status: 500})
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value

    if (!token) {
      token = crypto.randomUUID()
    }
    const userCart = await findOrCreateCart(token)

    const data = (await req.json()) as CreateCartItemValues

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productVariationId: data.productVariationId,
        ingredients: {
          every: {
            id: {
              in: data.ingredients
            }
          },
        }
      }
    })

    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id
        },
        data: {
          quantity: findCartItem.quantity + 1
        }
      })
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productVariationId: data.productVariationId,
          quantity: 1,
          ingredients: {
            connect: data.ingredients?.map((id) => ({id}))
          }
        }
      })
    }

    const updatedUserCart = await updateCartTotalAmount(token)

    const response = NextResponse.json(updatedUserCart)
    response.cookies.set('cartToken', token)
    return response
  } catch (e) {
    console.log('CART_POST: ', e)
    return NextResponse.json({message: 'Не удалось создать корзину', e}, {status: 500})
  }
}