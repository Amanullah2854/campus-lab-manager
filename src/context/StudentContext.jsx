import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_STUDENTS } from '../data/mockData';

const StudentContext = createContext();
const STORAGE_KEY = 'campus_lab_students';

export function StudentProvider({ children }) {
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load students from localStorage:', e);
    }
    return INITIAL_STUDENTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    } catch (e) {
      console.error('Failed to save students to localStorage:', e);
    }
  }, [students]);

  const addStudent = (studentData) => {
    const newStudent = {
      id: `stu-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      ...studentData,
    };
    setStudents((prev) => [newStudent, ...prev]);
    return newStudent;
  };

  const editStudent = (id, updatedData) => {
    setStudents((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );
  };

  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((item) => item.id !== id));
  };

  const resetToDefaultStudents = () => {
    setStudents(INITIAL_STUDENTS);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_STUDENTS));
    } catch (e) {
      console.error(e);
    }
  };

  const total = students.length;
  const cseCount = students.filter((s) => s.department === 'Computer Science').length;
  const aiCount = students.filter((s) => s.department === 'Artificial Intelligence').length;
  const itCount = students.filter((s) => s.department === 'Information Technology').length;
  const cyberCount = students.filter((s) => s.department === 'Cyber Security').length;

  const stats = {
    total,
    cseCount,
    aiCount,
    itCount,
    cyberCount,
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        addStudent,
        editStudent,
        deleteStudent,
        resetToDefaultStudents,
        stats,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudents() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudents must be used within a StudentProvider');
  }
  return context;
}
