import React from 'react';

interface OverheadProps {
  overhead: number;
  onChange: (overhead: number) => void;
}

const Overhead: React.FC<OverheadProps> = ({ overhead, onChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Overhead</h2>
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700">
          Overhead Percentage (%)
        </label>
        <input
          type="number"
          value={overhead || ''}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="30"
          min="0"
          max="100"
        />
      </div>
      <p className="mt-2 text-sm text-gray-600">
        This percentage will be applied to the total revenue calculation.
      </p>
    </div>
  );
};

export default Overhead;