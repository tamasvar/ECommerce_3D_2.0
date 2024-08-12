import { Suspense } from "react"
import { Metadata } from "next"
import { cn } from "@/lib/utils"
import LoadingSpinner from "./loading"
import { fontSans } from "@/lib/fonts"
import { siteConfig } from "@/config/site"
import { SiteBlob } from "@/components/site-blob"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "@/styles/globals.css"
import dynamic from "next/dynamic"
import Script from "next/script"

// Declare global types
declare global {
  interface Window {
    TrustpilotObject: any;
    tp: any;
  }
}

// Lazy-load components
const SiteFooter = dynamic(() => import('@/components/site-footer'));
const SiteHeader = dynamic(() => import('@/components/SiteHeader'), { ssr: false });
const Providers = dynamic(() => import("@/components/providers"), { ssr: false });
const TrustpilotScript = dynamic(() => import('@/components/TrustpilotScript'), { ssr: false });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  icons: {
    icon: '/favicon.ico'
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script src="https://invitejs.trustpilot.com/tp.min.js" strategy="lazyOnload" />
      </head>
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
              <div className="flex-1">
                {children}
              </div>
            </Suspense>
            <SiteFooter />
          </div>
        </Providers>
        <TrustpilotScript />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
