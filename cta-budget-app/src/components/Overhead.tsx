import React from 'react';

interface OverheadProps {
  overhead: number;
  onChange: (overhead: number) => void;
}

const Overhead: React.FC<OverheadProps> = ({ overhead, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <label className="block text-sm font-medium text-blue-200 mb-3">
          Overhead Percentage
        </label>
        <div className="relative">
          <input
            type="number"
            value={overhead || ''}
            onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-4 pr-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-lg font-semibold"
            placeholder="30"
            min="0"
            max="100"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <span className="text-blue-300 text-xl font-bold">%</span>
          </div>
        </div>
      </div>
      
      <div className="bg-orange-500/20 backdrop-blur-sm rounded-xl p-4 border border-orange-400/30">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-orange-400 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-orange-200 text-sm">
            Applied to total revenue calculation
          </p>
        </div>
      </div>
    </div>
  );
};

export default Overhead;