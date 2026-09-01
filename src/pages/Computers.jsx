import React, { useState } from 'react';
import {
  Monitor,
  Search,
  Plus,
  X,
  Filter,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import ConfirmDialog from '../components/common/ConfirmDialog';
import ComputerModal from '../components/computers/ComputerModal';
import ComputerTable from '../components/computers/ComputerTable';
import { useComputers } from '../context/ComputerContext';

export default function Computers() {
  const { computers, addComputer, editComputer, deleteComputer, stats } = useComputers();

  // Search and Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [selectedComputer, setSelectedComputer] = useState(null);

  // Delete Confirmation State
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Feedback Toast state (optional subtle notification)
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Filter computers by search query and status
  const filteredComputers = computers.filter((pc) => {
    const matchesStatus =
      statusFilter === 'All' || pc.status.toLowerCase() === statusFilter.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      pc.computerId.toLowerCase().includes(query) ||
      pc.lab.toLowerCase().includes(query) ||
      pc.processor.toLowerCase().includes(query) ||
      pc.operatingSystem.toLowerCase().includes(query) ||
      pc.ram.toLowerCase().includes(query) ||
      pc.storage.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  // Handlers
  const handleOpenAddModal = () => {
    setModalMode('add');
    setSelectedComputer(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (computer) => {
    setModalMode('edit');
    setSelectedComputer(computer);
    setIsModalOpen(true);
  };

  const handleSaveComputer = (computerData) => {
    if (modalMode === 'add') {
      addComputer(computerData);
      showToast(`Workstation ${computerData.computerId} registered successfully.`);
    } else if (modalMode === 'edit' && selectedComputer) {
      editComputer(selectedComputer.id, computerData);
      showToast(`Workstation ${computerData.computerId} updated successfully.`);
    }
  };

  const handleOpenDeleteConfirm = (computer) => {
    setDeleteTarget(computer);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteComputer(deleteTarget.id);
      showToast(`Workstation ${deleteTarget.computerId} removed from inventory.`);
      setIsConfirmOpen(false);
      setDeleteTarget(null);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification Banner */}
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
            <h1 className="text-2xl font-bold text-white tracking-tight">Computer Management</h1>
            <Badge variant="primary" size="sm">
              {computers.length} Total Units
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Hardware specifications, departmental lab allocations, operating systems, and real-time status of all computer workstations.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="primary"
            icon={Plus}
            size="md"
            onClick={handleOpenAddModal}
          >
            Add Computer
          </Button>
        </div>
      </div>

      {/* Metric Quick Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-400">Total Workstations</span>
            <p className="text-xl font-bold font-mono text-white mt-0.5">{stats.total}</p>
          </div>
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Monitor className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-400">Available</span>
            <p className="text-xl font-bold font-mono text-emerald-400 mt-0.5">{stats.available}</p>
          </div>
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-400">In Use</span>
            <p className="text-xl font-bold font-mono text-cyan-400 mt-0.5">{stats.inUse}</p>
          </div>
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-400">Maintenance</span>
            <p className="text-xl font-bold font-mono text-amber-400 mt-0.5">{stats.maintenance}</p>
          </div>
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Search and Status Filter Controls */}
      <Card bodyClassName="p-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Computer ID, Lab, Processor, OS..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-9.5 pr-8 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-800 rounded-lg p-1 text-xs w-full lg:w-auto overflow-x-auto">
            <span className="text-slate-500 px-2 font-medium hidden sm:inline">Status:</span>
            {[
              { label: 'All', count: stats.total },
              { label: 'Available', count: stats.available },
              { label: 'In Use', count: stats.inUse },
              { label: 'Maintenance', count: stats.maintenance },
            ].map((tab) => (
              <button
                key={tab.label}
                onClick={() => setStatusFilter(tab.label)}
                className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  statusFilter.toLowerCase() === tab.label.toLowerCase()
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>{tab.label}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Main Content: Table or Empty State */}
      {filteredComputers.length > 0 ? (
        <ComputerTable
          computers={filteredComputers}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteConfirm}
        />
      ) : (
        /* Empty State */
        <Card bodyClassName="p-12 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center mx-auto">
              <Monitor className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">No computers found</h3>
              <p className="text-xs text-slate-400 mt-1">
                {searchQuery || statusFilter !== 'All'
                  ? `No computer workstations match your active filter "${statusFilter}" or search "${searchQuery}".`
                  : 'No computer workstations are currently registered in the database.'}
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              {(searchQuery || statusFilter !== 'All') && (
                <Button
                  variant="secondary"
                  size="sm"
                  icon={RotateCcw}
                  onClick={handleClearFilters}
                >
                  Reset Search & Filters
                </Button>
              )}
              <Button
                variant="primary"
                size="sm"
                icon={Plus}
                onClick={handleOpenAddModal}
              >
                Add New Computer
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Add / Edit Computer Modal */}
      <ComputerModal
        isOpen={isModalOpen}
        mode={modalMode}
        initialData={selectedComputer}
        onSave={handleSaveComputer}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Delete Workstation Record"
        message="Are you sure you want to delete this computer terminal from the inventory? This operation cannot be reversed."
        itemLabel={deleteTarget ? `${deleteTarget.computerId} (${deleteTarget.lab})` : ''}
        confirmText="Yes, Delete Computer"
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
