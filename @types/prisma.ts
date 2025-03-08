import {Ingredient, Product, ProductVariation} from '@prisma/client'

export type IProduct = Product & { variations: ProductVariation[]; ingredients: Ingredient[] };