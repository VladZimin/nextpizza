'use client'

import {AddressSuggestions} from 'react-dadata'
import 'react-dadata/dist/react-dadata.css'

interface Props {
  onChange?: (value?: string) => void;
}

export const AddressInput = ({onChange}: Props) => {


  return (
    <AddressSuggestions
      token="3d6683839d7c3a3c05718c481ad7f42ac974caaa"
      onChange={(data) => onChange?.(data?.value)}
    />
  )
}
