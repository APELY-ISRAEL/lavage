'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner"; // ✅ Import Sonner
import { ArrowLeft } from "lucide-react";

// ✅ Schema en dehors du composant
const loginSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
});

import { apiClient } from '@/lib/api-client';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
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

      toast.success("Connexion réussie ✅", {
        description: "Bienvenue !",
      });

      login(response.access_token, response.user);
      router.push('/');
    } catch (error: any) {
      if (error.unverified) {
        toast.info("Vérification requise", {
          description: "Votre email n'est pas encore vérifié.",
        });
        router.push(`/verify-otp?email=${encodeURIComponent(error.email)}`);
        return;
      }

      toast.error("Erreur", {
        description: error.message || "Échec de la connexion.",
      });
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <Form {...form}>
        <div className="w-full max-w-md space-y-4">
          <Link href="/" className="flex items-center text-sm text-gray-500 hover:text-primary-75 transition-colors w-fit">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'accueil
          </Link>

          <form
            className="bg-white rounded-xl shadow-lg p-8 space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* <div className="flex justify-start">
            <img
              src="/images/logo/logo.png"
              alt="Logo de la lavage"
              width={90}
              height={90}
              className="rounded-full"
            />
          </div> */}

            <h2 className="text-3xl font-bold text-primary-200 text-center">
              Connexion
            </h2>

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Entrez votre email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
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
                        placeholder="Entrez votre mot de passe"
                        {...field}
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          // ✅ Icône œil ouvert (comme avant)
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        ) : (
                          // ✅ Icône œil barré (comme avant)
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-8.27-4.11-8.93-7a9.953 9.953 0 012.627-3.333M9.88 9.88a3 3 0 014.243 4.242M1 1l22 22"
                            />
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
              <Link href="/forgot-password" name="forgot-password" id="forgot-password-link" className="text-sm text-blue-600 hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>

            <Button type="submit" className="w-full bg-primary-200 hover:bg-blue-600 text-white">
              Se connecter
            </Button>

            <p className="text-sm text-center text-gray-500">
              Pas de compte ?{" "}
              <Link href="/register" className="text-blue-600 hover:underline">
                S'inscrire
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </div>
  );
}
