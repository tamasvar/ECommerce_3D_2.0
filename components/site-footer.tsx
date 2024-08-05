import Link from "next/link"
import React from 'react';
import { siteConfig } from "@/config/site"
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-20 lg:px-8">
        <nav
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
          
        >
          {siteConfig.footer.map((item) => (
            <div key={item.name} className="pb-6">
              <Link href={item.href} className="text-sm leading-6">
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <div className="mt-10 flex items-center justify-center space-x-6">
          <a href="https://www.facebook.com/Sultry3DPrints" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-2xl text-black dark:text-white" />
          </a>
          <a href="https://twitter.com/Sultry3DPrints" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-2xl text-black dark:text-white" />
          </a>
          <a href="https://www.instagram.com/Sultry3DPrints" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-2xl text-black dark:text-white" />
          </a>
          <a href="https://www.tiktok.com/@Sultry3DPrints" target="_blank" rel="noopener noreferrer">
            <FaTiktok className="text-2xl text-black dark:text-white" />
          </a>
        </div>
        <Link
          href="https://www.sultry3dprints.com"
          className="mt-10 block text-center text-xs leading-5"
        >
          &copy; {new Date().getFullYear()} {siteConfig.name} LLC. All rights
          reserved.
        </Link>
      </div>
    </footer>
  )
}
