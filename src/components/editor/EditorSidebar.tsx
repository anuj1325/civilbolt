import React, { useState } from "react";
import { CheckCircle, Lightbulb, Users, Send, Plus, Search, X } from "lucide-react";

// Letter interface for references
interface Letter {
  id: string;
  letterNo: string;
  from: string;
  to: string;
  subject: string;
  date: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'draft' | 'sent' | 'received' | 'under_review' | 'resolved';
  assignee: string;
  attachments: string[];
  isOverdue?: boolean;
}

interface ScoreBarProps {
  label: string;
  score: number;
  maxScore?: number;
}

const getScoreColor = (score: number): { bg: string; text: string; ring: string } => {
  if (score >= 90) return { bg: "bg-emerald-500", text: "text-emerald-700", ring: "ring-emerald-200" };
  if (score >= 80) return { bg: "bg-green-500", text: "text-green-700", ring: "ring-green-200" };
  if (score >= 70) return { bg: "bg-yellow-500", text: "text-yellow-700", ring: "ring-yellow-200" };
  if (score >= 60) return { bg: "bg-orange-500", text: "text-orange-700", ring: "ring-orange-200" };
  return { bg: "bg-red-500", text: "text-red-700", ring: "ring-red-200" };
};

const CATEGORY_CONFIG = {
  Correctness: { icon: <CheckCircle size={14} />, description: "Grammar & Legal Accuracy" },
  Clarity: { icon: <Lightbulb size={14} />, description: "Readability & Understanding" },
  Engagement: { icon: <Users size={14} />, description: "Persuasiveness & Impact" },
  Delivery: { icon: <Send size={14} />, description: "Professional Tone & Flow" },
};

const ScoreBar: React.FC<ScoreBarProps> = ({ label, score, maxScore = 100 }) => {
  const config = CATEGORY_CONFIG[label] || { icon: null, description: "" };
  const colors = getScoreColor(score);
  const percentage = Math.min((score / maxScore) * 100, 100);
  
  return (
    <div className="bg-white rounded-lg p-4 border border-neutral-border shadow-sm hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-full ${colors.bg} bg-opacity-10 ${colors.text}`}>
            {config.icon}
          </div>
          <div>
            <h3 className="text-body-bold font-body-bold text-default-font">{label}</h3>
            <p className="text-caption font-caption text-subtext-color mt-0.5">{config.description}</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-xl font-bold ${colors.text}`}>{score}</div>
          <div className="text-caption font-caption text-subtext-color">/{maxScore}</div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
          <div
            className={`h-full ${colors.bg} transition-all duration-500 ease-out rounded-full relative`}
            style={{ width: `${percentage}%` }}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
          </div>
        </div>
        
        {/* Progress markers */}
        <div className="flex justify-between mt-1 text-caption font-caption text-subtext-color">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>{maxScore}</span>
        </div>
      </div>
      
      {/* Score interpretation */}
      <div className="mt-2 text-center">
        <span className={`text-caption font-caption-bold px-2 py-1 rounded-full ${colors.bg} ${colors.text} bg-opacity-10`}>
          {score >= 90 ? 'Excellent' : score >= 80 ? 'Good' : score >= 70 ? 'Fair' : score >= 60 ? 'Needs Improvement' : 'Poor'}
        </span>
      </div>
    </div>
  );
};

interface EditorSidebarProps {
  sidebarTab: string;
  setSidebarTab: (tab: string) => void;
  legalScore: number;
  contractualScore: number;
  lexicalScore: number;
  grammaticalScore: number;
  citations: string[];
  availableLetters?: Letter[];
  referencedLetters?: Letter[];
  onAddReference?: (letter: Letter) => void;
  onRemoveReference?: (letterId: string) => void;
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({
  sidebarTab,
  setSidebarTab,
  legalScore,
  contractualScore,
  lexicalScore,
  grammaticalScore,
  citations,
  availableLetters = [],
  referencedLetters = [],
  onAddReference,
  onRemoveReference,
}) => {
  const [showReferenceModal, setShowReferenceModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetterIds, setSelectedLetterIds] = useState<Set<string>>(new Set());

  // Filter available letters based on search query
  const filteredLetters = availableLetters.filter(letter =>
    letter.letterNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    letter.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    letter.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    letter.to.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddReference = (letter: Letter) => {
    onAddReference?.(letter);
    setShowReferenceModal(false);
    setSearchQuery('');
    setSelectedLetterIds(new Set());
  };

  const handleCheckboxChange = (letterId: string, checked: boolean) => {
    const newSelected = new Set(selectedLetterIds);
    if (checked) {
      newSelected.add(letterId);
    } else {
      newSelected.delete(letterId);
    }
    setSelectedLetterIds(newSelected);
  };

  const handleSelectAll = () => {
    const availableIds = filteredLetters
      .filter(letter => !referencedLetters.some(ref => ref.id === letter.id))
      .map(letter => letter.id);
    
    if (selectedLetterIds.size === availableIds.length) {
      // Deselect all
      setSelectedLetterIds(new Set());
    } else {
      // Select all available
      setSelectedLetterIds(new Set(availableIds));
    }
  };

  const handleAddSelected = () => {
    const lettersToAdd = filteredLetters.filter(letter => selectedLetterIds.has(letter.id));
    lettersToAdd.forEach(letter => onAddReference?.(letter));
    setShowReferenceModal(false);
    setSearchQuery('');
    setSelectedLetterIds(new Set());
  };

  const closeModal = () => {
    setShowReferenceModal(false);
    setSearchQuery('');
    setSelectedLetterIds(new Set());
  };

  return (
    <div className="flex-1 bg-white border-l border-gray-200 overflow-y-auto sidebar-scroll" style={{ minWidth: "320px" }}>
      <div className="px-0 pt-0 pb-4">
        {/* Grammarly-style tab buttons */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setSidebarTab("score")}
            className={`flex-1 py-3 text-body text-body-bold transition-colors border-b-2 ${
              sidebarTab === "score"
                ? "border-brand-primary text-brand-primary bg-white"
                : "border-transparent text-subtext-color hover:text-brand-primary"
            }`}
          >
            Score
          </button>
          <button
            onClick={() => setSidebarTab("citations")}
            className={`flex-1 py-3 text-body text-body-bold transition-colors border-b-2 ${
              sidebarTab === "citations"
                ? "border-brand-primary text-brand-primary bg-white"
                : "border-transparent text-subtext-color hover:text-brand-primary"
            }`}
          >
            Citations
          </button>
        </div>

        {/* Content */}
        {sidebarTab === "score" && (
          <div className="p-6">
            {/* Overall Score Header */}
            <div className="mb-6 p-4 bg-gradient-to-r from-brand-primary/5 to-brand-primary/10 rounded-xl border border-brand-primary/20">
              <div className="text-center">
                <h3 className="text-heading-3 font-heading-3 text-default-font mb-1">Overall Score</h3>
                <div className="text-3xl font-bold text-brand-primary mb-2">
                  {Math.round((legalScore + contractualScore + lexicalScore + grammaticalScore) / 4)}
                </div>
                <div className="text-body font-body text-subtext-color">
                  Average of all metrics
                </div>
              </div>
            </div>
            
            {/* Individual Score Cards */}
            <div className="space-y-4">
              <ScoreBar label="Correctness" score={legalScore} />
              <ScoreBar label="Clarity" score={contractualScore} />
              <ScoreBar label="Engagement" score={lexicalScore} />
              <ScoreBar label="Delivery" score={grammaticalScore} />
            </div>
            
            {/* Performance Insights */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">Performance Insights</h4>
              <div className="space-y-2 text-xs text-gray-600">
                {(() => {
                  const scores = [
                    { name: "Correctness", value: legalScore },
                    { name: "Clarity", value: contractualScore },
                    { name: "Engagement", value: lexicalScore },
                    { name: "Delivery", value: grammaticalScore }
                  ];
                  const highest = scores.reduce((prev, current) => prev.value > current.value ? prev : current);
                  const lowest = scores.reduce((prev, current) => prev.value < current.value ? prev : current);
                  
                  return (
                    <>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Strongest: <strong>{highest.name}</strong> ({highest.value})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span>Focus Area: <strong>{lowest.name}</strong> ({lowest.value})</span>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {sidebarTab === "citations" && (
          <div className="p-4">
            {/* Letter References Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-caption-bold font-caption-bold text-default-font">Letter References</h3>
                <button
                  onClick={() => setShowReferenceModal(true)}
                  className="flex items-center gap-1 px-3 py-1 bg-brand-primary text-white text-body-bold font-body-bold rounded hover:bg-brand-primary/90 transition-colors"
                >
                  <Plus size={14} />
                  Add Reference
                </button>
              </div>
              
              {referencedLetters.length > 0 ? (
                <div className="space-y-2">
                  {referencedLetters.map((letter) => (
                    <div key={letter.id} className="bg-gray-50 border rounded-lg p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-body-bold text-blue-600">{letter.letterNo}</span>
                            <span className="text-caption text-gray-700">
                              {new Date(letter.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-body text-gray-700 truncate" title={letter.subject}>
                            {letter.subject}
                          </p>
                          <p className="text-caption text-gray-500 mt-1">
                            {letter.from} → {letter.to}
                          </p>
                        </div>
                        <button
                          onClick={() => onRemoveReference?.(letter.id)}
                          className="text-gray-400 hover:text-red-500 ml-2"
                          title="Remove reference"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-body font-body text-subtext-color">
                  No letter references added yet.
                </p>
              )}
            </div>

            {/* Legal Citations Section */}
            <div>
              <h3 className="text-body-bold text-gray-800 mb-2">Legal Citations</h3>
              {citations.length > 0 ? (
                <ul className="list-disc ml-6 text-body text-gray-700 space-y-1">
                  {citations.map((cite, idx) => (
                    <li key={idx}>{cite}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-body font-body text-subtext-color">
                  No legal citations found in the draft.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Reference Selection Modal */}
      {showReferenceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-heading-2 text-heading-3 text-gray-800">Add Letter Reference</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Search Bar */}
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search letter to reference..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Bulk Actions */}
            {filteredLetters.length > 0 && (
              <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleSelectAll}
                      className="text-body text-blue-600 hover:text-blue-700 text-body-bold"
                    >
                      {selectedLetterIds.size === filteredLetters.filter(letter => !referencedLetters.some(ref => ref.id === letter.id)).length 
                        ? 'Deselect All' 
                        : 'Select All'}
                    </button>
                    {selectedLetterIds.size > 0 && (
                      <span className="text-body text-gray-600">
                        {selectedLetterIds.size} selected
                      </span>
                    )}
                  </div>
                  {selectedLetterIds.size > 0 && (
                    <button
                      onClick={handleAddSelected}
                      className="px-4 py-1 bg-blue-500 text-white text-body rounded hover:bg-blue-600 transition-colors"
                    >
                      Add Selected ({selectedLetterIds.size})
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Letters List */}
            <div className="max-h-96 overflow-y-auto p-4 sidebar-scroll">
              {filteredLetters.length > 0 ? (
                <div className="space-y-2">
                  {filteredLetters.map((letter) => {
                    const isAlreadyReferenced = referencedLetters.some(ref => ref.id === letter.id);
                    const isSelected = selectedLetterIds.has(letter.id);
                    return (
                      <div
                        key={letter.id}
                        className={`border rounded-lg p-3 transition-colors ${
                          isAlreadyReferenced 
                            ? 'bg-gray-100 border-gray-300 opacity-50 cursor-not-allowed' 
                            : isSelected
                            ? 'bg-blue-50 border-blue-300'
                            : 'hover:bg-blue-50 border-gray-200 hover:border-blue-300 cursor-pointer'
                        }`}
                        onClick={() => {
                          if (!isAlreadyReferenced) {
                            handleCheckboxChange(letter.id, !isSelected);
                          }
                        }}
                      >
                        <div className="flex items-start gap-3">
                          {/* Checkbox */}
                          {!isAlreadyReferenced && (
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={(e) => {
                                e.stopPropagation();
                                handleCheckboxChange(letter.id, e.target.checked);
                              }}
                              className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                          )}
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-body text-body-bold text-blue-600">{letter.letterNo}</span>
                              <span className="text-caption text-gray-500">
                                {new Date(letter.date).toLocaleDateString()}
                              </span>
                              {isAlreadyReferenced && (
                                <span className="text-caption bg-gray-200 text-gray-600 px-2 py-1 rounded">
                                  Already Referenced
                                </span>
                              )}
                            </div>
                            <p className="text-body text-gray-700 mb-1" title={letter.subject}>
                              {letter.subject}
                            </p>
                            <p className="text-caption text-gray-500">
                              {letter.from} → {letter.to}
                            </p>
                            <p className="text-caption text-gray-600 mt-1 line-clamp-2">
                              {letter.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    {searchQuery ? 'No letters found matching your search.' : 'No letters available to reference.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorSidebar;

