import {Ingredient, ProductVariation} from '@prisma/client'
import {PizzaSize, PizzaType} from '@/shared/constants/pizza'

/**
 * Функция для подсчета общей стоимости пиццы
 * @param items - массив с доступными вариациями выбора пицц (размер пиццы, тип теста)
 * @param ingredients - массив ингредиентов доступных для добавления в пиццу
 * @param selectedIngredients - коллекция id ингредиентов выбранных пользователем
 * @param pizzaType - тип теста выбранной пиццы
 * @param size - размер выбранной пиццы
 *
 * @return number - общая стоимость пиццы
 * */
export const calcTotalPizzasPrice = (
  items: ProductVariation[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
  pizzaType: PizzaType,
  size: PizzaSize
) => {
  const pizzaPrice = items.find(i => (i.size === size && i.pizzaType === pizzaType))?.price ?? 0
  const totalIngredientsPrice = ingredients
    .filter(ingredient => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0)
  return  pizzaPrice + totalIngredientsPrice
}