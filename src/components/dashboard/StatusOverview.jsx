import React from 'react';
import { Monitor, CheckCircle2, UserCheck, AlertTriangle, PieChart } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { useComputers } from '../../context/ComputerContext';

export default function StatusOverview() {
  const { stats } = useComputers();

  const total = stats.total || 1; // avoid divide-by-zero
  const availablePct = Math.round((stats.available / total) * 100);
  const inUsePct = Math.round((stats.inUse / total) * 100);
  const maintenancePct = Math.round((stats.maintenance / total) * 100);

  const statusItems = [
    {
      status: 'Available',
      count: stats.available,
      percentage: availablePct,
      badgeVariant: 'success',
      icon: CheckCircle2,
      description: 'Ready for student allocation and walk-ins',
    },
    {
      status: 'In Use',
      count: stats.inUse,
      percentage: inUsePct,
      badgeVariant: 'primary',
      icon: UserCheck,
      description: 'Assigned to active student practical sessions',
    },
    {
      status: 'Maintenance',
      count: stats.maintenance,
      percentage: maintenancePct,
      badgeVariant: 'warning',
      icon: AlertTriangle,
      description: 'Hardware inspection or repair in progress',
    },
  ];

  return (
    <Card
      title="Computer Status Overview"
      subtitle="Current terminal availability & allocation distribution"
      icon={PieChart}
      action={
        <span className="text-xs font-mono font-medium text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60">
          Total: <span className="text-white font-bold">{stats.total} Units</span>
        </span>
      }
    >
      <div className="space-y-5">
        {/* Segmented Distribution Progress Bar */}
        <div>
          <div className="flex justify-between items-center text-xs text-slate-400 mb-2 font-medium">
            <span>Fleet Distribution</span>
            <span className="font-mono text-slate-300">
              {stats.available} Free • {stats.inUse} Busy • {stats.maintenance} Offline
            </span>
          </div>

          <div className="h-3.5 w-full bg-slate-950/80 rounded-full overflow-hidden p-0.5 border border-slate-800 flex gap-1 shadow-inner">
            {/* Available Segment */}
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-l-full transition-all duration-500 hover:opacity-90"
              style={{ width: `${(stats.available / total) * 100}%` }}
              title={`Available: ${stats.available} (${availablePct}%)`}
            />
            {/* In Use Segment */}
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 hover:opacity-90"
              style={{ width: `${(stats.inUse / total) * 100}%` }}
              title={`In Use: ${stats.inUse} (${inUsePct}%)`}
            />
            {/* Maintenance Segment */}
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-r-full transition-all duration-500 hover:opacity-90"
              style={{ width: `${(stats.maintenance / total) * 100}%` }}
              title={`Maintenance: ${stats.maintenance} (${maintenancePct}%)`}
            />
          </div>
        </div>

        {/* Breakdown Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {statusItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.status}
                className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                    {item.status}
                  </span>
                  <Badge variant={item.badgeVariant} size="sm">
                    {item.percentage}%
                  </Badge>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold font-mono text-white tracking-tight">
                    {item.count}
                  </span>
                  <span className="text-xs text-slate-500">/ {stats.total}</span>
                </div>

                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
