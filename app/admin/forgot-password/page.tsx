'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { apiClient } from '@/lib/api-client';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

const forgotPasswordSchema = z.object({
    email: z.string().email({ message: "Email invalide" }),
});

const resetPasswordSchema = z.object({
    email: z.string().email(),
    code: z.string().length(6, { message: "Le code doit contenir 6 chiffres" }),
    password: z.string().min(8, { message: "Minimum 8 caractères" }),
    password_confirmation: z.string(),
}).refine(data => data.password === data.password_confirmation, {
    message: "Les mots de passe ne correspondent pas",
    path: ["password_confirmation"],
});

export default function AdminForgotPasswordPage() {
    const router = useRouter();
    const [step, setStep] = useState(1); // 1: request, 2: reset
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

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

    const requestForm = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: { email: "" },
    });

    const resetForm = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { email: "", code: "", password: "", password_confirmation: "" },
    });

    async function onRequestSubmit(values: z.infer<typeof forgotPasswordSchema>) {
        setIsLoading(true);
        try {
            await apiClient.auth.forgotPassword(values.email);
            setEmail(values.email);
            resetForm.setValue('email', values.email);
            setStep(2);
            setTimeLeft(600);
            toast.success("Code de réinitialisation admin envoyé !");
        } catch (error: any) {
            toast.error(error.message || "Erreur lors de l'envoi");
        } finally {
            setIsLoading(false);
        }
    }

    async function onResetSubmit(values: z.infer<typeof resetPasswordSchema>) {
        setIsLoading(true);
        try {
            await apiClient.auth.resetPassword(values);
            toast.success("Mot de passe admin réinitialisé !");
            router.push('/admin/login');
        } catch (error: any) {
            toast.error(error.message || "Code invalide");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center px-4 bg-slate-50">
            <div className="w-full max-w-md space-y-4">
                <Link href="/admin/login" className="flex items-center text-sm text-gray-500 hover:text-primary-75 transition-colors w-fit">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour à la connexion
                </Link>

                <div className="bg-white rounded-xl shadow-lg p-8 space-y-6 border-t-4 border-red-500">
                    <div className="flex flex-col items-center space-y-2">
                        <div className="p-3 bg-red-100/20 rounded-full">
                            <ShieldAlert className="h-8 w-8 text-red-500" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 text-center">
                            {step === 1 ? "Récupération Admin" : "Nouveau MDP Admin"}
                        </h2>
                    </div>

                    {step === 1 ? (
                        <Form {...requestForm}>
                            <form onSubmit={requestForm.handleSubmit(onRequestSubmit)} className="space-y-6">
                                <FormField
                                    control={requestForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Administrateur</FormLabel>
                                            <FormControl>
                                                <Input placeholder="admin@lavage.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white" disabled={isLoading}>
                                    {isLoading ? "Envoi..." : "Envoyer le code de secours"}
                                </Button>
                            </form>
                        </Form>
                    ) : (
                        <Form {...resetForm}>
                            <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-4">
                                <p className="text-sm text-center text-gray-500">Code envoyé à {email}</p>

                                <div className="text-center">
                                    <p className={`text-xs font-medium ${timeLeft <= 60 ? 'text-red-500 animate-pulse' : 'text-gray-600'}`}>
                                        {timeLeft > 0 ? `Le code expire dans ${formatTime(timeLeft)}` : "Le code a expiré"}
                                    </p>
                                </div>

                                <FormField
                                    control={resetForm.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Code Secret</FormLabel>
                                            <FormControl>
                                                <Input placeholder="000000" {...field} className="text-center tracking-widest text-xl font-bold" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={resetForm.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nouveau mot de passe</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="••••••••" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={resetForm.control}
                                    name="password_confirmation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirmation</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="••••••••" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white" disabled={isLoading || timeLeft <= 0}>
                                    {isLoading ? "Modification..." : "Réinitialiser l'accès"}
                                </Button>
                            </form>
                        </Form>
                    )}
                </div>
            </div>
        </div>
    );
}
