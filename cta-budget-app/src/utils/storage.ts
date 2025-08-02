import type { BudgetData } from '../types';

const STORAGE_KEY = 'ctaBudget';

const defaultBudgetData: BudgetData = {
  startupFees: {
    irbFee: 0,
    ethicsFee: 0,
    archivingFee: 0,
    pharmacyFee: 0,
    other: 0,
  },
  visits: [],
  overhead: 30,
  customRevenueItems: [],
  targetEnrollment: 0,
  personnelCosts: [],
  notes: '',
};

export const loadBudgetData = (): BudgetData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading budget data:', error);
  }
  return defaultBudgetData;
};

export const saveBudgetData = (data: BudgetData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving budget data:', error);
  }
};

export const exportBudgetData = (data: BudgetData): void => {
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `cta-budget-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importBudgetData = (file: File): Promise<BudgetData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
};