'use server'

import {CheckoutFormValues, PayOrderTemplate, VerificationUserTemplate} from '@/shared/components/shared'
import {prisma} from '@/prisma/prisma-client'
import {OrderStatus, Prisma} from '@prisma/client'
import {cookies} from 'next/headers'
import {sendEmail} from '@/shared/lib'
import {getUserSession} from '@/shared/lib/getUserSession'
import { hashSync } from 'bcrypt'

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cartToken = cookies().get('cartToken')?.value
    console.log('Token ', cartToken)
    if (!cartToken) {
      throw new Error(`Could not find cartToken`)
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        token: cartToken
      },
      include: {
        user: true,
        cartItems: {
          include: {
            ingredients: true,
            productVariation: {
              include: {
                product: true
              }
            }
          }
        }
      }
    })

    if (!userCart) {
      throw new Error(`Could not find cart`)
    }
    if (userCart.totalAmount === 0) {
      throw new Error(`Cart is empty`)
    }

    const order = await prisma.order.create({
      data: {
        comment: data.comment,
        email: data.email,
        phone: data.phone,
        addres: data.address,
        fullName: data.firstName + ' ' + data.lastName,
        items: JSON.stringify(userCart.cartItems),
        token: cartToken,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING
      }
    })

    await prisma.cart.update({
      where: {
        token: cartToken
      },
      data: {
        totalAmount: 0
      }
    })

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id
      }
    })

    await sendEmail(
      data.email,
      `Next Pizza / Оплатите заказ #${order.id}`,
      PayOrderTemplate({
        paymentUrl: 'https://resend.com/help',
        orderId: order.id,
        totalAmount: order.totalAmount,
      })
    )
    return 'http://localhost:3000/?paid'
  } catch (e) {
    console.log(e)
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('Пользователь не найден');
    }

    const user = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      }
    })

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password ? hashSync(body.password as string, 10) : user?.password,
      },
    });
  } catch (error) {
    console.log('Error [UPDATE_USER]', error);
    throw error;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error('Почта не подтверждена');
      }

      throw new Error('Пользователь уже существует');
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    await sendEmail(
      createdUser.email,
      'Next Pizza / Подтверждение регистрации',
      VerificationUserTemplate({code})
      );

  } catch (error) {
    console.log('Error [CREATE_USER]', error);
    throw error;
  }
}
