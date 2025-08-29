import React from 'react';
import { Calendar, FileText, User, Paperclip } from 'lucide-react';
import { LetterCardProps, EventCardProps } from '@/types';
import { PriorityBadge, OverdueBadge } from './SharedComponents';

// Letter Card Component - For individual letters within an event
export const LetterCard: React.FC<LetterCardProps> = ({ letter, isExpanded, onToggle, side = 'right', onLetterClick, isSelected = false, onGenerateSummary, onDraftLetter }) => {
  const isContractor = letter.from === 'Contractor';
  const cardClass = side === 'left' ? 'mr-8' : 'ml-8';
  
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
    <div className={`${cardClass} transition-all duration-300 hover:shadow-lg ${isSelected ? 'ring-2 ring-blue-400 ring-opacity-75' : ''}`}>
      <div className={`bg-white rounded-lg shadow-md border-l-4 ${isContractor ? 'border-l-blue-500' : 'border-l-green-500'} p-4 cursor-pointer ${isSelected ? 'bg-blue-50' : ''}`} onClick={handleCardClick}>
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 text-sm">{letter.subject}</h3>
            <p className="text-xs text-gray-500 mt-1">{letter.letterNo}</p>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <PriorityBadge priority={letter.priority} />
            <OverdueBadge isOverdue={letter.isOverdue || false} />
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-xs text-gray-600 mb-2">
          <div className="flex items-center space-x-1">
            <Calendar size={12} />
            <span>{new Date(letter.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User size={12} />
            <span className={`px-2 py-1 rounded ${isContractor ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
              {letter.from}
            </span>
          </div>
        </div>
        
        {letter.contractDeadline && (
          <div className="text-xs text-gray-500 mb-2">
            Contract Deadline: {new Date(letter.contractDeadline).toLocaleDateString()}
          </div>
        )}
        
        {/* Always show description (truncated when collapsed) */}
        <div className="mt-2">
          <p className={`text-xs text-gray-600 leading-relaxed ${!isExpanded ? 'line-clamp-2' : ''}`}>
            {letter.description}
          </p>
        </div>

        {/* Show assignee info */}
        <div className="mt-2 text-xs text-gray-500">
          <strong>Assignee:</strong> {letter.assignee}
        </div>

        {/* Attachments - Always visible */}
        {letter.attachments.length > 0 && (
          <div className="mt-3">
            <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
              <FileText size={12} className="mr-1" />
              Attachments ({letter.attachments.length})
            </h4>
            <div className={`space-y-1 ${!isExpanded && letter.attachments.length > 2 ? 'max-h-12 overflow-hidden' : ''}`}>
              {letter.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded border">
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <Paperclip size={10} className="text-gray-400 flex-shrink-0" />
                    <span className="text-xs text-gray-700 truncate">{attachment}</span>
                  </div>
                  <div className="flex space-x-1 ml-2">
                    <button 
                      className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('View file:', attachment);
                      }}
                    >
                      View
                    </button>
                    <button 
                      className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded hover:bg-green-200 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Download file:', attachment);
                      }}
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {!isExpanded && letter.attachments.length > 2 && (
              <p className="text-xs text-gray-500 mt-1">Click to see all {letter.attachments.length} attachments</p>
            )}
          </div>
        )}

        {/* Action Buttons - Always visible */}
        <div className="mt-4 pt-3 border-t border-gray-100 action-buttons">
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onGenerateSummary?.(letter);
              }}
              className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-xs font-medium hover:bg-blue-700 transition-colors"
              title="Generate summary of this letter"
            >
              Generate Summary
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDraftLetter?.(letter);
              }}
              className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-xs font-medium hover:bg-green-700 transition-colors"
              title="Draft a response letter"
            >
              Draft Reply
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
            {/* Additional details when expanded */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Status:</h4>
                <span className={`px-2 py-1 rounded text-xs ${
                  letter.status === 'completed' ? 'bg-green-100 text-green-800' :
                  letter.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                  letter.status === 'overdue' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {letter.status?.toUpperCase() || 'PENDING'}
                </span>
              </div>
            </div>

            {(letter.createdAt || letter.updatedAt) && (
              <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
                {letter.createdAt && <div>Created: {new Date(letter.createdAt).toLocaleString()}</div>}
                {letter.updatedAt && <div>Updated: {new Date(letter.updatedAt).toLocaleString()}</div>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Event Card Component
export const EventCard: React.FC<EventCardProps> = ({ event, isExpanded, onToggle, side = 'right', onEventClick, isSelected = false }) => {
  const isContractor = event.from === 'Contractor';
  const cardClass = side === 'left' ? 'mr-8' : 'ml-8';
  
  const handleCardClick = () => {
    onToggle();
    if (onEventClick) {
      onEventClick(event);
    }
  };
  
  return (
    <div className={`${cardClass} transition-all duration-300 hover:shadow-lg ${isSelected ? 'ring-2 ring-blue-400 ring-opacity-75' : ''}`}>
      <div className={`bg-white rounded-lg shadow-md border-l-4 ${isContractor ? 'border-l-blue-500' : 'border-l-green-500'} p-4 cursor-pointer ${isSelected ? 'bg-blue-50' : ''}`} onClick={handleCardClick}>
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 text-sm">{event.subject}</h3>
            <p className="text-xs text-gray-500 mt-1">{event.letterNo}</p>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <PriorityBadge priority={event.priority} />
            <OverdueBadge isOverdue={event.isOverdue || false} />
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-xs text-gray-600 mb-2">
          <div className="flex items-center space-x-1">
            <Calendar size={12} />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <User size={12} />
            <span className={`px-2 py-1 rounded ${isContractor ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
              {event.from}
            </span>
          </div>
        </div>
        
        {event.contractDeadline && (
          <div className="text-xs text-gray-500 mb-2">
            Contract Deadline: {new Date(event.contractDeadline).toLocaleDateString()}
          </div>
        )}
        
        {/* Always show description (truncated when collapsed) */}
        <div className="mt-2">
          <p className={`text-xs text-gray-600 leading-relaxed ${!isExpanded ? 'line-clamp-2' : ''}`}>
            {event.description}
          </p>
        </div>

        {/* Show assignee info */}
        <div className="mt-2 text-xs text-gray-500">
          <strong>Assignee:</strong> {event.assignee}
        </div>

        {/* Attachments - Always visible */}
        {event.attachments.length > 0 && (
          <div className="mt-3">
            <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
              <FileText size={12} className="mr-1" />
              Attachments ({event.attachments.length})
            </h4>
            <div className={`space-y-1 ${!isExpanded && event.attachments.length > 2 ? 'max-h-12 overflow-hidden' : ''}`}>
              {event.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded border">
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <Paperclip size={10} className="text-gray-400 flex-shrink-0" />
                    <span className="text-xs text-gray-700 truncate">{attachment}</span>
                  </div>
                  <div className="flex space-x-1 ml-2">
                    <button 
                      className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('View file:', attachment);
                      }}
                    >
                      View
                    </button>
                    <button 
                      className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded hover:bg-green-200 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Download file:', attachment);
                      }}
                    >
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {!isExpanded && event.attachments.length > 2 && (
              <p className="text-xs text-gray-500 mt-1">Click to see all {event.attachments.length} attachments</p>
            )}
          </div>
        )}

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
            {/* Additional details when expanded */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Status:</h4>
                <span className={`px-2 py-1 rounded text-xs ${
                  event.status === 'completed' ? 'bg-green-100 text-green-800' :
                  event.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                  event.status === 'overdue' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {event.status?.toUpperCase() || 'PENDING'}
                </span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Category:</h4>
                <span className="text-gray-600 capitalize">{event.category || 'General'}</span>
              </div>
            </div>
            
            {event.tags && event.tags.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-gray-700 mb-1">Tags:</h4>
                <div className="flex flex-wrap gap-1">
                  {event.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {(event.createdAt || event.updatedAt) && (
              <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
                {event.createdAt && <div>Created: {new Date(event.createdAt).toLocaleString()}</div>}
                {event.updatedAt && <div>Updated: {new Date(event.updatedAt).toLocaleString()}</div>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};