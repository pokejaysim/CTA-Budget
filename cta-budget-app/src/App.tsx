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
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 sm:mb-0">
              Clinical Trial Budget Forecaster
            </h1>
            <div className="flex gap-3">
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition-colors font-medium"
              >
                Export JSON
              </button>
              <label className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition-colors font-medium cursor-pointer">
                Import JSON
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

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
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

          {/* Right Column */}
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

        {/* Full Width Components */}
        <div className="mt-6 space-y-6">
          <ForecastSummary budgetData={budgetData} />
          <NotesSection
            notes={budgetData.notes}
            onChange={(notes) => updateBudgetData('notes', notes)}
          />
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            Built by Jason Sim, Clinical Trial Budget Specialist | Vancouver, BC 🇨🇦
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;