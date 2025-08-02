import React from 'react';

interface OverheadProps {
  overhead: number;
  onChange: (overhead: number) => void;
}

const Overhead: React.FC<OverheadProps> = ({ overhead, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">
        Overhead Percentage
      </label>
      <div className="relative">
        <input
          type="number"
          value={overhead || ''}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="w-full px-4 pr-8 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="30"
          min="0"
          max="100"
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
      </div>
    </div>
  );
};

export default Overhead;