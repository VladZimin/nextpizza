'use client'

import {cn} from '@/shared/lib/utils'

export type Variant = {
  name: string;
  value: string;
  disabled?: boolean;
};

interface VariantsGroupProps {
  items: readonly Variant[];
  onClick?: (value: Variant['value']) => void;
  selectedValue?: Variant['value'];
  className?: string;
}

export const VariantsGroup = ({className, items, onClick, selectedValue}: VariantsGroupProps) => {
  return (
    <div className={cn(className, 'flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none')}>
      {items.map((item) => (
        <button
          key={item.name}
          onClick={() => {
            console.log(item.value)
            onClick?.(item.value)
          }}
          className={cn(
            'flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm',
            {
              'bg-white shadow': item.value === selectedValue,
              'text-gray-500 opacity-50 pointer-events-none': item.disabled,
            },
          )}>
          {item.name}
        </button>
      ))}
    </div>
  )
}

