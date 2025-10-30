interface Logo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface NavLink {
  label: string;
  href: string;
}

interface AuthLink {
  label: string;
  href: string;
  className: string;
}

interface HeroImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}



export interface SiteConfig {
  name: string;
  description: string;
  logo: Logo;
  navLinks: NavLink[];
  authLinks: AuthLink[];
}