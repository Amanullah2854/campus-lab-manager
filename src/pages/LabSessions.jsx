import React, { useState } from 'react';
import {
  CalendarClock,
  Plus,
  Clock,
  User,
  MapPin,
  Users,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { MOCK_SESSIONS } from '../data/mockData';

export default function LabSessions() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredSessions = MOCK_SESSIONS.filter((session) => {
    if (activeTab === 'in-progress') return session.status === 'In Progress';
    if (activeTab === 'scheduled') return session.status === 'Scheduled';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Lab Sessions & Practicals</h1>
            <Badge variant="primary" size="sm">
              Semester 1 • Academic Year 2026-27
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Course laboratory timetables, faculty supervisors, and classroom room seat reservations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button variant="primary" icon={Plus} size="sm">
            Book Lab Session
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'all', label: 'All Sessions', count: MOCK_SESSIONS.length },
          { id: 'in-progress', label: 'Live Now', count: 2 },
          { id: 'scheduled', label: 'Upcoming', count: 1 },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>{tab.label}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] font-mono text-slate-300">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Session Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSessions.map((session) => (
          <Card
            key={session.id}
            className="flex flex-col justify-between hover:border-cyan-500/30 transition-all"
            headerClassName="border-slate-800/50"
            action={<Badge status={session.status} size="sm" dot />}
          >
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs font-bold">
                    {session.courseCode}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{session.batch}</span>
                </div>
                <h3 className="font-semibold text-slate-100 text-sm leading-snug">{session.title}</h3>
              </div>

              <div className="space-y-2 text-xs text-slate-300 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                <div className="flex items-center gap-2 text-slate-400">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-slate-300 font-medium">{session.instructor}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-slate-300">{session.lab}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-slate-300 font-mono">{session.time}</span>
                </div>
              </div>

              {/* Attendance Meter */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-400">Enrolled Attendance</span>
                  <span className="text-cyan-300 font-mono">
                    {session.presentCount} / {session.enrolledCount} Students
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 rounded-full"
                    style={{
                      width: `${
                        session.enrolledCount > 0
                          ? Math.round((session.presentCount / session.enrolledCount) * 100)
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-500 font-mono">ID: {session.id}</span>
              <button className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                View Roster →
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
