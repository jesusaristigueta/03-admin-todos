'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

interface Props {
  title: string;
  path: string;
  icon: React.ReactNode;
}

export const SidebarItem = ({title, path, icon}: Props) => {

  const pathName = usePathname();

  return (
    <li>
      <Link href={path} className={`
        px-4 py-3 flex items-center space-x-4 rounded-md group
        hover:bg-gradient-to-r hover:bg-sky-600 hover:text-white  
        ${pathName === path ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400' : ''}`}>
        {icon}
        <span className="group-hover:text-white-700">{title}</span>
      </Link>
    </li>
  )
}
