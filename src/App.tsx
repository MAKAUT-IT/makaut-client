import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import NoticesPage from './pages/NoticesPage';
import AboutPage from './pages/About'; // <- import About page
import MainLayout from './layouts/MainLayout';
import { useAuthStore } from './store/authStore';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} /> {/* <<< About is public */}

        {/* Protected area (wrapped with MainLayout) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="notices" element={<NoticesPage />} />
          {/* agar future me About ko layout ke andar dikhana ho to yahan add kar sakte ho:
              <Route path="about" element={<AboutPage />} />
          */}
        </Route>

        {/* Fallback: unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
