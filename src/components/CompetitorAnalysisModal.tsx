import React, { useState } from 'react';
import { Users, Check, X, Search, Building, DollarSign, TrendingUp, MapPin } from 'lucide-react';

interface Competitor {
  id: string;
  name: string;
  company: string;
  location: string;
  experience: string;
  projects: number;
  rating: number;
  strength: 'high' | 'medium' | 'low';
}

const availableCompetitors: Competitor[] = [
  {
    id: 'comp1',
    name: 'ABC Construction Ltd',
    company: 'ABC Group',
    location: 'Mumbai, Maharashtra',
    experience: '15+ years',
    projects: 45,
    rating: 4.8,
    strength: 'high'
  },
  {
    id: 'comp2',
    name: 'XYZ Infrastructure',
    company: 'XYZ Corp',
    location: 'Delhi, NCR',
    experience: '12+ years',
    projects: 32,
    rating: 4.5,
    strength: 'medium'
  },
  {
    id: 'comp3',
    name: 'PQR Builders',
    company: 'PQR Enterprises',
    location: 'Bangalore, Karnataka',
    experience: '8+ years',
    projects: 18,
    rating: 4.2,
    strength: 'medium'
  },
  {
    id: 'comp4',
    name: 'LMN Construction',
    company: 'LMN Group',
    location: 'Chennai, Tamil Nadu',
    experience: '20+ years',
    projects: 67,
    rating: 4.9,
    strength: 'high'
  },
  {
    id: 'comp5',
    name: 'DEF Roadways',
    company: 'DEF Infrastructure',
    location: 'Hyderabad, Telangana',
    experience: '10+ years',
    projects: 25,
    rating: 4.3,
    strength: 'medium'
  },
  {
    id: 'comp6',
    name: 'GHI Projects',
    company: 'GHI Ltd',
    location: 'Pune, Maharashtra',
    experience: '6+ years',
    projects: 12,
    rating: 3.9,
    strength: 'low'
  }
];

function CompetitorAnalysisModal({ onClose, onComplete }: { 
  onClose: () => void; 
  onComplete: (selectedCompetitors: string[]) => void;
}) {
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStrength, setFilterStrength] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const filteredCompetitors = availableCompetitors.filter(competitor => {
    const matchesSearch = competitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         competitor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         competitor.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStrength = filterStrength === 'all' || competitor.strength === filterStrength;
    return matchesSearch && matchesStrength;
  });

  const handleSelectAll = () => {
    if (selectedCompetitors.length === filteredCompetitors.length) {
      setSelectedCompetitors([]);
    } else {
      setSelectedCompetitors(filteredCompetitors.map(c => c.id));
    }
  };

  const handleCompetitorToggle = (competitorId: string) => {
    setSelectedCompetitors(prev => 
      prev.includes(competitorId)
        ? prev.filter(id => id !== competitorId)
        : [...prev, competitorId]
    );
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStrengthText = (strength: string) => {
    switch (strength) {
      case 'high': return 'High Competition';
      case 'medium': return 'Medium Competition';
      case 'low': return 'Low Competition';
      default: return 'Unknown';
    }
  };

  const handleSubmit = () => {
    onComplete(selectedCompetitors);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Competitor Analysis</h1>
              <p className="text-sm text-gray-500">Select competitors to analyze market competition</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Selection Summary */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Selected Competitors</h2>
              <div className="text-sm text-gray-500">
                {selectedCompetitors.length} of {availableCompetitors.length} selected
              </div>
            </div>
            
            {selectedCompetitors.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selectedCompetitors.map(compId => {
                  const competitor = availableCompetitors.find(c => c.id === compId);
                  return competitor ? (
                    <div key={compId} className="flex items-center gap-2 bg-purple-50 border border-purple-200 rounded-lg px-3 py-1">
                      <span className="text-sm font-medium text-purple-800">{competitor.name}</span>
                      <button
                        onClick={() => handleCompetitorToggle(compId)}
                        className="text-purple-600 hover:text-purple-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : null;
                })}
              </div>
            ) : (
              <div className="text-gray-500 text-sm">No competitors selected</div>
            )}
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search competitors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Strength Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Filter by:</span>
                <select
                  value={filterStrength}
                  onChange={(e) => setFilterStrength(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="all">All Strengths</option>
                  <option value="high">High Competition</option>
                  <option value="medium">Medium Competition</option>
                  <option value="low">Low Competition</option>
                </select>
              </div>

              {/* Select All */}
              <button
                onClick={handleSelectAll}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                {selectedCompetitors.length === filteredCompetitors.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
          </div>

          {/* Competitors List */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Available Competitors</h3>
              <p className="text-sm text-gray-500 mt-1">Select the competitors you want to analyze</p>
            </div>
            
            <div className="divide-y divide-gray-200">
              {filteredCompetitors.map((competitor) => (
                <div
                  key={competitor.id}
                  className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer ${
                    selectedCompetitors.includes(competitor.id) ? 'bg-purple-50 border-l-4 border-purple-500' : ''
                  }`}
                  onClick={() => handleCompetitorToggle(competitor.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Selection Checkbox */}
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        selectedCompetitors.includes(competitor.id)
                          ? 'bg-purple-600 border-purple-600'
                          : 'border-gray-300'
                      }`}>
                        {selectedCompetitors.includes(competitor.id) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>

                      {/* Competitor Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{competitor.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStrengthColor(competitor.strength)}`}>
                            {getStrengthText(competitor.strength)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4" />
                            <span>{competitor.company}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{competitor.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            <span>{competitor.experience} • {competitor.projects} projects</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            <span>Rating: {competitor.rating}/5.0</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={selectedCompetitors.length === 0}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Analyze Selected Competitors ({selectedCompetitors.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompetitorAnalysisModal; 