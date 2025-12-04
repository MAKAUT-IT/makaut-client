import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import api from '../lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, X, Loader2, Users, Search, User } from 'lucide-react';

interface Student {
    _id: string;
    name: string;
    email: string;
    rollNo?: string;
    regNo?: string;
    course?: string;
    semester?: number;
    createdAt: string;
}

interface StudentFormData {
    name: string;
    email: string;
    password: string;
    rollNo: string;
    regNo: string;
    course: string;
    semester: number | '';
}

const initialFormData: StudentFormData = {
    name: '',
    email: '',
    password: '',
    rollNo: '',
    regNo: '',
    course: '',
    semester: '',
};

export default function StudentListPage() {
    const { user } = useAuthStore();
    const [students, setStudents] = useState<Student[]>([]);
    const [myProfile, setMyProfile] = useState<Student | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);
    const [formData, setFormData] = useState<StudentFormData>(initialFormData);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isAdmin = user?.role?.toUpperCase() === 'ADMIN';
    const isStudent = user?.role?.toUpperCase() === 'STUDENT';

    useEffect(() => {
        if (isAdmin) {
            fetchStudents();
        } else if (isStudent) {
            fetchMyProfile();
        }
    }, [isAdmin, isStudent]);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const response = await api.get('/students');
            setStudents(response.data);
        } catch (error) {
            console.error('Failed to fetch students:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMyProfile = async () => {
        try {
            setLoading(true);
            const response = await api.get('/students/me');
            setMyProfile(response.data);
        } catch (error) {
            console.error('Failed to fetch profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenAddModal = () => {
        setEditingStudent(null);
        setFormData(initialFormData);
        setError(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (student: Student) => {
        setEditingStudent(student);
        setFormData({
            name: student.name,
            email: student.email,
            password: '',
            rollNo: student.rollNo || '',
            regNo: student.regNo || '',
            course: student.course || '',
            semester: student.semester || '',
        });
        setError(null);
        setIsModalOpen(true);
    };

    const handleOpenDeleteModal = (student: Student) => {
        setDeletingStudent(student);
        setIsDeleteModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingStudent(null);
        setFormData(initialFormData);
        setError(null);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setDeletingStudent(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'semester' ? (value ? parseInt(value) : '') : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            const payload = {
                ...formData,
                semester: formData.semester || undefined,
            };

            // Update - don't send password if empty
            const updatePayload = { ...payload };
            if (!updatePayload.password) {
                delete (updatePayload as any).password;
            }

            if (isStudent && !isAdmin) {
                // Student updating their own profile
                await api.put('/students/me', updatePayload);
                handleCloseModal();
                fetchMyProfile();
            } else if (editingStudent) {
                // Admin updating a student
                await api.put(`/students/${editingStudent._id}`, updatePayload);
                handleCloseModal();
                fetchStudents();
            } else {
                // Admin creating new student
                await api.post('/students', payload);
                handleCloseModal();
                fetchStudents();
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'An error occurred');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!deletingStudent) return;
        setSubmitting(true);

        try {
            await api.delete(`/students/${deletingStudent._id}`);
            handleCloseDeleteModal();
            fetchStudents();
        } catch (err: any) {
            console.error('Failed to delete student:', err);
        } finally {
            setSubmitting(false);
        }
    };

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.rollNo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.regNo?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleOpenEditMyProfile = () => {
        if (myProfile) {
            setEditingStudent(myProfile);
            setFormData({
                name: myProfile.name,
                email: myProfile.email,
                password: '',
                rollNo: myProfile.rollNo || '',
                regNo: myProfile.regNo || '',
                course: myProfile.course || '',
                semester: myProfile.semester || '',
            });
            setError(null);
            setIsModalOpen(true);
        }
    };

    // Student Profile View
    if (isStudent && !isAdmin) {
        return (
            <div className="space-y-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-6 w-6" />
                            My Profile
                        </CardTitle>
                        <Button onClick={handleOpenEditMyProfile} className="flex items-center gap-2">
                            <Edit className="h-4 w-4" />
                            Edit Profile
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="flex justify-center py-8">
                                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                            </div>
                        ) : !myProfile ? (
                            <p className="text-center text-gray-500 py-8">Profile not found.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <Label className="text-gray-500 text-sm">Name</Label>
                                        <p className="text-lg font-medium">{myProfile.name}</p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-500 text-sm">Email</Label>
                                        <p className="text-lg">{myProfile.email}</p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-500 text-sm">Roll No</Label>
                                        <p className="text-lg">{myProfile.rollNo || '-'}</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <Label className="text-gray-500 text-sm">Registration No</Label>
                                        <p className="text-lg">{myProfile.regNo || '-'}</p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-500 text-sm">Course</Label>
                                        <p className="text-lg">{myProfile.course || '-'}</p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-500 text-sm">Semester</Label>
                                        <p className="text-lg">{myProfile.semester || '-'}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Edit Profile Modal for Student */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="fixed inset-0 bg-black/50" onClick={handleCloseModal} />
                        <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between p-4 border-b">
                                <h2 className="text-lg font-semibold">Edit My Profile</h2>
                                <button onClick={handleCloseModal} className="p-1 hover:bg-gray-100 rounded">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-4 space-y-4">
                                {error && (
                                    <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">{error}</div>
                                )}
                                <div>
                                    <Label htmlFor="name">Name *</Label>
                                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email *</Label>
                                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <Label htmlFor="password">Password (leave blank to keep current)</Label>
                                    <Input id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} minLength={6} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="rollNo">Roll No</Label>
                                        <Input id="rollNo" name="rollNo" value={formData.rollNo} onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <Label htmlFor="regNo">Reg No</Label>
                                        <Input id="regNo" name="regNo" value={formData.regNo} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="course">Course</Label>
                                        <Input id="course" name="course" value={formData.course} onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <Label htmlFor="semester">Semester</Label>
                                        <Input id="semester" name="semester" type="number" min={1} max={8} value={formData.semester} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2 pt-4">
                                    <Button type="button" variant="outline" onClick={handleCloseModal}>Cancel</Button>
                                    <Button type="submit" disabled={submitting}>
                                        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Update'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Admin View - Student List
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-6 w-6" />
                        Student List
                    </CardTitle>
                    {isAdmin && (
                        <Button onClick={handleOpenAddModal} className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Add Student
                        </Button>
                    )}
                </CardHeader>
                <CardContent>
                    {/* Search Bar */}
                    <div className="mb-4 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search by name, email, roll no, or reg no..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                        </div>
                    ) : filteredStudents.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">No students found.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b bg-gray-50">
                                        <th className="text-left p-3 font-medium">Name</th>
                                        <th className="text-left p-3 font-medium">Email</th>
                                        <th className="text-left p-3 font-medium">Roll No</th>
                                        <th className="text-left p-3 font-medium">Reg No</th>
                                        <th className="text-left p-3 font-medium">Course</th>
                                        <th className="text-left p-3 font-medium">Semester</th>
                                        {isAdmin && <th className="text-left p-3 font-medium">Actions</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStudents.map((student) => (
                                        <tr key={student._id} className="border-b hover:bg-gray-50">
                                            <td className="p-3">{student.name}</td>
                                            <td className="p-3">{student.email}</td>
                                            <td className="p-3">{student.rollNo || '-'}</td>
                                            <td className="p-3">{student.regNo || '-'}</td>
                                            <td className="p-3">{student.course || '-'}</td>
                                            <td className="p-3">{student.semester || '-'}</td>
                                            {isAdmin && (
                                                <td className="p-3">
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleOpenEditModal(student)}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => handleOpenDeleteModal(student)}
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

            {/* Add/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black/50" onClick={handleCloseModal} />
                    <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-lg font-semibold">
                                {editingStudent ? 'Edit Student' : 'Add New Student'}
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
                                <Label htmlFor="name">Name *</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">Email *</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="password">
                                    Password {editingStudent ? '(leave blank to keep current)' : '*'}
                                </Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required={!editingStudent}
                                    minLength={6}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="rollNo">Roll No</Label>
                                    <Input
                                        id="rollNo"
                                        name="rollNo"
                                        value={formData.rollNo}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="regNo">Reg No</Label>
                                    <Input
                                        id="regNo"
                                        name="regNo"
                                        value={formData.regNo}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="course">Course</Label>
                                    <Input
                                        id="course"
                                        name="course"
                                        value={formData.course}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="semester">Semester</Label>
                                    <Input
                                        id="semester"
                                        name="semester"
                                        type="number"
                                        min={1}
                                        max={8}
                                        value={formData.semester}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 pt-4">
                                <Button type="button" variant="outline" onClick={handleCloseModal}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={submitting}>
                                    {submitting ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : editingStudent ? (
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
            {isDeleteModalOpen && deletingStudent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black/50" onClick={handleCloseDeleteModal} />
                    <div className="relative bg-white rounded-lg shadow-lg w-full max-w-sm mx-4">
                        <div className="p-6">
                            <h2 className="text-lg font-semibold mb-2">Confirm Delete</h2>
                            <p className="text-gray-600 mb-4">
                                Are you sure you want to delete <strong>{deletingStudent.name}</strong>?
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
