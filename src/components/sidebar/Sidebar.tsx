import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CiLogout } from 'react-icons/ci';
import { SidebarItem } from './SidebarItem';
import { IoBasketOutline, IoCalendarOutline, IoCheckboxOutline, IoListOutline, IoPersonOutline } from 'react-icons/io5';
import { PiCookie } from 'react-icons/pi';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { SessionButton } from '..';

const menuItems = [
  {
    path: '/dashboard',
    icon: <IoCalendarOutline size={30} />,
    title: 'Dashboard',
  },
  {
    path: '/dashboard/rest-todos',
    icon: <IoCheckboxOutline size={30} />,
    title: 'Tareas',
  },
  {
    path: '/dashboard/server-todos',
    icon: <IoListOutline size={30} />,
    title: 'Server Actions',
  },
  {
    path: '/dashboard/cookies',
    icon: <PiCookie size={30} />,
    title: 'Cookies',
  },
  {
    path: '/dashboard/products',
    icon: <IoBasketOutline size={30} />,
    title: 'Productos',
  },
  {
    path: '/dashboard/profile',
    icon: <IoPersonOutline size={30} />,
    title: 'Perfil',
  },
]

export const Sidebar = async () => {

  const session = await getServerSession(authOptions);
  const userName = session?.user?.name ?? 'Usuario';
  const userPhoto = session?.user?.image ?? 'https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp';
  const userRoles = session?.user?.roles ?? ['client'];

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="/dashboard" title="home">
            <Image src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              className="w-32"
              width={150}
              height={150}
              alt="tailus logo"
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image src={userPhoto}
            alt=""
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            width={100}
            height={100}
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{userName}</h5>
          <span className="hidden text-gray-400 lg:block capitalize">{userRoles.join(',')}</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {
            menuItems.map(({ title, path, icon }) => (
              <SidebarItem key={path} title={title} icon={icon} path={path} />
            ))
          }
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <SessionButton />
      </div>
    </aside>
  )
}
