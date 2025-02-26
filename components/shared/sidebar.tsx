'use client'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]'>
      <div className='flex flex-1 flex-col gap-6'>
        {sidebarLinks.map(({ label, route, imgUrl }) => (
          <Link
            key={label}
            href={route}
            className={cn(
              'flex gap-4 items-center p-4 rounded-lg justify-start',
              (route === pathname || pathname.startsWith(`${route}/`)) && 'bg-blue-1'
            )}
          >
            <Image src={imgUrl} alt={label} width={24} height={24} />
            <p className='text-lg font-semibold max-lg:hidden'>{label}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
