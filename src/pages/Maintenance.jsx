import React, { useState } from 'react';
import {
  Wrench,
  Search,
  Plus,
  X,
  CheckCircle2,
  AlertTriangle,
  Clock,
  RotateCcw,
  ShieldAlert,
  Flame,
  Filter,
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import ConfirmDialog from '../components/common/ConfirmDialog';
import MaintenanceModal from '../components/maintenance/MaintenanceModal';
import MaintenanceTable from '../components/maintenance/MaintenanceTable';
import { useMaintenance } from '../context/MaintenanceContext';

export default function Maintenance() {
  const {
    maintenanceRecords,
    addRecord,
    editRecord,
    updateStatus,
    deleteRecord,
    stats,
  } = useMaintenance();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Delete Confirmation State
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Toast message
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Filter records
  const filteredRecords = maintenanceRecords.filter((record) => {
    const matchesStatus =
      statusFilter === 'All' || record.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesPriority =
      priorityFilter === 'All' || record.priority.toLowerCase() === priorityFilter.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      record.computerId.toLowerCase().includes(query) ||
      record.lab.toLowerCase().includes(query) ||
      record.issue.toLowerCase().includes(query) ||
      record.description.toLowerCase().includes(query) ||
      record.reportedBy.toLowerCase().includes(query) ||
      record.priority.toLowerCase().includes(query) ||
      record.status.toLowerCase().includes(query);

    return matchesStatus && matchesPriority && matchesSearch;
  });

  // Handlers
  const handleOpenAddModal = () => {
    setModalMode('add');
    setSelectedRecord(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (record) => {
    setModalMode('edit');
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleSaveRecord = (recordData) => {
    if (modalMode === 'add') {
      addRecord(recordData);
      showToast(`Ticket for workstation ${recordData.computerId} created successfully.`);
    } else if (modalMode === 'edit' && selectedRecord) {
      editRecord(selectedRecord.id, recordData);
      showToast(`Maintenance ticket for ${recordData.computerId} updated.`);
    }
  };

  const handleChangeStatus = (id, newStatus) => {
    updateStatus(id, newStatus);
    showToast(`Status updated to "${newStatus}".`);
  };

  const handleOpenDeleteConfirm = (record) => {
    setDeleteTarget(record);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteRecord(deleteTarget.id);
      showToast(`Maintenance ticket for ${deleteTarget.computerId} deleted.`);
      setIsConfirmOpen(false);
      setDeleteTarget(null);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setPriorityFilter('All');
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-900 border border-cyan-500/40 px-4 py-3 rounded-xl shadow-2xl text-xs text-cyan-300 animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-white tracking-tight">Maintenance Management</h1>
            <Badge variant="warning" size="sm">
              {stats.reported + stats.inProgress} Active Tickets
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Track hardware malfunctions, OS driver errors, network cable outages, and equipment repair logs.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="primary"
            icon={Plus}
            size="md"
            onClick={handleOpenAddModal}
          >
            Report Issue
          </Button>
        </div>
      </div>

      {/* Maintenance Statistics Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-400">Total Tickets</span>
            <p className="text-xl font-bold font-mono text-white mt-0.5">{stats.total}</p>
          </div>
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Wrench className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-400">Reported (New)</span>
            <p className="text-xl font-bold font-mono text-amber-400 mt-0.5">{stats.reported}</p>
          </div>
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-400">In Progress</span>
            <p className="text-xl font-bold font-mono text-cyan-400 mt-0.5">{stats.inProgress}</p>
          </div>
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-400">Resolved</span>
            <p className="text-xl font-bold font-mono text-emerald-400 mt-0.5">{stats.resolved}</p>
          </div>
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between col-span-2 sm:col-span-1">
          <div>
            <span className="text-[11px] font-medium text-slate-400">High Priority</span>
            <p className="text-xl font-bold font-mono text-rose-400 mt-0.5">{stats.highPriority}</p>
          </div>
          <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <Flame className="w-4 h-4" />
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
              placeholder="Search ticket, PC ID, issue description, reporter..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-9.5 pr-8 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            {/* Status Filter */}
            <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-800 rounded-lg p-1 text-xs overflow-x-auto">
              <span className="text-slate-500 px-2 font-medium">Status:</span>
              {[
                { label: 'All', count: stats.total },
                { label: 'Reported', count: stats.reported },
                { label: 'In Progress', count: stats.inProgress },
                { label: 'Resolved', count: stats.resolved },
              ].map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setStatusFilter(tab.label)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1 cursor-pointer ${
                    statusFilter.toLowerCase() === tab.label.toLowerCase()
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-slate-800 text-slate-300">
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Priority Filter */}
            <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-800 rounded-lg p-1 text-xs">
              <span className="text-slate-500 px-2 font-medium">Priority:</span>
              {['All', 'High', 'Medium', 'Low'].map((pri) => (
                <button
                  key={pri}
                  onClick={() => setPriorityFilter(pri)}
                  className={`px-2 py-1 rounded-md font-medium transition-all cursor-pointer ${
                    priorityFilter === pri
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {pri}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Main Table / Empty State */}
      {filteredRecords.length > 0 ? (
        <MaintenanceTable
          records={filteredRecords}
          onEdit={handleOpenEditModal}
          onChangeStatus={handleChangeStatus}
          onDelete={handleOpenDeleteConfirm}
        />
      ) : (
        /* Empty State */
        <Card bodyClassName="p-12 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center mx-auto">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">No maintenance tickets found</h3>
              <p className="text-xs text-slate-400 mt-1">
                {searchQuery || statusFilter !== 'All' || priorityFilter !== 'All'
                  ? `No records match your active filters or search query "${searchQuery}".`
                  : 'No hardware issues are currently reported for laboratory computers.'}
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              {(searchQuery || statusFilter !== 'All' || priorityFilter !== 'All') && (
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
                Report New Issue
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Add / Edit Maintenance Modal */}
      <MaintenanceModal
        isOpen={isModalOpen}
        mode={modalMode}
        initialData={selectedRecord}
        onSave={handleSaveRecord}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Delete Maintenance Ticket"
        message="Are you sure you want to delete this maintenance ticket record? This diagnostic log will be permanently deleted."
        itemLabel={deleteTarget ? `${deleteTarget.computerId} - ${deleteTarget.issue}` : ''}
        confirmText="Yes, Delete Ticket"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsConfirmOpen(false);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
