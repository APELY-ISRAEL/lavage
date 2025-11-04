import { anektelugu } from '@/lib/fonts';
import '../globals.css';
import SideNav from './ui/dashboard/sidenav';
import Footer from './ui/dashboard/footer';
import TopNav from './ui/dashboard/topnav';

export default function DashbLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <aside className="hidden md:flex flex-none w-64 border-r border-gray-200 dark:border-gray-700">
                <SideNav />
            </aside>

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Top Navigation */}
                <header className="flex-none">
                    <TopNav />
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-6 md:p-12">
                    {children}
                </main>

                {/* Footer fixe en bas du contenu */}
                <footer className="flex-none">
                    <Footer />
                </footer>
            </div>
        </div>
    );
}
