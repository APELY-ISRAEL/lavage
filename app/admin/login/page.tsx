'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { apiClient } from '@/lib/api-client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const loginSchema = z.object({
    email: z.string().email({ message: "Email invalide" }),
    password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
});

export default function AdminLoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        try {
            const response = await apiClient.auth.login(values);

            // Check if user is actually an admin
            if (response.user.role !== 'ADMIN') {
                toast.error("Accès refusé", {
                    description: "Cette interface est réservée aux administrateurs.",
                });
                return;
            }

            toast.success("Connexion réussie ✅", {
                description: "Bienvenue dans l'interface d'administration !",
            });

            login(response.access_token, response.user);
            router.push('/dashboard/home'); // Redirect to admin dashboard
        } catch (error: any) {
            if (error.unverified) {
                toast.info("Vérification requise", {
                    description: "Votre email n'est pas encore vérifié.",
                });
                router.push(`/admin/verify-otp?email=${encodeURIComponent(error.email)}`);
                return;
            }

            toast.error("Erreur", {
                description: error.message || "Échec de la connexion.",
            });
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center px-4 bg-slate-50">
            <Form {...form}>
                <div className="w-full max-w-md space-y-4">
                    <Link href="/" className="flex items-center text-sm text-gray-500 hover:text-primary-75 transition-colors w-fit">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour à l'accueil
                    </Link>

                    <form
                        className="bg-white rounded-xl shadow-lg p-8 space-y-6 border-t-4 border-primary-200"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="flex flex-col items-center space-y-2 mb-4">
                            <div className="p-3 bg-primary-100/10 rounded-full">
                                <ShieldCheck className="h-8 w-8 text-primary-200" />
                            </div>
                            <h2 className="text-3xl font-bold text-primary-200 text-center">
                                Admin - Connexion
                            </h2>
                            <p className="text-gray-500 text-center text-sm">Espace d'administration sécurisé</p>
                        </div>

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Admin</FormLabel>
                                    <FormControl>
                                        <Input placeholder="admin@lavage.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mot de passe</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                                            >
                                                {showPassword ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-8.27-4.11-8.93-7a9.953 9.953 0 012.627-3.333M9.88 9.88a3 3 0 014.243 4.242M1 1l22 22" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="text-right">
                            <Link href="/admin/forgot-password" className="text-sm text-blue-600 hover:underline">
                                Mot de passe oublié ?
                            </Link>
                        </div>

                        <Button type="submit" className="w-full bg-primary-200 hover:bg-blue-600 text-white">
                            Se connecter
                        </Button>

                        <p className="text-sm text-center text-gray-500">
                            Nouveau gérant ?{" "}
                            <Link href="/admin/register" className="text-blue-600 hover:underline">
                                Créer un compte admin
                            </Link>
                        </p>
                    </form>
                </div>
            </Form>
        </div>
    );
}
