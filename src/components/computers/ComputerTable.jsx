import React from 'react';
import {
  Monitor,
  Pencil,
  Trash2,
  Cpu,
  HardDrive,
  Building2,
  Server,
} from 'lucide-react';
import Badge from '../common/Badge';

export default function ComputerTable({
  computers,
  onEdit,
  onDelete,
}) {
  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl shadow-xl shadow-black/20 overflow-hidden">
      {/* Desktop & Tablet Table View */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-semibold uppercase tracking-wider">
              <th className="py-3.5 px-4">Computer ID</th>
              <th className="py-3.5 px-4">Assigned Lab</th>
              <th className="py-3.5 px-4">Processor (CPU)</th>
              <th className="py-3.5 px-4">RAM</th>
              <th className="py-3.5 px-4">Storage</th>
              <th className="py-3.5 px-4">Operating System</th>
              <th className="py-3.5 px-4 text-center">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {computers.map((pc) => (
              <tr
                key={pc.id}
                className="hover:bg-slate-800/40 transition-colors group"
              >
                {/* Computer ID */}
                <td className="py-3.5 px-4 font-mono font-bold text-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-105 transition-transform">
                      <Monitor className="w-3.5 h-3.5" />
                    </div>
                    <span>{pc.computerId}</span>
                  </div>
                </td>

                {/* Lab */}
                <td className="py-3.5 px-4 text-slate-300">
                  <span className="inline-flex items-center gap-1 text-slate-300 font-medium">
                    <Building2 className="w-3 h-3 text-slate-500" />
                    {pc.lab}
                  </span>
                </td>

                {/* Processor */}
                <td className="py-3.5 px-4 text-slate-300">
                  <span className="font-mono text-slate-200 truncate max-w-[180px] block" title={pc.processor}>
                    {pc.processor}
                  </span>
                </td>

                {/* RAM */}
                <td className="py-3.5 px-4">
                  <span className="font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                    {pc.ram}
                  </span>
                </td>

                {/* Storage */}
                <td className="py-3.5 px-4 text-slate-300 font-mono">
                  {pc.storage}
                </td>

                {/* OS */}
                <td className="py-3.5 px-4 text-slate-300">
                  <span className="truncate max-w-[140px] block" title={pc.operatingSystem}>
                    {pc.operatingSystem}
                  </span>
                </td>

                {/* Status */}
                <td className="py-3.5 px-4 text-center">
                  <Badge status={pc.status} size="sm" dot>
                    {pc.status}
                  </Badge>
                </td>

                {/* Actions */}
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onEdit(pc)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30 transition-all cursor-pointer"
                      title="Edit Computer"
                      aria-label={`Edit ${pc.computerId}`}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete(pc)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/30 transition-all cursor-pointer"
                      title="Delete Computer"
                      aria-label={`Delete ${pc.computerId}`}
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
