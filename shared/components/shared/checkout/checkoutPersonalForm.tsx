import {WhiteBlock} from '../whiteBlock'
import {FormInput} from '@/shared/components/shared'

interface Props {
  className?: string
}

export const CheckoutPersonalFrom = (
  {
    className,
  }: Props) => {
  return (
    <WhiteBlock title={'2. Персональные данные'} className={className}>
      <div className={'grid grid-cols-2 gap-5'}>
        <FormInput name="firstName" className="text-base" placeholder="Имя" label={'Имя'} required/>
        <FormInput name="lastName" className="text-base" placeholder="Фамилия" label={'Фамилия'} required/>
        <FormInput name="email" className="text-base" placeholder="E-Mail" label={'E-Mail'}/>
        <FormInput name="phone" className="text-base" placeholder="Телефон" label={'Телефон'} required/>
      </div>
    </WhiteBlock>
  )
}

