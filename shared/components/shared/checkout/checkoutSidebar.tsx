import {WhiteBlock} from '@/shared/components/shared/whiteBlock'
import {CheckoutItemDetails} from '@/shared/components/shared/checkout/checkoutItemDetails'
import {ArrowRight, Package, Percent, Truck} from 'lucide-react'
import {Button, Skeleton} from '@/shared/components/ui'

interface Props {
  totalAmount: number
  loading?: boolean
}

const VAT = 15
const DELIVERY_PRICE = 250

export const CheckoutSidebar = ({totalAmount, loading}: Props) => {
  const vatPrice = (totalAmount * VAT) / 100
  const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE

  return (
    <WhiteBlock className={'p-6 sticky top-4'}>
      <div className={'flex flex-col gap-1'}>
        <span className={'text-xl'}>Итого:</span>
        {
          loading
            ? <Skeleton className={'h-11 w-[105px] rounded-[6px]'} />
            : <span className={'h-11 text-[34px] font-extrabold'}>{totalPrice} ₽</span>
        }
      </div>
      <CheckoutItemDetails
        title={
          <div className={'flex items-center gap-2'}>
            <Package size={18} className={'text-gray-400'}/>
            Стоимость корзины:
          </div>
        }
        value={
          loading
            ? <Skeleton className={'h-6 w-12 rounded-[6px]'}/>
            : `${totalPrice} ₽`
        }
      />
      <CheckoutItemDetails
        title={
          <div className={'flex items-center gap-2'}>
            <Percent size={18} className={'text-gray-400'}/>
            Налоги:
          </div>
        }
        value={
          loading
            ? <Skeleton className={'h-6 w-12 rounded-[6px]'}/>
            : `${vatPrice} ₽`
        }
      />
      <CheckoutItemDetails
        title={
          <div className={'flex items-center gap-2'}>
            <Truck size={18} className={'text-gray-400'}/>
            Доставка:
          </div>
        }
        value={
          loading
            ? <Skeleton className={'h-6 w-12 rounded-[6px]'}/>
            : `${DELIVERY_PRICE} ₽`
        }
      />
      <Button
        loading={loading}
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
        Перейти к оплате
        <ArrowRight className="w-5 ml-2"/>
      </Button>
    </WhiteBlock>
  )
}

