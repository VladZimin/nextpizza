import {useEffect} from 'react'
import {useRouter} from 'next/navigation'
import qs from 'qs'
import {Filters} from '@/hooks/useFilters'

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter()
  useEffect(() => {
    const params = {
      ...filters.prices,
      sizes: Array.from(filters.selectedSizes),
      ingredients: Array.from(filters.selectedIngredients),
      pizzaTypes: Array.from(filters.selectedPizzaTypes),
    }

    const query = qs.stringify(params, {
      arrayFormat: 'comma',
    })

    router.push(`?${query}`, {scroll: false})
  }, [filters, router])
}