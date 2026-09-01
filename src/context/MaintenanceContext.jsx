import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_MAINTENANCE } from '../data/mockData';

const MaintenanceContext = createContext();
const STORAGE_KEY = 'campus_lab_maintenance';

export function MaintenanceProvider({ children }) {
  const [maintenanceRecords, setMaintenanceRecords] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load maintenance records from localStorage:', e);
    }
    return INITIAL_MAINTENANCE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(maintenanceRecords));
    } catch (e) {
      console.error('Failed to save maintenance records to localStorage:', e);
    }
  }, [maintenanceRecords]);

  const addRecord = (recordData) => {
    const today = new Date().toISOString().split('T')[0];
    const newRecord = {
      id: `maint-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      ...recordData,
      reportedDate: recordData.reportedDate || today,
      resolvedDate: recordData.status === 'Resolved' ? (recordData.resolvedDate || today) : null,
    };
    setMaintenanceRecords((prev) => [newRecord, ...prev]);
    return newRecord;
  };

  const editRecord = (id, updatedData) => {
    const today = new Date().toISOString().split('T')[0];
    setMaintenanceRecords((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const isResolved = updatedData.status === 'Resolved';
          const resolvedDate = isResolved
            ? (updatedData.resolvedDate || item.resolvedDate || today)
            : null;

          return {
            ...item,
            ...updatedData,
            resolvedDate,
          };
        }
        return item;
      })
    );
  };

  const updateStatus = (id, newStatus) => {
    const today = new Date().toISOString().split('T')[0];
    setMaintenanceRecords((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const isResolved = newStatus === 'Resolved';
          return {
            ...item,
            status: newStatus,
            resolvedDate: isResolved ? today : null,
          };
        }
        return item;
      })
    );
  };

  const deleteRecord = (id) => {
    setMaintenanceRecords((prev) => prev.filter((item) => item.id !== id));
  };

  const resetToDefaultMaintenance = () => {
    setMaintenanceRecords(INITIAL_MAINTENANCE);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MAINTENANCE));
    } catch (e) {
      console.error(e);
    }
  };

  const total = maintenanceRecords.length;
  const reported = maintenanceRecords.filter((r) => r.status === 'Reported').length;
  const inProgress = maintenanceRecords.filter((r) => r.status === 'In Progress').length;
  const resolved = maintenanceRecords.filter((r) => r.status === 'Resolved').length;
  const highPriority = maintenanceRecords.filter(
    (r) => r.priority === 'High' && r.status !== 'Resolved'
  ).length;

  const stats = {
    total,
    reported,
    inProgress,
    resolved,
    highPriority,
  };

  return (
    <MaintenanceContext.Provider
      value={{
        maintenanceRecords,
        addRecord,
        editRecord,
        updateStatus,
        deleteRecord,
        resetToDefaultMaintenance,
        stats,
      }}
    >
      {children}
    </MaintenanceContext.Provider>
  );
}

export function useMaintenance() {
  const context = useContext(MaintenanceContext);
  if (!context) {
    throw new Error('useMaintenance must be used within a MaintenanceProvider');
  }
  return context;
}
