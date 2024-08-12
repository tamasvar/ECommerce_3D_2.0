import Link from "next/link"
import React from 'react';
import { siteConfig } from "@/config/site"
import Image from 'next/image';

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-1">
        <Image
          src="/logo.webp"
          alt="Sulrty3dPrints Logo"
          unoptimized
          width={35} // Adjust the width as needed
          height={35} // Adjust the height as needed
        />
        <span className="inline-block text-xl font-bold">
          {siteConfig.name}
        </span>
      </Link>
    </div>
  )
}
