import { Toaster } from '@/components/ui/sonner';
import '../globals.css';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex items-center justify-center">
           <Toaster />
                {/* Contenu login/register */}
                {children}
            
        </div>
    );
}
