import {cn} from '@/lib/utils'
import {Container} from './container'
import {Categories} from '@/components/shared/categories'
import {SortPopup} from '@/components/shared/sortPopup'
import {Category} from '@prisma/client'

interface TopBarProps {
    className?: string
    categories: Category[]
}

export const TopBar = ({className, categories}:TopBarProps) => {
    return (
        <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
          <Container className={'flex items-center justify-between'}>
            <Categories items={categories}/>
            <SortPopup/>
          </Container>
        </div>
    )
}

