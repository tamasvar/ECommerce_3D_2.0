import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Providers } from "@/components/providers"
import { SiteBlob } from "@/components/site-blob"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Suspense } from "react"
import LoadingSpinner from "./loading"

export const metadata: Metadata = {
  title: siteConfig.name, //itt adtam meg a címet a fejlécnek
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico'
  }

}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <Providers>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <SiteBlob />
              <Suspense fallback={<LoadingSpinner />}>
                <div className="flex-1">{children}</div>
              </Suspense>
              <SiteFooter />
            </div>
          </Providers>
        </body>
      </html>
    </>
  )
}
