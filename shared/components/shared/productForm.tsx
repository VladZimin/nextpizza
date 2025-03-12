'use client'

import {useCartStore} from '@/shared/store'
import toast from 'react-hot-toast'
import {ChoosePizzaForm} from '@/shared/components/shared/choosePizzaForm'
import {IProduct} from '@/@types/prisma'
import {ChooseProductForm} from '@/shared/components/shared/chooseProductForm'

interface ProductFormProps {
  product: IProduct
  onSubmitSuccess?: VoidFunction
  className?: string
}

export const ProductForm = ({product, onSubmitSuccess}: ProductFormProps) => {
  const isPizzaForm = Boolean(product.variations[0].pizzaType)
  const firstItem = product.variations[0]
  const {addCartItem, loading} = useCartStore()

  const onSubmit = async (productVariationId?: number, ingredients?: number[]) => {
    try {
      const variationId = productVariationId ?? firstItem.id
      await addCartItem({
        productVariationId: variationId,
        ingredients
      })
      toast.success('Продукт добавлен в корзину')
      onSubmitSuccess?.()
    } catch (e) {
      toast.error('Не удалось добавить в корзину')
      console.error(e)
    }
  }

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        loading={loading}
        onSubmit={onSubmit}
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.variations}
      />
    )
  }
  return (
    <ChooseProductForm
      loading={loading}
      onSubmit={onSubmit}
      imageUrl={product.imageUrl}
      name={product.name}
      price={firstItem.price}
    />
  )
}

