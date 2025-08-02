export interface StartupFees {
  irbFee: number;
  ethicsFee: number;
  archivingFee: number;
  pharmacyFee: number;
  other: number;
}

export interface Visit {
  id: string;
  name: string;
  paymentPerVisit: number;
}

export interface CustomRevenueItem {
  id: string;
  name: string;
  amount: number;
  type: 'flat' | 'perPatient' | 'perVisit';
}

export interface PersonnelCost {
  id: string;
  role: string;
  type: 'perPatient' | 'flatMonthly';
  hourlyRate?: number;
  hours?: number;
  monthlyFee?: number;
  months?: number;
}

export interface BudgetData {
  startupFees: StartupFees;
  visits: Visit[];
  overhead: number;
  customRevenueItems: CustomRevenueItem[];
  targetEnrollment: number;
  personnelCosts: PersonnelCost[];
  notes: string;
}