import React, { useState, useEffect } from 'react';
import { Users, X, Check, Mail, Phone, GraduationCap, Building2, AlertCircle } from 'lucide-react';
import Button from '../common/Button';

const DEPARTMENT_OPTIONS = [
  'Computer Science',
  'Artificial Intelligence',
  'Information Technology',
  'Cyber Security',
];

const YEAR_OPTIONS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

const initialFormValues = {
  studentId: '',
  name: '',
  department: 'Computer Science',
  year: '2nd Year',
  email: '',
  phone: '',
};

export default function StudentModal({
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
          studentId: initialData.studentId || '',
          name: initialData.name || '',
          department: initialData.department || 'Computer Science',
          year: initialData.year || '2nd Year',
          email: initialData.email || '',
          phone: initialData.phone || '',
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
    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required (e.g. STU-2024-045)';
    } else if (formData.studentId.trim().length < 3) {
      newErrors.studentId = 'Student ID must be at least 3 characters';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData.year) {
      newErrors.year = 'Academic year is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@campus.edu)';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Contact phone number is required';
    } else if (formData.phone.trim().length < 7) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave({
        ...formData,
        studentId: formData.studentId.trim().toUpperCase(),
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
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
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">
                {mode === 'edit' ? 'Edit Student Record' : 'Register New Student'}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {mode === 'edit'
                  ? `Modify academic & contact information for ${initialData?.name}`
                  : 'Enroll a student into the campus laboratory directory'}
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
            {/* Student ID */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Student ID / Roll No <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                placeholder="e.g. STU-2024-089"
                className={`w-full bg-slate-950/80 border rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 font-mono focus:outline-none transition-colors ${
                  errors.studentId
                    ? 'border-rose-500/80 focus:border-rose-500 ring-1 ring-rose-500/30'
                    : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
              {errors.studentId && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {errors.studentId}
                </p>
              )}
            </div>

            {/* Student Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Rahul Sharma"
                className={`w-full bg-slate-950/80 border rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.name
                    ? 'border-rose-500/80 focus:border-rose-500 ring-1 ring-rose-500/30'
                    : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
              {errors.name && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {errors.name}
                </p>
              )}
            </div>
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
                Academic Year <span className="text-rose-400">*</span>
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
            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Institutional Email <span className="text-rose-400">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. rahul.sharma@campus.edu"
                className={`w-full bg-slate-950/80 border rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.email
                    ? 'border-rose-500/80 focus:border-rose-500 ring-1 ring-rose-500/30'
                    : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
              {errors.email && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {errors.email}
                </p>
              )}
            </div>

            {/* Contact Phone */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Phone Number <span className="text-rose-400">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. +1 (555) 234-5678"
                className={`w-full bg-slate-950/80 border rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.phone
                    ? 'border-rose-500/80 focus:border-rose-500 ring-1 ring-rose-500/30'
                    : 'border-slate-800 focus:border-cyan-500'
                }`}
              />
              {errors.phone && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" /> {errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-end gap-2.5">
            <Button type="button" variant="secondary" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" icon={Check}>
              {mode === 'edit' ? 'Update Student' : 'Save Student'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
