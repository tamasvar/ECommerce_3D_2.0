import { Suspense } from "react"
import { Metadata } from "next"
import { cn } from "@/lib/utils"
import LoadingSpinner from "./loading"
import { fontSans } from "@/lib/fonts"
import { siteConfig } from "@/config/site"
import { Providers } from "@/components/providers"
import { SiteBlob } from "@/components/site-blob"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/SiteHeader"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "@/styles/globals.css"

export const metadata: Metadata = {
  title: siteConfig.name, 
  description: siteConfig.description,
  keywords:siteConfig.keywords,
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
        <head> 
        <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,r,n){w.TrustpilotObject=n;w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments)};
                a=d.createElement(s);a.async=1;a.src=r;a.type='text/java'+s;f=d.getElementsByTagName(s)[0];
                f.parentNode.insertBefore(a,f)})(window,document,'script', 'https://invitejs.trustpilot.com/tp.min.js', 'tp');
                tp('register', 'lKsbfE18OxcaydQq');
              `,
            }}
          />
          </head>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <Providers>
            <div className="relative flex min-h-screen flex-col">
              <Suspense fallback={<LoadingSpinner />}>
                <SiteHeader />
              </Suspense>
              <SiteBlob />
              <Suspense fallback={<LoadingSpinner />}>
                <div className="flex-1">{children}</div>
              </Suspense>
              <SiteFooter />
            </div>
          </Providers>
          <Analytics/>
          <SpeedInsights/>
        </body>
      </html>
    </>
  )
}
