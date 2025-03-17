'use client'

import {FormProvider, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {
  CheckoutAddressFrom,
  CheckoutCart, checkoutFormSchema, CheckoutFormValues,
  CheckoutPersonalFrom,
  CheckoutSidebar,
  Container,
  Title,
} from '@/shared/components/shared'
import {useCart} from '@/shared/hooks'
import {createOrder} from '@/app/actions'
import toast from 'react-hot-toast'
import {useEffect, useState} from 'react'
import {Api} from '@/shared/services/api-client'
import { useSession } from 'next-auth/react'

export default function CheckoutPage() {
  const [submitting, setSubmitting] = useState(false);
  const session = useSession()
  const {
    updateItemQuantity,
    removeCartItem,
    totalAmount,
    cartItems,
    loading
  } = useCart()

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    },
  })

  useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await Api.auth.getMe()
      const [firstName, lastName] = data.fullName.split(' ')

      form.setValue('firstName', firstName)
      form.setValue('lastName', lastName)
      form.setValue('email', data.email)
    }

    if (session) {
      fetchUserInfo()
    }
  }, [session])

  const updateQuantity = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
    updateItemQuantity(id, newQuantity)
  }

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true)
      const url = await createOrder(data)
      toast.error('Заказ успешно оформлен!📝 Переход на оплату...', {
        icon: '✅',
      });
      if (url) {
        location.href = url
      }
    } catch (e) {
      console.log(e)
      setSubmitting(false)
      toast.error('Неверный E-Mail или пароль', {
        icon: '❌',
      });
    }
  }
  return (
    <Container className={'mt-10'}>
      <Title text={'Оформление заказа'} className={'font-extrabold mb-8 text-[36px]'}/>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={'flex gap-10'}>
            <div className={'flex flex-col flex-1 gap-10 mb-20'}>
              <CheckoutCart
                cartItems={cartItems}
                totalAmount={totalAmount}
                loading={loading}
                updateQuantity={updateQuantity}
                removeCartItem={removeCartItem}
              />
              <CheckoutPersonalFrom className={loading ? 'opacity-50 pointer-events-none' : ''} />
              <CheckoutAddressFrom className={loading ? 'opacity-50 pointer-events-none' : ''} />
            </div>
            <div className={'w-[450px]'}>
              <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  )
}