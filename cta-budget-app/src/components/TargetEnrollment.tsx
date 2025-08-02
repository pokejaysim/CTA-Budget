import React from 'react';

interface TargetEnrollmentProps {
  enrollment: number;
  onChange: (enrollment: number) => void;
}

const TargetEnrollment: React.FC<TargetEnrollmentProps> = ({ enrollment, onChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Target Enrollment</h2>
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700">
          Total Number of Patients
        </label>
        <input
          type="number"
          value={enrollment || ''}
          onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="20"
          min="0"
        />
      </div>
      <p className="mt-2 text-sm text-gray-600">
        All revenue forecasts will be based on this enrollment target.
      </p>
    </div>
  );
};

export default TargetEnrollment;