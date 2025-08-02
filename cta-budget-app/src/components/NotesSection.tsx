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
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Consultation Notes</h2>
        <button
          onClick={clearNotes}
          className="px-3 py-1 text-sm text-red-600 hover:text-red-800 font-medium"
        >
          Clear Notes
        </button>
      </div>
      <textarea
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
        placeholder="Enter consultation notes, meeting summaries, or important reminders here..."
      />
      <p className="mt-2 text-sm text-gray-600">
        These notes are automatically saved and will persist between sessions.
      </p>
    </div>
  );
};

export default NotesSection;