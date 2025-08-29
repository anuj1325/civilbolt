import React, { useState } from 'react';
import Editor from '../pages/editor';
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { Component4 } from "@/ui/components/Component4";
import {
  Letter,
  Event,
  SequenceOfEvents,
  PageType,
  SequenceOfEventProps,
  Draft,
} from '@/types';
import { mockData, mockDrafts } from '@/lib/data/mockData';

// Import extracted components
import { TableView } from './seqcomponents/TableView';
import { Dashboard } from './seqcomponents/Dashboard';
import { DraftManagement } from './seqcomponents/DraftManagement';
import { TimelineDashboard } from './seqcomponents/TimelineDashboard';
import { SummaryModal } from './seqcomponents/SharedComponents';
import { getAllLettersFromEvent } from './seqcomponents/utils';

const SequenceOfEvent: React.FC<SequenceOfEventProps> = ({ onNavigate }) => {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedSequence, setSelectedSequence] = useState<SequenceOfEvents | null>(null);
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [selectedDraft, setSelectedDraft] = useState<Draft | null>(null);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  
  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
  };
  
  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setSelectedSequence(null); // Clear sequence when selecting event
    setCurrentPage('timeline');
  };

  const handleSequenceClick = (sequence: SequenceOfEvents) => {
    setSelectedSequence(sequence);
    setSelectedEvent(null); // Clear event when selecting sequence
    setCurrentPage('timeline');
  };

  const handleLetterSelect = (letter: Letter) => {
    setSelectedLetter(letter);
  };

  const handleGenerateSummary = (letter: Letter) => {
    setSelectedLetter(letter);
    setShowSummaryModal(true);
  };

  const handleDraftLetter = (letter: Letter) => {
    setSelectedLetter(letter);
    setCurrentPage('drafting'); // Navigate to drafting page with Editor
  };

  const handleEditDraft = (draftId: string) => {
    const draft = mockDrafts.find(d => d.id === draftId);
    if (draft) {
      setSelectedDraft(draft);
      setCurrentPage('drafting'); // Navigate to Editor with draft content
    }
  };
  
  // Get all available letters for references
  const getAllAvailableLetters = (): Letter[] => {
    return mockData.events.flatMap(event => getAllLettersFromEvent(event)).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} onEventClick={handleEventClick} onSequenceClick={handleSequenceClick} />;
      case 'timeline':
        return <TimelineDashboard selectedEvent={selectedEvent} selectedSequence={selectedSequence} onEventClick={handleEventClick} onGenerateSummary={handleGenerateSummary} onDraftLetter={handleDraftLetter} />;
      case 'table':
        return <TableView onEventClick={handleEventClick} selectedEvent={selectedEvent} selectedSequence={selectedSequence} onGenerateSummary={handleGenerateSummary} onDraftLetter={handleDraftLetter} />; 
      case 'drafting':
        return <Editor onNavigate={handleNavigate} onClose={() => setCurrentPage('draft-management')} referenceLetter={selectedLetter} availableLetters={getAllAvailableLetters()} selectedDraft={selectedDraft} />;
      case 'draft-management':
        return <DraftManagement onNavigate={handleNavigate} onEditDraft={handleEditDraft} />;
      default:
        return <Dashboard onNavigate={handleNavigate} onEventClick={handleEventClick} onSequenceClick={handleSequenceClick} />;
    } 
  };
  // "min-h-screen bg-gray-50"
  return (
    <DefaultPageLayout>
      {/* Top Bar */}
        <Component4 text="Sequence of Events Management" />
      <div className="flex h-full w-full flex-col">
        
        
        <main>
          {renderCurrentPage()}
        </main>
        
        {/* Modals */}
        <SummaryModal 
          letter={selectedLetter} 
          isOpen={showSummaryModal} 
          onClose={() => setShowSummaryModal(false)} 
        />
      </div>
    </DefaultPageLayout>
  );
};

export default SequenceOfEvent;