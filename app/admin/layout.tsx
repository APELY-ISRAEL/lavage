import { Toaster } from '@/components/ui/sonner';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen">
            <Toaster />
            {children}
        </div>
    );
}
