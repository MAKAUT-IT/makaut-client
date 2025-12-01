import { create } from 'zustand';
import api from '../lib/api';

interface User {
    id: string;
    email: string;
    name: string;
    role: 'STUDENT' | 'FACULTY' | 'ADMIN';
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (credentials: any) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        set({ token, user, isAuthenticated: true });
    },
    register: async (data) => {
        const response = await api.post('/auth/register', data);
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        set({ token, user, isAuthenticated: true });
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ token: null, user: null, isAuthenticated: false });
    },
}));
