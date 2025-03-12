import {WhiteBlock} from '../whiteBlock'
import {AddressInput, ErrorText, FormInput, FormTextarea} from '@/shared/components/shared'
import {Controller, useFormContext} from 'react-hook-form'

interface Props {
  className?: string
}

export const CheckoutAddressFrom = ({className}: Props) => {
  const {control} = useFormContext()

  return (
    <WhiteBlock title={'3. Адрес доставки'} className={className}>
      <div className={'flex flex-col gap-5'}>
        <Controller
          render={({field, fieldState}) => (
          <>
            <AddressInput onChange={field.onChange}/>
            {fieldState.error?.message && <ErrorText text={fieldState.error.message}/>}
          </>
        )}
          control={control}
          name='address'
        />
        <FormTextarea
          rows={5}
          name="comment"
          placeholder={'Комментарий к заказу'}
          className={'text-base'}
          label={'Комментарий'}
        />
      </div>
    </WhiteBlock>
  )
}

