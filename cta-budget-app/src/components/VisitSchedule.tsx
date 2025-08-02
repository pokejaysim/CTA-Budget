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
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Visit Schedule</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[400px]">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-4 font-medium text-gray-700">Visit Name</th>
              <th className="text-left py-2 px-4 font-medium text-gray-700">Payment per Visit ($)</th>
              <th className="py-2 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {visits.map((visit) => (
              <tr key={visit.id} className="border-b">
                <td className="py-2 px-4">
                  <input
                    type="text"
                    value={visit.name}
                    onChange={(e) => updateVisit(visit.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Screening Visit"
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="number"
                    value={visit.paymentPerVisit || ''}
                    onChange={(e) => updateVisit(visit.id, 'paymentPerVisit', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => removeVisit(visit.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={addVisit}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Add Visit
      </button>
    </div>
  );
};

export default VisitSchedule;