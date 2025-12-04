import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import api from '../lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, X, Loader2, Users, Search, User } from 'lucide-react';

interface Faculty {
    _id: string;
    name: string;
    email: string;
    department?: string;
    designation?: string;
    createdAt: string;
}

interface FacultyFormData {
    name: string;
    email: string;
    password: string;
    department: string;
    designation: string;
}

const initialFormData: FacultyFormData = {
    name: '',
    email: '',
    password: '',
    department: '',
    designation: '',
};

export default function FacultyListPage() {
    const { user } = useAuthStore();

    const [facultyList, setFacultyList] = useState<Faculty[]>([]);
    const [myProfile, setMyProfile] = useState<Faculty | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
    const [deletingFaculty, setDeletingFaculty] = useState<Faculty | null>(null);
    const [formData, setFormData] = useState<FacultyFormData>(initialFormData);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isAdmin = user?.role?.toUpperCase() === 'ADMIN';
    const isFaculty = user?.role?.toUpperCase() === 'FACULTY';

    useEffect(() => {
        if (isAdmin) fetchFacultyList();
        if (isFaculty) fetchMyProfile();
    }, [isAdmin, isFaculty]);

    const fetchFacultyList = async () => {
        try {
            setLoading(true);
            const res = await api.get('/faculty');
            setFacultyList(res.data);
        } catch (err) {
            console.error('Failed to load faculty list:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchMyProfile = async () => {
        try {
            setLoading(true);
            const res = await api.get('/faculty/me');
            setMyProfile(res.data);
        } catch (err) {
            console.error('Failed to load profile:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenAddModal = () => {
        setEditingFaculty(null);
        setFormData(initialFormData);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (faculty: Faculty) => {
        setEditingFaculty(faculty);
        setFormData({
            name: faculty.name,
            email: faculty.email,
            password: '',
            department: faculty.department || '',
            designation: faculty.designation || ''
        });
        setIsModalOpen(true);
    };

    const handleOpenEditMyProfile = () => {
        if (!myProfile) return;
        handleOpenEditModal(myProfile);
    };

    const handleOpenDeleteModal = (faculty: Faculty) => {
        setDeletingFaculty(faculty);
        setIsDeleteModalOpen(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            let payload: any = { ...formData };
            if (!payload.password) delete payload.password;

            if (isFaculty && !isAdmin) {
                await api.put('/faculty/me', payload);
                fetchMyProfile();
            } 
            else if (editingFaculty) {
                await api.put(`/faculty/${editingFaculty._id}`, payload);
                fetchFacultyList();
            } 
            else {
                await api.post('/faculty', payload);
                fetchFacultyList();
            }

            setIsModalOpen(false);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!deletingFaculty) return;
        setSubmitting(true);

        try {
            await api.delete(`/faculty/${deletingFaculty._id}`);
            fetchFacultyList();
            setIsDeleteModalOpen(false);
        } catch (err) {
            console.error('Delete failed:', err);
        } finally {
            setSubmitting(false);
        }
    };

    const filteredFaculty = facultyList.filter(f =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // ⭐==================== FACULTY SELF PROFILE VIEW ====================⭐
    if (isFaculty && !isAdmin) {
        return (
            <div className="space-y-6">
                <Card>
                    <CardHeader className="flex justify-between">
                        <CardTitle className="flex gap-2 items-center">
                            <User className="h-6 w-6" /> My Profile
                        </CardTitle>
                        <Button onClick={handleOpenEditMyProfile}>
                            <Edit className="h-4 w-4" /> Edit Profile
                        </Button>
                    </CardHeader>

                    <CardContent>
                        {loading ? (
                            <div className="flex justify-center py-8">
                                <Loader2 className="h-8 w-8 animate-spin" />
                            </div>
                        ) : myProfile ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label>Name</Label>
                                    <p>{myProfile.name}</p>
                                </div>
                                <div>
                                    <Label>Email</Label>
                                    <p>{myProfile.email}</p>
                                </div>
                                <div>
                                    <Label>Department</Label>
                                    <p>{myProfile.department || '-'}</p>
                                </div>
                                <div>
                                    <Label>Designation</Label>
                                    <p>{myProfile.designation || '-'}</p>
                                </div>
                            </div>
                        ) : (
                            <p>No Profile Found.</p>
                        )}
                    </CardContent>
                </Card>

                {/* EDIT SELF MODAL */}
                {renderModal()}
            </div>
        );
    }

    // ⭐==================== ADMIN FACULTY LIST ====================⭐
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex justify-between">
                    <CardTitle className="flex gap-2 items-center">
                        <Users className="h-6 w-6" /> Faculty List
                    </CardTitle>
                    <Button onClick={handleOpenAddModal}>
                        <Plus className="h-4 w-4" /> Add Faculty
                    </Button>
                </CardHeader>

                <CardContent>
                    {/* Search */}
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                        <Input
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    {/* Table */}
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                    ) : filteredFaculty.length === 0 ? (
                        <p className="text-center py-8">No faculty found.</p>
                    ) : (
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b">
                                    <th className="p-3 text-left">Name</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Department</th>
                                    <th className="p-3 text-left">Designation</th>
                                    <th className="p-3 text-left">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredFaculty.map(f => (
                                    <tr key={f._id} className="border-b hover:bg-gray-50">
                                        <td className="p-3">{f.name}</td>
                                        <td className="p-3">{f.email}</td>
                                        <td className="p-3">{f.department || '-'}</td>
                                        <td className="p-3">{f.designation || '-'}</td>
                                        <td className="p-3">
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline" onClick={() => handleOpenEditModal(f)}>
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button size="sm" variant="destructive" onClick={() => handleOpenDeleteModal(f)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </CardContent>
            </Card>

            {/* ADD/EDIT MODAL */}
            {renderModal()}

            {/* DELETE MODAL */}
            {renderDeleteModal()}
        </div>
    );

    // ⭐------------------ MODAL RENDER ------------------⭐
    function renderModal() {
        if (!isModalOpen) return null;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="fixed inset-0 bg-black/50" onClick={() => setIsModalOpen(false)} />
                <div className="relative bg-white rounded-md p-4 w-full max-w-md">
                    <div className="flex justify-between items-center border-b pb-3 mb-3">
                        <h2 className="text-lg font-semibold">
                            {editingFaculty ? 'Edit Faculty' : 'Add Faculty'}
                        </h2>
                        <X className="h-6 w-6 cursor-pointer" onClick={() => setIsModalOpen(false)} />
                    </div>

                    {error && <div className="bg-red-50 p-2 text-red-600 rounded">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label>Name *</Label>
                            <Input name="name" value={formData.name} onChange={handleInputChange} required />
                        </div>
                        <div>
                            <Label>Email *</Label>
                            <Input name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                        </div>
                        <div>
                            <Label>Password {editingFaculty ? '(optional)' : '*'}</Label>
                            <Input name="password" type="password" value={formData.password} onChange={handleInputChange} minLength={6} />
                        </div>
                        <div>
                            <Label>Department</Label>
                            <Input name="department" value={formData.department} onChange={handleInputChange} />
                        </div>
                        <div>
                            <Label>Designation</Label>
                            <Input name="designation" value={formData.designation} onChange={handleInputChange} />
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={submitting}>
                                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : editingFaculty ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    // ⭐------------------ DELETE MODAL ------------------⭐
    function renderDeleteModal() {
        if (!isDeleteModalOpen || !deletingFaculty) return null;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="fixed inset-0 bg-black/50" onClick={() => setIsDeleteModalOpen(false)} />

                <div className="bg-white p-5 rounded-md shadow-md w-full max-w-sm">
                    <h2 className="text-lg font-semibold mb-2">Confirm Delete</h2>
                    <p className="text-gray-600">
                        Delete <strong>{deletingFaculty.name}</strong>? This action cannot be undone.
                    </p>

                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={submitting}>
                            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Delete'}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}
