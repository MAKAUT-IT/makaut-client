import { Link } from 'react-router-dom';
import { facultyData, getInitials } from '../data/facultyData';

export default function FacultyPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center border-b pb-6">
                <h1 className="text-3xl font-bold text-gray-900">Faculty Members</h1>
                <p className="text-gray-600 mt-2">
                    Department of Information Technology
                </p>
            </div>

            {/* Faculty Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {facultyData.map((faculty) => (
                    <Link
                        key={faculty.id}
                        to={`/faculty/${faculty.id}`}
                        className="group flex flex-col items-center text-center"
                    >
                        {/* Photo */}
                        <div className="relative w-40 h-48 mb-4">
                            <div className="w-full h-full rounded-lg overflow-hidden bg-gray-200 shadow-lg group-hover:shadow-xl transition-shadow border-2 border-gray-100">
                                {faculty.photo ? (
                                    <img
                                        src={faculty.photo}
                                        alt={faculty.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 text-white text-3xl font-bold">
                                        {getInitials(faculty.name)}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Name & Designation */}
                        <h3 className="text-blue-600 font-semibold hover:underline group-hover:text-blue-800 transition-colors">
                            {faculty.name}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">{faculty.designation}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

