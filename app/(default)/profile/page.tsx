'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiClient } from '@/lib/api-client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PhoneInput } from '@/components/phone-input';
import { User, Mail, MapPin, Phone, Shield, Save, Loader2 } from 'lucide-react';

export default function ProfilePage() {
    const { user, refreshUser, isLoading: isAuthLoading } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        phone: '',
        adresse: '',
        password: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                nom: user.nom || '',
                prenom: user.prenom || '',
                email: user.email || '',
                phone: user.phone || '',
                adresse: user.adresse || '',
                password: '',
            });
        }
    }, [user]);

    if (isAuthLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary-75" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <p>Veuillez vous connecter pour voir votre profil.</p>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await apiClient.auth.updateProfile(formData);
            await refreshUser();
            toast.success("Profil mis à jour avec succès");
            setFormData(prev => ({ ...prev, password: '' }));
        } catch (error: any) {
            toast.error(error.message || "Erreur lors de la mise à jour du profil");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-24 px-4 max-w-4xl">
            <h1 className="text-4xl font-bold text-primary-200 mb-8">Mon Compte</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* User Summary Card */}
                <Card className="md:col-span-1 shadow-md border-none bg-primary-75/5">
                    <CardHeader className="text-center">
                        <div className="mx-auto bg-primary-75 text-white h-20 w-20 rounded-full flex items-center justify-center mb-4">
                            <span className="text-3xl font-bold">
                                {user.prenom[0].toUpperCase()}{user.nom[0].toUpperCase()}
                            </span>
                        </div>
                        <CardTitle className="text-xl">{user.prenom} {user.nom}</CardTitle>
                        <CardDescription>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-75/20 text-primary-75">
                                {user.role}
                            </span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-0">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Mail className="h-4 w-4 text-primary-75" />
                            <span className="truncate">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Phone className="h-4 w-4 text-primary-75" />
                            <span>{user.phone || 'Non renseigné'}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <MapPin className="h-4 w-4 text-primary-75" />
                            <span>{user.adresse || 'Non renseingé'}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Edit Form Card */}
                <Card className="md:col-span-2 shadow-lg border-none">
                    <CardHeader>
                        <CardTitle>Informations Personnelles</CardTitle>
                        <CardDescription>Mettez à jour vos coordonnées et votre mot de passe.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="prenom">Prénom</Label>
                                    <Input
                                        id="prenom"
                                        value={formData.prenom}
                                        onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nom">Nom</Label>
                                    <Input
                                        id="nom"
                                        value={formData.nom}
                                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Téléphone</Label>
                                <PhoneInput
                                    value={formData.phone}
                                    onChange={(value) => setFormData({ ...formData, phone: value })}
                                    placeholder="+228 00 00 00 00"
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="adresse">Adresse</Label>
                                <Input
                                    id="adresse"
                                    value={formData.adresse}
                                    onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="pt-4 border-t">
                                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                                    <Shield className="h-4 w-4" />
                                    Sécurité (Laissez vide pour conserver l'actuel)
                                </h3>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Nouveau mot de passe</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="Min. 8 caractères"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-primary-75 hover:bg-primary-50 text-white"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Mise à jour...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        Enregistrer les modifications
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
