import { Save, Download, Sparkles } from 'lucide-react';
import { Editor } from './Editor';
import { NoteFeedback } from './NoteFeedback';
import { analyzeNote } from '../utils/gemini';
import type { NoteEditorProps } from '../types';
import { useState } from 'react';

export function NoteEditor({ note, onTitleChange, onContentChange, onSave, onExport }: NoteEditorProps) {
  const [feedback, setFeedback] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setShowFeedback(true);
    const analysis = await analyzeNote(note.title, note.content);
    setFeedback(analysis);
    setIsAnalyzing(false);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 px-4 sm:px-0">
        {/* Title input with proper spacing from menu button */}
        <input
          type="text"
          value={note.title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="text-xl sm:text-2xl font-bold bg-transparent border-none focus:outline-none w-full mt-14 sm:mt-0"
          placeholder="Note title"
        />
        
        {/* Action buttons - stack vertically on mobile, original layout on desktop */}
        <div className="grid grid-cols-1 sm:flex sm:flex-row gap-2 w-full sm:w-auto">
          <button
            onClick={handleAnalyze}
            className="flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-3 sm:py-2 rounded-lg hover:bg-purple-700 transition-colors w-full sm:w-auto"
            title="Get AI feedback"
          >
            <Sparkles size={20} />
            <span className="sm:hidden">AI Analysis</span>
            <span className="hidden sm:inline">Analyze</span>
          </button>
          <button
            onClick={onSave}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
          >
            <Save size={20} />
            <span>Save</span>
          </button>
          <button
            onClick={onExport}
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 sm:py-2 rounded-lg hover:bg-green-700 transition-colors w-full sm:w-auto"
            title="Export to PDF"
          >
            <Download size={20} />
            <span className="sm:hidden">Export</span>
            <span className="hidden sm:inline">Export PDF</span>
          </button>
        </div>
      </div>

      {/* Editor section */}
      <div className="flex-1 -mx-4 sm:mx-0">
        <Editor content={note.content} onChange={onContentChange} />
      </div>
      
      {/* Feedback panel */}
      {showFeedback && (
        <NoteFeedback
          feedback={feedback}
          isLoading={isAnalyzing}
          onClose={() => setShowFeedback(false)}
        />
      )}
    </div>
  );
}