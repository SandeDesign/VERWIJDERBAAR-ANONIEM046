import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import RoleGuard from './components/guards/RoleGuard';
import VerificationGuard from './components/guards/VerificationGuard';
import ErrorBoundary from './components/shared/ErrorBoundary';
import Loading from './components/shared/Loading';

// Pages
import Landing from './pages/Landing';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Dashboard from './pages/Dashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Unauthorized from './pages/Unauthorized';

function App() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loading text="App laden..." />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Landing />} 
          />
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginForm />} 
          />
          <Route 
            path="/registreren" 
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterForm />} 
          />

          {/* Customer routes */}
          <Route 
            path="/dashboard" 
            element={
              <RoleGuard allowedRoles={['customer']}>
                <Dashboard />
              </RoleGuard>
            } 
          />

          {/* Manager routes */}
          <Route 
            path="/manager" 
            element={
              <RoleGuard allowedRoles={['manager']}>
                <ManagerDashboard />
              </RoleGuard>
            } 
          />

          {/* Admin routes */}
          <Route 
            path="/admin" 
            element={
              <RoleGuard allowedRoles={['admin']}>
                <AdminDashboard />
              </RoleGuard>
            } 
          />

          {/* Error routes */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;