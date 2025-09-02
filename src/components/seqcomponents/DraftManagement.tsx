import React, { useState } from 'react';
import { Draft, PageType } from '@/types';
import { mockDrafts } from '@/lib/data/mockData';

interface DraftManagementProps {
  onNavigate?: (page: PageType) => void;
  onEditDraft?: (draftId: string) => void;
}

// Draft Management Component
export const DraftManagement: React.FC<DraftManagementProps> = ({ onNavigate, onEditDraft }) => {
  const [drafts, setDrafts] = useState<Draft[]>(mockDrafts);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter drafts based on search
  const filteredDrafts = drafts.filter(draft =>
    draft.draftName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    draft.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    draft.draftNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    draft.to.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusUpdate = (draftId: string, newStatus: Draft['status']) => {
    setDrafts(prevDrafts =>
      prevDrafts.map(draft =>
        draft.id === draftId
          ? { ...draft, status: newStatus, lastModified: new Date().toISOString().split('T')[0] }
          : draft
      )
    );
  };

  const getStatusBadgeColor = (status: Draft['status']) => {
    const colors = {
      'In Draft': 'bg-gray-100 text-gray-800',
      'Published': 'bg-blue-100 text-blue-800',
      'Sent for Review': 'bg-yellow-100 text-yellow-800',
      'Approved': 'bg-green-100 text-green-800',
      'Sent to Authority': 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusOptions = (currentStatus: Draft['status']): Draft['status'][] => {
    const statusFlow: Record<Draft['status'], Draft['status'][]> = {
      'In Draft': ['In Draft', 'Sent for Review', 'Published'],
      'Sent for Review': ['Sent for Review', 'In Draft', 'Approved'],
      'Approved': ['Approved', 'Published', 'Sent to Authority'],
      'Published': ['Published', 'In Draft', 'Sent to Authority'],
      'Sent to Authority': ['Sent to Authority', 'In Draft']
    };
    return statusFlow[currentStatus] || [currentStatus];
  };

  return (
    <div className="min-h-screen bg-default-background">
      <div className="p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-heading-1 font-heading-1 text-default-font">Draft Management</h1>
            <button
              onClick={() => onNavigate?.('drafting')}
              className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 transition-colors font-body-bold text-body-bold"
            >
              Create New Draft
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search drafts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-border rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent font-body text-body"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-subtext-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Drafts Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-caption-bold font-caption-bold text-subtext-color uppercase tracking-wider">Draft Name</th>
                  <th className="px-6 py-3 text-left text-caption-bold font-caption-bold text-subtext-color uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-caption-bold font-caption-bold text-subtext-color uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-caption-bold font-caption-bold text-subtext-color uppercase tracking-wider">Draft Number</th>
                  <th className="px-6 py-3 text-left text-caption-bold font-caption-bold text-subtext-color uppercase tracking-wider">Letter Reference</th>
                  <th className="px-6 py-3 text-left text-caption-bold font-caption-bold text-subtext-color uppercase tracking-wider">To</th>
                  <th className="px-6 py-3 text-left text-caption-bold font-caption-bold text-subtext-color uppercase tracking-wider">Copy To</th>
                  <th className="px-6 py-3 text-left text-caption-bold font-caption-bold text-subtext-color uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-caption-bold font-caption-bold text-subtext-color uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDrafts.map((draft) => (
                  <tr key={draft.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-body-bold font-body-bold text-default-font">{draft.draftName}</div>
                      <div className="text-caption font-caption text-subtext-color">Created: {new Date(draft.createdDate).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-body font-body text-default-font max-w-xs truncate" title={draft.description}>
                        {draft.description}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-body font-body text-default-font max-w-xs truncate" title={draft.subject}>
                        {draft.subject}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-body font-body text-default-font">
                      {draft.draftNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-body font-body text-default-font">
                      {draft.letterInReference}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-body font-body text-default-font">
                      {draft.to}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-body font-body text-default-font">
                        {draft.copyTo.length > 0 ? draft.copyTo.join(', ') : '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={draft.status}
                        onChange={(e) => handleStatusUpdate(draft.id, e.target.value as Draft['status'])}
                        className={`text-caption font-caption px-2 py-1 rounded-full border-0 focus:ring-2 focus:ring-brand-primary ${getStatusBadgeColor(draft.status)}`}
                      >
                        {getStatusOptions(draft.status).map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-body-bold font-body-bold">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => onEditDraft?.(draft.id)}
                          className="text-brand-primary hover:text-brand-primary/80"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {/* Handle view */}}
                          className="text-subtext-color hover:text-default-font"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredDrafts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-body font-body text-subtext-color">
                {searchQuery ? 'No drafts found matching your search.' : 'No drafts available.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};