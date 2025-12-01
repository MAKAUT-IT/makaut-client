import { useAuthStore } from '../store/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Link } from 'react-router-dom';
import { Bell, Calendar, BookOpen, Users } from 'lucide-react';

interface Notice {
    id: string;
    title: string;
    category: string;
    isPinned: boolean;
    createdAt: string;
}

export default function DashboardPage() {
    const { user } = useAuthStore();
    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const response = await api.get('/notices');
            setNotices(response.data.slice(0, 5)); // Get latest 5 notices
        } catch (error) {
            console.error('Failed to fetch notices:', error);
        } finally {
            setLoading(false);
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'URGENT':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'ACADEMIC':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'EVENTS':
                return 'bg-green-100 text-green-800 border-green-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div>
                <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
                <p className="text-gray-600 mt-1">
                    {user?.role === 'STUDENT' && 'Here\'s what\'s happening in your courses'}
                    {user?.role === 'FACULTY' && 'Manage your classes and students'}
                    {user?.role === 'ADMIN' && 'Department overview and management'}
                </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-2 border-black">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Notices</CardTitle>
                        <Bell className="h-4 w-4 text-gray-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{notices.length}</div>
                        <p className="text-xs text-gray-600">Active announcements</p>
                    </CardContent>
                </Card>

                <Card className="border-2 border-black">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Events</CardTitle>
                        <Calendar className="h-4 w-4 text-gray-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-gray-600">Upcoming this month</p>
                    </CardContent>
                </Card>

                <Card className="border-2 border-black">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            {user?.role === 'STUDENT' ? 'Courses' : 'Classes'}
                        </CardTitle>
                        <BookOpen className="h-4 w-4 text-gray-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-gray-600">
                            {user?.role === 'STUDENT' ? 'Enrolled' : 'Teaching'}
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-2 border-black">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            {user?.role === 'ADMIN' ? 'Users' : 'Attendance'}
                        </CardTitle>
                        <Users className="h-4 w-4 text-gray-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-gray-600">
                            {user?.role === 'ADMIN' ? 'Total users' : 'This semester'}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Notices */}
            <Card className="border-2 border-black">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Recent Notices</CardTitle>
                    <Link to="/notices" className="text-sm font-medium hover:underline">
                        View All →
                    </Link>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <p className="text-gray-600 text-center py-4">Loading notices...</p>
                    ) : notices.length === 0 ? (
                        <p className="text-gray-600 text-center py-4">No notices yet</p>
                    ) : (
                        <div className="space-y-3">
                            {notices.map((notice) => (
                                <div
                                    key={notice.id}
                                    className="flex items-start justify-between p-3 border border-gray-200 rounded hover:bg-gray-50"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            {notice.isPinned && (
                                                <span className="text-xs font-bold">📌</span>
                                            )}
                                            <h4 className="font-medium">{notice.title}</h4>
                                        </div>
                                        <p className="text-xs text-gray-600 mt-1">
                                            {new Date(notice.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span
                                        className={`text-xs px-2 py-1 rounded border ${getCategoryColor(
                                            notice.category
                                        )}`}
                                    >
                                        {notice.category}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Role-Specific Section */}
            {user?.role === 'STUDENT' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-2 border-black">
                        <CardHeader>
                            <CardTitle>Upcoming Classes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 text-center py-4">
                                No classes scheduled
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-black">
                        <CardHeader>
                            <CardTitle>Pending Assignments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 text-center py-4">
                                No pending assignments
                            </p>
                        </CardContent>
                    </Card>
                </div>
            )}

            {user?.role === 'FACULTY' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-2 border-black">
                        <CardHeader>
                            <CardTitle>Today's Classes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 text-center py-4">
                                No classes today
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-black">
                        <CardHeader>
                            <CardTitle>Pending Grading</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 text-center py-4">
                                No submissions to grade
                            </p>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
