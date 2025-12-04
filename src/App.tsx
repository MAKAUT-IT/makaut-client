import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Galary from './pages/Gallery';
import RegisterPage from './pages/RegisterPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';
import NoticesPage from './pages/NoticesPage';
import StudentListPage from './pages/StudentListPage';
import AnnouncementPage from './pages/AnnouncementPage';
import CoursesPage from './pages/CoursesPage';
import MarksPage from './pages/MarksPage';
import AttendancePage from './pages/AttendancePage';
import MainLayout from './layouts/MainLayout';
import { useAuthStore } from './store/authStore';
import { Loader2 } from 'lucide-react';
import FacultyListPage from './pages/FacultyListPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  const { fetchUser, token } = useAuthStore();

  useEffect(() => {
    // Fetch user data on app startup if token exists
    if (token) {
      fetchUser();
    }
  }, [fetchUser, token]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="gallery" element={<Galary />} />
          <Route path="notices" element={<NoticesPage />} />
          <Route path="students" element={<StudentListPage />} />
          <Route path="announcements" element={<AnnouncementPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="marks" element={<MarksPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="faculty" element={<FacultyListPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
