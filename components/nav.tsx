'use client';

import { links } from '@/contants';
import Link from 'next/link'
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const linkStyle = (href: string) =>
    pathname === href
      ? "text-white"
      : "text-gray-600";


  const format = (str: string) => str.split(' ').join('-').toLowerCase()

  return (
    <nav className="flex items-center gap-5 [&>a]:text-sm p-2">
      {links.map((item, id) => (
        <Link
          key={id}
          href={format(item)}
          className={`${linkStyle(`/${format(item)}`)} uppercase tracking-wide`}>
          {item}
        </Link>
      ))}
    </nav>
  )
}
