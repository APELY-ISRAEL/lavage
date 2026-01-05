'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient } from '@/lib/api-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface User {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    phone: string | null;
    adresse: string | null;
    role: string;
    language: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (token: string, user: User) => void;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const refreshUser = async () => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            setUser(null);
            setIsLoading(false);
            return;
        }

        try {
            const userData = await apiClient.auth.getUser();
            setUser(userData);
        } catch (error) {
            console.error('Failed to fetch user:', error);
            localStorage.removeItem('auth_token');
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refreshUser();
    }, []);

    const login = (token: string, userData: User) => {
        localStorage.setItem('auth_token', token);
        setUser(userData);
    };

    const logout = async () => {
        try {
            await apiClient.auth.logout();
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            localStorage.removeItem('auth_token');
            setUser(null);
            toast.success("Déconnexion réussie", {
                description: "À bientôt !"
            });
            router.push('/');
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
