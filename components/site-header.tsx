"use client"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Edit, ShoppingBag } from "lucide-react"
import { useShoppingCart } from "use-shopping-cart"
import { FaUserCircle } from 'react-icons/fa';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import React from 'react';
export function SiteHeader() {
  const pathname = usePathname()
  const router=useRouter()
  const searchPrams = useSearchParams()
  const {cartCount} = useShoppingCart()
  const defaultSearchQuery = searchPrams.get('search') ?? ""
  const { data: session } = useSession();
  
  if (pathname.startsWith("/studio")) return null

  function onSubmit(event: React.SyntheticEvent<HTMLFormElement>){
    event.preventDefault()
    const fromData= new FormData(event.currentTarget)
    const searchQuery= fromData.get('search')
    router.replace(`/?search=${searchQuery}`)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between space-x-4 px-6 sm:space-x-0">
        <MainNav />
        <form className="hidden items-center lg:inline-flex">
          <Input
            id="search"
            name="search"
            type="search"
            autoComplete="off"
            placeholder="Search products..."
            className="h-9 lg:w-[300px]"
            defaultValue={defaultSearchQuery}
          />
        </form>
        <div className="flex items-center space-x-1">
          <Link href="/cart">
            <Button size="sm" variant="ghost">
              <ShoppingBag className="size-5" />
              <span className="ml-2 text-sm font-bold">{cartCount}</span>
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          <ThemeToggle />
            
          {session?.user ? (
              <Link href={`/user/${session.user.id}`}>
                {session.user.image ? (
                  <div className='size-10 overflow-hidden rounded-full'>
                    <Image
                      src={session.user.image}
                      alt={session.user.name!}
                      width={40}
                      height={40}
                      className='scale-animation img'
                    /> 
                  </div>
                ) : (
                  <FaUserCircle className='cursor-pointer' />
                )}
              </Link>
            ) : (
              <Link href='/auth'>
                <FaUserCircle className='cursor-pointer' />
              </Link>
            )}
           
      
          {process.env.NODE_ENV === 'development' && (
            <Link href='/studio'>
            <Button size="sm" variant="ghost">
              <Edit className="size-5" />
            </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
