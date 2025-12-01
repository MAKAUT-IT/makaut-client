import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import api from '../lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Pin, Edit, Trash2 } from 'lucide-react';

interface Notice {
    id: string;
    title: string;
    content: string;
    category: string;
    isPinned: boolean;
    createdAt: string;
    author: {
        id: string;
        name: string;
        role: string;
    };
}

export default function NoticesPage() {
    const { user } = useAuthStore();
    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>('ALL');

    const canCreateNotice = user?.role === 'FACULTY' || user?.role === 'ADMIN';

    useEffect(() => {
        fetchNotices();
    }, [filter]);

    const fetchNotices = async () => {
        try {
            const url = filter === 'ALL' ? '/notices' : `/notices?category=${filter}`;
            const response = await api.get(url);
            setNotices(response.data);
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

    const categories = ['ALL', 'ACADEMIC', 'EVENTS', 'URGENT', 'GENERAL'];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Notice Board</h1>
                    <p className="text-gray-600 mt-1">
                        Stay updated with department announcements
                    </p>
                </div>
                {canCreateNotice && (
                    <Button className="bg-black text-white hover:bg-gray-800">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Notice
                    </Button>
                )}
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setFilter(category)}
                        className={`px-4 py-2 rounded border-2 transition-all ${filter === category
                                ? 'bg-black text-white border-black'
                                : 'bg-white text-black border-gray-300 hover:border-black'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Notices List */}
            {loading ? (
                <div className="text-center py-12">
                    <p className="text-gray-600">Loading notices...</p>
                </div>
            ) : notices.length === 0 ? (
                <Card className="border-2 border-black">
                    <CardContent className="text-center py-12">
                        <p className="text-gray-600">No notices found</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {notices.map((notice) => (
                        <Card
                            key={notice.id}
                            className={`border-2 ${notice.isPinned ? 'border-black bg-gray-50' : 'border-gray-300'
                                }`}
                        >
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            {notice.isPinned && (
                                                <Pin className="h-4 w-4 text-black" />
                                            )}
                                            <CardTitle className="text-xl">{notice.title}</CardTitle>
                                        </div>
                                        <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                                            <span>By {notice.author.name}</span>
                                            <span>•</span>
                                            <span>
                                                {new Date(notice.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                            <span
                                                className={`px-2 py-1 rounded border text-xs ${getCategoryColor(
                                                    notice.category
                                                )}`}
                                            >
                                                {notice.category}
                                            </span>
                                        </div>
                                    </div>
                                    {(user?.id === notice.author.id || user?.role === 'ADMIN') && (
                                        <div className="flex gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="hover:bg-gray-200"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="hover:bg-red-100 hover:text-red-600"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 whitespace-pre-wrap">
                                    {notice.content}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
