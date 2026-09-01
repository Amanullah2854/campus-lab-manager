import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="lg:pl-72 flex flex-col flex-1 min-w-0 transition-all duration-300">
        {/* Top Header */}
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="px-6 py-4 border-t border-slate-900 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl w-full mx-auto">
          <p>© 2026 Campus Lab Manager • College Computer Laboratory Management System</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Status: Operational
            </span>
            <span>•</span>
            <span>React + Vite</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
