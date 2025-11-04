'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { HomeIcon, UserIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

type NavLink = {
  name: string;
  href: string;
  icon: React.ElementType;
};

const links: NavLink[] = [
  { name: 'Dashboard', href: '/dashboard/home', icon: HomeIcon },
  { name: 'Users', href: '/dashboard/users', icon: UserIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
];

interface NavLinksProps {
  showText?: boolean;
}

export default function NavLinks({ showText = false }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            {(showText || window.innerWidth >= 768) && (
              <span className="md:block">{link.name}</span>
            )}
          </Link>
        );
      })}
    </>
  );
}
