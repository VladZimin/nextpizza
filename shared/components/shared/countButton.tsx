import React from 'react'
import {cn} from '@/shared/lib/utils'
import {CountIconButton} from './countIconButton'

export interface CountButtonProps {
  value?: number;
  size?: 'sm' | 'lg';
  className?: string;
  onClick?: (type: 'plus' | 'minus') => void;
}

export const CountButton = (
  {
    className,
    onClick,
    value = 1,
    size = 'sm',
  }: CountButtonProps
) => {
  return (
    <div className={cn('inline-flex items-center justify-between gap-3', className)}>
      <CountIconButton
        onClick={() => onClick?.('minus')}
        disabled={value === 1}
        size={size}
        type="minus"
      />

      <b className={size === 'sm' ? 'text-sm' : 'text-md'}>{value}</b>

      <CountIconButton onClick={() => onClick?.('plus')} size={size} type="plus"/>
    </div>
  )
}
