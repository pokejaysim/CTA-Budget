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

  const inputFields = [
    { key: 'irbFee' as keyof StartupFeesType, label: 'IRB Fee', placeholder: 'Enter IRB fee' },
    { key: 'ethicsFee' as keyof StartupFeesType, label: 'Ethics Fee', placeholder: 'Enter ethics fee' },
    { key: 'archivingFee' as keyof StartupFeesType, label: 'Archiving Fee', placeholder: 'Enter archiving fee' },
    { key: 'pharmacyFee' as keyof StartupFeesType, label: 'Pharmacy Fee', placeholder: 'Enter pharmacy fee' },
    { key: 'other' as keyof StartupFeesType, label: 'Other Fees', placeholder: 'Enter other fees' },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white">Startup Fees</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inputFields.map(({ key, label, placeholder }) => (
          <div key={key} className="group">
            <label className="block text-sm font-medium text-blue-200 mb-3">
              {label}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300 text-lg font-semibold">$</span>
              <input
                type="number"
                value={fees[key] || ''}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full pl-10 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 group-hover:bg-white/15"
                placeholder={placeholder}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StartupFees;