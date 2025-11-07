'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { HomeIcon, Cog6ToothIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

type NavLink = {
  name: string;
  href?: string;
  icon: React.ElementType;
  children?: NavLink[];
};

const links: NavLink[] = [
  { name: 'Dashboard', href: '/dashboard/home', icon: HomeIcon },
  {
    name: 'Gestion des abonements',
    icon: Cog6ToothIcon,
    children: [
      { name: 'Ajouter un type', href: '/dashboard/abonement/abonement', icon: HomeIcon },
      { name: 'Ajouter un abonement', href: '/dashboard/abonement/ajout', icon: HomeIcon },
      { name: 'Liste des abonnements', href: '/dashboard/abonement/liste', icon: HomeIcon },
    ],
  },
  {
    name: 'Gestion des tickets',
    icon: Cog6ToothIcon,
    children: [
      { name: 'Engin', href: '/dashboard/ticket/engin', icon: HomeIcon },
      { name: 'Ajouter un ticket', href: '/dashboard/ticket/ajout', icon: HomeIcon },
      { name: 'Liste des tickets', href: '/dashboard/ticket/liste', icon: HomeIcon },
    ],
  },
];

interface NavLinksProps {
  showText?: boolean;
}

export default function NavLinks({ showText = true }: NavLinksProps) {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  // Ouvrir automatiquement la section si un sous-lien est actif
  useEffect(() => {
    links.forEach((link) => {
      if (link.children?.some((child) => child.href === pathname)) {
        setOpenSections((prev) => ({ ...prev, [link.name]: true }));
      }
    });
  }, [pathname]);

  const toggleSection = (name: string) => {
    setOpenSections((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <nav className="flex flex-col gap-1">
      {links.map((link) => {
        const LinkIcon = link.icon;

        // Lien avec sous-liens
        if (link.children) {
          const isOpen = openSections[link.name] || false;
          const isParentActive = link.children.some((child) => child.href === pathname);

          return (
            <div key={link.name} className="flex flex-col gap-1">
              <button
                onClick={() => toggleSection(link.name)}
                className={clsx(
                  'flex items-center justify-between gap-2 p-3 rounded-md hover:bg-sky-100 hover:text-blue-600 transition-colors',
                  { 'bg-sky-100 text-blue-600': isParentActive }
                )}
              >
                <div className="flex items-center gap-2">
                  <LinkIcon className="w-6 h-6" />
                  {showText && <span className="font-medium">{link.name}</span>}
                </div>
                {isOpen ? (
                  <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {/* Sous-liens */}
              {isOpen && (
                <div className="flex flex-col ml-6 mt-1 gap-1">
                  {link.children.map((child) => {
                    const ChildIcon = child.icon;
                    const childActive = pathname === child.href;
                    return (
                      <Link
                        key={child.name}
                        href={child.href!}
                        className={clsx(
                          'flex items-center gap-2 p-2 rounded-md hover:bg-sky-100 hover:text-blue-600 transition-colors',
                          { 'bg-sky-100 text-blue-600': childActive }
                        )}
                      >
                        <ChildIcon className="w-4 h-4 text-gray-600" />
                        {showText && <span className="text-sm">{child.name}</span>}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }

        // Lien simple
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href!}
            className={clsx(
              'flex items-center gap-2 p-3 rounded-md hover:bg-sky-100 hover:text-blue-600 transition-colors',
              { 'bg-sky-100 text-blue-600': isActive }
            )}
          >
            <LinkIcon className="w-6 h-6" />
            {showText && <span className="font-medium">{link.name}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
