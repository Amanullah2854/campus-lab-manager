import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_SESSIONS } from '../data/mockData';

const SessionContext = createContext();
const STORAGE_KEY = 'campus_lab_sessions';

export function SessionProvider({ children }) {
  const [sessions, setSessions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load sessions from localStorage:', e);
    }
    return INITIAL_SESSIONS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch (e) {
      console.error('Failed to save sessions to localStorage:', e);
    }
  }, [sessions]);

  const addSession = (sessionData) => {
    const newSession = {
      id: `ses-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      ...sessionData,
    };
    setSessions((prev) => [newSession, ...prev]);
    return newSession;
  };

  const editSession = (id, updatedData) => {
    setSessions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );
  };

  const deleteSession = (id) => {
    setSessions((prev) => prev.filter((item) => item.id !== id));
  };

  const resetToDefaultSessions = () => {
    setSessions(INITIAL_SESSIONS);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SESSIONS));
    } catch (e) {
      console.error(e);
    }
  };

  const total = sessions.length;
  const labsCovered = Array.from(new Set(sessions.map((s) => s.lab))).length;

  const stats = {
    total,
    labsCovered,
  };

  return (
    <SessionContext.Provider
      value={{
        sessions,
        addSession,
        editSession,
        deleteSession,
        resetToDefaultSessions,
        stats,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSessions() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSessions must be used within a SessionProvider');
  }
  return context;
}
