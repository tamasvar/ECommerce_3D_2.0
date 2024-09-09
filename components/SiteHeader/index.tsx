"use client"

import Link from "next/link";
import React, { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Edit, ShoppingBag, Trash } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";
import { FaUserCircle } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { useSession } from 'next-auth/react';
import UserDropdown from "./UserDropdown";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchPrams = useSearchParams();
  const { cartCount, clearCart } = useShoppingCart();
  const defaultSearchQuery = searchPrams.get('search') ?? "";
  const { data: session } = useSession();

  if (pathname.startsWith("/studio")) return null;

  function handleCartClear() {
    clearCart();
    setIsMenuOpen(false); // Close menu after clearing
  }

  function onSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get('search');
    router.replace(`/?search=${searchQuery}`);
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="relative">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between space-x-4 px-1 sm:space-x-0">
          <MainNav />
          <form className="hidden items-center lg:inline-flex" onSubmit={onSubmit}>
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
          <div className="relative flex items-center space-x-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative"
            >
              <ShoppingBag className="size-5" />
              <span className="ml-2 text-sm font-bold">{cartCount}</span>
              <span className="sr-only">Cart</span>
            </Button>
            {isMenuOpen && (
              <div className="absolute left-0 top-full z-50 mt-2 w-36 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                <Link href="/cart">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full text-left text-black hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingBag className="mr-2 size-5" />
                    Go to Cart
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-full text-left text-black hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  onClick={handleCartClear}
                >
                  <Trash className="mr-2 size-5" />
                  Clear Cart
                </Button>
              </div>
            )}

            {session?.user ? (
              <UserDropdown session={session} />
            ) : (
              <Link href='/auth'>
                <FaUserCircle className='size-7 cursor-pointer' />
              </Link>
            )}
            <ThemeToggle />

            {process.env.NODE_ENV === 'development' && (
              <Link href='/studio'>
                <Button size="sm" variant="ghost">
                  <Edit className="size-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
