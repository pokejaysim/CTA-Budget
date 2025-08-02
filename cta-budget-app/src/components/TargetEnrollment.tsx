import React from 'react';

interface TargetEnrollmentProps {
  enrollment: number;
  onChange: (enrollment: number) => void;
}

const TargetEnrollment: React.FC<TargetEnrollmentProps> = ({ enrollment, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <label className="block text-sm font-medium text-blue-200 mb-3">
          Target Enrollment
        </label>
        <div className="relative">
          <input
            type="number"
            value={enrollment || ''}
            onChange={(e) => onChange(parseInt(e.target.value) || 0)}
            className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-lg font-semibold"
            placeholder="Number of patients"
            min="0"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <span className="text-blue-300 text-sm font-medium">patients</span>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-500/20 backdrop-blur-sm rounded-xl p-4 border border-blue-400/30">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-blue-200 text-sm">
            This value drives all per-patient calculations
          </p>
        </div>
      </div>
    </div>
  );
};

export default TargetEnrollment;