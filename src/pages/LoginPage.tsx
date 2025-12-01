import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await login({ email, password });
            navigate('/dashboard');
        } catch (error: any) {
            console.error('Login failed', error);
            setError(error.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <Card className="w-full max-w-md border-2 border-black shadow-none">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Login</CardTitle>
                    <CardDescription className="text-gray-600">
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 text-sm bg-red-50 border border-red-200 text-red-800 rounded">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="student@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="border-black"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="border-black"
                            />
                        </div>
                        <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
                            Login
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-center border-t border-gray-200 pt-4">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-black font-medium underline hover:no-underline">
                            Register
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
