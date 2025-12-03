import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Download,
  Filter,
  Search,
  Calendar,
  FileText,
} from "lucide-react";

interface Department {
  id: number;
  name: string;
  code: string;
}

interface Batch {
  id: number;
  year: string;
  semester: string;
}

interface Syllabus {
  id: number;
  deptId: number;
  batchId: number;
  courseName: string;
  courseCode: string;
  credits: number;
  instructor: string;
  uploadDate: string;
  fileUrl: string;
}

export default function SyllabusPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [syllabusData, setSyllabusData] = useState<Syllabus[]>([]);
  const [filteredSyllabus, setFilteredSyllabus] = useState<Syllabus[]>([]);

  const [selectedDept, setSelectedDept] = useState<string>("");
  const [selectedBatch, setSelectedBatch] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Simulate fetching data from backend
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);

    // Simulated API call - Replace with actual backend endpoints
    setTimeout(() => {
      // Mock departments data
      const deptData = [
        { id: 1, name: "Computer Science", code: "CS" },
        { id: 2, name: "Mechanical Engineering", code: "ME" },
        { id: 3, name: "Electrical Engineering", code: "EE" },
        { id: 4, name: "Civil Engineering", code: "CE" },
      ];

      // Mock batches data
      const batchData = [
        { id: 1, year: "2024-2025", semester: "Fall" },
        { id: 2, year: "2024-2025", semester: "Spring" },
        { id: 3, year: "2023-2024", semester: "Fall" },
        { id: 4, year: "2023-2024", semester: "Spring" },
      ];

      // Mock syllabus data
      const syllabusItems = [
        {
          id: 1,
          deptId: 1,
          batchId: 1,
          courseName: "Data Structures & Algorithms",
          courseCode: "CS301",
          credits: 4,
          instructor: "Dr. Smith",
          uploadDate: "2024-08-15",
          fileUrl: "#",
        },
        {
          id: 2,
          deptId: 1,
          batchId: 1,
          courseName: "Database Management Systems",
          courseCode: "CS302",
          credits: 3,
          instructor: "Prof. Johnson",
          uploadDate: "2024-08-16",
          fileUrl: "#",
        },
        {
          id: 3,
          deptId: 1,
          batchId: 2,
          courseName: "Machine Learning",
          courseCode: "CS401",
          credits: 4,
          instructor: "Dr. Williams",
          uploadDate: "2024-01-10",
          fileUrl: "#",
        },
        {
          id: 4,
          deptId: 2,
          batchId: 1,
          courseName: "Thermodynamics",
          courseCode: "ME201",
          credits: 3,
          instructor: "Dr. Brown",
          uploadDate: "2024-08-14",
          fileUrl: "#",
        },
        {
          id: 5,
          deptId: 2,
          batchId: 1,
          courseName: "Fluid Mechanics",
          courseCode: "ME202",
          credits: 4,
          instructor: "Prof. Davis",
          uploadDate: "2024-08-17",
          fileUrl: "#",
        },
        {
          id: 6,
          deptId: 3,
          batchId: 1,
          courseName: "Circuit Analysis",
          courseCode: "EE301",
          credits: 3,
          instructor: "Dr. Miller",
          uploadDate: "2024-08-18",
          fileUrl: "#",
        },
        {
          id: 7,
          deptId: 4,
          batchId: 2,
          courseName: "Structural Engineering",
          courseCode: "CE401",
          credits: 4,
          instructor: "Prof. Wilson",
          uploadDate: "2024-01-12",
          fileUrl: "#",
        },
      ];

      setDepartments(deptData);
      setBatches(batchData);
      setSyllabusData(syllabusItems);
      setFilteredSyllabus(syllabusItems);
      setLoading(false);
    }, 1000);
  };

  // Filter syllabus based on selected department and batch
  useEffect(() => {
    filterSyllabus();
  }, [selectedDept, selectedBatch, searchTerm, syllabusData]);

  const filterSyllabus = () => {
    let filtered = [...syllabusData];

    if (selectedDept) {
      filtered = filtered.filter(
        (item) => item.deptId === parseInt(selectedDept)
      );
    }

    if (selectedBatch) {
      filtered = filtered.filter(
        (item) => item.batchId === parseInt(selectedBatch)
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSyllabus(filtered);
  };

  const getDepartmentName = (deptId: number): string => {
    const dept = departments.find((d) => d.id === deptId);
    return dept ? dept.name : "";
  };

  const getBatchName = (batchId: number): string => {
    const batch = batches.find((b) => b.id === batchId);
    return batch ? `${batch.year} - ${batch.semester}` : "";
  };

  const handleDownload = (syllabus: Syllabus): void => {
    alert(`Downloading syllabus for ${syllabus.courseName}`);
    // Implement actual download logic here
  };

  const resetFilters = () => {
    setSelectedDept("");
    setSelectedBatch("");
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-3 rounded-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Course Syllabus
                </h1>
                <p className="text-gray-600 mt-1">
                  Browse and download course syllabi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              Filter Syllabus
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Department Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Batch Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Batch
              </label>
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Batches</option>
                {batches.map((batch) => (
                  <option key={batch.id} value={batch.id}>
                    {batch.year} - {batch.semester}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Course name, code..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Reset Button */}
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedDept || selectedBatch) && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              {selectedDept && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {getDepartmentName(parseInt(selectedDept))}
                </span>
              )}
              {selectedBatch && (
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  {getBatchName(parseInt(selectedBatch))}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {filteredSyllabus.length}
            </span>{" "}
            syllabus
            {filteredSyllabus.length !== 1 ? "es" : ""}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading syllabus...</p>
          </div>
        )}

        {/* Syllabus Grid */}
        {!loading && filteredSyllabus.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSyllabus.map((syllabus) => (
              <div
                key={syllabus.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200"
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                  <h3 className="text-white font-semibold text-lg">
                    {syllabus.courseName}
                  </h3>
                  <p className="text-blue-100 text-sm mt-1">
                    {syllabus.courseCode}
                  </p>
                </div>

                <div className="p-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Department:</span>
                      <span className="font-medium text-gray-900">
                        {getDepartmentName(syllabus.deptId)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Batch:</span>
                      <span className="font-medium text-gray-900">
                        {getBatchName(syllabus.batchId)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Credits:</span>
                      <span className="font-medium text-gray-900">
                        {syllabus.credits}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Instructor:</span>
                      <span className="font-medium text-gray-900">
                        {syllabus.instructor}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-gray-500 pt-2 border-t">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Uploaded:{" "}
                        {new Date(syllabus.uploadDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(syllabus)}
                    className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors font-medium"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Syllabus</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredSyllabus.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Syllabus Found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
