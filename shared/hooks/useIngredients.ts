import {Ingredient} from '@prisma/client'
import {useEffect, useState} from 'react'
import {Api} from '@/shared/services/api-client'

interface ReturnProps {
  ingredients: Ingredient[]
  loading: boolean
}


export const useIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = useState<ReturnProps['ingredients']>([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true)
        const data = await Api.ingredients.getAll()
        setIngredients(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchIngredients()
  }, [])

  return {ingredients, loading}
}