import React from 'react';
import { Sparkles, X } from 'lucide-react';

interface NoteFeedbackProps {
  feedback: string;
  isLoading: boolean;
  onClose: () => void;
}

export function NoteFeedback({ feedback, isLoading, onClose }: NoteFeedbackProps) {
  const cleanBulletPoints = (text: string): string => {
    const lines = text.split('\n');
    const cleanedLines = lines.map(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('*')) {
        const content = trimmed.substring(1).trim();
        return content ? `* ${content}` : '';
      }
      return line;
    });
    return cleanedLines.filter(line => line.trim()).join('\n');
  };

  const formatFeedback = (text: string) => {
    const cleanedText = cleanBulletPoints(text);
    const sections = cleanedText.split(/(?=\d+\. )/);

    return sections.map((section, index) => {
      if (index === 0) return null;

      const [title, ...content] = section.split('\n');
      const titleText = title.replace(/^\d+\. /, '').replace(/\*\*/g, '');
      
      const processedContent = content
        .filter(line => line.trim())
        .map(line => {
          if (line.trim().startsWith('*')) {
            const bulletContent = line.replace(/^\s*\*\s*/, '').replace(/\*\*/g, '').trim();
            return bulletContent ? (
              <li key={line} className="ml-4 mb-2">
                {bulletContent}
              </li>
            ) : null;
          }
          const paragraphContent = line.replace(/\*\*/g, '').trim();
          return paragraphContent ? (
            <p key={line} className="my-2">
              {paragraphContent}
            </p>
          ) : null;
        })
        .filter(Boolean);

      return processedContent.length > 0 ? (
        <div key={title} className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {titleText}
          </h3>
          <div className="text-gray-600">
            {processedContent}
          </div>
        </div>
      ) : null;
    }).filter(Boolean);
  };

  return (
    <div className="fixed inset-4 sm:right-4 sm:top-4 sm:inset-auto sm:w-96 bg-white rounded-lg shadow-xl border border-gray-200 max-h-[90vh] sm:max-h-[80vh] flex flex-col z-[9999]">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <div className="flex items-center gap-2">
          <Sparkles className="text-yellow-500" size={20} />
          <h3 className="font-semibold text-gray-800">AI Feedback</h3>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 rounded-full p-1.5 hover:bg-gray-200 transition-colors"
        >
          <X size={20} />
        </button>
      </div>
      <div className="p-4 sm:p-6 overflow-y-auto flex-1 custom-scrollbar">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {formatFeedback(feedback)}
          </div>
        )}
      </div>
    </div>
  );
}