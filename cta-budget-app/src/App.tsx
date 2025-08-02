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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 text-white shadow-2xl">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-3xl lg:text-4xl font-bold mb-2 tracking-tight">
                Clinical Trial Budget Forecaster
              </h1>
              <p className="text-blue-100 text-lg">
                Professional budget planning for clinical trials
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleExport}
                className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all duration-200 font-medium border border-white/20 shadow-lg hover:shadow-xl hover:scale-105"
              >
                📤 Export JSON
              </button>
              <label className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl hover:bg-white/20 transition-all duration-200 font-medium cursor-pointer border border-white/20 shadow-lg hover:shadow-xl hover:scale-105">
                📥 Import JSON
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

      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Left Column */}
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

          {/* Right Column */}
          <div className="space-y-8">
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
        <div className="mt-12 space-y-8">
          <ForecastSummary budgetData={budgetData} />
          <NotesSection
            notes={budgetData.notes}
            onChange={(notes) => updateBudgetData('notes', notes)}
          />
        </div>
      </main>

      <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-300">
            Built with ❤️ by Jason Sim, Clinical Trial Budget Specialist | Vancouver, BC 🇨🇦
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;