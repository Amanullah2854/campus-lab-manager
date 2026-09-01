import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Menu,
  Bell,
  Building2,
  Monitor,
  Users,
  CalendarClock,
  Wrench,
  LayoutDashboard,
} from 'lucide-react';
import Badge from '../common/Badge';
import { useComputers } from '../../context/ComputerContext';

const routeInfoMap = {
  '/': {
    title: 'Dashboard Overview',
    description: 'Real-time laboratory metrics, computer distribution, and recent activity logs.',
    icon: LayoutDashboard,
  },
  '/computers': {
    title: 'Computer Management',
    description: 'Hardware inventory, terminal status monitoring, and active seat assignments.',
    icon: Monitor,
  },
  '/students': {
    title: 'Student Lab Attendance',
    description: 'Student check-ins, roll number tracking, and active lab session logs.',
    icon: Users,
  },
  '/sessions': {
    title: 'Lab Sessions & Practicals',
    description: 'Course timetables, faculty supervisors, and classroom room bookings.',
    icon: CalendarClock,
  },
  '/maintenance': {
    title: 'Maintenance & Hardware Issues',
    description: 'Hardware defect reports, repair queue, and resolution statuses.',
    icon: Wrench,
  },
};

export default function Header({ onMenuClick }) {
  const location = useLocation();
  const { stats } = useComputers();
  const currentRoute = routeInfoMap[location.pathname] || routeInfoMap['/'];

  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 transition-all">
      {/* Left section: Mobile menu + Page Title & Contextual Description */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden border border-slate-700/60 transition-colors shrink-0 cursor-pointer"
          aria-label="Open navigation sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold text-white tracking-tight truncate">
              {currentRoute.title}
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800 text-[11px] font-medium text-slate-300 border border-slate-700/60">
              <Building2 className="w-3 h-3 text-cyan-400" />
              CSE Dept Lab
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 truncate hidden sm:block">
            {currentRoute.description}
          </p>
        </div>
      </div>

      {/* Right section: System Status & User Profile */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Quick Status Pill */}
        <div className="hidden md:flex items-center gap-2">
          <Badge status="available" size="sm" dot>
            {stats.available} Available
          </Badge>
          <Badge status="in-use" size="sm" dot>
            {stats.inUse} In Use
          </Badge>
        </div>

        {/* Notifications Icon Button */}
        <button
          className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
          aria-label="View notifications"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-slate-900" />
        </button>

        {/* User / Profile Area */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-800">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center font-bold text-white text-xs shadow-md shadow-cyan-600/20 ring-1 ring-white/10 shrink-0">
            LM
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-semibold text-slate-200 leading-tight">Lab Incharge</p>
            <p className="text-[10px] text-slate-400 font-medium">Dr. R. Vance (Admin)</p>
          </div>
        </div>
      </div>
    </header>
  );
}
