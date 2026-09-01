import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Monitor,
  Users,
  CalendarClock,
  Wrench,
  Server,
  X,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useComputers } from '../../context/ComputerContext';

export default function Sidebar({ isOpen, onClose }) {
  const { stats } = useComputers();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Computers', path: '/computers', icon: Monitor, badge: `${stats.total} Total` },
    { name: 'Students', path: '/students', icon: Users, badge: `${stats.inUse} Active` },
    { name: 'Lab Sessions', path: '/sessions', icon: CalendarClock, badge: '1 Live' },
    { name: 'Maintenance', path: '/maintenance', icon: Wrench, badge: `${stats.maintenance} Issues` },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800/90 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 shadow-2xl lg:shadow-none',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Brand Header */}
        <div className="h-18 px-5 flex items-center justify-between border-b border-slate-800/90 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20 ring-1 ring-white/10 shrink-0">
              <Server className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                Campus Lab Manager
              </span>
              <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                <Building2 className="w-3 h-3 text-cyan-400" /> College Lab Portal
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation links */}
        <div className="flex-1 px-3.5 py-5 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Main Navigation
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={({ isActive }) =>
                  cn(
                    'group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/15 to-blue-500/10 text-cyan-300 border border-cyan-500/30 shadow-xs'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        className={cn(
                          'w-4 h-4 transition-colors',
                          isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-300'
                        )}
                      />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={cn(
                          'text-[10px] font-medium px-2 py-0.5 rounded-full border transition-colors',
                          isActive
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                            : 'bg-slate-800 text-slate-400 border-slate-700/60'
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}

          <div className="pt-6 px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Lab Environment
          </div>

          <div className="px-3.5 py-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2.5 text-xs text-slate-400">
            <div className="flex items-center justify-between font-medium text-slate-300">
              <span className="flex items-center gap-1.5 text-slate-200">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Network Link
              </span>
              <span className="text-emerald-400 font-mono text-[11px]">Online (1 Gbps)</span>
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Department</span>
              <span className="text-slate-300 font-medium">CSE / IT Labs</span>
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Active Workstations</span>
              <span className="font-mono text-cyan-300 font-medium">{stats.inUse} / {stats.total}</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-800/90 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <p className="font-medium text-slate-200">Lab Administration</p>
              <p className="text-[11px] text-slate-400">College Portal v1.0</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
