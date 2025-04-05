import { useState } from 'react';
import { PlusCircle, Trash2, Check, X } from 'lucide-react';
import type { SidebarProps } from '../types';

export function Sidebar({ notes, selectedNote, onNoteSelect, onNoteCreate, onNoteDelete }: SidebarProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');

  const handleCreateNote = () => {
    if (newNoteTitle.trim()) {
      onNoteCreate(newNoteTitle.trim());
      setNewNoteTitle('');
    }
    setIsCreating(false);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setNewNoteTitle('');
  };

  return (
    <div className="w-full lg:w-64 h-full bg-white border-r border-gray-200">
      <div className="sticky top-0 bg-white p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Notes</h2>
          {!isCreating && (
            <button
              onClick={() => setIsCreating(true)}
              className="text-blue-600 hover:text-blue-800"
              title="Create new note"
            >
              <PlusCircle size={24} />
            </button>
          )}
        </div>
        {isCreating && (
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                placeholder="Note title"
                className="w-full px-3 py-2 pr-16 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCreateNote();
                  } else if (e.key === 'Escape') {
                    handleCancel();
                  }
                }}
              />
              <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-1">
                <button
                  onClick={handleCreateNote}
                  className="p-1 text-green-600 hover:text-green-800 rounded-full hover:bg-green-50"
                  title="Confirm"
                >
                  <Check size={18} />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-1 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50"
                  title="Cancel"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="h-[calc(100vh-120px)] overflow-y-auto p-4 space-y-2">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`p-2 rounded cursor-pointer flex justify-between items-center group ${
              selectedNote?.id === note.id
                ? 'bg-blue-100'
                : 'hover:bg-gray-100'
            }`}
            onClick={() => onNoteSelect(note)}
          >
            <div className="truncate flex-1 min-w-0">
              <p className="font-medium truncate">{note.title}</p>
              <p className="text-sm text-gray-500 truncate">
                {new Date(note.updatedAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNoteDelete(note.id);
              }}
              className="text-red-600 hover:text-red-800 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Delete note"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}