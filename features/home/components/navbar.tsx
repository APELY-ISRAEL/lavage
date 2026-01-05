"use client";

import BaseButton from "@/components/BaseButton";
import LanguageSwitcher from "@/components/selects/ LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/configs/site";
import { Moon, Sun } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings } from "lucide-react";

const NavbarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const pathname = usePathname();
  const { user, logout, isLoading } = useAuth();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
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
              className={`font-anektelugu-regular text-black relative text-sm  transition-colors lg:text-base ${isActive(link.href)
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

          <button
            onClick={toggleTheme}
            className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          <div className="hidden items-center space-x-2 md:flex">
            {!isLoading && (
              user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full bg-primary-75/10 text-primary-75 hover:bg-primary-75 hover:text-white">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.prenom} {user.nom}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>{t("home.navbar.profile")}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-600 focus:text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t("home.navbar.logout")}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <Button className="bg-primary-75 border border-black text-white hover:bg-primary-50 hover:text-white">
                    {t("home.navbar.loginBtn")}
                  </Button>
                </Link>
              )
            )}
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
                    className={`text-lg font-semibold ${isActive(link.href)
                      ? "text-primary-500"
                      : "text-foreground"
                      }`}
                    onClick={() => setIsOpen(false)}>
                    {t(`home.navbar.${link.label}`)}
                  </Link>
                ))}
                <div className="bg-border my-4 h-px" />
                {!isLoading && (
                  user ? (
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3 px-2 py-2">
                        <div className="h-10 w-10 rounded-full bg-primary-75/10 flex items-center justify-center text-primary-75">
                          <User className="h-6 w-6" />
                        </div>
                        <div className="flex flex-col">
                          <p className="text-sm font-semibold">{user.prenom} {user.nom}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <Link
                        href="/profile"
                        className="text-lg font-semibold text-foreground flex items-center"
                        onClick={() => setIsOpen(false)}
                      >
                        <Settings className="mr-2 h-5 w-5" />
                        {t("home.navbar.profile")}
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                        className="text-lg font-semibold text-red-600 flex items-center text-left"
                      >
                        <LogOut className="mr-2 h-5 w-5" />
                        {t("home.navbar.logout")}
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <Link
                        href="/login"
                        className="text-lg font-semibold text-foreground"
                        onClick={() => setIsOpen(false)}
                      >
                        {t("home.navbar.loginBtn")}
                      </Link>
                      <Link
                        href="/register"
                        className="text-lg font-semibold text-foreground"
                        onClick={() => setIsOpen(false)}
                      >
                        S'inscrire
                      </Link>
                    </div>
                  )
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default NavbarComponent;