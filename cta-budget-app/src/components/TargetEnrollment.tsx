import React from 'react';

interface TargetEnrollmentProps {
  enrollment: number;
  onChange: (enrollment: number) => void;
}

const TargetEnrollment: React.FC<TargetEnrollmentProps> = ({ enrollment, onChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Card Header */}
      <div className="px-6 py-4 bg-purple-50 border-b border-purple-100">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-semibold">👥</span>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-gray-900">Target Enrollment</h3>
            <p className="text-sm text-gray-600">Total patients for this study</p>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <label className="text-sm font-medium text-gray-700">
              Number of Patients
            </label>
            <div className="sm:w-48">
              <input
                type="number"
                value={enrollment || ''}
                onChange={(e) => onChange(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-center text-lg font-semibold transition-colors"
                placeholder="0"
                min="0"
              />
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="text-purple-500 text-lg">💡</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-purple-800 font-medium">
                  Forecasting Basis
                </p>
                <p className="text-sm text-purple-700 mt-1">
                  All revenue calculations and per-patient costs will be based on this enrollment target.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TargetEnrollment;