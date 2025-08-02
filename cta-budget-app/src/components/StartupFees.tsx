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
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Startup Fees</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            IRB Fee
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
            <input
              type="number"
              value={fees.irbFee || ''}
              onChange={(e) => handleChange('irbFee', e.target.value)}
              className="w-full pl-8 pr-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Ethics Fee
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
            <input
              type="number"
              value={fees.ethicsFee || ''}
              onChange={(e) => handleChange('ethicsFee', e.target.value)}
              className="w-full pl-8 pr-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Archiving Fee
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
            <input
              type="number"
              value={fees.archivingFee || ''}
              onChange={(e) => handleChange('archivingFee', e.target.value)}
              className="w-full pl-8 pr-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Pharmacy Fee
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
            <input
              type="number"
              value={fees.pharmacyFee || ''}
              onChange={(e) => handleChange('pharmacyFee', e.target.value)}
              className="w-full pl-8 pr-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Other Fees
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
            <input
              type="number"
              value={fees.other || ''}
              onChange={(e) => handleChange('other', e.target.value)}
              className="w-full pl-8 pr-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupFees;