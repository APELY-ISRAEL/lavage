'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { PhoneInput } from '@/components/phone-input';
import { apiClient } from '@/lib/api-client';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

// ✅ Schema de validation
const registerSchema = z
    .object({
        nom: z.string().min(1, "Le prénom est requis"),
        prenom: z.string().min(1, "Le nom est requis"),
        adresse: z.string().min(1, "L'adresse est requise"),
        phone: z.string().min(1, "Le téléphone est requis"),
        email: z.string().email("Email invalide"),
        password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
        confirmPassword: z.string().min(8, "La confirmation est requise"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Les mots de passe ne correspondent pas",
        path: ["confirmPassword"],
    });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AdminRegisterPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            nom: '',
            prenom: '',
            adresse: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    async function onSubmit(values: RegisterFormValues) {
        setIsLoading(true);

        try {
            // Appel API Laravel pour inscription admin
            const response = await apiClient.auth.adminRegister({
                nom: values.nom,
                prenom: values.prenom,
                adresse: values.adresse,
                phone: values.phone,
                email: values.email,
                password: values.password,
            });

            toast.success("Inscription administrateur réussie ! Veuillez vérifier votre email.");

            // Stocker le token et l'utilisateur
            login(response.access_token, response.user);

            // Rediriger vers la page de vérification OTP admin
            router.push(`/admin/verify-otp?email=${encodeURIComponent(values.email)}`);
        } catch (err: any) {
            const errorMessage = err.error || "Une erreur est survenue lors de l'inscription";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center px-4 py-12 bg-slate-50">
            <Form {...form}>
                <div className="w-full max-w-2xl space-y-4">
                    <Link href="/" className="flex items-center text-sm text-gray-500 hover:text-primary-75 transition-colors w-fit">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour à l'accueil
                    </Link>

                    <form
                        className="bg-white rounded-xl shadow-lg p-10 space-y-6 border-t-4 border-primary-200"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="flex flex-col items-center space-y-2 mb-6">
                            <div className="p-3 bg-primary-100/10 rounded-full">
                                <ShieldCheck className="h-8 w-8 text-primary-200" />
                            </div>
                            <h2 className="text-3xl font-bold text-primary-200 text-center">
                                Administration - Inscription
                            </h2>
                            <p className="text-gray-500 text-center">Créer un compte administrateur</p>
                        </div>

                        {/* Nom et Prénom */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="nom"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nom</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nom" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="prenom"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Prénom</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Prénom" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Adresse et Téléphone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="adresse"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Adresse</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Adresse complète" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Téléphone</FormLabel>
                                        <FormControl>
                                            <PhoneInput
                                                value={field.value}
                                                onChange={(value) => field.onChange(value)}
                                                placeholder="+228 00 00 00"
                                                className="w-full rounded-lg focus:outline-none focus:border-primary-50 transition-colors"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Email */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Professionnel</FormLabel>
                                    <FormControl>
                                        <Input placeholder="admin@lavage.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Mot de passe et confirmation */}
                            {/* Mot de passe */}
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
                                                    placeholder="Mot de passe"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                                                >
                                                    {showPassword ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

                            {/* Confirmation */}
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirmer le mot de passe</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    placeholder="Confirmez"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                                                >
                                                    {showConfirmPassword ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                        </div>

                        <Button type="submit" className="w-full bg-primary-200 hover:bg-blue-600 text-white" disabled={isLoading}>
                            {isLoading ? "Chargement..." : "S'inscrire comme Administrateur"}
                        </Button>

                        <p className="text-sm text-center text-gray-500">
                            Déjà un compte admin ?{' '}
                            <Link href="/admin/login" className="text-blue-600 hover:underline">
                                Se connecter
                            </Link>
                        </p>
                    </form>
                </div>
            </Form>
        </div>
    );
}
