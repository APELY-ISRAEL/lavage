'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api-client';
import { useAuth } from '@/context/AuthContext';
import { ShieldAlert } from 'lucide-react';

function AdminVerifyOtpContent() {
    const router = useRouter();
    const { user, refreshUser } = useAuth();
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

    useEffect(() => {
        if (!email) {
            toast.error("Email manquant");
            router.push('/admin/login');
        }
    }, [email, router]);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();

        if (timeLeft <= 0) {
            toast.error("Le code a expiré.");
            return;
        }

        if (code.length !== 6) {
            toast.error("6 chiffres requis");
            return;
        }

        setIsLoading(true);
        try {
            await apiClient.auth.verifyOtp({ email, code });
            toast.success("Compte administrateur vérifié !");
            await refreshUser();
            router.push('/dashboard/home');
        } catch (error: any) {
            toast.error(error.message || "Code invalide");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        setIsResending(true);
        try {
            await apiClient.auth.resendOtp(email);
            toast.success("Nouveau code admin envoyé");
            setTimeLeft(600);
            setCode('');
        } catch (error: any) {
            toast.error(error.message || "Erreur lors de l'envoi");
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center px-4 bg-slate-50">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6 border-t-4 border-yellow-500">
                <div className="flex flex-col items-center space-y-2">
                    <div className="p-3 bg-yellow-100/20 rounded-full">
                        <ShieldAlert className="h-8 w-8 text-yellow-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 text-center">
                        Vérification Admin
                    </h2>
                </div>

                <p className="text-center text-gray-500 text-sm">
                    Saisie du code de sécurité envoyé à <br />
                    <span className="font-semibold text-gray-700">{email}</span>
                </p>

                <div className="text-center">
                    <p className={`text-sm font-medium ${timeLeft <= 60 ? 'text-red-500 animate-pulse' : 'text-gray-600'}`}>
                        {timeLeft > 0
                            ? `Expire dans ${formatTime(timeLeft)}`
                            : "Code expiré"}
                    </p>
                </div>

                <form onSubmit={handleVerify} className="space-y-6">
                    <Input
                        type="text"
                        placeholder="000000"
                        value={code}
                        onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="text-center text-2xl tracking-widest font-bold h-14"
                        disabled={timeLeft <= 0}
                        required
                    />

                    <Button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                        disabled={isLoading || timeLeft <= 0}
                    >
                        {isLoading ? "Vérification..." : "Vérifier l'identité admin"}
                    </Button>
                </form>

                <div className="text-center">
                    <button
                        onClick={handleResend}
                        disabled={isResending}
                        className="text-sm text-blue-600 hover:underline disabled:text-gray-400"
                    >
                        {isResending ? "Envoi..." : "Renvoyer le code de sécurité"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function AdminVerifyOtpPage() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <AdminVerifyOtpContent />
        </Suspense>
    );
}
