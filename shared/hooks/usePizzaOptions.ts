import {useEffect, useState} from 'react'
import {PizzaSize, PizzaType} from '@/shared/constants/pizza'
import {useSet} from 'react-use'
import {getAvailablePizzasSizes} from '@/shared/lib'
import {ProductVariation} from '@prisma/client'
import {Variant} from '@/shared/components/shared/variantsGroup'

interface ReturnProps {
  setSize: (size: PizzaSize) => void
  setPizzaType: (type: PizzaType) => void
  addIngredientId: (id: number) => void
  selectedIngredients: Set<number>
  productVariationId?: number
  size: PizzaSize
  pizzaType: PizzaType
  availablePizzasSizes: Variant[]
}

export const usePizzaOptions = (items: ProductVariation[]): ReturnProps => {
  const [size, setSize] = useState<PizzaSize>(40)
  const [pizzaType, setPizzaType] = useState<PizzaType>(1)
  const [selectedIngredients, {toggle: addIngredientId}] = useSet(new Set<number>([]))

  const availablePizzasSizes = getAvailablePizzasSizes(items, pizzaType)
  const productVariationId = items.find(item => item.size === size && pizzaType === pizzaType)?.id

  useEffect(() => {
    const currentAvailableSize = availablePizzasSizes.find(item => Number(item.value) === size && !item.disabled)
    const availableSize = availablePizzasSizes.find(item => !item.disabled)

    if (!currentAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize)
    }
  }, [pizzaType])

  return {
    size,
    pizzaType,
    selectedIngredients,
    addIngredientId,
    setPizzaType,
    setSize,
    availablePizzasSizes,
    productVariationId
  }
}

