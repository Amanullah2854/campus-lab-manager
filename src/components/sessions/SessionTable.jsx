import React from 'react';
import {
  CalendarClock,
  Pencil,
  Trash2,
  Calendar,
  Clock,
  User,
  MapPin,
  BookOpen,
} from 'lucide-react';
import Badge from '../common/Badge';

export default function SessionTable({
  sessions,
  onEdit,
  onDelete,
}) {
  const getDeptBadge = (dept) => {
    switch (dept) {
      case 'Computer Science':
        return 'primary';
      case 'Artificial Intelligence':
        return 'purple';
      case 'Information Technology':
        return 'info';
      case 'Cyber Security':
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatDisplayTime = (start, end) => {
    if (!start || !end) return '-';
    return `${start} - ${end}`;
  };

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl shadow-xl shadow-black/20 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-semibold uppercase tracking-wider">
              <th className="py-3.5 px-4">Subject / Practical</th>
              <th className="py-3.5 px-4">Department</th>
              <th className="py-3.5 px-4">Target Year</th>
              <th className="py-3.5 px-4">Lab Room</th>
              <th className="py-3.5 px-4">Faculty Instructor</th>
              <th className="py-3.5 px-4">Date</th>
              <th className="py-3.5 px-4">Timing</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {sessions.map((session) => (
              <tr
                key={session.id}
                className="hover:bg-slate-800/40 transition-colors group"
              >
                {/* Subject */}
                <td className="py-3.5 px-4 font-semibold text-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:scale-105 transition-transform">
                      <CalendarClock className="w-3.5 h-3.5" />
                    </div>
                    <span className="max-w-[200px] truncate block" title={session.subject}>
                      {session.subject}
                    </span>
                  </div>
                </td>

                {/* Department */}
                <td className="py-3.5 px-4">
                  <Badge variant={getDeptBadge(session.department)} size="sm">
                    {session.department}
                  </Badge>
                </td>

                {/* Year */}
                <td className="py-3.5 px-4 text-slate-300">
                  <span className="inline-flex items-center gap-1 text-slate-300 font-medium">
                    <BookOpen className="w-3 h-3 text-slate-500" />
                    {session.year}
                  </span>
                </td>

                {/* Lab */}
                <td className="py-3.5 px-4 text-slate-300">
                  <span className="inline-flex items-center gap-1 font-mono text-cyan-300">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    {session.lab}
                  </span>
                </td>

                {/* Instructor */}
                <td className="py-3.5 px-4 text-slate-300">
                  <span className="inline-flex items-center gap-1.5 text-slate-200">
                    <User className="w-3 h-3 text-slate-500" />
                    {session.instructor}
                  </span>
                </td>

                {/* Date */}
                <td className="py-3.5 px-4 text-slate-300 font-mono">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    {session.date}
                  </span>
                </td>

                {/* Timing */}
                <td className="py-3.5 px-4 text-slate-300 font-mono">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 text-[11px]">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    {formatDisplayTime(session.startTime, session.endTime)}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onEdit(session)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30 transition-all cursor-pointer"
                      title="Edit Lab Session"
                      aria-label={`Edit ${session.subject}`}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete(session)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/30 transition-all cursor-pointer"
                      title="Delete Lab Session"
                      aria-label={`Delete ${session.subject}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
