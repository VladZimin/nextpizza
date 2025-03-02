'use client'

import {useState} from 'react'
import {useSet} from 'react-use'
import {useSearchParams} from 'next/navigation'

interface PriceProps {
  priceFrom?: number
  priceTo?: number
}

export interface Filters {
  selectedIngredients: Set<string>
  selectedSizes: Set<string>
  selectedPizzaTypes: Set<string>
  prices: PriceProps
}
interface ReturnType extends Filters{
  setIngredients: (value: string) => void
  setSizes: (value: string) => void
  setPizzaTypes: (value: string) => void
  setPrices: (name: keyof PriceProps, value: number) => void
}

export const useFilters = (): ReturnType => {
  const searchParams = useSearchParams()
  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  })
  const [selectedIngredients, {toggle: toggleIngredients}] = useSet(
    new Set<string>(
      searchParams.has('ingredients')
        ? searchParams.get('ingredients')?.split(',')
        : []
    )
  )
  const [selectedSizes, {toggle: toggleSizes}] = useSet(
    new Set<string>(
      searchParams.has('sizes')
        ? searchParams.get('sizes')?.split(',')
        : []
    )
  )
  const [selectedPizzaTypes, {toggle: togglePizzaTypes}] = useSet(
    new Set<string>(
      searchParams.has('pizzaTypes')
        ? searchParams.get('pizzaTypes')?.split(',')
        : []
    )
  )

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return {
    selectedIngredients,
    selectedPizzaTypes,
    selectedSizes,
    prices,
    setIngredients: toggleIngredients,
    setPrices: updatePrice,
    setPizzaTypes: togglePizzaTypes,
    setSizes: toggleSizes
  }
}