import React from 'react';
import {
  Wrench,
  Pencil,
  Trash2,
  AlertTriangle,
  Monitor,
  Building2,
  Calendar,
  User,
  CheckCircle2,
  Clock,
  ArrowRightCircle,
} from 'lucide-react';
import Badge from '../common/Badge';

export default function MaintenanceTable({
  records,
  onEdit,
  onChangeStatus,
  onDelete,
}) {
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return 'danger';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl shadow-xl shadow-black/20 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-semibold uppercase tracking-wider">
              <th className="py-3.5 px-4">Workstation</th>
              <th className="py-3.5 px-4">Lab Room</th>
              <th className="py-3.5 px-4">Issue & Diagnosis</th>
              <th className="py-3.5 px-4 text-center">Priority</th>
              <th className="py-3.5 px-4">Reported Date</th>
              <th className="py-3.5 px-4 text-center">Status</th>
              <th className="py-3.5 px-4">Reported By</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {records.map((record) => (
              <tr
                key={record.id}
                className="hover:bg-slate-800/40 transition-colors group"
              >
                {/* Computer ID */}
                <td className="py-3.5 px-4 font-mono font-bold text-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-105 transition-transform">
                      <Monitor className="w-3.5 h-3.5" />
                    </div>
                    <span>{record.computerId}</span>
                  </div>
                </td>

                {/* Lab Room */}
                <td className="py-3.5 px-4 text-slate-300">
                  <span className="inline-flex items-center gap-1 font-medium">
                    <Building2 className="w-3 h-3 text-slate-500" />
                    {record.lab}
                  </span>
                </td>

                {/* Issue Headline & Description Preview */}
                <td className="py-3.5 px-4 text-slate-200">
                  <div className="max-w-[240px]">
                    <p className="font-semibold text-slate-100 truncate" title={record.issue}>
                      {record.issue}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5" title={record.description}>
                      {record.description}
                    </p>
                  </div>
                </td>

                {/* Priority Badge */}
                <td className="py-3.5 px-4 text-center">
                  <Badge variant={getPriorityBadge(record.priority)} size="sm">
                    {record.priority}
                  </Badge>
                </td>

                {/* Reported Date */}
                <td className="py-3.5 px-4 text-slate-300 font-mono text-[11px]">
                  <div className="space-y-0.5">
                    <span className="flex items-center gap-1 text-slate-300">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {record.reportedDate}
                    </span>
                    {record.resolvedDate && (
                      <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        Fixed: {record.resolvedDate}
                      </span>
                    )}
                  </div>
                </td>

                {/* Status Dropdown/Selector */}
                <td className="py-3.5 px-4 text-center">
                  <div className="inline-flex items-center gap-1.5">
                    <select
                      value={record.status}
                      onChange={(e) => onChangeStatus(record.id, e.target.value)}
                      className={`text-xs font-semibold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer transition-colors ${
                        record.status === 'Resolved'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : record.status === 'In Progress'
                          ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      <option value="Reported" className="bg-slate-900 text-slate-200">
                        Reported
                      </option>
                      <option value="In Progress" className="bg-slate-900 text-slate-200">
                        In Progress
                      </option>
                      <option value="Resolved" className="bg-slate-900 text-slate-200">
                        Resolved
                      </option>
                    </select>
                  </div>
                </td>

                {/* Reported By */}
                <td className="py-3.5 px-4 text-slate-300">
                  <span className="inline-flex items-center gap-1.5 text-slate-300 text-[11px]">
                    <User className="w-3 h-3 text-slate-500" />
                    {record.reportedBy}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onEdit(record)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30 transition-all cursor-pointer"
                      title="Edit Ticket Details"
                      aria-label={`Edit ${record.computerId}`}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete(record)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/30 transition-all cursor-pointer"
                      title="Delete Ticket"
                      aria-label={`Delete ${record.computerId}`}
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
