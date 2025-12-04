import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import api from '../lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Bell, Calendar, Plus, Edit, Trash2, X, Loader2 } from 'lucide-react';

interface Notice {
    _id: string;
    title: string;
    content: string;
    type: 'notice' | 'exam' | 'assignment' | 'general';
    date: string;
    createdAt: string;
}

interface NoticeFormData {
    title: string;
    content: string;
    type: 'notice';
}

const initialFormData: NoticeFormData = {
    title: '',
    content: '',
    type: 'notice',
};

export default function NoticesPage() {
    const { user } = useAuthStore();
    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
    const [deletingNotice, setDeletingNotice] = useState<Notice | null>(null);
    const [formData, setFormData] = useState<NoticeFormData>(initialFormData);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isAdmin = user?.role === 'ADMIN';

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

    const handleOpenAddModal = () => {
        setEditingNotice(null);
        setFormData(initialFormData);
        setError(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (notice: Notice) => {
        setEditingNotice(notice);
        setFormData({
            title: notice.title,
            content: notice.content,
            type: 'notice',
        });
        setError(null);
        setIsModalOpen(true);
    };

    const handleOpenDeleteModal = (notice: Notice) => {
        setDeletingNotice(notice);
        setIsDeleteModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingNotice(null);
        setFormData(initialFormData);
        setError(null);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setDeletingNotice(null);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            if (editingNotice) {
                await api.put(`/announcements/${editingNotice._id}`, formData);
            } else {
                await api.post('/announcements', formData);
            }
            handleCloseModal();
            fetchNotices();
        } catch (err: any) {
            setError(err.response?.data?.message || 'An error occurred');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!deletingNotice) return;
        setSubmitting(true);

        try {
            await api.delete(`/announcements/${deletingNotice._id}`);
            handleCloseDeleteModal();
            fetchNotices();
        } catch (err: any) {
            console.error('Failed to delete notice:', err);
        } finally {
            setSubmitting(false);
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
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Bell className="h-6 w-6" />
                        Notice Board
                    </CardTitle>
                    {isAdmin && (
                        <Button onClick={handleOpenAddModal} className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Add Notice
                        </Button>
                    )}
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
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
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
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
                                        {isAdmin && (
                                            <div className="flex items-center gap-2 ml-4">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleOpenEditModal(notice)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleOpenDeleteModal(notice)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black/50" onClick={handleCloseModal} />
                    <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-lg font-semibold">
                                {editingNotice ? 'Edit Notice' : 'Add New Notice'}
                            </h2>
                            <button onClick={handleCloseModal} className="p-1 hover:bg-gray-100 rounded">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-4 space-y-4">
                            {error && (
                                <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">
                                    {error}
                                </div>
                            )}
                            <div>
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="content">Content *</Label>
                                <textarea
                                    id="content"
                                    name="content"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    rows={5}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-4">
                                <Button type="button" variant="outline" onClick={handleCloseModal}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={submitting}>
                                    {submitting ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : editingNotice ? (
                                        'Update'
                                    ) : (
                                        'Create'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && deletingNotice && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black/50" onClick={handleCloseDeleteModal} />
                    <div className="relative bg-white rounded-lg shadow-lg w-full max-w-sm mx-4">
                        <div className="p-6">
                            <h2 className="text-lg font-semibold mb-2">Confirm Delete</h2>
                            <p className="text-gray-600 mb-4">
                                Are you sure you want to delete "<strong>{deletingNotice.title}</strong>"?
                                This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={handleCloseDeleteModal}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={handleDelete}
                                    disabled={submitting}
                                >
                                    {submitting ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        'Delete'
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
