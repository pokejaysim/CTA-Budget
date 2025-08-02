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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-800 py-4 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-xl font-bold">
              Clinical Trial Budget Calculator
            </h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-white hover:text-blue-200 transition-colors">Home</a>
              <a href="#" className="text-white hover:text-blue-200 transition-colors">CTA Checklist</a>
              <a href="#" className="text-white hover:text-blue-200 transition-colors">Budget Calculator</a>
            </nav>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
              >
                Export
              </button>
              <label className="px-4 py-2 bg-white text-blue-800 rounded-md text-sm font-medium cursor-pointer hover:bg-gray-100 transition-colors">
                Import
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
      <main className="container mx-auto max-w-5xl pt-10">
        {/* Study Information Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Study Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

        {/* Budget Components Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Budget Components</h2>
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

        {/* Personnel Costs Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Personnel Costs</h2>
          <PersonnelCosts
            costs={budgetData.personnelCosts}
            onChange={(costs) => updateBudgetData('personnelCosts', costs)}
          />
        </div>

        {/* Budget Summary Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Budget Summary</h2>
          <ForecastSummary budgetData={budgetData} />
        </div>

        {/* Notes Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Notes & Comments</h2>
          <NotesSection
            notes={budgetData.notes}
            onChange={(notes) => updateBudgetData('notes', notes)}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="container mx-auto max-w-5xl py-6 px-6">
          <p className="text-center text-sm text-gray-500">
            Built with ❤️ by Jason Sim, Clinical Trial Budget Specialist | Vancouver, BC 🇨🇦
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;