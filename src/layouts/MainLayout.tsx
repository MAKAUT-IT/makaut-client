import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function MainLayout() {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-white">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r-2 border-black hidden md:block">
                <div className="p-6 border-b-2 border-black">
                    <h1 className="text-2xl font-bold">College Portal</h1>
                </div>
                <nav className="mt-6">
                    <Link
                        to="/dashboard"
                        className="block px-6 py-3 text-black hover:bg-gray-100 border-l-4 border-transparent hover:border-black transition-all"
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/notices"
                        className="block px-6 py-3 text-black hover:bg-gray-100 border-l-4 border-transparent hover:border-black transition-all"
                    >
                        Notices
                    </Link>
                    <Link
                        to="/courses"
                        className="block px-6 py-3 text-black hover:bg-gray-100 border-l-4 border-transparent hover:border-black transition-all"
                    >
                        Courses
                    </Link>
                    <Link
                        to="/schedule"
                        className="block px-6 py-3 text-black hover:bg-gray-100 border-l-4 border-transparent hover:border-black transition-all"
                    >
                        Schedule
                    </Link>
                    <Link
                        to="/gallery"
                        className="block px-6 py-3 text-black hover:bg-gray-100 border-l-4 border-transparent hover:border-black transition-all"
                    >
                        Gallery
                    </Link>
                    <Link
                        to="/students"
                        className="block px-6 py-3 text-black hover:bg-gray-100 border-l-4 border-transparent hover:border-black transition-all"
                    >
                        Students
                    </Link>
                    <Link
                        to="/announcements"
                        className="block px-6 py-3 text-black hover:bg-gray-100 border-l-4 border-transparent hover:border-black transition-all"
                    >
                        Announcements
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Navbar */}
                <header className="flex items-center justify-between px-6 py-4 bg-white border-b-2 border-black">
                    <div className="flex items-center">
                        <h2 className="text-xl font-semibold">Dashboard</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">{user?.role}</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-10 rounded-full border-2 border-black">
                                    <Avatar className="h-10 w-10">
                                        <AvatarFallback className="bg-black text-white font-bold">
                                            {user?.name?.charAt(0) || 'U'}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 border-2 border-black" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                                        <p className="text-xs leading-none text-gray-600">
                                            {user?.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-black" />
                                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
