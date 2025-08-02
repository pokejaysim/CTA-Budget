'use client';

import { useState, useEffect } from 'react';
import { 
  Calculator, 
  DollarSign, 
  Calendar, 
  Users, 
  TrendingUp, 
  FileText, 
  Download,
  Upload,
  Plus,
  Trash2
} from 'lucide-react';
import type { BudgetData, Visit, CustomRevenueItem, PersonnelCost } from '@/types/budget';
import { loadBudgetData, saveBudgetData, exportBudgetData, importBudgetData } from '@/lib/storage';

export default function Home() {
  const [budgetData, setBudgetData] = useState<BudgetData>(loadBudgetData());

  useEffect(() => {
    saveBudgetData(budgetData);
  }, [budgetData]);

  const updateBudgetData = (updates: Partial<BudgetData>) => {
    setBudgetData(prev => ({ ...prev, ...updates }));
  };

  // Calculate totals
  const totalStartupFees = Object.values(budgetData.startupFees).reduce((sum, fee) => sum + fee, 0);
  const totalVisitRevenue = budgetData.visits.reduce((sum, visit) => sum + (visit.paymentPerVisit * budgetData.targetEnrollment), 0);
  const totalCustomRevenue = budgetData.customRevenueItems.reduce((sum, item) => {
    if (item.type === 'flat') return sum + item.amount;
    if (item.type === 'perPatient') return sum + (item.amount * budgetData.targetEnrollment);
    if (item.type === 'perVisit') return sum + (item.amount * budgetData.visits.length * budgetData.targetEnrollment);
    return sum;
  }, 0);
  const totalPersonnelCosts = budgetData.personnelCosts.reduce((sum, cost) => {
    if (cost.type === 'perPatient' && cost.hourlyRate && cost.hours) {
      return sum + (cost.hourlyRate * cost.hours * budgetData.targetEnrollment);
    }
    if (cost.type === 'flatMonthly' && cost.monthlyFee && cost.months) {
      return sum + (cost.monthlyFee * cost.months);
    }
    return sum;
  }, 0);
  
  const subtotal = totalStartupFees + totalVisitRevenue + totalCustomRevenue;
  const overheadAmount = subtotal * (budgetData.overhead / 100);
  const totalRevenue = subtotal + overheadAmount;
  const netProfit = totalRevenue - totalPersonnelCosts;

  // Calculate completion percentage
  const completionPercentage = Math.min(100, (
    (budgetData.targetEnrollment > 0 ? 20 : 0) +
    (budgetData.visits.length > 0 ? 20 : 0) +
    (budgetData.customRevenueItems.length > 0 ? 20 : 0) +
    (budgetData.personnelCosts.length > 0 ? 20 : 0) +
    (Object.values(budgetData.startupFees).some(fee => fee > 0) ? 20 : 0)
  ));

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const data = await importBudgetData(file);
        setBudgetData(data);
      } catch (error) {
        console.error('Import failed:', error);
      }
    }
  };

  const addVisit = () => {
    const newVisit: Visit = {
      id: Date.now().toString(),
      name: `Visit ${budgetData.visits.length + 1}`,
      paymentPerVisit: 0
    };
    updateBudgetData({ visits: [...budgetData.visits, newVisit] });
  };

  const updateVisit = (id: string, updates: Partial<Visit>) => {
    updateBudgetData({
      visits: budgetData.visits.map(v => v.id === id ? { ...v, ...updates } : v)
    });
  };

  const deleteVisit = (id: string) => {
    updateBudgetData({ visits: budgetData.visits.filter(v => v.id !== id) });
  };

  const addCustomRevenueItem = () => {
    const newItem: CustomRevenueItem = {
      id: Date.now().toString(),
      name: 'New Revenue Item',
      amount: 0,
      type: 'flat'
    };
    updateBudgetData({ customRevenueItems: [...budgetData.customRevenueItems, newItem] });
  };

  const updateCustomRevenueItem = (id: string, updates: Partial<CustomRevenueItem>) => {
    updateBudgetData({
      customRevenueItems: budgetData.customRevenueItems.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    });
  };

  const deleteCustomRevenueItem = (id: string) => {
    updateBudgetData({ 
      customRevenueItems: budgetData.customRevenueItems.filter(item => item.id !== id) 
    });
  };

  const addPersonnelCost = () => {
    const newCost: PersonnelCost = {
      id: Date.now().toString(),
      role: 'New Role',
      type: 'perPatient',
      hourlyRate: 0,
      hours: 0
    };
    updateBudgetData({ personnelCosts: [...budgetData.personnelCosts, newCost] });
  };

  const updatePersonnelCost = (id: string, updates: Partial<PersonnelCost>) => {
    updateBudgetData({
      personnelCosts: budgetData.personnelCosts.map(cost => 
        cost.id === id ? { ...cost, ...updates } : cost
      )
    });
  };

  const deletePersonnelCost = (id: string) => {
    updateBudgetData({ 
      personnelCosts: budgetData.personnelCosts.filter(cost => cost.id !== id) 
    });
  };

  const CostSection = ({ title, items, onAdd, onUpdate, onDelete, icon: Icon, category }: {
    title: string;
    items: any[];
    onAdd: () => void;
    onUpdate: (id: string, updates: any) => void;
    onDelete: (id: string) => void;
    icon: any;
    category: string;
  }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Icon className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Item
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={item.id || index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            {category === 'visits' ? (
              <>
                <input
                  type="text"
                  placeholder="Visit Name"
                  value={item.name}
                  onChange={(e) => onUpdate(item.id, { name: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <input
                  type="number"
                  placeholder="Payment"
                  value={item.paymentPerVisit}
                  onChange={(e) => onUpdate(item.id, { paymentPerVisit: Number(e.target.value) })}
                  className="w-24 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </>
            ) : category === 'customRevenue' ? (
              <>
                <input
                  type="text"
                  placeholder="Description"
                  value={item.name}
                  onChange={(e) => onUpdate(item.id, { name: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <select
                  value={item.type}
                  onChange={(e) => onUpdate(item.id, { type: e.target.value })}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="flat">Flat</option>
                  <option value="perPatient">Per Patient</option>
                  <option value="perVisit">Per Visit</option>
                </select>
                <input
                  type="number"
                  placeholder="Amount"
                  value={item.amount}
                  onChange={(e) => onUpdate(item.id, { amount: Number(e.target.value) })}
                  className="w-24 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </>
            ) : category === 'personnel' ? (
              <>
                <input
                  type="text"
                  placeholder="Role"
                  value={item.role}
                  onChange={(e) => onUpdate(item.id, { role: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <select
                  value={item.type}
                  onChange={(e) => onUpdate(item.id, { 
                    type: e.target.value,
                    hourlyRate: e.target.value === 'perPatient' ? 0 : undefined,
                    hours: e.target.value === 'perPatient' ? 0 : undefined,
                    monthlyFee: e.target.value === 'flatMonthly' ? 0 : undefined,
                    months: e.target.value === 'flatMonthly' ? 0 : undefined,
                  })}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="perPatient">Per Patient</option>
                  <option value="flatMonthly">Monthly</option>
                </select>
                {item.type === 'perPatient' ? (
                  <>
                    <input
                      type="number"
                      placeholder="Rate"
                      value={item.hourlyRate || 0}
                      onChange={(e) => onUpdate(item.id, { hourlyRate: Number(e.target.value) })}
                      className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Hours"
                      value={item.hours || 0}
                      onChange={(e) => onUpdate(item.id, { hours: Number(e.target.value) })}
                      className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="number"
                      placeholder="Monthly"
                      value={item.monthlyFee || 0}
                      onChange={(e) => onUpdate(item.id, { monthlyFee: Number(e.target.value) })}
                      className="w-24 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Months"
                      value={item.months || 0}
                      onChange={(e) => onUpdate(item.id, { months: Number(e.target.value) })}
                      className="w-20 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </>
                )}
              </>
            ) : null}
            <button
              onClick={() => onDelete(item.id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        
        {items.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-sm">No items added yet</div>
            <div className="text-xs text-gray-400 mt-1">Click &quot;Add Item&quot; to get started</div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-xl">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Clinical Trial Budget Forecaster</h1>
                <p className="text-sm text-gray-600">Comprehensive clinical trial budget planning</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => exportBudgetData(budgetData)}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <label className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer">
                  <Upload className="w-4 h-4" />
                  Import
                  <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                </label>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Budget Completion</div>
                <div className="text-lg font-semibold text-blue-600">{completionPercentage}%</div>
              </div>
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-8">
            {/* Study Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-50 rounded-lg">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Study Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Enrollment</label>
                  <input
                    type="number"
                    value={budgetData.targetEnrollment}
                    onChange={(e) => updateBudgetData({ targetEnrollment: Number(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Number of patients"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Overhead Percentage</label>
                  <input
                    type="number"
                    value={budgetData.overhead}
                    onChange={(e) => updateBudgetData({ overhead: Number(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Overhead %"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>
            </div>

            {/* Startup Fees */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Startup Fees</h2>
              </div>
              
              <div className="space-y-4">
                {Object.entries(budgetData.startupFees).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <label className="text-gray-700 font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => updateBudgetData({
                        startupFees: { ...budgetData.startupFees, [key]: Number(e.target.value) }
                      })}
                      className="w-32 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Amount"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Cost Sections */}
            <CostSection 
              title="Visit Schedule" 
              category="visits"
              items={budgetData.visits}
              onAdd={addVisit}
              onUpdate={updateVisit}
              onDelete={deleteVisit}
              icon={Calendar}
            />
            
            <CostSection 
              title="Custom Revenue Items" 
              category="customRevenue"
              items={budgetData.customRevenueItems}
              onAdd={addCustomRevenueItem}
              onUpdate={updateCustomRevenueItem}
              onDelete={deleteCustomRevenueItem}
              icon={TrendingUp}
            />
            
            <CostSection 
              title="Personnel Costs" 
              category="personnel"
              items={budgetData.personnelCosts}
              onAdd={addPersonnelCost}
              onUpdate={updatePersonnelCost}
              onDelete={deletePersonnelCost}
              icon={Users}
            />

            {/* Notes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Notes</h3>
              </div>
              <textarea
                value={budgetData.notes}
                onChange={(e) => updateBudgetData({ notes: e.target.value })}
                placeholder="Add any additional notes or comments here..."
                className="w-full h-32 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="space-y-6">
            {/* Budget Summary */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white sticky top-24">
              <h3 className="text-xl font-semibold mb-6">Budget Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Startup Fees</span>
                  <span className="font-semibold">${totalStartupFees.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Visit Revenue</span>
                  <span className="font-semibold">${totalVisitRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Custom Revenue</span>
                  <span className="font-semibold">${totalCustomRevenue.toLocaleString()}</span>
                </div>
                <hr className="border-blue-400" />
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Subtotal</span>
                  <span className="font-semibold">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Overhead ({budgetData.overhead}%)</span>
                  <span className="font-semibold">${overheadAmount.toLocaleString()}</span>
                </div>
                <hr className="border-blue-400" />
                <div className="flex justify-between items-center text-lg">
                  <span>Total Revenue</span>
                  <span className="font-bold">${totalRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Personnel Costs</span>
                  <span className="font-semibold text-red-300">-${totalPersonnelCosts.toLocaleString()}</span>
                </div>
                <hr className="border-blue-400" />
                <div className="flex justify-between items-center text-lg">
                  <span>Net Profit</span>
                  <span className={`font-bold ${netProfit >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                    ${netProfit.toLocaleString()}
                  </span>
                </div>
                
                {budgetData.targetEnrollment > 0 && (
                  <div className="mt-4 pt-4 border-t border-blue-400">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-100">Revenue Per Patient</span>
                      <span className="font-semibold">
                        ${(totalRevenue / budgetData.targetEnrollment).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Items</span>
                  <span className="font-medium">
                    {budgetData.visits.length + budgetData.customRevenueItems.length + budgetData.personnelCosts.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Visits</span>
                  <span className="font-medium">{budgetData.visits.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Patients</span>
                  <span className="font-medium">{budgetData.targetEnrollment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Personnel</span>
                  <span className="font-medium">{budgetData.personnelCosts.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}