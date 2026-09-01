import React from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  CalendarClock,
  UserCheck,
  Wrench,
  Clock,
} from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { MOCK_RECENT_ACTIVITIES } from '../../data/mockData';

const iconMap = {
  maintenance: { icon: AlertTriangle, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  available: { icon: CheckCircle2, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  session: { icon: CalendarClock, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
  assigned: { icon: UserCheck, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
  resolved: { icon: Wrench, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
};

export default function ActivityList() {
  return (
    <Card
      title="Recent Activity"
      subtitle="Chronological audit stream of lab terminals & sessions"
      icon={Activity}
    >
      <div className="divide-y divide-slate-800/80">
        {MOCK_RECENT_ACTIVITIES.map((activity) => {
          const itemConfig = iconMap[activity.type] || iconMap.available;
          const Icon = itemConfig.icon;

          return (
            <div
              key={activity.id}
              className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group transition-colors"
            >
              <div className="flex items-start gap-3 min-w-0">
                {/* Activity Type Icon */}
                <div
                  className={`p-2 rounded-xl border shrink-0 mt-0.5 sm:mt-0 ${itemConfig.color}`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {/* Description & Detail */}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs sm:text-sm font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {activity.title}
                    </p>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60">
                      {activity.computerId}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                    {activity.detail}
                  </p>
                </div>
              </div>

              {/* Status and Timestamp */}
              <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0 pl-11 sm:pl-0">
                <Badge variant={activity.badgeVariant} size="sm">
                  {activity.badge}
                </Badge>
                <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {activity.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
