import React from 'react';
import type { PersonnelCost } from '../types';

interface PersonnelCostsProps {
  costs: PersonnelCost[];
  onChange: (costs: PersonnelCost[]) => void;
}

const PersonnelCosts: React.FC<PersonnelCostsProps> = ({ costs, onChange }) => {
  const addCost = () => {
    const newCost: PersonnelCost = {
      id: Date.now().toString(),
      role: '',
      type: 'perPatient',
      hourlyRate: 0,
      hours: 0,
    };
    onChange([...costs, newCost]);
  };

  const updateCost = (id: string, field: keyof PersonnelCost, value: string | number) => {
    const updatedCosts = costs.map((cost) => {
      if (cost.id === id) {
        const updatedCost = { ...cost, [field]: value };
        
        // Clear irrelevant fields when type changes
        if (field === 'type') {
          if (value === 'perPatient') {
            delete updatedCost.monthlyFee;
            delete updatedCost.months;
            updatedCost.hourlyRate = updatedCost.hourlyRate || 0;
            updatedCost.hours = updatedCost.hours || 0;
          } else {
            delete updatedCost.hourlyRate;
            delete updatedCost.hours;
            updatedCost.monthlyFee = updatedCost.monthlyFee || 0;
            updatedCost.months = updatedCost.months || 0;
          }
        }
        
        // Convert numeric fields
        if (field === 'hourlyRate' || field === 'hours' || field === 'monthlyFee' || field === 'months') {
          updatedCost[field] = parseFloat(value as string) || 0;
        }
        
        return updatedCost;
      }
      return cost;
    });
    onChange(updatedCosts);
  };

  const removeCost = (id: string) => {
    onChange(costs.filter((cost) => cost.id !== id));
  };

  const calculateTotalCost = () => {
    return costs.reduce((total, cost) => {
      if (cost.type === 'perPatient') {
        return total + (cost.hourlyRate || 0) * (cost.hours || 0);
      } else {
        return total + (cost.monthlyFee || 0) * (cost.months || 0);
      }
    }, 0);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Personnel Costs</h2>
      <div className="space-y-4">
        {costs.map((cost) => (
          <div key={cost.id} className="border rounded-lg p-4 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <input
                  type="text"
                  value={cost.role}
                  onChange={(e) => updateCost(cost.id, 'role', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Study Coordinator"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={cost.type}
                  onChange={(e) => updateCost(cost.id, 'type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="perPatient">Per Patient/Visit</option>
                  <option value="flatMonthly">Flat/Monthly</option>
                </select>
              </div>
              {cost.type === 'perPatient' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hourly Rate ($)
                    </label>
                    <input
                      type="number"
                      value={cost.hourlyRate || ''}
                      onChange={(e) => updateCost(cost.id, 'hourlyRate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hours per Patient
                    </label>
                    <input
                      type="number"
                      value={cost.hours || ''}
                      onChange={(e) => updateCost(cost.id, 'hours', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Monthly Fee ($)
                    </label>
                    <input
                      type="number"
                      value={cost.monthlyFee || ''}
                      onChange={(e) => updateCost(cost.id, 'monthlyFee', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Months
                    </label>
                    <input
                      type="number"
                      value={cost.months || ''}
                      onChange={(e) => updateCost(cost.id, 'months', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                </>
              )}
            </div>
            <button
              onClick={() => removeCost(cost.id)}
              className="mt-3 text-red-600 hover:text-red-800 font-medium text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={addCost}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Add Personnel Cost
      </button>
      <div className="mt-4 p-4 bg-blue-50 rounded-md">
        <p className="text-sm font-medium text-blue-900">
          Base Personnel Cost: ${calculateTotalCost().toFixed(2)}
        </p>
        <p className="text-xs text-blue-700 mt-1">
          * Per-patient costs will be multiplied by target enrollment
        </p>
      </div>
    </div>
  );
};

export default PersonnelCosts;