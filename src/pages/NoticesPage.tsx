import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Calendar } from 'lucide-react';

interface Notice {
    _id: string;
    title: string;
    content: string;
    type: 'notice' | 'exam' | 'assignment' | 'general';
    date: string;
    createdAt: string;
}

export default function NoticesPage() {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const response = await api.get('/announcements');
            // Filter only notices (type === 'notice')
            const noticesOnly = response.data.filter(
                (item: Notice) => item.type === 'notice'
            );
            setNotices(noticesOnly);
        } catch (error) {
            console.error('Failed to fetch notices:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bell className="h-6 w-6" />
                        Notice Board
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600">Loading notices...</p>
                        </div>
                    ) : notices.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600">No notices found</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {notices.map((notice) => (
                                <div
                                    key={notice._id}
                                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            Notice
                                        </span>
                                        <span className="text-sm text-gray-500 flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {formatDate(notice.date || notice.createdAt)}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">{notice.title}</h3>
                                    <p className="text-gray-600 whitespace-pre-wrap">{notice.content}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
