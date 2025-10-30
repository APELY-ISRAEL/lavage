import { SiteConfig } from '@/types/siteConfig';


export const siteConfig: SiteConfig = {
  name: 'Lavage-Auto',
  description:
    'Lavage Auto pour vos service de lavage auto a domicile',
  logo: {
    src: '/images/logo/logo.png',
    alt: 'Logo',
    width: 120,
    height: 48,
  },
  navLinks: [
    { label: 'link1', href: '/' },
    { label: 'link2', href: '/nos-formations' },
      { label: 'link3', href: '/notre-equipe' },
      { label: 'link4', href: '/contactez-nous' },
  ],
  authLinks: [
    {
      label: 'Se connecter',
      href: '/login',
      className: `bg-black text-white transition py-2 px-4 rounded-3xl text-[0.8rem] md:text-[0.8rem] lg:text-[1rem] hover:bg-primary-500 font-kantumruy-regular text-center`,
    },
  ],
  
};