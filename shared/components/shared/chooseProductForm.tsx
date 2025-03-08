'use client'

import {cn} from '@/shared/lib/utils'
import {Title} from './title'
import {Button} from '../ui'

interface ChooseProductFormProps {
  imageUrl: string;
  name: string;
  className?: string;
  onClickAdd?: VoidFunction;
}

export const ChooseProductForm = (
  {
    name,
    imageUrl,
    onClickAdd,
    className,
  }: ChooseProductFormProps
) => {
  const description = '30 см, традиционное тесто'
  const totalPrice = '600'
  return (
    <div className={cn(className, 'flex flex-1')}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
        />
      </div>
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size={'md'} className="font-extrabold mb-1"/>
        <p className="text-gray-400">{description}</p>
        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full">
          {totalPrice}
        </Button>
      </div>
    </div>
  )
}

