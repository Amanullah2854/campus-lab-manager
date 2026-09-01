import React, { useState, useEffect } from 'react';
import { Monitor, X, Check, Cpu, HardDrive, Server, AlertCircle } from 'lucide-react';
import Button from '../common/Button';

const LAB_OPTIONS = [
  'Lab 101 - Systems',
  'Lab 102 - AI & DS',
  'Lab 103 - Web Tech',
  'Lab 104 - Networks & Security',
];

const RAM_OPTIONS = [
  '8GB DDR4',
  '16GB DDR4',
  '16GB DDR5',
  '32GB DDR5',
  '64GB DDR5',
  '128GB DDR5',
];

const OS_OPTIONS = [
  'Ubuntu 22.04 LTS',
  'Ubuntu 24.04 LTS',
  'Windows 11 Pro',
  'Debian 12',
  'Fedora Workstation 40',
  'macOS Sequoia (Virtual/Bare)',
];

const STATUS_OPTIONS = ['Available', 'In Use', 'Maintenance'];

const initialFormValues = {
  computerId: '',
  lab: 'Lab 101 - Systems',
  processor: '',
  ram: '32GB DDR5',
  storage: '',
  operatingSystem: 'Ubuntu 22.04 LTS',
  status: 'Available',
};

export default function ComputerModal({
  isOpen,
  mode = 'add', // 'add' | 'edit'
  initialData = null,
  onSave,
  onClose,
}) {
  const [formData, setFormData] = useState(initialFormValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && initialData) {
        setFormData({
          computerId: initialData.computerId || '',
          lab: initialData.lab || 'Lab 101 - Systems',
          processor: initialData.processor || '',
          ram: initialData.ram || '32GB DDR5',
          storage: initialData.storage || '',
          operatingSystem: initialData.operatingSystem || 'Ubuntu 22.04 LTS',
          status: initialData.status || 'Available',
        });
      } else {
        setFormData(initialFormValues);
      }
      setErrors({});
    }
  }, [isOpen, mode, initialData]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.computerId.trim()) {
      newErrors.computerId = 'Computer ID is required (e.g. LAB-045)';
    } else if (formData.computerId.trim().length < 3) {
      newErrors.computerId = 'Computer ID must be at least 3 characters';
    }

    if (!formData.lab) {
      newErrors.lab = 'Please select a laboratory';
    }

    if (!formData.processor.trim()) {
      newErrors.processor = 'Processor specification is required (e.g. Intel i7-13700)';
    }

    if (!formData.ram) {
      newErrors.ram = 'RAM specification is required';
    }

    if (!formData.storage.trim()) {
      newErrors.storage = 'Storage capacity is required (e.g. 1TB NVMe SSD)';
    }

    if (!formData.operatingSystem) {
      newErrors.operatingSystem = 'Operating system is required';
    }

    if (!STATUS_OPTIONS.includes(formData.status)) {
      newErrors.status = 'Invalid status option selected';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave({
        ...formData,
        computerId: formData.computerId.trim().toUpperCase(),
        processor: formData.processor.trim(),
        storage: formData.storage.trim(),
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Content */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-black/80 z-10 overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-slate-800/90 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Monitor className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                {mode === 'edit' ? 'Edit Computer Workstation' : 'Register New Computer'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {mode === 'edit'
                  ? `Update configuration details for ${initialData?.computerId}`
                  : 'Add a new workstation terminal to the laboratory inventory'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Computer ID */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Computer ID <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.computerId}
                onChange={(e) => setFormData({ ...formData, computerId: e.target.value })}
                placeholder="e.g. LAB-045"
                className={`w-full bg-slate-950/80 border rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 font-mono focus:outline-none transition-colors ${
                  errors.computerId
                    ? 'border-rose-500/80 focus:border-rose-500 ring-1 ring-rose-500/30'
                    : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
              {errors.computerId && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {errors.computerId}
                </p>
              )}
            </div>

            {/* Laboratory Location */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Assigned Lab <span className="text-rose-400">*</span>
              </label>
              <select
                value={formData.lab}
                onChange={(e) => setFormData({ ...formData, lab: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                {LAB_OPTIONS.map((lab) => (
                  <option key={lab} value={lab}>
                    {lab}
                  </option>
                ))}
              </select>
              {errors.lab && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {errors.lab}
                </p>
              )}
            </div>
          </div>

          {/* Processor Specification */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Processor / CPU <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={formData.processor}
              onChange={(e) => setFormData({ ...formData, processor: e.target.value })}
              placeholder="e.g. Intel Core i7-13700 (16 Cores, 2.10 GHz)"
              className={`w-full bg-slate-950/80 border rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-colors ${
                errors.processor
                  ? 'border-rose-500/80 focus:border-rose-500 ring-1 ring-rose-500/30'
                  : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            {errors.processor && (
              <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" /> {errors.processor}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* RAM Memory */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                RAM Memory <span className="text-rose-400">*</span>
              </label>
              <select
                value={formData.ram}
                onChange={(e) => setFormData({ ...formData, ram: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                {RAM_OPTIONS.map((ram) => (
                  <option key={ram} value={ram}>
                    {ram}
                  </option>
                ))}
              </select>
              {errors.ram && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {errors.ram}
                </p>
              )}
            </div>

            {/* Storage Drive */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Storage Drive <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.storage}
                onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
                placeholder="e.g. 1TB NVMe M.2 SSD"
                className={`w-full bg-slate-950/80 border rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.storage
                    ? 'border-rose-500/80 focus:border-rose-500 ring-1 ring-rose-500/30'
                    : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
              {errors.storage && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {errors.storage}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Operating System */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Operating System <span className="text-rose-400">*</span>
              </label>
              <select
                value={formData.operatingSystem}
                onChange={(e) => setFormData({ ...formData, operatingSystem: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                {OS_OPTIONS.map((os) => (
                  <option key={os} value={os}>
                    {os}
                  </option>
                ))}
              </select>
              {errors.operatingSystem && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {errors.operatingSystem}
                </p>
              )}
            </div>

            {/* Terminal Status */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Current Status <span className="text-rose-400">*</span>
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer font-medium"
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {errors.status && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {errors.status}
                </p>
              )}
            </div>
          </div>

          {/* Modal Footer / Actions */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-end gap-2.5">
            <Button type="button" variant="secondary" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" icon={Check}>
              {mode === 'edit' ? 'Update Workstation' : 'Save Workstation'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
