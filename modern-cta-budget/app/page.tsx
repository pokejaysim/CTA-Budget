'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CircleDollarSign, 
  Calendar, 
  Users, 
  TrendingUp, 
  FileText, 
  Download,
  Upload,
  Plus,
  Trash2,
  Calculator
} from 'lucide-react';
import type { BudgetData, Visit, CustomRevenueItem, PersonnelCost } from '@/types/budget';
import { loadBudgetData, saveBudgetData, exportBudgetData, importBudgetData } from '@/lib/storage';

export default function Home() {
  const [budgetData, setBudgetData] = useState<BudgetData>(loadBudgetData());
  const [activeTab, setActiveTab] = useState('startup');

  useEffect(() => {
    saveBudgetData(budgetData);
  }, [budgetData]);

  const updateBudgetData = (updates: Partial<BudgetData>) => {
    setBudgetData(prev => ({ ...prev, ...updates }));
  };

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

  const tabs = [
    { id: 'startup', label: 'Startup Fees', icon: CircleDollarSign },
    { id: 'visits', label: 'Visit Schedule', icon: Calendar },
    { id: 'enrollment', label: 'Target Enrollment', icon: Users },
    { id: 'revenue', label: 'Custom Revenue', icon: TrendingUp },
    { id: 'personnel', label: 'Personnel Costs', icon: Users },
    { id: 'summary', label: 'Forecast Summary', icon: Calculator },
    { id: 'notes', label: 'Notes', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        </div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="glass border-b border-white/10">
          <div className="container mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">Clinical Trial Budget Forecaster</h1>
                <p className="text-gray-300 mt-1">Professional budget planning and forecasting</p>
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => exportBudgetData(budgetData)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center gap-2 transition-all backdrop-blur-sm border border-white/20"
                >
                  <Download size={20} />
                  Export
                </motion.button>
                <motion.label
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg flex items-center gap-2 cursor-pointer transition-all shadow-lg"
                >
                  <Upload size={20} />
                  Import
                  <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                </motion.label>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'glass text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={20} />
                  {tab.label}
                </motion.button>
              );
            })}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-2xl p-8"
            >
              {activeTab === 'startup' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Startup Fees</h2>
                  <div className="grid gap-4">
                    {Object.entries(budgetData.startupFees).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 glass rounded-lg">
                        <label className="text-gray-300 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <input
                          type="number"
                          value={value}
                          onChange={(e) => updateBudgetData({
                            startupFees: { ...budgetData.startupFees, [key]: Number(e.target.value) }
                          })}
                          className="w-32 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-gray-300">Total Startup Fees</span>
                      <span className="text-2xl font-bold text-white">${totalStartupFees.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'visits' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Visit Schedule</h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addVisit}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg flex items-center gap-2"
                    >
                      <Plus size={20} />
                      Add Visit
                    </motion.button>
                  </div>
                  <div className="space-y-3">
                    {budgetData.visits.map((visit) => (
                      <motion.div
                        key={visit.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex gap-3 items-center p-4 glass rounded-lg"
                      >
                        <input
                          type="text"
                          value={visit.name}
                          onChange={(e) => updateVisit(visit.id, { name: e.target.value })}
                          className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                        />
                        <input
                          type="number"
                          value={visit.paymentPerVisit}
                          onChange={(e) => updateVisit(visit.id, { paymentPerVisit: Number(e.target.value) })}
                          placeholder="Payment per visit"
                          className="w-40 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                        />
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteVisit(visit.id)}
                          className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                          <Trash2 size={20} />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'enrollment' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Target Enrollment & Overhead</h2>
                  <div className="space-y-4">
                    <div className="p-6 glass rounded-lg">
                      <label className="block text-gray-300 mb-2">Target Enrollment</label>
                      <input
                        type="number"
                        value={budgetData.targetEnrollment}
                        onChange={(e) => updateBudgetData({ targetEnrollment: Number(e.target.value) })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white text-lg"
                      />
                    </div>
                    <div className="p-6 glass rounded-lg">
                      <label className="block text-gray-300 mb-2">Overhead Percentage</label>
                      <input
                        type="number"
                        value={budgetData.overhead}
                        onChange={(e) => updateBudgetData({ overhead: Number(e.target.value) })}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white text-lg"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'revenue' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Custom Revenue Items</h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addCustomRevenueItem}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg flex items-center gap-2"
                    >
                      <Plus size={20} />
                      Add Item
                    </motion.button>
                  </div>
                  <div className="space-y-3">
                    {budgetData.customRevenueItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-4 glass rounded-lg space-y-3"
                      >
                        <div className="flex gap-3">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateCustomRevenueItem(item.id, { name: e.target.value })}
                            className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                          />
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => deleteCustomRevenueItem(item.id)}
                            className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"
                          >
                            <Trash2 size={20} />
                          </motion.button>
                        </div>
                        <div className="flex gap-3">
                          <select
                            value={item.type}
                            onChange={(e) => updateCustomRevenueItem(item.id, { type: e.target.value as 'flat' | 'perPatient' | 'perVisit' })}
                            className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                          >
                            <option value="flat">Flat Amount</option>
                            <option value="perPatient">Per Patient</option>
                            <option value="perVisit">Per Visit</option>
                          </select>
                          <input
                            type="number"
                            value={item.amount}
                            onChange={(e) => updateCustomRevenueItem(item.id, { amount: Number(e.target.value) })}
                            placeholder="Amount"
                            className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'personnel' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Personnel Costs</h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addPersonnelCost}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg flex items-center gap-2"
                    >
                      <Plus size={20} />
                      Add Personnel
                    </motion.button>
                  </div>
                  <div className="space-y-3">
                    {budgetData.personnelCosts.map((cost) => (
                      <motion.div
                        key={cost.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-4 glass rounded-lg space-y-3"
                      >
                        <div className="flex gap-3">
                          <input
                            type="text"
                            value={cost.role}
                            onChange={(e) => updatePersonnelCost(cost.id, { role: e.target.value })}
                            placeholder="Role"
                            className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                          />
                          <select
                            value={cost.type}
                            onChange={(e) => updatePersonnelCost(cost.id, { 
                              type: e.target.value as 'perPatient' | 'flatMonthly',
                              hourlyRate: e.target.value === 'perPatient' ? 0 : undefined,
                              hours: e.target.value === 'perPatient' ? 0 : undefined,
                              monthlyFee: e.target.value === 'flatMonthly' ? 0 : undefined,
                              months: e.target.value === 'flatMonthly' ? 0 : undefined,
                            })}
                            className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                          >
                            <option value="perPatient">Per Patient</option>
                            <option value="flatMonthly">Flat Monthly</option>
                          </select>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => deletePersonnelCost(cost.id)}
                            className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"
                          >
                            <Trash2 size={20} />
                          </motion.button>
                        </div>
                        {cost.type === 'perPatient' ? (
                          <div className="flex gap-3">
                            <input
                              type="number"
                              value={cost.hourlyRate || 0}
                              onChange={(e) => updatePersonnelCost(cost.id, { hourlyRate: Number(e.target.value) })}
                              placeholder="Hourly Rate"
                              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                            />
                            <input
                              type="number"
                              value={cost.hours || 0}
                              onChange={(e) => updatePersonnelCost(cost.id, { hours: Number(e.target.value) })}
                              placeholder="Hours"
                              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                            />
                          </div>
                        ) : (
                          <div className="flex gap-3">
                            <input
                              type="number"
                              value={cost.monthlyFee || 0}
                              onChange={(e) => updatePersonnelCost(cost.id, { monthlyFee: Number(e.target.value) })}
                              placeholder="Monthly Fee"
                              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                            />
                            <input
                              type="number"
                              value={cost.months || 0}
                              onChange={(e) => updatePersonnelCost(cost.id, { months: Number(e.target.value) })}
                              placeholder="Months"
                              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                            />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'summary' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Forecast Summary</h2>
                  <div className="grid gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="p-6 glass rounded-lg"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Startup Fees</span>
                        <span className="text-xl text-white">${totalStartupFees.toLocaleString()}</span>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="p-6 glass rounded-lg"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Visit Revenue</span>
                        <span className="text-xl text-white">${totalVisitRevenue.toLocaleString()}</span>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="p-6 glass rounded-lg"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Custom Revenue</span>
                        <span className="text-xl text-white">${totalCustomRevenue.toLocaleString()}</span>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="p-6 glass rounded-lg"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Overhead ({budgetData.overhead}%)</span>
                        <span className="text-xl text-white">${overheadAmount.toLocaleString()}</span>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-lg"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-white">Total Revenue</span>
                        <span className="text-2xl font-bold text-white">${totalRevenue.toLocaleString()}</span>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="p-6 glass rounded-lg"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Personnel Costs</span>
                        <span className="text-xl text-red-400">-${totalPersonnelCosts.toLocaleString()}</span>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className={`p-6 rounded-lg ${
                        netProfit >= 0 
                          ? 'bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30' 
                          : 'bg-gradient-to-r from-red-600/20 to-pink-600/20 border border-red-500/30'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-white">Net Profit</span>
                        <span className={`text-2xl font-bold ${netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          ${netProfit.toLocaleString()}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white mb-6">Notes</h2>
                  <textarea
                    value={budgetData.notes}
                    onChange={(e) => updateBudgetData({ notes: e.target.value })}
                    placeholder="Add any additional notes or comments here..."
                    className="w-full h-64 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:border-purple-500"
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

    </div>
  );
}