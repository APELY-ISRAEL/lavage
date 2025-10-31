"use client";

import BaseButton from "@/components/BaseButton";
import LanguageSwitcher from "@/components/selects/ LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/configs/site";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const NavbarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const pathname = usePathname();
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-white/30 backdrop-blur-lg px-4 text-primary-75 ">
      <div className="container mx-auto flex h-[4rem] items-center justify-between ">
        <div className="flex flex-col items-center justify-between gap-[6rem]">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={siteConfig.logo.src || "/placeholder.svg"}
              alt={siteConfig.logo.alt}
              width={siteConfig.logo.width}
              height={siteConfig.logo.height}
              className="h-8 w-auto md:h-8 lg:h-12 lg:w-auto"
            />

            <h1 className="text-3xl font-anektelugu-semibold text-primary-75">
              AutoLuxe
            </h1>
          </Link>
          
        </div>

        <nav className="hidden items-center space-x-4 md:flex  lg:space-x-12">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`font-anektelugu-regular text-black relative text-sm  transition-colors lg:text-base ${
                  isActive(link.href)
                    ? "after:bg-primary-75 after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-full"
                    : ""
                }`}>
                {t(`home.navbar.${link.label}`)}
              </Link>
            ))}
          </nav>

        {/* Right side items */}
        <div className="flex items-center space-x-3">
          {/* Desktop Navigation */}

          {/* {user.isAuthenticated ? ( */}
          {/* <div className="hidden items-center space-x-2 md:flex">
            <BaseButton
              isLink
              // href={
              //   ((user.user?.role_relation?.name === usersRoles[1] ||
              //     user.user?.role_relation?.name === usersRoles[2]) &&
              //     !!userSubs?.[0]) ||
              //   user.user?.role_relation?.name === usersRoles[3]
              //     ? '/account/dashboard'
              //     : '/account/meeting-type'
              // }
            >
              <span className="font-poppins-regular">{t('home.navbar.dashboardBtn')}</span>
            </BaseButton>
          </div> */}
          {/* ) : ( */}
          <div className="hidden items-center space-x-2 md:flex">
            <Link href="/login">
              <Button className="bg-primary-75 border border-black text-white hover:bg-primary-50 hover:text-white">
                {t("home.navbar.loginBtn")}
              </Button>
            </Link>
          </div>
          {/* )} */}

          <div className="flex items-center">
            <LanguageSwitcher />
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5">
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-4">
              <nav className="mt-8 flex flex-col gap-4">
                {siteConfig.navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-lg font-semibold ${
                      isActive(link.href)
                        ? "text-primary-500"
                        : "text-foreground"
                    }`}
                    onClick={() => setIsOpen(false)}>
                    {t(`home.navbar.${link.label}`)}
                  </Link>
                ))}
                <div className="bg-border my-4 h-px" />
                {/* {user.isAuthenticated ? ( */}
                <div className="block items-center space-x-2 md:hidden">
                  <BaseButton isLink>
                    <span className="font-poppins-regular">
                      {t("home.navbar.dashboardBtn")}
                    </span>
                  </BaseButton>
                </div>
                {/* ) : ( */}
                <div className="block items-center space-x-2 md:hidden">
                  {siteConfig.authLinks.map((link) => (
                    <BaseButton isLink key={link.label} href={link.href}>
                      <span className="font-poppins-regular">
                        {t("home.navbar.loginBtn")}
                      </span>
                    </BaseButton>
                  ))}
                </div>
                {/* )} */}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default NavbarComponent;