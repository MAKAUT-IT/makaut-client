import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import api from '../lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X, Loader2, GraduationCap, BookOpen, User, ArrowLeft } from 'lucide-react';

interface Mark {
    _id: string;
    student: { _id: string; name: string } | string;
    subject: { _id: string; name: string; code: string } | null;
    examType: 'internal1' | 'internal2' | 'assignment';
    marksObtained: number;
    maxMarks: number;
}

interface Student { _id: string; name: string; email: string; }
interface Subject { _id: string; name: string; code: string; }

interface MarkFormData {
    subjectId: string;
    examType: 'internal1' | 'internal2' | 'assignment';
    marksObtained: string;
    maxMarks: string;
}

const initialFormData: MarkFormData = {
    subjectId: '', examType: 'internal1', marksObtained: '', maxMarks: '',
};

const examTypeLabels: Record<string, string> = {
    internal1: 'Internal 1', internal2: 'Internal 2', assignment: 'Assignment',
};

export default function MarksPage() {
    const { user } = useAuthStore();
    const [marks, setMarks] = useState<Mark[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<MarkFormData>(initialFormData);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    const isAdmin = user?.role === 'ADMIN';

    useEffect(() => {
        if (isAdmin) {
            fetchStudents();
            fetchSubjects();
        } else {
            fetchMarks(user?.id);
        }
    }, [isAdmin, user]);

    const fetchMarks = async (studentId?: string) => {
        if (!studentId) return;
        try {
            setLoading(true);
            const response = await api.get(`/marks/${studentId}`);
            setMarks(response.data);
        } catch (error) {
            console.error('Failed to fetch marks:', error);
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
        fetchMarks(student._id);
    };

    const handleBackToStudents = () => {
        setSelectedStudent(null);
        setMarks([]);
    };

    const handleOpenAddModal = () => { setFormData(initialFormData); setError(null); setIsModalOpen(true); };
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
            await api.post('/marks', {
                studentId: selectedStudent._id, subjectId: formData.subjectId,
                examType: formData.examType, marksObtained: Number(formData.marksObtained),
                maxMarks: Number(formData.maxMarks),
            });
            handleCloseModal();
            fetchMarks(selectedStudent._id);
        } catch (err: any) {
            setError(err.response?.data?.message || 'An error occurred');
        } finally { setSubmitting(false); }
    };

    const getPercentage = (obtained: number, max: number) => ((obtained / max) * 100).toFixed(1);
    const getGradeColor = (pct: number) => {
        if (pct >= 90) return 'text-green-600';
        if (pct >= 75) return 'text-blue-600';
        if (pct >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    // Render student list for admin (when no student is selected)
    if (isAdmin && !selectedStudent) {
        return (
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <GraduationCap className="h-6 w-6" />
                            Select Student to Manage Marks
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

    // Render marks view (for student or admin with selected student)
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        {isAdmin && (
                            <Button variant="ghost" size="sm" onClick={handleBackToStudents} className="mr-2">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        )}
                        <GraduationCap className="h-6 w-6" />
                        {isAdmin ? `Marks - ${selectedStudent?.name}` : 'My Marks'}
                    </CardTitle>
                    {isAdmin && (
                        <Button onClick={handleOpenAddModal} className="flex items-center gap-2">
                            <Plus className="h-4 w-4" /> Add Marks
                        </Button>
                    )}
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin text-gray-400" /></div>
                    ) : marks.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">No marks found.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b-2 border-black">
                                        <th className="text-left p-3">Subject</th>
                                        <th className="text-left p-3">Exam Type</th>
                                        <th className="text-center p-3">Marks</th>
                                        <th className="text-center p-3">Percentage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {marks.map((mark) => {
                                        const pct = parseFloat(getPercentage(mark.marksObtained, mark.maxMarks));
                                        return (
                                            <tr key={mark._id} className="border-b hover:bg-gray-50">
                                                <td className="p-3">
                                                    <div className="flex items-center gap-2">
                                                        <BookOpen className="h-4 w-4 text-gray-400" />
                                                        <span>{mark.subject?.name || 'N/A'}</span>
                                                        <span className="text-xs text-gray-500">({mark.subject?.code})</span>
                                                    </div>
                                                </td>
                                                <td className="p-3"><span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100">{examTypeLabels[mark.examType]}</span></td>
                                                <td className="p-3 text-center">{mark.marksObtained} / {mark.maxMarks}</td>
                                                <td className={`p-3 text-center font-semibold ${getGradeColor(pct)}`}>{pct}%</td>
                                            </tr>
                                        );
                                    })}
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
                            <h2 className="text-lg font-semibold">Add Marks for {selectedStudent?.name}</h2>
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
                                <Label htmlFor="examType">Exam Type *</Label>
                                <select id="examType" name="examType" value={formData.examType} onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                                    <option value="internal1">Internal 1</option>
                                    <option value="internal2">Internal 2</option>
                                    <option value="assignment">Assignment</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="marksObtained">Marks Obtained *</Label>
                                    <Input id="marksObtained" name="marksObtained" type="number" value={formData.marksObtained} onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <Label htmlFor="maxMarks">Max Marks *</Label>
                                    <Input id="maxMarks" name="maxMarks" type="number" value={formData.maxMarks} onChange={handleInputChange} required />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 pt-4">
                                <Button type="button" variant="outline" onClick={handleCloseModal}>Cancel</Button>
                                <Button type="submit" disabled={submitting}>
                                    {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Add Marks'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}