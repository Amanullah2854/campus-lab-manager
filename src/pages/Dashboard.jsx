import React from 'react';
import {
  Monitor,
  CheckCircle2,
  Users,
  AlertTriangle,
  Building2,
  Calendar,
  Layers,
  ArrowUpRight,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../components/common/StatCard';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import StatusOverview from '../components/dashboard/StatusOverview';
import ActivityList from '../components/dashboard/ActivityList';
import QuickActions from '../components/dashboard/QuickActions';
import { useComputers } from '../context/ComputerContext';
import {
  LAB_ROOMS,
  MOCK_SESSIONS,
} from '../data/mockData';

export default function Dashboard() {
  const { stats } = useComputers();

  const total = stats.total || 1;
  const availablePct = `${Math.round((stats.available / total) * 100)}%`;
  const inUsePct = `${Math.round((stats.inUse / total) * 100)}%`;
  const maintenancePct = `${Math.round((stats.maintenance / total) * 100)}%`;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-indigo-950/40 border border-slate-800 p-6 lg:p-7 shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-2.5">
              <Sparkles className="w-3.5 h-3.5" />
              Central Computer Laboratories
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Lab Management & Telemetry
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
              Live monitoring of {stats.total} departmental workstations across 3 specialized computer labs, active practical sessions, and maintenance queues.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link to="/computers">
              <Button variant="primary" icon={Monitor} size="sm">
                View Computers
              </Button>
            </Link>
            <Link to="/sessions">
              <Button variant="secondary" icon={Calendar} size="sm">
                Schedule Timetable
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 1. Statistics Cards (Dynamically computed from computer state) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Computers"
          value={stats.total}
          subtitle="Across departmental labs"
          icon={Monitor}
          color="indigo"
          trend={{ value: '100%', positive: true }}
        />
        <StatCard
          title="Available"
          value={stats.available}
          subtitle="Ready for student allocation"
          icon={CheckCircle2}
          color="emerald"
          trend={{ value: availablePct, positive: true }}
        />
        <StatCard
          title="In Use"
          value={stats.inUse}
          subtitle="Active practical sessions"
          icon={Users}
          color="cyan"
          trend={{ value: inUsePct, positive: true }}
        />
        <StatCard
          title="Maintenance"
          value={stats.maintenance}
          subtitle="Hardware & driver review"
          icon={AlertTriangle}
          color="amber"
          trend={{ value: maintenancePct, positive: false }}
        />
      </div>

      {/* 2. Computer Status Overview */}
      <StatusOverview />

      {/* 3. Quick Actions */}
      <QuickActions />

      {/* 4. Recent Activity & Active Lab Practicals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity List */}
        <div className="lg:col-span-2">
          <ActivityList />
        </div>

        {/* Live Lab Rooms & Timetable Widget */}
        <div className="space-y-6">
          {/* Active Lab Sessions */}
          <Card
            title="Active Lab Sessions"
            subtitle="Happening right now"
            icon={Clock}
            action={
              <Link to="/sessions" className="text-xs text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1">
                All <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            }
          >
            <div className="space-y-3">
              {MOCK_SESSIONS.map((session) => (
                <div
                  key={session.id}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                      {session.courseCode}
                    </span>
                    <Badge status={session.status} size="sm" dot>
                      {session.status}
                    </Badge>
                  </div>
                  <h5 className="text-xs font-semibold text-slate-200 line-clamp-1">{session.title}</h5>
                  <div className="text-[11px] text-slate-400 space-y-1">
                    <div className="flex justify-between">
                      <span>{session.lab}</span>
                      <span className="text-slate-300 font-medium">{session.batch}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Instructor:</span>
                      <span className="text-slate-300">{session.instructor}</span>
                    </div>
                    <div className="flex justify-between font-mono text-[10px] text-cyan-300 pt-1">
                      <span>Attendance:</span>
                      <span>{session.presentCount} / {session.enrolledCount} Active</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Department Lab Capacities */}
          <Card
            title="Room Capacities"
            subtitle="Seats across labs"
            icon={Layers}
          >
            <div className="space-y-3">
              {LAB_ROOMS.map((lab) => (
                <div
                  key={lab.id}
                  className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs"
                >
                  <div className="flex justify-between font-medium text-slate-200 mb-1">
                    <span>{lab.name}</span>
                    <span className="font-mono text-cyan-400">{lab.activeCount}/{lab.capacity}</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 rounded-full"
                      style={{ width: `${(lab.activeCount / lab.capacity) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
