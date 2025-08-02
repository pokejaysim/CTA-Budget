import React from 'react';
import type { Visit } from '../types';

interface VisitScheduleProps {
  visits: Visit[];
  onChange: (visits: Visit[]) => void;
}

const VisitSchedule: React.FC<VisitScheduleProps> = ({ visits, onChange }) => {
  const addVisit = () => {
    const newVisit: Visit = {
      id: Date.now().toString(),
      name: '',
      paymentPerVisit: 0,
    };
    onChange([...visits, newVisit]);
  };

  const updateVisit = (id: string, field: keyof Visit, value: string | number) => {
    const updatedVisits = visits.map((visit) =>
      visit.id === id
        ? { ...visit, [field]: field === 'paymentPerVisit' ? (parseFloat(value as string) || 0) : value }
        : visit
    );
    onChange(updatedVisits);
  };

  const removeVisit = (id: string) => {
    onChange(visits.filter((visit) => visit.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Visit Schedule</h3>
        <button
          onClick={addVisit}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Add Visit
        </button>
      </div>
      
      {visits.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Visit Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Payment per Visit</th>
                <th className="w-20"></th>
              </tr>
            </thead>
            <tbody>
              {visits.map((visit) => (
                <tr key={visit.id} className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      value={visit.name}
                      onChange={(e) => updateVisit(visit.id, 'name', e.target.value)}
                      className="w-full px-3 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Screening Visit"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
                      <input
                        type="number"
                        value={visit.paymentPerVisit || ''}
                        onChange={(e) => updateVisit(visit.id, 'paymentPerVisit', e.target.value)}
                        className="w-full pl-8 pr-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => removeVisit(visit.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {visits.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No visits added yet. Click "Add Visit" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default VisitSchedule;