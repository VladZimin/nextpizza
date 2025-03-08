import {axiosInstance} from '@/shared/services/instance'
import {Ingredient} from '@prisma/client'
import {ApiRoutes} from '@/shared/services/const'

export const getAll = async (): Promise<Ingredient[]> => {
  const { data } = await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS);

  return data;
}