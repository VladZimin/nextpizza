import {ProductVariation} from '@prisma/client'
import {pizzaSizes, PizzaType} from '@/shared/constants/pizza'
import {Variant} from '@/shared/components/shared/variantsGroup'

/**
 * Функция фильтрует вариации пицц по выбранному типу теста и возвращает массив с доступными размерами пицц
 * @param items - массив с доступными вариациями выбора пицц (размер пиццы, тип теста)
 * @param pizzaType - тип теста выбранной пиццы
 *
 * @return {Variant[]} - массив доступных размеров пицц
 * */
export const getAvailablePizzasSizes = (
  items: ProductVariation[],
  pizzaType: PizzaType,
): Variant[] => {
  const filteredPizzasByType = items.filter(item => item.pizzaType === pizzaType)
  return pizzaSizes.map(item => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasByType.some(pizza => Number(pizza.size) === Number(item.value))
  }))
}