import React, { useState } from 'react';
import {
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Plus,
  Search,
  Filter,
  ShieldAlert,
} from 'lucide-react';
import Card from '../components/common/Card';
import StatCard from '../components/common/StatCard';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { MOCK_MAINTENANCE_ISSUES } from '../data/mockData';

export default function Maintenance() {
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTickets = MOCK_MAINTENANCE_ISSUES.filter((tkt) => {
    const matchesPriority = priorityFilter === 'All' || tkt.priority.toLowerCase() === priorityFilter.toLowerCase();
    const matchesSearch =
      tkt.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tkt.pcId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tkt.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tkt.reportedBy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPriority && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Maintenance & Hardware Tickets</h1>
            <Badge variant="warning" size="sm" dot>
              3 Active
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Track faulty hardware, OS kernel errors, network outages, and equipment repair logs.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button variant="primary" icon={Plus} size="sm">
            Report Hardware Issue
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Open Tickets"
          value="4"
          subtitle="3 Pending • 1 Resolved"
          icon={Wrench}
          color="cyan"
        />
        <StatCard
          title="Critical Issues"
          value="1"
          subtitle="RAM failure in Lab 101"
          icon={AlertTriangle}
          color="rose"
        />
        <StatCard
          title="Avg Resolution Time"
          value="4.5h"
          subtitle="Hardware swap SLA"
          icon={Clock}
          color="indigo"
        />
        <StatCard
          title="Resolved This Week"
          value="18"
          subtitle="98% on-schedule"
          icon={CheckCircle2}
          color="emerald"
        />
      </div>

      {/* Search & Filter */}
      <Card bodyClassName="p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ticket ID (TKT-2041), PC, issue..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-800 rounded-lg p-1 text-xs">
            <span className="text-slate-500 px-2 font-medium">Priority:</span>
            {['All', 'High', 'Medium', 'Low'].map((pri) => (
              <button
                key={pri}
                onClick={() => setPriorityFilter(pri)}
                className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                  priorityFilter === pri
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {pri}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Ticket List */}
      <Card title="Hardware Incident Queue" subtitle="Reported system errors" icon={ShieldAlert}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="pb-3 px-3">Ticket ID</th>
                <th className="pb-3 px-3">Workstation</th>
                <th className="pb-3 px-3">Issue Description</th>
                <th className="pb-3 px-3">Reported By</th>
                <th className="pb-3 px-3">Priority</th>
                <th className="pb-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredTickets.map((tkt) => (
                <tr key={tkt.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-3 font-mono font-medium text-cyan-400">{tkt.id}</td>
                  <td className="py-3.5 px-3">
                    <span className="font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                      {tkt.pcId}
                    </span>
                    <span className="text-slate-500 ml-2 text-[11px]">{tkt.lab}</span>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="text-slate-200 font-medium max-w-md">{tkt.issue}</div>
                    <span className="text-[10px] text-slate-500 font-mono">{tkt.createdAt}</span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-300">{tkt.reportedBy}</td>
                  <td className="py-3.5 px-3">
                    <Badge status={tkt.priority} size="sm">
                      {tkt.priority}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <Badge status={tkt.status} size="sm" dot>
                      {tkt.status}
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
