import {mapPizzaType, PizzaSize, PizzaType} from '@/shared/constants/pizza'
import {CartStateItem} from '@/shared/lib/getCartDetails'

export const getCartItemDetails = (
  ingredients?: CartStateItem['ingredients'],
  pizzaSize?: PizzaSize,
  type?: PizzaType,
) => {
  const details = [];

  if (pizzaSize && type) {
    const typeName = mapPizzaType[type]
    details.push(`${pizzaSize} см, ${typeName} тесто`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(', ')
}
