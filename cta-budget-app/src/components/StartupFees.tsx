import React from 'react';
import type { StartupFees as StartupFeesType } from '../types';

interface StartupFeesProps {
  fees: StartupFeesType;
  onChange: (fees: StartupFeesType) => void;
}

const StartupFees: React.FC<StartupFeesProps> = ({ fees, onChange }) => {
  const handleChange = (field: keyof StartupFeesType, value: string) => {
    const numValue = parseFloat(value) || 0;
    onChange({ ...fees, [field]: numValue });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Card Header */}
      <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-semibold">💰</span>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-gray-900">Startup Fees</h3>
            <p className="text-sm text-gray-600">Initial study setup costs</p>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              IRB Fee
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
              <input
                type="number"
                value={fees.irbFee || ''}
                onChange={(e) => handleChange('irbFee', e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Ethics Fee
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
              <input
                type="number"
                value={fees.ethicsFee || ''}
                onChange={(e) => handleChange('ethicsFee', e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Archiving Fee
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
              <input
                type="number"
                value={fees.archivingFee || ''}
                onChange={(e) => handleChange('archivingFee', e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Pharmacy Fee
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
              <input
                type="number"
                value={fees.pharmacyFee || ''}
                onChange={(e) => handleChange('pharmacyFee', e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
                placeholder="0"
              />
            </div>
          </div>

          <div className="sm:col-span-2 space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Other Fees
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
              <input
                type="number"
                value={fees.other || ''}
                onChange={(e) => handleChange('other', e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
                placeholder="0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupFees;