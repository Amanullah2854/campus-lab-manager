import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  X,
  CheckCircle2,
  GraduationCap,
  RotateCcw,
  Building2,
  BookOpen,
} from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import ConfirmDialog from '../components/common/ConfirmDialog';
import StudentModal from '../components/students/StudentModal';
import StudentTable from '../components/students/StudentTable';
import { useStudents } from '../context/StudentContext';

export default function Students() {
  const { students, addStudent, editStudent, deleteStudent, stats } = useStudents();

  // Search & Department Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedStudent, setSelectedStudent] = useState(null);

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

  // Filter students
  const filteredStudents = students.filter((stu) => {
    const matchesDept = deptFilter === 'All' || stu.department === deptFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      stu.studentId.toLowerCase().includes(query) ||
      stu.name.toLowerCase().includes(query) ||
      stu.department.toLowerCase().includes(query) ||
      stu.email.toLowerCase().includes(query) ||
      stu.year.toLowerCase().includes(query) ||
      stu.phone.includes(query);

    return matchesDept && matchesSearch;
  });

  // Handlers
  const handleOpenAddModal = () => {
    setModalMode('add');
    setSelectedStudent(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (student) => {
    setModalMode('edit');
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleSaveStudent = (studentData) => {
    if (modalMode === 'add') {
      addStudent(studentData);
      showToast(`Student ${studentData.name} (${studentData.studentId}) registered successfully.`);
    } else if (modalMode === 'edit' && selectedStudent) {
      editStudent(selectedStudent.id, studentData);
      showToast(`Student record for ${studentData.name} updated successfully.`);
    }
  };

  const handleOpenDeleteConfirm = (student) => {
    setDeleteTarget(student);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deleteStudent(deleteTarget.id);
      showToast(`Student ${deleteTarget.name} removed from the roster.`);
      setIsConfirmOpen(false);
      setDeleteTarget(null);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setDeptFilter('All');
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
            <h1 className="text-2xl font-bold text-white tracking-tight">Student Management</h1>
            <Badge variant="primary" size="sm">
              {students.length} Enrolled
            </Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Student directory, departmental allocations, contact details, and computer lab session eligibility.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="primary"
            icon={Plus}
            size="md"
            onClick={handleOpenAddModal}
          >
            Add Student
          </Button>
        </div>
      </div>

      {/* Metric Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-400">Total Enrolled</span>
            <p className="text-xl font-bold font-mono text-white mt-0.5">{stats.total}</p>
          </div>
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <GraduationCap className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-400">Computer Science</span>
            <p className="text-xl font-bold font-mono text-cyan-300 mt-0.5">{stats.cseCount}</p>
          </div>
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Building2 className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-400">Artificial Intelligence</span>
            <p className="text-xl font-bold font-mono text-indigo-300 mt-0.5">{stats.aiCount}</p>
          </div>
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <BookOpen className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-slate-400">IT & Cyber Sec</span>
            <p className="text-xl font-bold font-mono text-emerald-300 mt-0.5">{stats.itCount + stats.cyberCount}</p>
          </div>
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Users className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Search and Department Filter Controls */}
      <Card bodyClassName="p-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full lg:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Student ID, Name, Department, Email..."
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

          {/* Department Filter Buttons */}
          <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-800 rounded-lg p-1 text-xs w-full lg:w-auto overflow-x-auto">
            <span className="text-slate-500 px-2 font-medium hidden sm:inline">Dept:</span>
            {[
              { label: 'All', value: 'All' },
              { label: 'CSE', value: 'Computer Science' },
              { label: 'AI & DS', value: 'Artificial Intelligence' },
              { label: 'IT', value: 'Information Technology' },
              { label: 'Cyber', value: 'Cyber Security' },
            ].map((tab) => (
              <button
                key={tab.label}
                onClick={() => setDeptFilter(tab.value)}
                className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  deptFilter === tab.value
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Main Table / Empty State */}
      {filteredStudents.length > 0 ? (
        <StudentTable
          students={filteredStudents}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteConfirm}
        />
      ) : (
        /* Empty State */
        <Card bodyClassName="p-12 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center mx-auto">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">No students found</h3>
              <p className="text-xs text-slate-400 mt-1">
                {searchQuery || deptFilter !== 'All'
                  ? `No student records match your active search "${searchQuery}" or department filter.`
                  : 'No students are currently registered in the database.'}
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              {(searchQuery || deptFilter !== 'All') && (
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
                Enroll New Student
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Add / Edit Student Modal */}
      <StudentModal
        isOpen={isModalOpen}
        mode={modalMode}
        initialData={selectedStudent}
        onSave={handleSaveStudent}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Delete Student Record"
        message="Are you sure you want to delete this student from the campus database? All historical lab session logs will be disconnected."
        itemLabel={deleteTarget ? `${deleteTarget.name} (${deleteTarget.studentId})` : ''}
        confirmText="Yes, Delete Student"
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
