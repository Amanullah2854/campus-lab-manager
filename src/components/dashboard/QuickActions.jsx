import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Monitor,
  UserPlus,
  CalendarPlus,
  Wrench,
  ChevronRight,
} from 'lucide-react';
import Card from '../common/Card';

const actionItems = [
  {
    title: 'Add Computer',
    subtitle: 'Register new terminal & IP',
    icon: Monitor,
    to: '/computers',
    color: 'from-cyan-500/20 to-blue-500/10 hover:border-cyan-500/40 text-cyan-300',
    iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  },
  {
    title: 'Add Student',
    subtitle: 'Assign roll number to lab seat',
    icon: UserPlus,
    to: '/students',
    color: 'from-emerald-500/20 to-teal-500/10 hover:border-emerald-500/40 text-emerald-300',
    iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  {
    title: 'Schedule Lab Session',
    subtitle: 'Book classroom & timetable',
    icon: CalendarPlus,
    to: '/sessions',
    color: 'from-indigo-500/20 to-purple-500/10 hover:border-indigo-500/40 text-indigo-300',
    iconBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  },
  {
    title: 'Report Maintenance',
    subtitle: 'Create hardware repair ticket',
    icon: Wrench,
    to: '/maintenance',
    color: 'from-amber-500/20 to-rose-500/10 hover:border-amber-500/40 text-amber-300',
    iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
];

export default function QuickActions() {
  return (
    <Card
      title="Quick Actions"
      subtitle="Frequently accessed laboratory workflows"
      icon={Zap}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {actionItems.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.title}
              to={action.to}
              className={`p-4 rounded-xl bg-gradient-to-br border border-slate-800/90 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex flex-col justify-between group cursor-pointer ${action.color}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl border ${action.iconBg}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-200 group-hover:translate-x-0.5 transition-all" />
              </div>

              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-slate-100 group-hover:text-white transition-colors">
                  {action.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {action.subtitle}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}
