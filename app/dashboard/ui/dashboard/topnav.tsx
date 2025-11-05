'use client';

import { useState } from "react";
import { Sun, Moon, User, Bell, Menu, X } from "lucide-react";
import NavLinks from "./nav-links"; // ton composant de liens du dashboard
import LanguageSwitcher from "@/components/selects/ LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function TopNav({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [lang, setLang] = useState("EN");
    const [search, setSearch] = useState("");
    const [showNotifications, setShowNotifications] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { t } = useTranslation();

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    const notifications = [
        "Nouvelle facture payée",
        "Nouveau client ajouté",
        "Mise à jour du système",
    ];

    return (
        <nav className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 shadow-md sticky top-0 z-50">
            {/* Burger mobile */}
            <div className="flex items-center md:hidden">
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Recherche */}
            <div className="flex-1 flex justify-center md:justify-center mx-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-md rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 text-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>



            {/* Actions */}
            <div className="flex items-center gap-4 relative">
                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
                    >
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-1 ring-white" />
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                            <div className="p-4">
                                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                    Notifications
                                </h3>
                                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {notifications.map((notif, i) => (
                                        <li
                                            key={i}
                                            className="px-2 py-2 text-sm text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
                                        >
                                            {notif}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

                {/* Langue */}
                <LanguageSwitcher />
                {/* Theme */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
                >
                    {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </button>

                {/* Profil / compte */}
                <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white">
                    <User className="w-5 h-5" />
                </button>
            </div>

            {/* Mobile drawer menu */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 z-50 md:hidden ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <img src="/images/logo/logo.png" alt="Logo" className="h-15 w-15 rounded-full object-cover" />
                    <span className="text-lg font-bold text-gray-800 dark:text-white">Dashboard</span>
                    <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded bg-gray-100 dark:bg-gray-700">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-4 flex flex-col space-y-2">
                    <NavLinks showText={true} />
                </div>

            </div>

            {/* Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </nav>
    );
}
