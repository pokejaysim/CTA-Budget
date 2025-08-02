import React from 'react';

interface TargetEnrollmentProps {
  enrollment: number;
  onChange: (enrollment: number) => void;
}

const TargetEnrollment: React.FC<TargetEnrollmentProps> = ({ enrollment, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">
        Target Enrollment
      </label>
      <input
        type="number"
        value={enrollment || ''}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        className="w-full px-4 py-2 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Number of patients"
        min="0"
      />
    </div>
  );
};

export default TargetEnrollment;