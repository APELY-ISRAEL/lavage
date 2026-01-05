'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api-client';
import { useAuth } from '@/context/AuthContext';

function VerifyOtpContent() {
    const router = useRouter();
    const { user, refreshUser } = useAuth();
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

    useEffect(() => {
        if (!email) {
            toast.error("Email manquant");
            router.push('/login');
        }
    }, [email, router]);

    // Timer logic
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
            toast.error("Le code a expiré. Veuillez en demander un nouveau.");
            return;
        }

        if (code.length !== 6) {
            toast.error("Le code doit contenir 6 chiffres");
            return;
        }

        setIsLoading(true);
        try {
            await apiClient.auth.verifyOtp({ email, code });
            toast.success("Email vérifié avec succès !");
            await refreshUser();
            router.push('/');
        } catch (error: any) {
            toast.error(error.message || "Code invalide ou expiré");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        setIsResending(true);
        try {
            await apiClient.auth.resendOtp(email);
            toast.success("Un nouveau code a été envoyé");
            setTimeLeft(600); // Reset timer
            setCode(''); // Clear code input
        } catch (error: any) {
            toast.error(error.message || "Erreur lors de l'envoi du code");
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
                <h2 className="text-3xl font-bold text-primary-200 text-center">
                    Vérification OTP
                </h2>
                <p className="text-center text-gray-500">
                    Entrez le code à 6 chiffres envoyé à <br />
                    <span className="font-semibold text-gray-700">{email}</span>
                </p>

                <div className="text-center">
                    <p className={`text-sm font-medium ${timeLeft <= 60 ? 'text-red-500 animate-pulse' : 'text-gray-600'}`}>
                        {timeLeft > 0
                            ? `Le code expire dans ${formatTime(timeLeft)}`
                            : "Le code a expiré"}
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
                        className="w-full bg-primary-200 hover:bg-blue-600 text-white"
                        disabled={isLoading || timeLeft <= 0}
                    >
                        {isLoading ? "Vérification..." : "Vérifier le code"}
                    </Button>
                </form>

                <div className="text-center">
                    <button
                        onClick={handleResend}
                        disabled={isResending}
                        className="text-sm text-blue-600 hover:underline disabled:text-gray-400"
                    >
                        {isResending ? "Envoi..." : "Renvoyer le code"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function VerifyOtpPage() {
    return (
        <Suspense fallback={<div>Chargement...</div>}>
            <VerifyOtpContent />
        </Suspense>
    );
}
