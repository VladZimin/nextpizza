import {cn} from '@/shared/lib/utils'
import Image from 'next/image'
import {Container} from './container'
import {Button} from '../ui'
import {User} from 'lucide-react'
import Link from 'next/link'
import {SearchInput} from '@/shared/components/shared/searchInput'
import {CartButton} from '@/shared/components/shared/cartButton'

interface HeaderProps {
    className?: string
}

export const Header = ({className}:HeaderProps) => {
    return (
        <header className={cn('border border-b',className)}>
          <Container className={'flex items-center justify-between py-8'}>
            <Link href={'/public'} className={'flex items-center gap-4'}>
              <Image src={'/logo.png'} alt={'Logo'} width={35} height={35} />
              <div>
                <h1 className={'text-2xl uppercase font-black'}>Next Pizza</h1>
                <p className={'text-sm text-gray-400 leading-3'}>вкусней уже некуда</p>
              </div>
            </Link>
            <div className={'mx-10 flex-1'}>
              <SearchInput/>
            </div>
            <div className={'flex items-center gap-3'}>
              <Button variant={'outline'} className={'flex items-center gap-1'}>
                <User size={16}/>
                Войти
              </Button>
              <CartButton/>
            </div>
          </Container>
        </header>
    )
}

