import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Event, Letter, SequenceOfEvents, ViewType } from '@/types';
import { getLettersForSequence, getAllLettersFromEvent } from './utils';
import { VerticalTimeline } from './VerticalTimeline';
import { HorizontalTimeline } from './HorizontalTimeline';
import { TableView } from './TableView';
import { mockData } from '@/lib/data/mockData';

interface TimelineDashboardProps {
  selectedEvent: Event | null;
  selectedSequence: SequenceOfEvents | null;
  onEventClick?: (event: Event) => void;
  onGenerateSummary?: (letter: Letter) => void;
  onDraftLetter?: (letter: Letter) => void;
}

interface NotificationPanelProps {
  overdueEvents: Event[];
  onDismiss: () => void;
  onMinimize: () => void;
  onDraftLetters: () => void;
  isMinimized: boolean;
}

// Notification Management Component
const NotificationPanel: React.FC<NotificationPanelProps> = ({ 
  overdueEvents, 
  onDismiss, 
  onMinimize, 
  onDraftLetters, 
  isMinimized 
}) => {
  if (overdueEvents.length === 0) return null;

  if (isMinimized) {
    return (
      <div className="fixed top-4 right-4 z-50 bg-red-50 border border-red-200 rounded-lg p-2 max-w-xs cursor-pointer shadow-lg" onClick={onMinimize}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-red-700">
            <Bell size={14} />
            <span className="font-semibold text-xs">{overdueEvents.length} Overdue</span>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); onDismiss(); }}
            className="text-red-500 hover:text-red-700 text-xs"
          >
            ×
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-red-50 border border-red-200 rounded-lg p-3 max-w-sm shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2 text-red-700">
          <Bell size={16} />
          <span className="font-semibold text-sm">Action Required</span>
        </div>
        <div className="flex items-center space-x-1">
          <button 
            onClick={onMinimize}
            className="text-red-500 hover:text-red-700 text-sm p-1"
            title="Minimize"
          >
            −
          </button>
          <button 
            onClick={onDismiss}
            className="text-red-500 hover:text-red-700 text-sm p-1"
            title="Dismiss"
          >
            ×
          </button>
        </div>
      </div>
      <p className="text-xs text-red-600 mb-2">
        {overdueEvents.length} event(s) are overdue. Consider drafting follow-up letters to authorities.
      </p>
      <div className="text-xs text-red-500 mb-2">
        Overdue items: {overdueEvents.map(e => e.letterNo).join(', ')}
      </div>
      <div className="flex space-x-2">
        <button 
          onClick={onDraftLetters}
          className="text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Draft Letters
        </button>
        <button 
          onClick={onDismiss}
          className="text-xs bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400"
        >
          Dismiss for now
        </button>
      </div>
    </div>
  );
};

// Main Timeline Dashboard - MODIFIED with Notification Management
export const TimelineDashboard: React.FC<TimelineDashboardProps> = ({ 
  selectedEvent, 
  selectedSequence, 
  onEventClick, 
  onGenerateSummary, 
  onDraftLetter 
}) => {
  const [activeView, setActiveView] = useState<ViewType>('vertical');
  const [notificationDismissed, setNotificationDismissed] = useState(false);
  const [notificationMinimized, setNotificationMinimized] = useState(false);
  
  // Get related letters for context - priority: sequence > event
  const relatedLetters = selectedSequence ? 
    getLettersForSequence(selectedSequence) : 
    selectedEvent ? getAllLettersFromEvent(selectedEvent) : [];
  
  const views: Array<{ 
    id: ViewType; 
    label: string; 
    component: React.ComponentType<{ 
      onEventClick?: (event: Event) => void; 
      selectedEvent?: Event | null; 
      selectedSequence?: SequenceOfEvents | null; 
      onGenerateSummary?: (letter: Letter) => void; 
      onDraftLetter?: (letter: Letter) => void;
    }> 
  }> = [
    { id: 'vertical', label: 'Vertical Timeline', component: VerticalTimeline },
    { id: 'horizontal', label: 'Horizontal Timeline', component: HorizontalTimeline },
    { id: 'table', label: 'Table View', component: TableView }
  ];
  
  const ActiveComponent = views.find(view => view.id === activeView)?.component || VerticalTimeline;
  
  // Calculate overdue events for nudges
  const overdueEvents = mockData.events.filter(event => event.isOverdue);
  
  const handleDismissNotification = () => {
    setNotificationDismissed(true);
  };

  const handleMinimizeNotification = () => {
    setNotificationMinimized(!notificationMinimized);
  };

  const handleDraftLetters = () => {
    // Navigate to drafting tool or show modal
    console.log('Navigate to drafting tool for overdue events:', overdueEvents);
    // You can add navigation logic here
  };
  
  return (
    <div className="bg-gray-50">
      {/* Notification Overlay */}
      {!notificationDismissed && (
        <NotificationPanel
          overdueEvents={overdueEvents}
          onDismiss={handleDismissNotification}
          onMinimize={handleMinimizeNotification}
          onDraftLetters={handleDraftLetters}
          isMinimized={notificationMinimized}
        />
      )}
      
      <div className="flex flex-col h-full">
        {/* Header Section */}
        <div className="bg-gray-50 border-b border-gray-200 p-3 flex-shrink-0">
          <div className="grid grid-cols-3 gap-4">
            {/* Title and Info Section */}
            <div className="col-span-2">
              <h1 className="text-xl font-bold text-gray-800 mb-2">
                {selectedSequence ? 'Sequence Letters & Communications' : 
                 selectedEvent ? 'Related Letters & Communications' : 'Sequence of Events'}
              </h1>
              {selectedSequence && (
                <div className="mb-2">
                  <p className="text-blue-600 text-xs font-medium">
                    {selectedSequence.sequenceTitle} | {selectedSequence.phase}
                  </p>
                  <p className="text-green-600 text-xs">
                    {relatedLetters.length} letter{relatedLetters.length !== 1 ? 's' : ''}
                  </p>
                </div>
              )}
              {selectedEvent && !selectedSequence && (
                <div className="mb-2">
                  <p className="text-blue-600 text-xs font-medium">
                    {selectedEvent.eventTitle} | {selectedEvent.letterNo}
                  </p>
                  <p className="text-green-600 text-xs">
                    {relatedLetters.length} letter{relatedLetters.length !== 1 ? 's' : ''}
                  </p>
                </div>
              )}
              
              {/* View Pills */}
              <div className="mt-2">
                <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg w-fit">
                  {views.map((view) => (
                    <button
                      key={view.id}
                      onClick={() => setActiveView(view.id)}
                      className={`px-2 py-1 rounded-md text-xs font-medium transition-all ${activeView === view.id ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
                    >
                      {view.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Search Bar Section */}
            <div className="col-span-1 flex items-start justify-center pt-2">
              <div className="flex items-center bg-white rounded-full shadow-md hover:shadow-lg transition-shadow border border-gray-200 w-full">
                <input
                  type="text"
                  placeholder="Search or ask AI..."
                  className="flex-1 px-4 py-2 rounded-l-full focus:outline-none text-gray-700 text-sm"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-r-full hover:bg-blue-700 transition-colors text-sm font-medium">
                  Ask AI
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="flex-grow overflow-hidden">
          <ActiveComponent 
            onEventClick={onEventClick ?? (() => {})} 
            selectedEvent={selectedEvent} 
            selectedSequence={selectedSequence}
            onGenerateSummary={onGenerateSummary}
            onDraftLetter={onDraftLetter}
          />
        </div>
      </div>
    </div>
  );
};