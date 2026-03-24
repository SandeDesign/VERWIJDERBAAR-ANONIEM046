import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import { YouthStartPage } from './pages/YouthStartPage';
import { YouthChatPage } from './pages/YouthChatPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';

function App() {
  const { currentUser, userRole, initAuth, isLoading } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Laden...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<YouthStartPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Youth chat route - requires anonymous auth */}
        <Route 
          path="/chat/:conversationId" 
          element={
            currentUser && userRole === 'jongere' ? 
            <YouthChatPage /> : 
            <Navigate to="/" />
          } 
        />
        
        {/* Staff routes - requires email auth */}
        <Route 
          path="/dashboard" 
          element={
            currentUser && (userRole === 'begeleider' || userRole === 'beheerder') ? 
            <DashboardPage /> : 
            <Navigate to="/login" />
          } 
        />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;