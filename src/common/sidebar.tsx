'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SIDENAV_ITEMS: any[] = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Projects',
    path: '/projects',
    submenu: true,
    subMenuItems: [
      { title: 'All', path: '/projects' },
      { title: 'Web Design', path: '/projects/web-design' },
      { title: 'Graphic Design', path: '/projects/graphic-design' },
    ],
  },
  {
    title: 'Messages',
    path: '/messages',
   
  },
  {
    title: 'Settings',
    path: '/settings',
  },
  {
    title: 'Help',
    path: '/help',
    
  },
];

const SideNav = () => {
  return (
    <div className="md:w-60 bg-white h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex">
      <div className="flex flex-col space-y-6 w-full">
        <Link
          href="/"
          className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b border-zinc-200 h-12 w-full"
        >
          <span className="h-7 w-7 bg-zinc-300 rounded-lg" />
          <span className="font-bold text-xl hidden md:flex">Logo</span>
        </Link>

        <div className="flex flex-col space-y-2  md:px-6 ">
          {SIDENAV_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item }: { item: any }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between hover:bg-zinc-100 ${
              pathname.includes(item.path) ? 'bg-zinc-100' : ''
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span className="font-semibold text-xl  flex">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? 'rotate-180' : ''} flex`}>
              v
            </div>
          </button>
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100 ${
            item.path === pathname ? 'bg-zinc-100' : ''
          }`}
        >
          {item.icon}
          <span className="font-semibold text-xl flex">{item.title}</span>
        </Link>
      )}
    </div>
  );
};