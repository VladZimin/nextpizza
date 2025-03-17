import {FormProvider, useForm} from 'react-hook-form'
import {loginFormSchema, LoginFormValues} from '@/shared/components/shared/modals/authModal/forms/schema'
import {zodResolver} from '@hookform/resolvers/zod'
import {FormInput, Title} from '../../..'
import {Button} from '@/shared/components/ui'
import toast from 'react-hot-toast'
import {signIn} from 'next-auth/react'

interface Props {
  onClose?: VoidFunction
}

export const LoginForm = ({onClose}: Props) => {

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await signIn('credentials', {
        ...data,
        redirect: false
      })

      if (!response?.ok) {
        throw Error()
      }

      toast.success('✅ Вы успешно вошли в аккаунт')
      onClose?.()
    } catch (e) {
      console.error('Error [LOGIN]', e)
      toast.error('❌ Не удалось войти')
    }
  }

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <Title text="Вход в аккаунт" size="md" className="font-bold"/>
          <p className="text-gray-400">Введите свою почту, чтобы войти в свой аккаунт</p>
        </div>

        <FormInput name="email" label="E-Mail" required/>
        <FormInput type="password" name="password" label="Пароль" required/>

        <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          Войти
        </Button>
      </form>
    </FormProvider>
  )
}

