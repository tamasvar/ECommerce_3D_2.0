import Link from "next/link"
import React from 'react';
import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo className="size-7" />
        <span className="inline-block text-xl font-bold">
          {siteConfig.name}
        </span>
      </Link>
    </div>
  )
}
