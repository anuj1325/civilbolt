import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Event, SequenceOfEvents, SummaryModalProps } from '@/types';

// Priority Badge Component
export const PriorityBadge: React.FC<{ priority: Event['priority'] }> = ({ priority }) => {
  const colors = {
    urgent: 'bg-red-100 text-red-800 border-red-200',
    high: 'bg-orange-100 text-orange-800 border-orange-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    low: 'bg-green-100 text-green-800 border-green-200'
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[priority]}`}>
      {priority.toUpperCase()}
    </span>
  );
};

// Overdue Badge Component
export const OverdueBadge: React.FC<{ isOverdue: boolean }> = ({ isOverdue }) => {
  if (!isOverdue) return null;
  
  return (
    <div className="flex items-center space-x-1 text-red-600 text-xs">
      <AlertTriangle size={12} />
      <span className="font-medium">OVERDUE</span>
    </div>
  );
};

// Sequence Status Badge Component
export const SequenceStatusBadge: React.FC<{ status: SequenceOfEvents['status'] }> = ({ status }) => {
  const colors = {
    not_started: 'bg-gray-100 text-gray-800 border-gray-200',
    in_progress: 'bg-blue-100 text-blue-800 border-blue-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
    delayed: 'bg-red-100 text-red-800 border-red-200'
  };
  
  const labels = {
    not_started: 'NOT STARTED',
    in_progress: 'IN PROGRESS',
    completed: 'COMPLETED',
    delayed: 'DELAYED'
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[status]}`}>
      {labels[status]}
    </span>
  );
};

// Summary Generation Modal Component
export const SummaryModal: React.FC<SummaryModalProps> = ({ letter, isOpen, onClose }) => {
  const [wordCount, setWordCount] = useState(150);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState('');

  const handleGenerateSummary = async () => {
    if (!letter) return;
    
    setIsGenerating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate dummy summary based on word count
    const baseSummary = `This letter from ${letter.from} to ${letter.to} (${letter.letterNo}) dated ${new Date(letter.date).toLocaleDateString()} addresses ${letter.subject.toLowerCase()}. ${letter.description}`;
    
    const words = baseSummary.split(' ');
    let summary = words.slice(0, Math.min(wordCount, words.length)).join(' ');
    
    if (words.length > wordCount) {
      summary += '...';
    }
    
    // Pad with additional context if needed
    if (words.length < wordCount) {
      summary += ` The correspondence involves key stakeholders and requires attention from ${letter.assignee}. Priority level is ${letter.priority} with status ${letter.status}. This communication is part of the ongoing project coordination between contractor and NHAI authorities.`;
      const finalWords = summary.split(' ');
      summary = finalWords.slice(0, wordCount).join(' ');
    }
    
    setGeneratedSummary(summary);
    setIsGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedSummary);
  };

  if (!isOpen || !letter) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Generate Summary</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          
          {/* Letter Reference */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Reference Letter:</h3>
            <p className="text-sm text-gray-600 mb-1">{letter.letterNo} - {letter.subject}</p>
            <p className="text-xs text-gray-500">From: {letter.from} | Date: {new Date(letter.date).toLocaleDateString()}</p>
          </div>
          
          {/* Word Count Slider */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-medium text-gray-700">Summary Length:</label>
              <span className="text-sm font-semibold text-blue-600">{wordCount} words</span>
            </div>
            
            <div className="relative">
              <input
                type="range"
                min="50"
                max="500"
                step="25"
                value={wordCount}
                onChange={(e) => setWordCount(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((wordCount - 50) / 450) * 100}%, #e5e7eb ${((wordCount - 50) / 450) * 100}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>50</span>
                <span>150</span>
                <span>300</span>
                <span>500</span>
              </div>
            </div>
          </div>
          
          {/* Generate Button */}
          <div className="mb-6">
            <button
              onClick={handleGenerateSummary}
              disabled={isGenerating}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed font-medium"
            >
              {isGenerating ? 'Generating Summary...' : 'Generate Summary'}
            </button>
          </div>
          
          {/* Generated Summary */}
          {(generatedSummary || isGenerating) && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Generated Summary:</h3>
              <div className="p-4 border rounded-lg bg-gray-50 min-h-[120px]">
                {isGenerating ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-3 text-gray-600">Generating...</span>
                  </div>
                ) : (
                  <p className="text-sm text-gray-700 leading-relaxed">{generatedSummary}</p>
                )}
              </div>
              
              {generatedSummary && !isGenerating && (
                <div className="flex space-x-2 mt-3">
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                  >
                    Copy Summary
                  </button>
                  <button
                    onClick={handleGenerateSummary}
                    className="px-4 py-2 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
                  >
                    Regenerate
                  </button>
                </div>
              )}
            </div>
          )}
          
          {/* Close Button */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};