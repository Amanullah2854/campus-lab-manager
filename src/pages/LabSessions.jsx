import React, { useState } from 'react';
import {
  CalendarClock,
  Search,
  Plus,
  X,
  CheckCircle2,
  Calendar,
  Clock,
  RotateCcw,
  Building2,
  BookOpen,
  Layers,
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import ConfirmDialog from '../components/common/ConfirmDialog';
import SessionModal from '../components/sessions/SessionModal';
import SessionTable from '../components/sessions/SessionTable';
import { useSessions } from '../context/SessionContext';
import { useToast } from '../context/ToastContext';

export default function LabSessions() {
  const { sessions, addSession, editSession, deleteSession, stats } = useSessions();
  const { showToast } = useToast();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [labFilter, setLabFilter] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedSession, setSelectedSession] = useState(null);

  // Delete Confirmation State
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Filter sessions
  const filteredSessions = sessions.filter((session) => {
    const matchesDept = deptFilter === 'All' || session.department === deptFilter;
    const matchesLab = labFilter === 'All' || session.lab.includes(labFilter);
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      session.subject.toLowerCase().includes(query) ||
      session.department.toLowerCase().includes(query) ||
      session.instructor.toLowerCase().includes(query) ||
      session.lab.toLowerCase().includes(query) ||
      session.year.toLowerCase().includes(query) ||
      session.date.includes(query);

    return matchesDept && matchesLab && matchesSearch;
  });

  // Handlers
  const handleOpenAddModal = () => {
    setModalMode('add');
    setSelectedSession(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (session) => {
    setModalMode('edit');
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const handleSaveSession = (sessionData) => {
    if (modalMode === 'add') {
      addSession(sessionData);
      showToast(`Lab Session "${sessionData.subject}" scheduled successfully.`, 'success');
    } else if (modalMode === 'edit' && selectedSession) {
      editSession(selectedSession.id, sessionData);
      showToast(`Lab Session "${sessionData.subject}" updated successfully.`, 'info');
    }
  };

  const handleOpenDeleteConfirm = (session) => {
    setDeleteTarget(session);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteSession(deleteTarget.id);
      showToast(`Session "${deleteTarget.subject}" removed from timetable.`, 'warning');
      setIsConfirmOpen(false);
      setDeleteTarget(null);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setDeptFilter('All');
    setLabFilter('All');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-white tracking-tight">Lab Session Management</h1>
            <Badge variant="purple" size="sm">
              {sessions.length} Scheduled Practicals
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Course practical timetables, classroom room bookings, faculty supervisors, and session schedules.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="primary"
            icon={Plus}
            size="md"
            onClick={handleOpenAddModal}
          >
            Add Lab Session
          </Button>
        </div>
      </div>

      {/* Metric Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-400">Total Practicals</span>
            <p className="text-xl font-bold font-mono text-white mt-0.5">{stats.total}</p>
          </div>
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <CalendarClock className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-400">Labs In Use</span>
            <p className="text-xl font-bold font-mono text-cyan-300 mt-0.5">3 Active</p>
          </div>
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Layers className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-400">Weekly Schedule</span>
            <p className="text-xl font-bold font-mono text-emerald-300 mt-0.5">5 Days</p>
          </div>
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Calendar className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-400">Time Slots</span>
            <p className="text-xl font-bold font-mono text-amber-300 mt-0.5">2hr Blocks</p>
          </div>
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <Card bodyClassName="p-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Subject, Dept, Instructor, Lab..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-9.5 pr-8 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 cursor-pointer"
                title="Clear search"
                aria-label="Clear search query"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {/* Department Filter */}
            <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-800 rounded-lg p-1 text-xs overflow-x-auto">
              <span className="text-slate-500 px-2 font-medium">Dept:</span>
              {[
                { label: 'All', value: 'All' },
                { label: 'CSE', value: 'Computer Science' },
                { label: 'AI', value: 'Artificial Intelligence' },
                { label: 'IT', value: 'Information Technology' },
                { label: 'Cyber', value: 'Cyber Security' },
              ].map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setDeptFilter(tab.value)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                    deptFilter === tab.value
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Lab Room Filter */}
            <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-800 rounded-lg p-1 text-xs">
              <span className="text-slate-500 px-2 font-medium">Lab:</span>
              {['All', '101', '102', '103'].map((lab) => (
                <button
                  key={lab}
                  onClick={() => setLabFilter(lab)}
                  className={`px-2 py-1 rounded-md font-medium transition-all cursor-pointer ${
                    labFilter === lab
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {lab === 'All' ? 'All' : `Lab ${lab}`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Main Table / Empty State */}
      {filteredSessions.length > 0 ? (
        <SessionTable
          sessions={filteredSessions}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteConfirm}
        />
      ) : (
        /* Empty State */
        <Card bodyClassName="p-12 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center mx-auto">
              <CalendarClock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">No lab sessions found</h3>
              <p className="text-xs text-slate-400 mt-1">
                {searchQuery || deptFilter !== 'All' || labFilter !== 'All'
                  ? `No practical sessions match your active filters or search "${searchQuery}".`
                  : 'No lab sessions are currently scheduled in the timetable.'}
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              {(searchQuery || deptFilter !== 'All' || labFilter !== 'All') && (
                <Button
                  variant="secondary"
                  size="sm"
                  icon={RotateCcw}
                  onClick={handleClearFilters}
                >
                  Reset Filters
                </Button>
              )}
              <Button
                variant="primary"
                size="sm"
                icon={Plus}
                onClick={handleOpenAddModal}
              >
                Schedule New Session
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Add / Edit Session Modal */}
      <SessionModal
        isOpen={isModalOpen}
        mode={modalMode}
        initialData={selectedSession}
        onSave={handleSaveSession}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Cancel Lab Practical Session"
        message="Are you sure you want to cancel this scheduled lab session? Room reservations will be released."
        itemLabel={deleteTarget ? `${deleteTarget.subject} (${deleteTarget.lab}, ${deleteTarget.date})` : ''}
        confirmText="Yes, Cancel Session"
        cancelText="Keep Session"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsConfirmOpen(false);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
