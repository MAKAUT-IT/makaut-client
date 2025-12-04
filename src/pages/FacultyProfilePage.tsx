import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
    Mail,
    GraduationCap,
    Award,
    BookOpen,
    User,
    ExternalLink,
    ChevronLeft,
    ChevronRight,
    ArrowLeft,
} from 'lucide-react';
import { facultyData, getInitials } from '../data/facultyData';

export default function FacultyProfilePage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    
    const faculty = facultyData.find(f => f.id === id);
    const currentIndex = facultyData.findIndex(f => f.id === id);
    
    const [activeTab, setActiveTab] = useState('about');

    const tabs = [
        { id: 'about', label: 'Basic Details' },
        { id: 'achievements', label: 'Achievements' },
        { id: 'publications', label: 'Publications' },
        { id: 'education', label: 'Education' },
    ];



    const goToPrev = () => {
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : facultyData.length - 1;
        navigate(`/faculty/${facultyData[prevIndex].id}`);
        setActiveTab('about');
    };

    const goToNext = () => {
        const nextIndex = currentIndex < facultyData.length - 1 ? currentIndex + 1 : 0;
        navigate(`/faculty/${facultyData[nextIndex].id}`);
        setActiveTab('about');
    };

    if (!faculty) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900">Faculty Not Found</h2>
                <p className="text-gray-600 mt-2">The requested faculty member does not exist.</p>
                <Link to="/faculty" className="text-blue-600 hover:underline mt-4 inline-block">
                    ← Back to Faculty List
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header with Navigation */}
            <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-4">
                    <Link
                        to="/faculty"
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Faculty Profile</h1>
                        <p className="text-gray-600 text-sm">
                            Department of Information Technology
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={goToPrev}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        title="Previous Faculty"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <span className="text-sm text-gray-600 px-2">
                        {currentIndex + 1} / {facultyData.length}
                    </span>
                    <button
                        onClick={goToNext}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        title="Next Faculty"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Main Content - Two Column Layout */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Sidebar - Faculty Info */}
                <div className="lg:w-80 shrink-0">
                    <div className="bg-white border-l-4 border-blue-500 shadow-lg rounded-r-lg overflow-hidden">
                        {/* Photo Section */}
                        <div className="relative p-6 bg-gradient-to-b from-gray-50 to-white">
                            <div className="relative w-48 h-56 mx-auto">
                                {/* Decorative Frame */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg transform rotate-3"></div>
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg transform -rotate-2"></div>
                                {/* Photo Container */}
                                <div className="relative w-full h-full bg-gray-200 rounded-lg overflow-hidden border-4 border-white shadow-xl">
                                    {faculty.photo ? (
                                        <img
                                            src={faculty.photo}
                                            alt={faculty.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 text-white text-4xl font-bold">
                                            {getInitials(faculty.name)}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Name & Designation */}
                        <div className="px-6 pb-4 text-center border-b">
                            <h2 className="text-xl font-bold text-gray-900">{faculty.name}</h2>
                            <p className="text-blue-600 font-medium text-sm">{faculty.designation}</p>
                            <p className="text-gray-500 text-xs mt-1">{faculty.department}</p>
                        </div>

                        {/* Social Links */}
                        {faculty.socialLinks && (
                            <div className="px-6 py-4 border-b">
                                <div className="flex justify-center gap-3">
                                    {faculty.socialLinks.facebook && (
                                        <a href={faculty.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                                            <span className="text-sm font-bold">f</span>
                                        </a>
                                    )}
                                    {faculty.socialLinks.twitter && (
                                        <a href={faculty.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-sky-500 text-white rounded hover:bg-sky-600 transition-colors">
                                            <span className="text-sm font-bold">𝕏</span>
                                        </a>
                                    )}
                                    {faculty.socialLinks.googleScholar && (
                                        <a href={faculty.socialLinks.googleScholar} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                                            <span className="text-sm font-bold">G</span>
                                        </a>
                                    )}
                                    {faculty.socialLinks.linkedin && (
                                        <a href={faculty.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors">
                                            <span className="text-sm font-bold">in</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Areas of Interest */}
                        <div className="px-6 py-4 border-b">
                            <h3 className="text-sm font-bold text-gray-800 mb-2">Area of Interest</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {faculty.areasOfInterest.join(', ')}.
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="px-6 py-4">
                            <h3 className="text-sm font-bold text-gray-800 mb-2">Contact</h3>
                            <div className="space-y-1">
                                <a
                                    href={`mailto:${faculty.email}`}
                                    className="flex items-center gap-2 text-blue-600 hover:underline text-sm"
                                >
                                    <Mail className="h-4 w-4" />
                                    {faculty.email}
                                </a>
                                {faculty.email2 && (
                                    <a
                                        href={`mailto:${faculty.email2}`}
                                        className="flex items-center gap-2 text-blue-600 hover:underline text-sm"
                                    >
                                        <Mail className="h-4 w-4" />
                                        {faculty.email2}
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Content - Tabs & Details */}
                <div className="flex-1 min-w-0">
                    {/* Tabs Navigation */}
                    <div className="flex border-b border-gray-200 mb-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-3 text-sm font-medium transition-colors relative ${
                                    activeTab === tab.id
                                        ? 'text-orange-600'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500 rounded-t-sm"></div>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="bg-white rounded-lg">
                        {/* About / Basic Details */}
                        {activeTab === 'about' && (
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <User className="h-5 w-5 text-blue-600" />
                                    About
                                </h3>
                                <p className="text-gray-700 leading-relaxed text-justify">
                                    {faculty.about}
                                </p>
                            </div>
                        )}

                        {/* Achievements */}
                        {activeTab === 'achievements' && (
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Award className="h-5 w-5 text-yellow-600" />
                                    Achievements
                                </h3>
                                <ul className="space-y-3">
                                    {faculty.achievements.map((achievement, idx) => (
                                        <li key={idx} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                                            <Award className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                                            <span className="text-gray-700">{achievement}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Publications */}
                        {activeTab === 'publications' && (
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <BookOpen className="h-5 w-5 text-green-600" />
                                    Publications
                                </h3>
                                <div className="space-y-4">
                                    {faculty.publications.map((pub, idx) => (
                                        <div key={idx} className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                                            <div className="flex justify-between items-start gap-4">
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">{pub.title}</h4>
                                                    <p className="text-gray-600 text-sm mt-1">{pub.journal}</p>
                                                    <p className="text-gray-500 text-xs mt-1">Published: {pub.year}</p>
                                                </div>
                                                {pub.link && (
                                                    <a
                                                        href={pub.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 rounded bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                                                    >
                                                        <ExternalLink className="h-4 w-4" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Education */}
                        {activeTab === 'education' && (
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5 text-blue-600" />
                                    Education
                                </h3>
                                <div className="space-y-4">
                                    {faculty.education.map((edu, idx) => (
                                        <div key={idx} className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                                            <div className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shrink-0">
                                                {idx + 1}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                                                <p className="text-gray-600 text-sm">{edu.institution}</p>
                                                <p className="text-gray-500 text-xs mt-1">{edu.year}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

