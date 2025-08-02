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
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4">
          <span className="text-white font-bold text-lg">💰</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Startup Fees</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            IRB Fee ($)
          </label>
          <input
            type="number"
            value={fees.irbFee || ''}
            onChange={(e) => handleChange('irbFee', e.target.value)}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200 hover:border-slate-300"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Ethics Fee ($)
          </label>
          <input
            type="number"
            value={fees.ethicsFee || ''}
            onChange={(e) => handleChange('ethicsFee', e.target.value)}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200 hover:border-slate-300"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Archiving Fee ($)
          </label>
          <input
            type="number"
            value={fees.archivingFee || ''}
            onChange={(e) => handleChange('archivingFee', e.target.value)}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200 hover:border-slate-300"
            placeholder="0"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Pharmacy Fee ($)
          </label>
          <input
            type="number"
            value={fees.pharmacyFee || ''}
            onChange={(e) => handleChange('pharmacyFee', e.target.value)}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200 hover:border-slate-300"
            placeholder="0"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Other Fees ($)
          </label>
          <input
            type="number"
            value={fees.other || ''}
            onChange={(e) => handleChange('other', e.target.value)}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200 hover:border-slate-300"
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );
};

export default StartupFees;