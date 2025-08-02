import React from 'react';

interface NotesSectionProps {
  notes: string;
  onChange: (notes: string) => void;
}

const NotesSection: React.FC<NotesSectionProps> = ({ notes, onChange }) => {
  const clearNotes = () => {
    if (window.confirm('Are you sure you want to clear all notes?')) {
      onChange('');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm font-medium text-gray-600">
          Add consultation notes, meeting summaries, or important reminders
        </p>
        <button
          onClick={clearNotes}
          className="px-3 py-1 text-sm font-medium text-red-600 border border-red-300 rounded-md hover:bg-red-50 transition-colors"
        >
          Clear Notes
        </button>
      </div>
      
      <textarea
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-32 px-4 py-3 rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
        placeholder="Enter your notes here..."
      />
      
      <p className="mt-2 text-xs text-gray-500">
        Notes are automatically saved as you type.
      </p>
    </div>
  );
};

export default NotesSection;