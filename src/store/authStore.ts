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
    isLoading: boolean;
    login: (credentials: any) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => void;
    fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: false,
    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        // Backend returns { _id, name, email, role, token }
        const { _id, name, email, role, token } = response.data;
        localStorage.setItem('token', token);
        const user: User = { id: _id, name, email, role: role.toUpperCase() as User['role'] };
        set({ token, user, isAuthenticated: true });
    },
    register: async (data) => {
        const response = await api.post('/auth/register', data);
        const { _id, name, email, role, token } = response.data;
        localStorage.setItem('token', token);
        const user: User = { id: _id, name, email, role: role.toUpperCase() as User['role'] };
        set({ token, user, isAuthenticated: true });
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ token: null, user: null, isAuthenticated: false });
    },
    fetchUser: async () => {
        const token = get().token;
        if (!token) {
            set({ user: null, isAuthenticated: false });
            return;
        }
        try {
            set({ isLoading: true });
            const response = await api.get('/students/me');
            const { _id, name, email, role } = response.data;
            const user: User = { id: _id, name, email, role: role.toUpperCase() as User['role'] };
            set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            // Token is invalid or expired
            localStorage.removeItem('token');
            set({ token: null, user: null, isAuthenticated: false, isLoading: false });
        }
    },
}));
