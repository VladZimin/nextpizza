'use client'

import {cn} from '@/shared/lib/utils'
import {Title} from './title'
import {Button} from '../ui'

interface ChooseProductFormProps {
  imageUrl: string;
  name: string;
  loading?: boolean;
  className?: string;
  onSubmit: () => void;
  price: number;
}

export const ChooseProductForm = (
  {
    name,
    imageUrl,
    onSubmit,
    loading,
    price,
    className,
  }: ChooseProductFormProps
) => {
  return (
    <div className={cn(className, 'flex flex-1 ')}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
        />
      </div>
      <div className="w-[490px] bg-[#f7f6f5] p-7 flex flex-col justify-between">
        <Title text={name} size={'md'} className="font-extrabold mb-1"/>
        <Button
          loading={loading}
          onClick={() => onSubmit()}
          className="h-[55px] px-10 text-base rounded-[18px] w-full"
        >
          {price}
        </Button>
      </div>
    </div>
  )
}

