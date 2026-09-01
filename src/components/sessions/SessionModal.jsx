import React, { useState, useEffect } from 'react';
import { CalendarClock, X, Check, BookOpen, Building2, User, Clock, Calendar, AlertCircle } from 'lucide-react';
import Button from '../common/Button';

const DEPARTMENT_OPTIONS = [
  'Computer Science',
  'Artificial Intelligence',
  'Information Technology',
  'Cyber Security',
];

const YEAR_OPTIONS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

const LAB_OPTIONS = [
  'Lab 101 - Systems',
  'Lab 102 - AI & DS',
  'Lab 103 - Web Tech',
  'Lab 104 - Networks',
];

const initialFormValues = {
  subject: '',
  department: 'Computer Science',
  year: '2nd Year',
  lab: 'Lab 101 - Systems',
  instructor: '',
  date: '',
  startTime: '09:00',
  endTime: '11:00',
};

export default function SessionModal({
  isOpen,
  mode = 'add',
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
          subject: initialData.subject || '',
          department: initialData.department || 'Computer Science',
          year: initialData.year || '2nd Year',
          lab: initialData.lab || 'Lab 101 - Systems',
          instructor: initialData.instructor || '',
          date: initialData.date || '',
          startTime: initialData.startTime || '09:00',
          endTime: initialData.endTime || '11:00',
        });
      } else {
        // Default date to tomorrow if adding new
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const defaultDateStr = tomorrow.toISOString().split('T')[0];

        setFormData({
          ...initialFormValues,
          date: defaultDateStr,
        });
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
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject name is required (e.g. Operating Systems Lab)';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject name must be at least 3 characters';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData.year) {
      newErrors.year = 'Target student year is required';
    }

    if (!formData.lab) {
      newErrors.lab = 'Assigned laboratory room is required';
    }

    if (!formData.instructor.trim()) {
      newErrors.instructor = 'Faculty supervisor/instructor name is required';
    }

    if (!formData.date) {
      newErrors.date = 'Practical session date is required';
    }

    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required';
    }

    if (!formData.endTime) {
      newErrors.endTime = 'End time is required';
    }

    if (formData.startTime && formData.endTime) {
      if (formData.endTime <= formData.startTime) {
        newErrors.endTime = 'End time must be later than start time';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave({
        ...formData,
        subject: formData.subject.trim(),
        instructor: formData.instructor.trim(),
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
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <CalendarClock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                {mode === 'edit' ? 'Edit Lab Session' : 'Schedule New Lab Session'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {mode === 'edit'
                  ? `Update timetable & lab room booking for ${initialData?.subject}`
                  : 'Book a laboratory room slot for practical coursework'}
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
          {/* Subject */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Subject / Course Practical <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="e.g. Operating Systems & Concurrency Lab"
              className={`w-full bg-slate-950/80 border rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-colors ${
                errors.subject
                  ? 'border-rose-500/80 focus:border-rose-500 ring-1 ring-rose-500/30'
                  : 'border-slate-800 focus:border-cyan-500'
              }`}
            />
            {errors.subject && (
              <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" /> {errors.subject}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Department */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Department <span className="text-rose-400">*</span>
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                {DEPARTMENT_OPTIONS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              {errors.department && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {errors.department}
                </p>
              )}
            </div>

            {/* Academic Year */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Target Year / Batch <span className="text-rose-400">*</span>
              </label>
              <select
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
              >
                {YEAR_OPTIONS.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
              {errors.year && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {errors.year}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Laboratory Room */}
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

            {/* Faculty Instructor */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Faculty Instructor <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                placeholder="e.g. Dr. Robert Vance"
                className={`w-full bg-slate-950/80 border rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.instructor
                    ? 'border-rose-500/80 focus:border-rose-500 ring-1 ring-rose-500/30'
                    : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
              {errors.instructor && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {errors.instructor}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Session Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Session Date <span className="text-rose-400">*</span>
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className={`w-full bg-slate-950/80 border rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none transition-colors ${
                  errors.date
                    ? 'border-rose-500/80 focus:border-rose-500 ring-1 ring-rose-500/30'
                    : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
              {errors.date && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {errors.date}
                </p>
              )}
            </div>

            {/* Start Time */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Start Time <span className="text-rose-400">*</span>
              </label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className={`w-full bg-slate-950/80 border rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none transition-colors ${
                  errors.startTime
                    ? 'border-rose-500/80 focus:border-rose-500 ring-1 ring-rose-500/30'
                    : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
              {errors.startTime && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {errors.startTime}
                </p>
              )}
            </div>

            {/* End Time */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                End Time <span className="text-rose-400">*</span>
              </label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className={`w-full bg-slate-950/80 border rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none transition-colors ${
                  errors.endTime
                    ? 'border-rose-500/80 focus:border-rose-500 ring-1 ring-rose-500/30'
                    : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
              {errors.endTime && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {errors.endTime}
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-end gap-2.5">
            <Button type="button" variant="secondary" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" icon={Check}>
              {mode === 'edit' ? 'Update Session' : 'Schedule Session'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
