import React, { useState, useEffect, useRef } from 'react';
import StartupFees from './components/StartupFees';
import VisitSchedule from './components/VisitSchedule';
import Overhead from './components/Overhead';
import CustomRevenueItems from './components/CustomRevenueItems';
import TargetEnrollment from './components/TargetEnrollment';
import PersonnelCosts from './components/PersonnelCosts';
import ForecastSummary from './components/ForecastSummary';
import NotesSection from './components/NotesSection';
import type { BudgetData } from './types';
import { loadBudgetData, saveBudgetData, exportBudgetData, importBudgetData } from './utils/storage';

function App() {
  const [budgetData, setBudgetData] = useState<BudgetData>(loadBudgetData());
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-save to localStorage whenever budgetData changes
  useEffect(() => {
    saveBudgetData(budgetData);
  }, [budgetData]);

  const updateBudgetData = <K extends keyof BudgetData>(
    key: K,
    value: BudgetData[K]
  ) => {
    setBudgetData((prev) => ({ ...prev, [key]: value }));
  };

  const handleExport = () => {
    exportBudgetData(budgetData);
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const importedData = await importBudgetData(file);
        setBudgetData(importedData);
        alert('Budget data imported successfully!');
      } catch (error) {
        alert('Error importing budget data. Please check the file format.');
        console.error('Import error:', error);
      }
    }
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Logo and Title */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl font-bold">₿</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    Clinical Trial Budget Forecaster
                  </h1>
                  <p className="text-blue-200 text-sm font-medium">
                    Professional • Accurate • Comprehensive
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleExport}
                className="group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <span className="relative flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                  <span>Export</span>
                </span>
              </button>
              
              <label className="group relative px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <span className="relative flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span>Import</span>
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Progress Indicator */}
        <div className="mb-8 backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-semibold text-lg">Budget Completion</h3>
            <span className="text-blue-200 text-sm font-medium">75% Complete</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-full rounded-full transition-all duration-500 ease-out" style={{width: '75%'}}></div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Left Column - Primary Inputs */}
          <div className="xl:col-span-2 space-y-8">
            
            {/* Study Configuration */}
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Study Configuration</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <TargetEnrollment
                  enrollment={budgetData.targetEnrollment}
                  onChange={(enrollment) => updateBudgetData('targetEnrollment', enrollment)}
                />
                <Overhead
                  overhead={budgetData.overhead}
                  onChange={(overhead) => updateBudgetData('overhead', overhead)}
                />
              </div>
            </div>

            {/* Budget Components */}
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Budget Components</h2>
              </div>

              <div className="space-y-8">
                <StartupFees
                  fees={budgetData.startupFees}
                  onChange={(fees) => updateBudgetData('startupFees', fees)}
                />
                
                <VisitSchedule
                  visits={budgetData.visits}
                  onChange={(visits) => updateBudgetData('visits', visits)}
                />
                
                <CustomRevenueItems
                  items={budgetData.customRevenueItems}
                  onChange={(items) => updateBudgetData('customRevenueItems', items)}
                />
              </div>
            </div>

            {/* Personnel */}
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Personnel Costs</h2>
              </div>
              
              <PersonnelCosts
                costs={budgetData.personnelCosts}
                onChange={(costs) => updateBudgetData('personnelCosts', costs)}
              />
            </div>
          </div>

          {/* Right Column - Summary & Notes */}
          <div className="space-y-8">
            
            {/* Budget Summary */}
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Summary</h2>
              </div>
              
              <ForecastSummary budgetData={budgetData} />
            </div>

            {/* Notes */}
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Notes</h2>
              </div>
              
              <NotesSection
                notes={budgetData.notes}
                onChange={(notes) => updateBudgetData('notes', notes)}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 backdrop-blur-xl bg-white/5 border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <p className="text-center text-blue-200 text-sm">
            Built with ❤️ by Jason Sim, Clinical Trial Budget Specialist | Vancouver, BC 🇨🇦
          </p>
        </div>
      </footer>

      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        `
      }} />
    </div>
  );
}

export default App;