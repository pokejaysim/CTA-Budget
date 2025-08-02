import React from 'react';

interface OverheadProps {
  overhead: number;
  onChange: (overhead: number) => void;
}

const Overhead: React.FC<OverheadProps> = ({ overhead, onChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Card Header */}
      <div className="px-6 py-4 bg-orange-50 border-b border-orange-100">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-semibold">📊</span>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-gray-900">Overhead</h3>
            <p className="text-sm text-gray-600">Institutional overhead percentage</p>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <label className="text-sm font-medium text-gray-700">
              Overhead Percentage
            </label>
            <div className="sm:w-32">
              <div className="relative">
                <input
                  type="number"
                  value={overhead || ''}
                  onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-center text-lg font-semibold transition-colors"
                  placeholder="30"
                  min="0"
                  max="100"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">%</span>
              </div>
            </div>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="text-orange-500 text-lg">📈</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-orange-800 font-medium">
                  Applied to Total Revenue
                </p>
                <p className="text-sm text-orange-700 mt-1">
                  This percentage will be added to your total revenue calculation for institutional overhead costs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overhead;