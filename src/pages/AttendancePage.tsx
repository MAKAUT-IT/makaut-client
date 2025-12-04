import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import api from '../lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X, Loader2, Calendar, CheckCircle, XCircle, User, ArrowLeft } from 'lucide-react';

interface Attendance {
    _id: string;
    student: { _id: string; name: string } | string;
    subject: { _id: string; name: string; code: string } | null;
    date: string;
    status: 'present' | 'absent';
}

interface Student { _id: string; name: string; email: string; }
interface Subject { _id: string; name: string; code: string; }

interface AttendanceFormData {
    subjectId: string;
    date: string;
    status: 'present' | 'absent';
}

const initialFormData: AttendanceFormData = {
    subjectId: '', date: new Date().toISOString().split('T')[0], status: 'present',
};

export default function AttendancePage() {
    const { user } = useAuthStore();
    const [attendance, setAttendance] = useState<Attendance[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<AttendanceFormData>(initialFormData);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    const isAdmin = user?.role === 'ADMIN';

    useEffect(() => {
        if (isAdmin) {
            fetchStudents();
            fetchSubjects();
        } else {
            fetchAttendance(user?.id);
        }
    }, [isAdmin, user]);

    const fetchAttendance = async (studentId?: string) => {
        if (!studentId) return;
        try {
            setLoading(true);
            const response = await api.get(`/attendance/${studentId}`);
            setAttendance(response.data);
        } catch (error) {
            console.error('Failed to fetch attendance:', error);
        } finally { setLoading(false); }
    };

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const response = await api.get('/students');
            setStudents(response.data);
        } catch (error) {
            console.error('Failed to fetch students:', error);
        } finally { setLoading(false); }
    };

    const fetchSubjects = async () => {
        try { const response = await api.get('/subjects'); setSubjects(response.data); }
        catch (error) { console.error('Failed to fetch subjects:', error); }
    };

    const handleSelectStudent = (student: Student) => {
        setSelectedStudent(student);
        fetchAttendance(student._id);
    };

    const handleBackToStudents = () => {
        setSelectedStudent(null);
        setAttendance([]);
    };

    const handleOpenAddModal = () => {
        setFormData({...initialFormData, date: new Date().toISOString().split('T')[0]});
        setError(null);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => { setIsModalOpen(false); setFormData(initialFormData); setError(null); };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedStudent) return;
        setSubmitting(true);
        setError(null);
        try {
            await api.post('/attendance/upload', {
                studentId: selectedStudent._id, subjectId: formData.subjectId,
                date: formData.date, status: formData.status,
            });
            handleCloseModal();
            fetchAttendance(selectedStudent._id);
        } catch (err: any) {
            setError(err.response?.data?.message || 'An error occurred');
        } finally { setSubmitting(false); }
    };

    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric',
    });

    // Calculate attendance summary
    const presentCount = attendance.filter(a => a.status === 'present').length;
    const totalCount = attendance.length;
    const attendancePercentage = totalCount > 0 ? ((presentCount / totalCount) * 100).toFixed(1) : '0';

    // Render student list for admin (when no student is selected)
    if (isAdmin && !selectedStudent) {
        return (
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-6 w-6" />
                            Select Student to Manage Attendance
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin text-gray-400" /></div>
                        ) : students.length === 0 ? (
                            <p className="text-center text-gray-500 py-8">No students found.</p>
                        ) : (
                            <div className="grid gap-3">
                                {students.map((student) => (
                                    <div
                                        key={student._id}
                                        onClick={() => handleSelectStudent(student)}
                                        className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-black hover:bg-gray-50 transition-all"
                                    >
                                        <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
                                            {student.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-medium">{student.name}</p>
                                            <p className="text-sm text-gray-500">{student.email}</p>
                                        </div>
                                        <User className="h-5 w-5 ml-auto text-gray-400" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Render attendance view (for student or admin with selected student)
    return (
        <div className="space-y-6">
            {/* Summary Card */}
            {totalCount > 0 && (
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Overall Attendance</p>
                                <p className="text-3xl font-bold">{attendancePercentage}%</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Present: {presentCount} / {totalCount}</p>
                                <p className="text-sm text-gray-500">Absent: {totalCount - presentCount}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        {isAdmin && (
                            <Button variant="ghost" size="sm" onClick={handleBackToStudents} className="mr-2">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        )}
                        <Calendar className="h-6 w-6" />
                        {isAdmin ? `Attendance - ${selectedStudent?.name}` : 'My Attendance'}
                    </CardTitle>
                    {isAdmin && (
                        <Button onClick={handleOpenAddModal} className="flex items-center gap-2">
                            <Plus className="h-4 w-4" /> Add Attendance
                        </Button>
                    )}
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin text-gray-400" /></div>
                    ) : attendance.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">No attendance records found.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b-2 border-black">
                                        <th className="text-left p-3">Subject</th>
                                        <th className="text-left p-3">Date</th>
                                        <th className="text-center p-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendance.map((record) => (
                                        <tr key={record._id} className="border-b hover:bg-gray-50">
                                            <td className="p-3">{record.subject?.name || 'N/A'} <span className="text-xs text-gray-500">({record.subject?.code})</span></td>
                                            <td className="p-3">{formatDate(record.date)}</td>
                                            <td className="p-3 text-center">
                                                {record.status === 'present' ? (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        <CheckCircle className="h-3 w-3" /> Present
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                        <XCircle className="h-3 w-3" /> Absent
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Add Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="fixed inset-0 bg-black/50" onClick={handleCloseModal} />
                    <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-lg font-semibold">Add Attendance for {selectedStudent?.name}</h2>
                            <button onClick={handleCloseModal} className="p-1 hover:bg-gray-100 rounded">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-4 space-y-4">
                            {error && <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">{error}</div>}
                            <div>
                                <Label htmlFor="subjectId">Subject *</Label>
                                <select id="subjectId" name="subjectId" value={formData.subjectId} onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                                    <option value="">Select Subject</option>
                                    {subjects.map((s) => <option key={s._id} value={s._id}>{s.name} ({s.code})</option>)}
                                </select>
                            </div>
                            <div>
                                <Label htmlFor="date">Date *</Label>
                                <Input id="date" name="date" type="date" value={formData.date} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <Label htmlFor="status">Status *</Label>
                                <select id="status" name="status" value={formData.status} onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                                    <option value="present">Present</option>
                                    <option value="absent">Absent</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-2 pt-4">
                                <Button type="button" variant="outline" onClick={handleCloseModal}>Cancel</Button>
                                <Button type="submit" disabled={submitting}>
                                    {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Add Attendance'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}