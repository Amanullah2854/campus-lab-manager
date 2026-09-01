import React from 'react';
import {
  GraduationCap,
  Pencil,
  Trash2,
  Mail,
  Phone,
  Building2,
  Calendar,
} from 'lucide-react';
import Badge from '../common/Badge';

export default function StudentTable({
  students,
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

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl shadow-xl shadow-black/20 overflow-hidden">
      {/* Table view */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-semibold uppercase tracking-wider">
              <th className="py-3.5 px-4">Student ID</th>
              <th className="py-3.5 px-4">Full Name</th>
              <th className="py-3.5 px-4">Department</th>
              <th className="py-3.5 px-4">Academic Year</th>
              <th className="py-3.5 px-4">Institutional Email</th>
              <th className="py-3.5 px-4">Phone Number</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {students.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-slate-800/40 transition-colors group"
              >
                {/* Student ID */}
                <td className="py-3.5 px-4 font-mono font-bold text-cyan-400">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-105 transition-transform">
                      <GraduationCap className="w-3.5 h-3.5" />
                    </div>
                    <span>{student.studentId}</span>
                  </div>
                </td>

                {/* Name */}
                <td className="py-3.5 px-4 font-semibold text-slate-100">
                  {student.name}
                </td>

                {/* Department */}
                <td className="py-3.5 px-4">
                  <Badge variant={getDeptBadge(student.department)} size="sm">
                    {student.department}
                  </Badge>
                </td>

                {/* Academic Year */}
                <td className="py-3.5 px-4 text-slate-300">
                  <span className="inline-flex items-center gap-1 text-slate-300 font-medium">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    {student.year}
                  </span>
                </td>

                {/* Email */}
                <td className="py-3.5 px-4 text-slate-300">
                  <a
                    href={`mailto:${student.email}`}
                    className="inline-flex items-center gap-1.5 text-slate-300 hover:text-cyan-300 transition-colors"
                  >
                    <Mail className="w-3 h-3 text-slate-500" />
                    <span className="font-mono text-[11px]">{student.email}</span>
                  </a>
                </td>

                {/* Phone */}
                <td className="py-3.5 px-4 text-slate-300">
                  <span className="inline-flex items-center gap-1.5 text-slate-300 font-mono text-[11px]">
                    <Phone className="w-3 h-3 text-slate-500" />
                    {student.phone}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onEdit(student)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30 transition-all cursor-pointer"
                      title="Edit Student"
                      aria-label={`Edit ${student.name}`}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete(student)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/30 transition-all cursor-pointer"
                      title="Delete Student"
                      aria-label={`Delete ${student.name}`}
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
