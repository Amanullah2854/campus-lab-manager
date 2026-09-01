import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_COMPUTERS } from '../data/mockData';

const ComputerContext = createContext();

const STORAGE_KEY = 'campus_lab_computers';

export function ComputerProvider({ children }) {
  const [computers, setComputers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load computers from localStorage:', e);
    }
    return INITIAL_COMPUTERS;
  });

  // Save to localStorage whenever computers state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(computers));
    } catch (e) {
      console.error('Failed to save computers to localStorage:', e);
    }
  }, [computers]);

  // Add computer
  const addComputer = (computerData) => {
    const newComputer = {
      id: `pc-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      ...computerData,
    };
    setComputers((prev) => [newComputer, ...prev]);
    return newComputer;
  };

  // Edit computer
  const editComputer = (id, updatedData) => {
    setComputers((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );
  };

  // Delete computer
  const deleteComputer = (id) => {
    setComputers((prev) => prev.filter((item) => item.id !== id));
  };

  // Reset to initial mock data if needed
  const resetToDefaultComputers = () => {
    setComputers(INITIAL_COMPUTERS);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_COMPUTERS));
    } catch (e) {
      console.error(e);
    }
  };

  // Computed statistics for dashboard and badges
  const total = computers.length;
  const available = computers.filter((c) => c.status === 'Available').length;
  const inUse = computers.filter((c) => c.status === 'In Use').length;
  const maintenance = computers.filter((c) => c.status === 'Maintenance').length;

  const stats = {
    total,
    available,
    inUse,
    maintenance,
  };

  return (
    <ComputerContext.Provider
      value={{
        computers,
        addComputer,
        editComputer,
        deleteComputer,
        resetToDefaultComputers,
        stats,
      }}
    >
      {children}
    </ComputerContext.Provider>
  );
}

export function useComputers() {
  const context = useContext(ComputerContext);
  if (!context) {
    throw new Error('useComputers must be used within a ComputerProvider');
  }
  return context;
}
