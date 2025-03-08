'use client'

import {cn} from '@/shared/lib/utils'
import {PizzaImage} from '@/shared/components/shared/pizzaImage'
import {Title} from './title'
import {Button} from '../ui'
import {VariantsGroup} from '@/shared/components/shared/variantsGroup'
import {mapPizzaType, PizzaSize, PizzaType, pizzaTypes} from '@/shared/constants/pizza'
import {Ingredient, ProductVariation} from '@prisma/client'
import {IngredientItem} from '@/shared/components/shared/ingredientItem'
import {calcTotalPizzasPrice} from '@/shared/lib'
import {usePizzaOptions} from '@/shared/hooks'

interface ChoosePizzaFormProps {
  imageUrl: string;
  name: string;
  className?: string;
  ingredients: Ingredient[];
  items: ProductVariation[];
  onClickAddCart?: VoidFunction;
}

export const ChoosePizzaForm = (
  {
    name,
    items,
    imageUrl,
    ingredients,
    onClickAddCart,
    className,
  }: ChoosePizzaFormProps
) => {

  const {
    pizzaType,
    size,
    selectedIngredients,
    setPizzaType,
    setSize,
    addIngredientId,
    availablePizzasSizes
  } = usePizzaOptions(items)

  const description = `${size} см, ${mapPizzaType[pizzaType]} тесто`
  const totalPrice = calcTotalPizzasPrice(
    items,
    ingredients,
    selectedIngredients,
    pizzaType,
    size
  )

  const handleClickAddCart = () => {
    onClickAddCart?.()
    console.log({
      size,
      pizzaType,
      ingredients: selectedIngredients,
    })
  }

  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={size} />
      <div className="w-[400px] bg-[#f7f6f5] p-7">
        <Title text={name} size={'md'} className="font-extrabold mb-1"/>
        <p className="text-gray-400">{description}</p>
        <div className={"flex flex-col gap-4 mt-5"}>
          <VariantsGroup
            items={availablePizzasSizes}
            selectedValue={String(size)}
            onClick={value => setSize(Number(value) as PizzaSize)}
          />
          <VariantsGroup
            items={pizzaTypes}
            selectedValue={String(pizzaType)}
            onClick={value => setPizzaType(Number(value) as PizzaType)}
          />
        </div>
        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-4">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                imageUrl={ingredient.imageUrl}
                name={ingredient.name}
                price={ingredient.price}
                onClick={() => addIngredientId(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>
        <Button
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
          onClick={handleClickAddCart}
        >
          {totalPrice}
        </Button>
      </div>
    </div>
  )
}

