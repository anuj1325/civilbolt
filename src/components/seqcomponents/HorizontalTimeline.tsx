import React, { useState } from 'react';
import { Event, Letter, SequenceOfEvents } from '@/types';
import { mockData } from '@/lib/data/mockData';
import { LetterCard } from './CardComponents';
import { getAllLettersFromEvent, getLettersForSequence } from './utils';

interface HorizontalTimelineProps {
  onEventClick?: (event: Event) => void;
  selectedEvent?: Event | null;
  selectedSequence?: SequenceOfEvents | null;
  onLetterSelect?: (letter: Letter) => void;
  onGenerateSummary?: (letter: Letter) => void;
  onDraftLetter?: (letter: Letter) => void;
}

// Horizontal Timeline Component - FIXED radio buttons on central line
export const HorizontalTimeline: React.FC<HorizontalTimelineProps> = ({ 
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
  const totalWidth = lettersToShow.length * 380;
  
  return (
    <div className="h-full bg-white w-full overflow-hidden">
      {/* Horizontal scroll container - ONLY this scrolls */}
      <div className="h-full w-full overflow-x-auto overflow-y-hidden">
        <div className="relative px-4 py-8" style={{ width: `${totalWidth}px`, height: '600px', minHeight: '600px' }}>
          {/* Central Horizontal Line */}
          <div 
            className="absolute top-1/2 left-8 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 transform -translate-y-1/2 z-0"
            style={{ width: `${totalWidth - 64}px` }}
          ></div>
          
          {/* Timeline Letters Container */}
          <div className="relative h-full" style={{ width: `${totalWidth - 32}px` }}>
            {lettersToShow.map((letter, index) => {
              const isContractor = letter.from === 'Contractor';
              const leftPosition = index * 380 + 190; // Center position for each letter
              
              return (
                <div key={letter.id} className="absolute h-full" style={{ left: `${leftPosition}px`, transform: 'translateX(-50%)' }}>
                  
                  {/* Radio Button - EXACTLY on central line */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-20" style={{ top: '50%', transform: 'translateX(-50%) translateY(-50%)' }}>
                    <div className={`w-6 h-6 rounded-full border-4 border-white shadow-lg ${isContractor ? 'bg-gradient-to-r from-blue-400 to-blue-600' : 'bg-gradient-to-r from-green-400 to-green-600'}`}>
                      <div className="w-full h-full rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  {/* Connecting Line from Radio Button to Top Card (Contractor) */}
                  {isContractor && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 z-0">
                      <div className={`w-0.5 bg-gradient-to-t from-blue-600 to-blue-400`} style={{ height: '120px', marginTop: '-120px' }}></div>
                    </div>
                  )}
                  
                  {/* Connecting Line from Radio Button to Bottom Card (NHAI) */}
                  {!isContractor && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 z-0">
                      <div className={`w-0.5 bg-gradient-to-b from-green-600 to-green-400`} style={{ height: '120px' }}></div>
                    </div>
                  )}
                  
                  {/* Top Card (Contractor Only) */}
                  {isContractor && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-10" style={{ top: '80px' }}>
                      <div className="w-72 max-w-72">
                        <LetterCard 
                          letter={letter} 
                          isExpanded={expandedCards[letter.id]}
                          onToggle={() => toggleCard(letter.id)}
                          onLetterClick={onLetterSelect}
                          isSelected={false}
                          onGenerateSummary={onGenerateSummary}
                          onDraftLetter={onDraftLetter}
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Bottom Card (NHAI Only) */}
                  {!isContractor && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-10" style={{ bottom: '80px' }}>
                      <div className="w-72 max-w-72">
                        <LetterCard 
                          letter={letter} 
                          isExpanded={expandedCards[letter.id]}
                          onToggle={() => toggleCard(letter.id)}
                          onLetterClick={onLetterSelect}
                          isSelected={false}
                          onGenerateSummary={onGenerateSummary}
                          onDraftLetter={onDraftLetter}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};