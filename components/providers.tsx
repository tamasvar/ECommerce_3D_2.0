"use client"
import { CartProvider } from "use-shopping-cart"
import { NextAuthProvider } from "./AuthProvider/AuthProvider"
import { Toaster } from "@/components/ui/toaster"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import Toast from "./Toast/Toast"
interface Props {
  children: React.ReactNode
}

export default function Providers({ children }: Props) {
  return <NextAuthProvider>
    <CartProvider
      currency="EUR"
      shouldPersist
      cartMode="checkout-session"
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!}
    >

      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toast />
        <Toaster />
        {children}
        <TailwindIndicator />
      </ThemeProvider>
    </CartProvider>
  </NextAuthProvider>
}
