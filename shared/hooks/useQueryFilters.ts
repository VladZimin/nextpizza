import {useEffect, useRef} from 'react'
import {useRouter} from 'next/navigation'
import qs from 'qs'
import {Filters} from '@/shared/hooks/useFilters'

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter()
  const isMounted = useRef(false)

  useEffect(() => {
    if (isMounted.current) {
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
    }
    isMounted.current = true
  }, [filters, router])
}