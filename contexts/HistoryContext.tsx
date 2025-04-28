import React, { createContext, useContext, useState } from 'react';
import { ApiResponse } from '../types/api';

interface HistoryItem extends ApiResponse {
  id: string;
  timestamp: number;
  checkedText: string;
}

interface HistoryContextType {
  history: HistoryItem[];
  addToHistory: (result: ApiResponse, checkedText: string) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const addToHistory = (result: ApiResponse, checkedText: string) => {
    const historyItem: HistoryItem = {
      ...result,
      id: Date.now().toString(),
      timestamp: Date.now(),
      checkedText
    };
    setHistory(prev => [historyItem, ...prev]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <HistoryContext.Provider value={{ history, addToHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
}

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};