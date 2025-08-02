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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      {/* Header Card */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
            {/* Title Section */}
            <div className="space-y-2">
              <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
                Clinical Trial Budget Forecaster
              </h1>
              <p className="text-lg text-gray-600 font-medium">
                Professional budget planning and forecasting for clinical trials
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleExport}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <span className="mr-2">📤</span>
                Export Data
              </button>
              <label className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer">
                <span className="mr-2">📥</span>
                Import Data
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
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Input Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Left Column - Input Cards */}
          <div className="space-y-6">
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

          {/* Right Column - Configuration Cards */}
          <div className="space-y-6">
            <TargetEnrollment
              enrollment={budgetData.targetEnrollment}
              onChange={(enrollment) => updateBudgetData('targetEnrollment', enrollment)}
            />
            <Overhead
              overhead={budgetData.overhead}
              onChange={(overhead) => updateBudgetData('overhead', overhead)}
            />
            <PersonnelCosts
              costs={budgetData.personnelCosts}
              onChange={(costs) => updateBudgetData('personnelCosts', costs)}
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <ForecastSummary budgetData={budgetData} />
          <NotesSection
            notes={budgetData.notes}
            onChange={(notes) => updateBudgetData('notes', notes)}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            Built with ❤️ by Jason Sim, Clinical Trial Budget Specialist | Vancouver, BC 🇨🇦
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;