import React, { useState, useEffect } from 'react';
import {
  Wrench,
  X,
  Check,
  AlertTriangle,
  Monitor,
  Building2,
  User,
  Calendar,
  AlertCircle,
  FileText,
  Clock,
} from 'lucide-react';
import Button from '../common/Button';
import { useComputers } from '../../context/ComputerContext';

const PRIORITY_OPTIONS = ['Low', 'Medium', 'High'];
const STATUS_OPTIONS = ['Reported', 'In Progress', 'Resolved'];

const LAB_OPTIONS = [
  'Lab 101 - Systems',
  'Lab 102 - AI & DS',
  'Lab 103 - Web Tech',
  'Lab 104 - Networks',
];

const initialFormValues = {
  computerId: '',
  lab: 'Lab 101 - Systems',
  issue: '',
  description: '',
  reportedBy: '',
  reportedDate: '',
  priority: 'Medium',
  status: 'Reported',
  resolvedDate: '',
};

export default function MaintenanceModal({
  isOpen,
  mode = 'add',
  initialData = null,
  onSave,
  onClose,
}) {
  const { computers } = useComputers();
  const [formData, setFormData] = useState(initialFormValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      const today = new Date().toISOString().split('T')[0];
      if (mode === 'edit' && initialData) {
        setFormData({
          computerId: initialData.computerId || '',
          lab: initialData.lab || 'Lab 101 - Systems',
          issue: initialData.issue || '',
          description: initialData.description || '',
          reportedBy: initialData.reportedBy || '',
          reportedDate: initialData.reportedDate || today,
          priority: initialData.priority || 'Medium',
          status: initialData.status || 'Reported',
          resolvedDate: initialData.resolvedDate || '',
        });
      } else {
        const defaultPc = computers.length > 0 ? computers[0].computerId : 'LAB-001';
        const defaultLab = computers.length > 0 ? computers[0].lab : 'Lab 101 - Systems';
        setFormData({
          ...initialFormValues,
          computerId: defaultPc,
          lab: defaultLab,
          reportedDate: today,
        });
      }
      setErrors({});
    }
  }, [isOpen, mode, initialData, computers]);

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

  // Auto-fill lab if user selects a computer from inventory
  const handleComputerChange = (pcId) => {
    const found = computers.find((c) => c.computerId === pcId);
    setFormData((prev) => ({
      ...prev,
      computerId: pcId,
      lab: found ? found.lab : prev.lab,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.computerId.trim()) {
      newErrors.computerId = 'Computer ID is required (e.g. LAB-024)';
    }

    if (!formData.lab) {
      newErrors.lab = 'Laboratory location is required';
    }

    if (!formData.issue.trim()) {
      newErrors.issue = 'Issue summary is required';
    } else if (formData.issue.trim().length < 4) {
      newErrors.issue = 'Issue summary must be at least 4 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Detailed problem description is required';
    }

    if (!formData.reportedBy.trim()) {
      newErrors.reportedBy = 'Reporter name / role is required';
    }

    if (!formData.reportedDate) {
      newErrors.reportedDate = 'Reported date is required';
    }

    if (!formData.priority) {
      newErrors.priority = 'Priority level is required';
    }

    if (!formData.status) {
      newErrors.status = 'Status is required';
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
        issue: formData.issue.trim(),
        description: formData.description.trim(),
        reportedBy: formData.reportedBy.trim(),
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

      {/* Modal Content */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl shadow-black/80 z-10 overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-slate-800/90 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                {mode === 'edit' ? 'Edit Maintenance Ticket' : 'Report Hardware / OS Issue'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {mode === 'edit'
                  ? `Update diagnostic details for ticket on ${initialData?.computerId}`
                  : 'Submit a defect report for laboratory hardware inspection'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Computer Workstation */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Workstation Terminal <span className="text-rose-400">*</span>
              </label>
              {computers.length > 0 ? (
                <select
                  value={formData.computerId}
                  onChange={(e) => handleComputerChange(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  {computers.map((c) => (
                    <option key={c.id} value={c.computerId}>
                      {c.computerId} ({c.lab})
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={formData.computerId}
                  onChange={(e) => setFormData({ ...formData, computerId: e.target.value })}
                  placeholder="e.g. LAB-024"
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
                />
              )}
              {errors.computerId && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {errors.computerId}
                </p>
              )}
            </div>

            {/* Laboratory Location */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Laboratory Room <span className="text-rose-400">*</span>
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

          {/* Issue Summary */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Issue Headline <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={formData.issue}
              onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
              placeholder="e.g. Display artifact & intermittent RAM panic"
              className={`w-full bg-slate-950/80 border rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-colors ${
                errors.issue
                  ? 'border-rose-500/80 focus:border-rose-500 ring-1 ring-rose-500/30'
                  : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            {errors.issue && (
              <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" /> {errors.issue}
              </p>
            )}
          </div>

          {/* Detailed Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Detailed Description & Symptoms <span className="text-rose-400">*</span>
            </label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe how the defect manifests, error codes, and steps to reproduce..."
              className={`w-full bg-slate-950/80 border rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-colors ${
                errors.description
                  ? 'border-rose-500/80 focus:border-rose-500 ring-1 ring-rose-500/30'
                  : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            {errors.description && (
              <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" /> {errors.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Reported By */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Reported By <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.reportedBy}
                onChange={(e) => setFormData({ ...formData, reportedBy: e.target.value })}
                placeholder="e.g. Alex Mercer (Student) or Lab Tech"
                className={`w-full bg-slate-950/80 border rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.reportedBy
                    ? 'border-rose-500/80 focus:border-rose-500 ring-1 ring-rose-500/30'
                    : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
              {errors.reportedBy && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {errors.reportedBy}
                </p>
              )}
            </div>

            {/* Reported Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Reported Date <span className="text-rose-400">*</span>
              </label>
              <input
                type="date"
                value={formData.reportedDate}
                onChange={(e) => setFormData({ ...formData, reportedDate: e.target.value })}
                className={`w-full bg-slate-950/80 border rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none transition-colors ${
                  errors.reportedDate
                    ? 'border-rose-500/80 focus:border-rose-500 ring-1 ring-rose-500/30'
                    : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
              {errors.reportedDate && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {errors.reportedDate}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Priority */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Priority Level <span className="text-rose-400">*</span>
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                {PRIORITY_OPTIONS.map((p) => (
                  <option key={p} value={p}>
                    {p} Priority
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Ticket Status <span className="text-rose-400">*</span>
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer font-medium"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Optional Resolved Date when Status is Resolved */}
          {formData.status === 'Resolved' && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 animate-in fade-in duration-200">
              <label className="block text-xs font-semibold text-emerald-300 mb-1.5">
                Resolution Date
              </label>
              <input
                type="date"
                value={formData.resolvedDate || new Date().toISOString().split('T')[0]}
                onChange={(e) => setFormData({ ...formData, resolvedDate: e.target.value })}
                className="w-full bg-slate-950/90 border border-emerald-500/30 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-400"
              />
            </div>
          )}

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-end gap-2.5">
            <Button type="button" variant="secondary" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" icon={Check}>
              {mode === 'edit' ? 'Update Ticket' : 'Submit Maintenance Ticket'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
