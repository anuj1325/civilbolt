import React, { useState } from 'react';
import { Event, Letter, SequenceOfEvents } from '@/types';
import { mockData } from '@/lib/data/mockData';
import { Calendar, FileText, User, Paperclip } from 'lucide-react';
import { PriorityBadge, OverdueBadge } from './SharedComponents';
import { getAllLettersFromEvent, getLettersForSequence } from './utils';

interface VerticalTimelineProps {
  onEventClick?: (event: Event) => void;
  selectedEvent?: Event | null;
  selectedSequence?: SequenceOfEvents | null;
  onLetterSelect?: (letter: Letter) => void;
  onGenerateSummary?: (letter: Letter) => void;
  onDraftLetter?: (letter: Letter) => void;
}

// Compact Letter Card specifically for Vertical Timeline
const CompactLetterCard: React.FC<{
  letter: Letter;
  isExpanded: boolean;
  onToggle: () => void;
  side?: 'left' | 'right';
  onLetterClick?: (letter: Letter) => void;
  onGenerateSummary?: (letter: Letter) => void;
  onDraftLetter?: (letter: Letter) => void;
}> = ({ letter, isExpanded, onToggle, side = 'right', onLetterClick, onGenerateSummary, onDraftLetter }) => {
  const isContractor = letter.from === 'Contractor';
  
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't expand if clicking on action buttons
    if ((e.target as HTMLElement).closest('.action-buttons')) {
      return;
    }
    onToggle();
    if (onLetterClick) {
      onLetterClick(letter);
    }
  };
  
  return (
    <div className="transition-all duration-300 hover:shadow-lg w-full relative">
      <div 
        className={`bg-white rounded-lg shadow-md border-l-4 ${isContractor ? 'border-l-blue-500' : 'border-l-green-500'} cursor-pointer overflow-visible relative`} 
        onClick={handleCardClick}
      >
        {/* Always visible - Collapsed view */}
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <h3 className="text-body-bold text-gray-800 truncate">{letter.subject}</h3>
              <p className="text-caption text-gray-700 mt-1">{letter.letterNo}</p>
            </div>
            <div className="flex flex-col items-end space-y-1 ml-2">
              <PriorityBadge priority={letter.priority} />
              {letter.isOverdue && <OverdueBadge isOverdue={true} />}
            </div>
          </div>
        </div>

        {/* Expanded content - Only shown when expanded - Positioned absolutely */}
        {isExpanded && (
          <div className="absolute top-full left-0 right-0 bg-white border border-t-0 rounded-b-lg shadow-lg z-20 px-4 pb-4 border-t border-gray-100">
            <div className="space-y-3 pt-3">
              {/* Date and From info */}
              <div className="flex items-center space-x-4 text-caption text-gray-600">
                <div className="flex items-center space-x-1">
                  <Calendar size={12} />
                  <span>{new Date(letter.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User size={12} />
                  <span className={`px-2 py-1 rounded ${isContractor ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                    {letter.from} → {letter.to}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-caption text-gray-600 leading-relaxed">
                  {letter.description}
                </p>
              </div>

              {/* Assignee */}
              <div className="text-caption text-gray-500">
                <strong>Assignee:</strong> {letter.assignee}
              </div>

              {/* Contract deadline */}
              {letter.contractDeadline && (
                <div className="text-caption text-gray-500">
                  <strong>Contract Deadline:</strong> {new Date(letter.contractDeadline).toLocaleDateString()}
                </div>
              )}

              {/* Attachments */}
              {letter.attachments.length > 0 && (
                <div>
                  <h4 className="text-caption-bold text-gray-700 mb-2 flex items-center">
                    <FileText size={12} className="mr-1" />
                    Attachments ({letter.attachments.length})
                  </h4>
                  <div className="space-y-1 max-h-24 overflow-y-auto">
                    {letter.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded border">
                        <div className="flex items-center space-x-2 flex-1 min-w-0"> 
                          <Paperclip size={10} className="text-gray-400 flex-shrink-0" />
                          <span className="text-caption text-gray-700 truncate">{attachment}</span>
                        </div>
                        <div className="flex space-x-1 ml-2">
                          <button 
                            className="text-caption bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('View file:', attachment);
                            }}
                          >
                            View
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Status info */}
              <div className="grid grid-cols-1 gap-2 text-caption pt-2 border-t border-gray-100">
                <div>
                  <span className="text-caption-bold text-gray-700">Status: </span>
                  <span className={`px-2 py-1 rounded text-caption ${
                    letter.status === 'completed' ? 'bg-green-100 text-green-800' :
                    letter.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                    letter.status === 'overdue' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {letter.status?.toUpperCase() || 'PENDING'}
                  </span>
                </div>
              </div>

              {/* Timestamps */}
              {(letter.createdAt || letter.updatedAt) && (
                <div className="text-caption text-gray-500 pt-2 border-t border-gray-100">
                  {letter.createdAt && <div>Created: {new Date(letter.createdAt).toLocaleString()}</div>}
                  {letter.updatedAt && <div>Updated: {new Date(letter.updatedAt).toLocaleString()}</div>}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-3 border-t border-gray-100 action-buttons">
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onGenerateSummary?.(letter);
                    }}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-caption-bold hover:bg-blue-700 transition-colors"
                    title="Generate summary of this letter"
                  >
                    Generate Summary
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDraftLetter?.(letter);
                    }}
                    className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-caption-bold hover:bg-green-700 transition-colors"
                    title="Draft a response letter"
                  >
                    Draft Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Vertical Timeline Component
export const VerticalTimeline: React.FC<VerticalTimelineProps> = ({ 
  onEventClick, 
  selectedEvent, 
  selectedSequence, 
  onLetterSelect, 
  onGenerateSummary, 
  onDraftLetter 
}) => {
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  
  const toggleCard = (letterId: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [letterId]: !prev[letterId]
    }));
  };
  
  // Get letters to show - priority: sequence > event > all letters
  const lettersToShow: Letter[] = selectedSequence ? 
    getLettersForSequence(selectedSequence) : 
    selectedEvent ? 
      getAllLettersFromEvent(selectedEvent) : 
      mockData.events.flatMap(event => getAllLettersFromEvent(event)).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  return (
    <div className="h-full overflow-y-auto bg-white p-4">
      <div className="relative w-full max-w-none py-4 min-h-full">
        {/* Central Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 top-8 bottom-8"></div>
        
        {/* Letters Timeline - Fixed spacing to maintain positions */}
        <div className="relative">
          {lettersToShow.map((letter, index) => {
            const isLeft = index % 2 === 0; // Alternate sides
            const isContractor = letter.from === 'Contractor';
            
            return (
              <div key={letter.id} className="relative mb-16">
                {/* Central Radio Button - positioned exactly on the center line */}
                <div className="absolute left-1/2 top-6 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className={`w-4 h-4 rounded-full border-3 border-white shadow-lg ${isContractor ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                </div>
                
                {/* Container with fixed height for positioning */}
                <div className="flex items-start w-full max-w-7xl mx-auto" style={{ minHeight: '120px' }}>
                  {/* Left Side */}
                  {isLeft ? (
                    <>
                      <div className="flex-1 pr-6 flex justify-end">
                        <div className="w-full max-w-md">
                          <CompactLetterCard 
                            letter={letter} 
                            isExpanded={expandedCards[letter.id]}
                            onToggle={() => toggleCard(letter.id)}
                            side="right"
                            onLetterClick={onLetterSelect}
                            onGenerateSummary={onGenerateSummary}
                            onDraftLetter={onDraftLetter}
                          />
                        </div>
                      </div>
                      
                      {/* Connecting Line from card to center */}
                      <div className="w-32 flex items-center justify-center h-1 mt-6 flex-shrink-0">
                        <div className={`w-14 h-0.5 ${isContractor ? 'bg-gradient-to-r from-blue-400 to-blue-600' : 'bg-gradient-to-r from-green-400 to-green-600'}`}></div>
                        {/* Space for the radio button */}
                        <div className="w-4"></div>
                        <div className="w-14"></div>
                      </div>
                      
                      <div className="flex-1"></div>
                    </>
                  ) : (
                    <>
                      <div className="flex-1"></div>
                      
                      {/* Connecting Line from center to card */}
                      <div className="w-32 flex items-center justify-center h-1 mt-6 flex-shrink-0">
                        <div className="w-14"></div>
                        {/* Space for the radio button */}
                        <div className="w-4"></div>
                        <div className={`w-14 h-0.5 ${isContractor ? 'bg-gradient-to-l from-blue-400 to-blue-600' : 'bg-gradient-to-l from-green-400 to-green-600'}`}></div>
                      </div>
                      
                      <div className="flex-1 pl-6 flex justify-start">
                        <div className="w-full max-w-md">
                          <CompactLetterCard 
                            letter={letter} 
                            isExpanded={expandedCards[letter.id]}
                            onToggle={() => toggleCard(letter.id)}
                            side="left"
                            onLetterClick={onLetterSelect}
                            onGenerateSummary={onGenerateSummary}
                            onDraftLetter={onDraftLetter}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};