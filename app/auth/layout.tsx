'use client'
import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default Layout