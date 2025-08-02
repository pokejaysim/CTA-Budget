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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-blue-200 text-sm">
          Add consultation notes, meeting summaries, or important reminders
        </p>
        <button
          onClick={clearNotes}
          className="px-4 py-2 bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-300 rounded-xl text-sm font-medium hover:bg-red-500/30 transition-all duration-200"
        >
          Clear All
        </button>
      </div>
      
      <div className="relative">
        <textarea
          value={notes}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-40 px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent resize-vertical transition-all duration-200"
          placeholder="Enter your consultation notes, meeting summaries, budget assumptions, or any important reminders here..."
        />
        <div className="absolute bottom-3 right-3 text-blue-300 text-xs opacity-60">
          Auto-saved
        </div>
      </div>
      
      <div className="bg-teal-500/20 backdrop-blur-sm rounded-xl p-4 border border-teal-400/30">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-teal-400 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-teal-200 text-sm">
            Your notes are automatically saved as you type and persist between sessions
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotesSection;