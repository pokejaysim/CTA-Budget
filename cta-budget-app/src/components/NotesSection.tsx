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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Card Header */}
      <div className="px-6 py-4 bg-indigo-50 border-b border-indigo-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-semibold">📝</span>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-900">Consultation Notes</h3>
              <p className="text-sm text-gray-600">Meeting notes and important reminders</p>
            </div>
          </div>
          <button
            onClick={clearNotes}
            className="inline-flex items-center px-3 py-1.5 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="space-y-4">
          <textarea
            value={notes}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm resize-vertical transition-colors"
            placeholder="Enter consultation notes, meeting summaries, sponsor feedback, budget assumptions, or any important reminders here..."
          />
          
          <div className="bg-indigo-50 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="text-indigo-500 text-lg">💾</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-indigo-800 font-medium">
                  Auto-Save Enabled
                </p>
                <p className="text-sm text-indigo-700 mt-1">
                  Your notes are automatically saved as you type and will persist between sessions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesSection;