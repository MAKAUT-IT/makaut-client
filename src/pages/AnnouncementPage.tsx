import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import api from '../lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, X, Loader2, Megaphone, Calendar, Tag } from 'lucide-react';

interface Announcement {
    _id: string;
    title: string;
    content: string;
    type: 'notice' | 'exam' | 'assignment' | 'general';
    date: string;
    createdAt: string;
}

interface AnnouncementFormData {
    title: string;
    content: string;
    type: 'notice' | 'exam' | 'assignment' | 'general';
}

const initialFormData: AnnouncementFormData = {
    title: '',
    content: '',
    type: 'general',
};

const typeColors: Record<string, string> = {
    notice: 'bg-blue-100 text-blue-800',
    exam: 'bg-red-100 text-red-800',
    assignment: 'bg-yellow-100 text-yellow-800',
    general: 'bg-gray-100 text-gray-800',
};

export default function AnnouncementPage() {
    const { user } = useAuthStore();
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState<string>('all');

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
    const [deletingAnnouncement, setDeletingAnnouncement] = useState<Announcement | null>(null);
    const [formData, setFormData] = useState<AnnouncementFormData>(initialFormData);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isAdmin = user?.role === 'ADMIN' || user?.role === 'admin';

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            setLoading(true);
            const response = await api.get('/announcements');
            setAnnouncements(response.data);
        } catch (error) {
            console.error('Failed to fetch announcements:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenAddModal = () => {
        setEditingAnnouncement(null);
        setFormData(initialFormData);
        setError(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (announcement: Announcement) => {
        setEditingAnnouncement(announcement);
        setFormData({
            title: announcement.title,
            content: announcement.content,
            type: announcement.type,
        });
        setError(null);
        setIsModalOpen(true);
    };

    const handleOpenDeleteModal = (announcement: Announcement) => {
        setDeletingAnnouncement(announcement);
        setIsDeleteModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingAnnouncement(null);
        setFormData(initialFormData);
        setError(null);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setDeletingAnnouncement(null);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            if (editingAnnouncement) {
                await api.put(`/announcements/${editingAnnouncement._id}`, formData);
            } else {
                await api.post('/announcements', formData);
            }
            handleCloseModal();
            fetchAnnouncements();
        } catch (err: any) {
            setError(err.response?.data?.message || 'An error occurred');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!deletingAnnouncement) return;
        setSubmitting(true);

        try {
            await api.delete(`/announcements/${deletingAnnouncement._id}`);
            handleCloseDeleteModal();
            fetchAnnouncements();
        } catch (err: any) {
            console.error('Failed to delete announcement:', err);
        } finally {
            setSubmitting(false);
        }
    };

    const filteredAnnouncements = announcements.filter(
        a => filterType === 'all' || a.type === filterType
    );

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Megaphone className="h-6 w-6" />
                        Announcements
                    </CardTitle>
                    {isAdmin && (
                        <Button onClick={handleOpenAddModal} className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Add Announcement
                        </Button>
                    )}
                </CardHeader>
                <CardContent>
                    {/* Filter Tabs */}
                    <div className="flex gap-2 mb-6 flex-wrap">
                        {['all', 'notice', 'exam', 'assignment', 'general'].map((type) => (
                            <Button
                                key={type}
                                variant={filterType === type ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setFilterType(type)}
                                className="capitalize"
                            >
                                {type}
                            </Button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                        </div>
                    ) : filteredAnnouncements.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">No announcements found.</p>
                    ) : (
                        <div className="space-y-4">
                            {filteredAnnouncements.map((announcement) => (
                                <div
                                    key={announcement._id}
                                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${typeColors[announcement.type]}`}>
                                                    <Tag className="h-3 w-3 inline mr-1" />
                                                    {announcement.type}
                                                </span>
                                                <span className="text-sm text-gray-500 flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {formatDate(announcement.date || announcement.createdAt)}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-semibold mb-2">{announcement.title}</h3>
                                            <p className="text-gray-600 whitespace-pre-wrap">{announcement.content}</p>
                                        </div>
                                        {isAdmin && (
                                            <div className="flex items-center gap-2 ml-4">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleOpenEditModal(announcement)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleOpenDeleteModal(announcement)}
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
                                {editingAnnouncement ? 'Edit Announcement' : 'Add New Announcement'}
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
                                <Label htmlFor="type">Type *</Label>
                                <select
                                    id="type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="general">General</option>
                                    <option value="notice">Notice</option>
                                    <option value="exam">Exam</option>
                                    <option value="assignment">Assignment</option>
                                </select>
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
                                    ) : editingAnnouncement ? (
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
            {isDeleteModalOpen && deletingAnnouncement && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black/50" onClick={handleCloseDeleteModal} />
                    <div className="relative bg-white rounded-lg shadow-lg w-full max-w-sm mx-4">
                        <div className="p-6">
                            <h2 className="text-lg font-semibold mb-2">Confirm Delete</h2>
                            <p className="text-gray-600 mb-4">
                                Are you sure you want to delete "<strong>{deletingAnnouncement.title}</strong>"?
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
