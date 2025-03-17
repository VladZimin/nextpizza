import {axiosInstance} from '@/shared/services/instance'
import {ApiRoutes} from '@/shared/services/const'

interface Response {
  email: string,
  fullName: string
}
export const getMe = async (): Promise<Response> => {
  const { data } = await axiosInstance.get<Response>(ApiRoutes.ME);

  return data;
}