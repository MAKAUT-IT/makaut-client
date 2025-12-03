import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import api from '../lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, X, Loader2, BookOpen, Search } from 'lucide-react';

interface Subject {
    _id: string;
    name: string;
    code: string;
    faculty: string;
    credits: number;
    semester: number;
    course: string;
}

interface SubjectFormData {
    name: string;
    code: string;
    faculty: string;
    credits: string;
    semester: string;
    course: string;
}

const initialFormData: SubjectFormData = {
    name: '',
    code: '',
    faculty: '',
    credits: '',
    semester: '',
    course: '',
};

export default function CoursesPage() {
    const { user } = useAuthStore();
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
    const [deletingSubject, setDeletingSubject] = useState<Subject | null>(null);
    const [formData, setFormData] = useState<SubjectFormData>(initialFormData);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isAdmin = user?.role?.toUpperCase() === 'ADMIN';

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        try {
            setLoading(true);
            const response = await api.get('/subjects');
            setSubjects(response.data);
        } catch (error) {
            console.error('Failed to fetch subjects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenAddModal = () => {
        setEditingSubject(null);
        setFormData(initialFormData);
        setError(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (subject: Subject) => {
        setEditingSubject(subject);
        setFormData({
            name: subject.name,
            code: subject.code,
            faculty: subject.faculty,
            credits: subject.credits.toString(),
            semester: subject.semester.toString(),
            course: subject.course,
        });
        setError(null);
        setIsModalOpen(true);
    };

    const handleOpenDeleteModal = (subject: Subject) => {
        setDeletingSubject(subject);
        setIsDeleteModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingSubject(null);
        setFormData(initialFormData);
        setError(null);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setDeletingSubject(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            const payload = {
                ...formData,
                credits: parseInt(formData.credits) || 0,
                semester: parseInt(formData.semester) || 0,
            };

            if (editingSubject) {
                await api.put(`/subjects/${editingSubject._id}`, payload);
            } else {
                await api.post('/subjects', payload);
            }

            handleCloseModal();
            fetchSubjects();
        } catch (err: any) {
            setError(err.response?.data?.message || 'An error occurred');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!deletingSubject) return;
        setSubmitting(true);

        try {
            await api.delete(`/subjects/${deletingSubject._id}`);
            handleCloseDeleteModal();
            fetchSubjects();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to delete subject');
        } finally {
            setSubmitting(false);
        }
    };

    const filteredSubjects = subjects.filter(subject =>
        subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.faculty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subject.course.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-6 w-6" />
                        Courses / Subjects
                    </CardTitle>
                    {isAdmin && (
                        <Button onClick={handleOpenAddModal} className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Add Subject
                        </Button>
                    )}
                </CardHeader>
                <CardContent>
                    {/* Search Bar */}
                    <div className="mb-4 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search by name, code, faculty, or course..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                        </div>
                    ) : filteredSubjects.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">No subjects found.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b bg-gray-50">
                                        <th className="text-left p-3 font-medium">Code</th>
                                        <th className="text-left p-3 font-medium">Name</th>
                                        <th className="text-left p-3 font-medium">Faculty</th>
                                        <th className="text-left p-3 font-medium">Credits</th>
                                        <th className="text-left p-3 font-medium">Semester</th>
                                        <th className="text-left p-3 font-medium">Course</th>
                                        {isAdmin && <th className="text-left p-3 font-medium">Actions</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSubjects.map((subject) => (
                                        <tr key={subject._id} className="border-b hover:bg-gray-50">
                                            <td className="p-3 font-mono text-sm">{subject.code}</td>
                                            <td className="p-3 font-medium">{subject.name}</td>
                                            <td className="p-3">{subject.faculty}</td>
                                            <td className="p-3">{subject.credits}</td>
                                            <td className="p-3">{subject.semester}</td>
                                            <td className="p-3">{subject.course}</td>
                                            {isAdmin && (
                                                <td className="p-3">
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleOpenEditModal(subject)}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => handleOpenDeleteModal(subject)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Add/Edit Subject Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black/50" onClick={handleCloseModal} />
                    <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-lg font-semibold">
                                {editingSubject ? 'Edit Subject' : 'Add New Subject'}
                            </h2>
                            <button onClick={handleCloseModal} className="p-1 hover:bg-gray-100 rounded">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-4 space-y-4">
                            {error && (
                                <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">{error}</div>
                            )}
                            <div>
                                <Label htmlFor="name">Subject Name *</Label>
                                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <Label htmlFor="code">Subject Code *</Label>
                                <Input id="code" name="code" value={formData.code} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <Label htmlFor="faculty">Faculty *</Label>
                                <Input id="faculty" name="faculty" value={formData.faculty} onChange={handleInputChange} required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="credits">Credits *</Label>
                                    <Input id="credits" name="credits" type="number" min={1} max={10} value={formData.credits} onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <Label htmlFor="semester">Semester *</Label>
                                    <Input id="semester" name="semester" type="number" min={1} max={8} value={formData.semester} onChange={handleInputChange} required />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="course">Course *</Label>
                                <Input id="course" name="course" value={formData.course} onChange={handleInputChange} placeholder="e.g., B.Tech CS" required />
                            </div>
                            <div className="flex justify-end gap-2 pt-4">
                                <Button type="button" variant="outline" onClick={handleCloseModal}>Cancel</Button>
                                <Button type="submit" disabled={submitting}>
                                    {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : editingSubject ? 'Update' : 'Create'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black/50" onClick={handleCloseDeleteModal} />
                    <div className="relative bg-white rounded-lg shadow-lg w-full max-w-sm mx-4">
                        <div className="p-6">
                            <h2 className="text-lg font-semibold mb-4">Delete Subject</h2>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete <strong>{deletingSubject?.name}</strong> ({deletingSubject?.code})? This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={handleCloseDeleteModal}>Cancel</Button>
                                <Button variant="destructive" onClick={handleDelete} disabled={submitting}>
                                    {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Delete'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
