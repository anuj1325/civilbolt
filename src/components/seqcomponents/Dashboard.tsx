import React, { useState } from 'react';
import { Event, SequenceOfEvents, PageType } from '@/types';
import { mockData } from '@/lib/data/mockData';

interface DashboardProps {
  onNavigate: (page: PageType) => void;
  onEventClick: (event: Event) => void;
  onSequenceClick: (sequence: SequenceOfEvents) => void;
}

// Mock Data for Sequence of Events (using imported mockData)
const sequenceOfEventsData: { sequences: SequenceOfEvents[] } = {
  sequences: [
    {
      id: 1,
      sequenceTitle: "Tender Identification & Registration",
      phase: "Pre-Contract Phase",
      category: "Tender Management",
      description: "Complete process of identifying tender opportunities and registering for participation including NIT review and e-portal registration.",
      status: "completed",
      expectedDuration: "5-7 days",
      keyDocuments: ["Notice Inviting Tender (NIT)", "Registration Certificate", "Portal Access Credentials"],
      relatedEventIds: [1],
      startDate: "2024-01-10",
      targetDate: "2024-01-17",
      completedDate: "2024-01-15",
      isOverdue: false,
      priority: "high"
    },
    {
      id: 2,
      sequenceTitle: "Bid Preparation & Submission",
      phase: "Pre-Contract Phase", 
      category: "Tender Management",
      description: "Comprehensive bid preparation including technical and financial proposals, EMD submission and online bid submission process.",
      status: "completed",
      expectedDuration: "15-20 days",
      keyDocuments: ["Technical Proposal", "Financial Proposal", "EMD Receipt", "Bid Submission Receipt"],
      relatedEventIds: [1],
      startDate: "2024-01-15",
      targetDate: "2024-02-05",
      completedDate: "2024-01-26",
      isOverdue: false,
      priority: "high"
    },
    {
      id: 3,
      sequenceTitle: "Bid Evaluation & Award",
      phase: "Pre-Contract Phase",
      category: "Contract Award",
      description: "Complete bid evaluation process from opening ceremony through technical and financial evaluation to LOA issuance.",
      status: "completed",
      expectedDuration: "30-45 days",
      keyDocuments: ["Bid Opening Minutes", "Technical Evaluation Report", "Financial Evaluation Report", "Letter of Award (LOA)"],
      relatedEventIds: [1],
      startDate: "2024-01-26",
      targetDate: "2024-03-15",
      completedDate: "2024-01-26",
      isOverdue: false,
      priority: "high"
    },
    {
      id: 4,
      sequenceTitle: "Contract Agreement",
      phase: "Contract Execution Phase",
      category: "Contract Formalization",
      description: "Formal contract signing process including performance security submission and appointed date declaration.",
      status: "in_progress",
      expectedDuration: "7-10 days",
      keyDocuments: ["Signed Contract Agreement", "Performance Security", "Appointed Date Letter"],
      relatedEventIds: [1],
      startDate: "2024-01-26",
      targetDate: "2024-02-05",
      completedDate: undefined,
      isOverdue: false,
      priority: "high"
    },
    // Add more sequences as needed
  ]
};

// Import SequenceTable component (will be extracted separately)
import { SequenceTable } from './TableComponents';

// Dashboard Component
export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, onEventClick, onSequenceClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter sequences based on search term
  const filteredSequences = sequenceOfEventsData.sequences.filter(sequence =>
    sequence.sequenceTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sequence.phase.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sequence.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sequence.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'Total Sequences', value: sequenceOfEventsData.sequences.length, color: 'blue' },
    { label: 'Completed', value: sequenceOfEventsData.sequences.filter(s => s.status === 'completed').length, color: 'green' },
    { label: 'In Progress', value: sequenceOfEventsData.sequences.filter(s => s.status === 'in_progress').length, color: 'yellow' },
    { label: 'Not Started', value: sequenceOfEventsData.sequences.filter(s => s.status === 'not_started').length, color: 'gray' },
    { label: 'High Priority', value: sequenceOfEventsData.sequences.filter(s => s.priority === 'high' || s.priority === 'urgent').length, color: 'red' },
    { label: 'Delayed', value: sequenceOfEventsData.sequences.filter(s => s.status === 'delayed').length, color: 'orange' }
  ];
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Project Sequence Dashboard</h1>
        <p className="text-gray-600">Track project milestones and sequence of events from pre-contract to closure</p>
      </div>
      
      {/* Stats Grid - Multi-column layout with less space */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <div className={`text-xl font-bold text-${stat.color}-600 mb-1`}>{stat.value}</div>
            <div className="text-gray-600 text-xs">{stat.label}</div>
          </div>
        ))}
      </div>
      
      {/* Quick Actions as Pills */}
      <div className="mb-8 flex space-x-2">
        <button 
          onClick={() => onNavigate('timeline')}
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          View Timeline
        </button>
        
        <button 
          onClick={() => onNavigate('table')}
          className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors text-sm font-medium"
        >
          Table View
        </button>
        
        <button 
          onClick={() => onNavigate('drafting')}
          className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors text-sm font-medium"
        >
          Drafting Tool
        </button>
        
        <button 
          onClick={() => onNavigate('draft-management')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors text-sm font-medium"
        >
          Draft Management
        </button>
      </div>
      
      {/* Sequence Of Events with Search */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Sequence Of Events</h2>
          {/* Search Bar */}
          <div className="flex items-center bg-white rounded-full shadow-md hover:shadow-lg transition-shadow border border-gray-200 max-w-2xl">
            <input
              type="text"
              placeholder="Search sequences, phases, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-6 py-3 rounded-l-full focus:outline-none text-gray-700 text-lg"
            />
            <button className="px-6 py-3 bg-blue-600 text-white rounded-r-full hover:bg-blue-700 transition-colors text-lg font-medium">
              Search
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <SequenceTable data={filteredSequences} onSequenceClick={onSequenceClick} />
        </div>
      </div>
    </div>
  );
};