const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const apiClient = {
    async request(endpoint: string, options: RequestInit = {}) {
        const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            ...options.headers,
        };

        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
        });

        const data = await response.json();

        if (!response.ok) {
            throw { status: response.status, ...data };
        }

        return data;
    },

    auth: {
        register: (data: any) => apiClient.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
        adminRegister: (data: any) => apiClient.request('/auth/admin/register', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
        login: (data: any) => apiClient.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
        verifyOtp: (data: { email: string, code: string }) => apiClient.request('/auth/verify-otp', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
        resendOtp: (email: string) => apiClient.request('/auth/resend-otp', {
            method: 'POST',
            body: JSON.stringify({ email }),
        }),
        forgotPassword: (email: string) => apiClient.request('/auth/forgot-password', {
            method: 'POST',
            body: JSON.stringify({ email }),
        }),
        resetPassword: (data: any) => apiClient.request('/auth/reset-password', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
        updateProfile: (data: any) => apiClient.request('/auth/profile', {
            method: 'PUT',
            body: JSON.stringify(data),
        }),
        logout: () => apiClient.request('/auth/logout', {
            method: 'POST',
        }),
        getUser: () => apiClient.request('/auth/user'),
    }
};
