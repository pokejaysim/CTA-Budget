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
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
          <span className="text-white font-bold text-lg">📅</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Visit Schedule</h2>
      </div>
      <div className="overflow-x-auto bg-white/30 rounded-xl p-4">
        <table className="w-full min-w-[400px]">
          <thead>
            <tr className="border-b-2 border-slate-200">
              <th className="text-left py-4 px-4 font-semibold text-slate-700 text-sm uppercase tracking-wide">Visit Name</th>
              <th className="text-left py-4 px-4 font-semibold text-slate-700 text-sm uppercase tracking-wide">Payment per Visit ($)</th>
              <th className="py-4 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {visits.map((visit) => (
              <tr key={visit.id} className="border-b border-slate-100 hover:bg-white/20 transition-colors">
                <td className="py-3 px-4">
                  <input
                    type="text"
                    value={visit.name}
                    onChange={(e) => updateVisit(visit.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 transition-all duration-200"
                    placeholder="e.g., Screening Visit"
                  />
                </td>
                <td className="py-3 px-4">
                  <input
                    type="number"
                    value={visit.paymentPerVisit || ''}
                    onChange={(e) => updateVisit(visit.id, 'paymentPerVisit', e.target.value)}
                    className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/70 transition-all duration-200"
                    placeholder="0"
                  />
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => removeVisit(visit.id)}
                    className="text-red-500 hover:text-red-700 font-medium px-3 py-1 rounded-lg hover:bg-red-50 transition-all duration-200"
                  >
                    ✕ Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={addVisit}
        className="mt-6 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:scale-105"
      >
        ➕ Add Visit
      </button>
    </div>
  );
};

export default VisitSchedule;