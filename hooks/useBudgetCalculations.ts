import { useMemo } from 'react';
import type { BudgetData } from '@/types/budget';

export interface BudgetCalculations {
  totalStartupFees: number;
  totalVisitRevenue: number;
  totalCustomRevenue: number;
  totalPersonnelReimbursements: number;
  subtotal: number;
  overheadAmount: number;
  totalRevenue: number;
}

export const useBudgetCalculations = (budgetData: BudgetData): BudgetCalculations => {
  return useMemo(() => {
    const totalStartupFees = budgetData.startupFees.reduce((sum, fee) => sum + fee.amount, 0);
    
    const totalVisitRevenue = budgetData.visits.reduce(
      (sum, visit) => sum + (visit.paymentPerVisit * budgetData.targetEnrollment), 
      0
    );
    
    const totalCustomRevenue = budgetData.customRevenueItems.reduce((sum, item) => {
      if (item.type === 'flat') return sum + item.amount;
      if (item.type === 'perPatient') return sum + (item.amount * budgetData.targetEnrollment);
      if (item.type === 'perVisit') return sum + (item.amount * budgetData.visits.length * budgetData.targetEnrollment);
      return sum;
    }, 0);
    
    const totalPersonnelReimbursements = budgetData.personnelReimbursements.reduce((sum, cost) => {
      if (cost.type === 'perPatient' && cost.hourlyRate && cost.hours) {
        return sum + (cost.hourlyRate * cost.hours * budgetData.targetEnrollment);
      }
      if (cost.type === 'flatMonthly' && cost.monthlyFee && cost.months) {
        return sum + (cost.monthlyFee * cost.months);
      }
      return sum;
    }, 0);
    
    const subtotal = totalStartupFees + totalVisitRevenue + totalCustomRevenue + totalPersonnelReimbursements;
    const overheadAmount = subtotal * (budgetData.overhead / 100);
    const totalRevenue = subtotal + overheadAmount;

    return {
      totalStartupFees,
      totalVisitRevenue,
      totalCustomRevenue,
      totalPersonnelReimbursements,
      subtotal,
      overheadAmount,
      totalRevenue,
    };
  }, [budgetData]);
};