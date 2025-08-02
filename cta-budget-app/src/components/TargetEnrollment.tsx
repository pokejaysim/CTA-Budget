import React from 'react';

interface TargetEnrollmentProps {
  enrollment: number;
  onChange: (enrollment: number) => void;
}

const TargetEnrollment: React.FC<TargetEnrollmentProps> = ({ enrollment, onChange }) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
          <span className="text-white font-bold text-lg">👥</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Target Enrollment</h2>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <label className="text-sm font-semibold text-slate-700">
          Total Number of Patients
        </label>
        <input
          type="number"
          value={enrollment || ''}
          onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          className="w-40 px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200 hover:border-slate-300 text-center text-lg font-semibold"
          placeholder="20"
          min="0"
        />
      </div>
      <p className="mt-4 text-sm text-slate-600 bg-slate-50/50 rounded-lg p-3">
        💡 All revenue forecasts will be based on this enrollment target.
      </p>
    </div>
  );
};

export default TargetEnrollment;