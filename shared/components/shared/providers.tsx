'use client'

import { ReactNode } from "react"
import {Toaster} from 'react-hot-toast'
import {SessionProvider} from 'next-auth/react'
import NextTopLoader from 'nextjs-toploader'

interface Props {
    children: ReactNode
}

export const Providers = ({children}: Props) => {
    return (
        <>
          <SessionProvider>{children}</SessionProvider>
          <Toaster/>
          <NextTopLoader />
        </>
    )
}

