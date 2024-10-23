"use client"
import Toast from "./Toast/Toast"
import { CartProvider } from "use-shopping-cart"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { TailwindIndicator } from "@/components/tailwind-indicator"
interface Props {
  children: React.ReactNode
}

export function Providers({ children }: Props) {
  return (
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
  )
}
