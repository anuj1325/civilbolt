import { Event, Letter, SequenceOfEvents } from '@/types';
import { mockData } from '@/lib/data/mockData';

// Function to get all letters from an event, returning Letter objects
export const getAllLettersFromEvent = (event: Event): Letter[] => {
  if (event.letters && event.letters.length > 0) {
    return event.letters.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
  
  // Fallback: create a letter from the main event properties for backward compatibility
  return [{
    id: `${event.id}-main`,
    letterNo: event.letterNo,
    date: event.date,
    from: event.from,
    to: event.to,
    subject: event.subject,
    description: event.description,
    assignee: event.assignee,
    attachments: event.attachments,
    priority: event.priority,
    status: event.status,
    contractDeadline: event.contractDeadline,
    isOverdue: event.isOverdue,
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
    createdBy: event.createdBy,
    updatedBy: event.updatedBy
  }];
};

// Function to get related letters from selected event
export const getRelatedLetters = (selectedEvent: Event | null): Letter[] => {
  if (!selectedEvent) return [];
  
  return getAllLettersFromEvent(selectedEvent);
};

// Function to get all letters related to a selected sequence
export const getLettersForSequence = (selectedSequence: SequenceOfEvents | null): Letter[] => {
  if (!selectedSequence) return [];
  
  // Get all events that are part of this sequence
  const relatedEvents = mockData.events.filter(event => 
    selectedSequence.relatedEventIds.includes(event.id)
  );
  
  // Get all letters from these events
  const allLetters = relatedEvents.flatMap(event => getAllLettersFromEvent(event));
  
  // Sort chronologically
  return allLetters.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

// Function to get related events based on subject similarity, letter references, or conversation thread
export const getRelatedEvents = (selectedEvent: Event | null, allEvents: Event[]): Event[] => {
  if (!selectedEvent) return allEvents;
  
  // For now, we'll consider events related if they:
  // 1. Have similar subjects (keywords match)
  // 2. Are part of the same conversation thread (bidirectional communication)
  // 3. Reference the same contract/project aspects
  
  const selectedSubjectKeywords = selectedEvent.subject.toLowerCase().split(' ');
  const selectedTags = selectedEvent.tags || [];
  
  return allEvents.filter(event => {
    // Always include the selected event
    if (event.id === selectedEvent.id) return true;
    
    // Check for subject keyword matches
    const eventKeywords = event.subject.toLowerCase().split(' ');
    const keywordMatches = selectedSubjectKeywords.some(keyword => 
      keyword.length > 3 && eventKeywords.some(eventKeyword => eventKeyword.includes(keyword))
    );
    
    // Check for tag matches
    const tagMatches = selectedTags.some(tag => 
      event.tags?.includes(tag)
    );
    
    // Check for category matches
    const categoryMatch = event.category === selectedEvent.category;
    
    // Check for conversation thread (same parties involved)
    const sameParties = (event.from === selectedEvent.from && event.to === selectedEvent.to) ||
                       (event.from === selectedEvent.to && event.to === selectedEvent.from);
    
    return keywordMatches || tagMatches || (categoryMatch && sameParties);
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};