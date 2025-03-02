'use client'

import {cn} from '@/lib/utils'
import {Title} from '@/components/shared/title'
import {Input} from '@/components/ui'
import {RangeSlider} from '@/components/shared/rangeSlider'
import {CheckboxFiltersGroup} from '@/components/shared/checkboxFiltersGroup'
import {useFilters, useIngredients, useQueryFilters} from '@/hooks'

interface FiltersProps {
  className?: string;
}

export const Filters = ({className}: FiltersProps) => {
  const filters = useFilters()
  const {loading, ingredients} = useIngredients()
  useQueryFilters(filters)

  const updatePrices = (values: number[]) => {
    filters.setPrices('priceFrom', values[0])
    filters.setPrices('priceTo', values[1])
  }

  const mappedIngredients = ingredients.map(ingredient => ({text: ingredient.name, value: String(ingredient.id)}))
  return (
    <div className={cn('', className)}>
      <Title
        text={'Фильтрация'}
        size={'sm'}
        className={'mb-5 font-bold pb-4 border-b border-b-neutral-100'}
      />
      <CheckboxFiltersGroup
        name="pizzaTypes"
        className="mb-5"
        title="Тип теста"
        onClickCheckbox={filters.setPizzaTypes}
        selected={filters.selectedPizzaTypes}
        items={[
          {text: 'Тонкое', value: '1'},
          {text: 'Традиционное', value: '2'},
        ]}
      />
      <CheckboxFiltersGroup
        name="sizes"
        className="mb-5"
        title="Размеры"
        onClickCheckbox={filters.setSizes}
        selected={filters.selectedSizes}
        items={[
          {text: '20 см', value: '20'},
          {text: '30 см', value: '30'},
          {text: '40 см', value: '40'},
        ]}
      />
      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={filters.prices.priceFrom}
            onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="1000"
            min={100}
            max={1000}
            value={filters.prices.priceTo}
            onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[filters.prices.priceFrom ?? 0, filters.prices.priceTo ?? 1000]}
          onValueChange={updatePrices}
        />
      </div>
      <CheckboxFiltersGroup
        name={'ingredients'}
        loading={loading}
        title={'Ингридиенты'}
        className={'mt-5'}
        limit={5}
        defaultItems={mappedIngredients.slice(0, 5)}
        items={mappedIngredients}
        onClickCheckbox={filters.setIngredients}
        selected={filters.selectedIngredients}
      />
    </div>
  )
}
