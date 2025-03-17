'use client'

import {cn} from '@/shared/lib/utils'
import Image from 'next/image'
import {Container} from './container'
import Link from 'next/link'
import {SearchInput} from '@/shared/components/shared/searchInput'
import {CartButton} from '@/shared/components/shared/cartButton'
import {useEffect, useState} from 'react'
import toast from 'react-hot-toast'
import {useRouter, useSearchParams} from 'next/navigation'
import {ProfileButton} from '@/shared/components/shared/profileButton'
import {AuthModal} from '@/shared/components/shared/modals'

interface HeaderProps {
  hasSearch?: boolean
  hasCart?: boolean
  className?: string
}

export const Header = ({className, hasSearch = true, hasCart = true}: HeaderProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpenAuthModal, setIsOpenAuthModal] = useState(false)

  useEffect(() => {
    let toastMessage = ''

    if (searchParams.has('paid')) {
      toastMessage = 'Заказ успешно оплачен!'
    }
    if (searchParams.has('verified')) {
      toastMessage = 'Аккаунт подтвержден!'
    }

    if (toastMessage) {
      toast.success(toastMessage)
      router.replace('/')
    }
  }, [])

  return (
    <header className={cn('border-b', className)}>
      <Container className={'flex items-center justify-between py-8'}>
        <Link href={'/'} className={'flex items-center gap-4'}>
          <Image src={'/logo.png'} alt={'Logo'} width={35} height={35}/>
          <div>
            <h1 className={'text-2xl uppercase font-black'}>Next Pizza</h1>
            <p className={'text-sm text-gray-400 leading-3'}>вкусней уже некуда</p>
          </div>
        </Link>
        {hasSearch && (
          <div className={'mx-10 flex-1'}>
            <SearchInput/>
          </div>
        )}
        <div className={'flex items-center gap-3'}>
          <ProfileButton onClickSignIn={() => setIsOpenAuthModal(true)}/>
          <AuthModal onClose={() => setIsOpenAuthModal(false)} open={isOpenAuthModal}/>
          {
            hasCart && <CartButton/>
          }
        </div>
      </Container>
    </header>
  )
}

