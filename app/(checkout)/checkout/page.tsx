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

export default function CheckoutPage() {
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
  const {
    updateItemQuantity,
    removeCartItem,
    totalAmount,
    cartItems,
    loading
  } = useCart()

  const updateQuantity = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
    updateItemQuantity(id, newQuantity)
  }

  const onSubmit = (data: CheckoutFormValues) => {
    console.log(data)
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
              <CheckoutSidebar totalAmount={totalAmount} loading={loading}/>
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  )
}