import React, { useState } from 'react';
import {
  Users,
  Search,
  UserCheck,
  UserX,
  Clock,
  Download,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { MOCK_STUDENTS } from '../data/mockData';

export default function Students() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const filteredStudents = MOCK_STUDENTS.filter((st) => {
    const matchesDept = selectedDept === 'All' || st.department === selectedDept;
    const matchesSearch =
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.currentPc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Student Lab Attendance & Logs</h1>
            <Badge variant="success" size="sm" dot>
              44 In-Lab Now
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time student terminal allocations, roll number check-ins, and session duration telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button variant="secondary" icon={Download} size="sm">
            Export Attendance (CSV)
          </Button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <Card bodyClassName="p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student name, roll number, or PC..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-800 rounded-lg p-1 text-xs">
              <span className="text-slate-500 px-2 font-medium">Dept:</span>
              {['All', 'Computer Science', 'Artificial Intelligence', 'Information Tech'].map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                    selectedDept === dept
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {dept === 'Computer Science' ? 'CSE' : dept === 'Artificial Intelligence' ? 'AI' : dept === 'Information Tech' ? 'IT' : 'All'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Student Session Logs Table */}
      <Card
        title="Active Student Sessions"
        subtitle="Live workstation check-ins"
        icon={GraduationCap}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="pb-3 px-3">Roll Number</th>
                <th className="pb-3 px-3">Student Name</th>
                <th className="pb-3 px-3">Department & Batch</th>
                <th className="pb-3 px-3">Assigned Workstation</th>
                <th className="pb-3 px-3">Check-in Time</th>
                <th className="pb-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredStudents.map((st) => (
                <tr key={st.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 font-mono font-medium text-cyan-400">{st.rollNo}</td>
                  <td className="py-3 px-3 font-semibold text-slate-100">{st.name}</td>
                  <td className="py-3 px-3 text-slate-300">
                    <div>{st.department}</div>
                    <span className="text-[11px] text-slate-500">Batch {st.batch}</span>
                  </td>
                  <td className="py-3 px-3 font-mono">
                    {st.currentPc !== '-' ? (
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                        {st.currentPc} ({st.lab})
                      </span>
                    ) : (
                      <span className="text-slate-500">—</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-slate-400 font-mono">{st.checkInTime}</td>
                  <td className="py-3 px-3 text-right">
                    <Badge status={st.status === 'Active' ? 'active' : 'offline'} size="sm" dot>
                      {st.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
