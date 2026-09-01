import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ComputerProvider } from './context/ComputerContext';
import { StudentProvider } from './context/StudentContext';
import { SessionProvider } from './context/SessionContext';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Computers from './pages/Computers';
import Students from './pages/Students';
import LabSessions from './pages/LabSessions';
import Maintenance from './pages/Maintenance';

export default function App() {
  return (
    <ComputerProvider>
      <StudentProvider>
        <SessionProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="computers" element={<Computers />} />
                <Route path="students" element={<Students />} />
                <Route path="sessions" element={<LabSessions />} />
                <Route path="maintenance" element={<Maintenance />} />
                {/* Catch-all redirect to dashboard */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </SessionProvider>
      </StudentProvider>
    </ComputerProvider>
  );
}
