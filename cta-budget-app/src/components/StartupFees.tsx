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
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Startup Fees</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            IRB Fee ($)
          </label>
          <input
            type="number"
            value={fees.irbFee || ''}
            onChange={(e) => handleChange('irbFee', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ethics Fee ($)
          </label>
          <input
            type="number"
            value={fees.ethicsFee || ''}
            onChange={(e) => handleChange('ethicsFee', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Archiving Fee ($)
          </label>
          <input
            type="number"
            value={fees.archivingFee || ''}
            onChange={(e) => handleChange('archivingFee', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pharmacy Fee ($)
          </label>
          <input
            type="number"
            value={fees.pharmacyFee || ''}
            onChange={(e) => handleChange('pharmacyFee', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Other Fees ($)
          </label>
          <input
            type="number"
            value={fees.other || ''}
            onChange={(e) => handleChange('other', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );
};

export default StartupFees;