'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <section className='w-full max-w-[264px]'>
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src={'/icons/hamburger.svg'}
            alt='Hamburger icons'
            width={36}
            height={36}
            className='cursor-pointer sm:hidden'
          />
        </SheetTrigger>
        <SheetContent side={'left'} className='bg-dark-1 border-none text-white'>
          <Link href={'/'} className='flex items-center gap-1'>
            <Image
              src={'/icons/logo.svg'}
              alt='Zoom logo'
              width={32}
              height={32}
              className='max-sm:size-10'
            />
            <SheetTitle className='text-[26px] font-extrabold text-white'>Zoom</SheetTitle>
            <SheetDescription />
          </Link>
          <div className='flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto'>
            <SheetClose asChild>
              <section className='flex h-full flex-col gap-6 pt-16 text-white'>
                {sidebarLinks.map(({ label, route, imgUrl }) => (
                  <SheetClose key={label} asChild>
                    <Link
                      href={route}
                      className={cn(
                        'flex gap-4 items-center p-4 rounded-lg w-full max-w-60',
                        (route === pathname || pathname.startsWith(`${route}/`)) && 'bg-blue-1'
                      )}
                    >
                      <Image src={imgUrl} alt={label} width={20} height={20} />
                      <p className='font-semibold'>{label}</p>
                    </Link>
                  </SheetClose>
                ))}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}
