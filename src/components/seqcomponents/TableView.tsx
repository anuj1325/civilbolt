import React, { useState, useEffect, useMemo, useRef } from 'react';
import { FileText, Settings, Eye, EyeOff, Search, Filter, ChevronUp, ChevronDown, X, Check, MoreHorizontal } from 'lucide-react';
import { Event, Letter, SequenceOfEvents } from '@/types';
import { getAllLettersFromEvent, getLettersForSequence } from './utils';
import { PriorityBadge, OverdueBadge } from './SharedComponents';
import { mockData } from '@/lib/data/mockData';

interface TableViewProps {
  onEventClick?: (event: Event) => void;
  selectedEvent?: Event | null;
  selectedSequence?: SequenceOfEvents | null;
  onLetterSelect?: (letter: Letter) => void;
  onGenerateSummary?: (letter: Letter) => void;
  onDraftLetter?: (letter: Letter) => void;
}

// Define column configuration interface
interface ColumnConfig {
  key: string;
  label: string;
  visible: boolean;
  required?: boolean; // Some columns like checkbox and actions should always be visible
  width?: string;
  sortable?: boolean;
  filterable?: boolean;
}

// Sorting configuration
interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

// Filter configuration
interface FilterConfig {
  priority: string[];
  status: string[];
  from: string[];
  to: string[];
  dateRange: {
    start: string;
    end: string;
  };
}

// Default column configuration
const DEFAULT_COLUMNS: ColumnConfig[] = [
  { key: 'checkbox', label: 'Select', visible: true, required: true, width: 'w-16', sortable: false, filterable: false },
  { key: 'sno', label: 'S.No', visible: true, required: true, width: 'w-20', sortable: false, filterable: false },
  { key: 'from', label: 'From', visible: true, width: 'w-24', sortable: true, filterable: true },
  { key: 'to', label: 'To', visible: true, width: 'w-24', sortable: true, filterable: true },
  { key: 'date', label: 'Date', visible: true, width: 'w-28', sortable: true, filterable: false },
  { key: 'letterNo', label: 'Letter No.', visible: true, width: 'w-32', sortable: true, filterable: false },
  { key: 'subject', label: 'Subject', visible: true, width: 'w-48', sortable: true, filterable: false },
  { key: 'description', label: 'Description', visible: false, width: 'w-64', sortable: true, filterable: false },
  { key: 'priority', label: 'Priority', visible: true, width: 'w-24', sortable: true, filterable: true },
  { key: 'status', label: 'Status', visible: true, width: 'w-24', sortable: true, filterable: true },
  { key: 'assignee', label: 'Assignee', visible: false, width: 'w-40', sortable: true, filterable: true },
  { key: 'attachments', label: 'Attachments', visible: true, width: 'w-28', sortable: true, filterable: false },
  { key: 'contractDeadline', label: 'Contract Deadline', visible: false, width: 'w-36', sortable: true, filterable: false },
  { key: 'createdAt', label: 'Created At', visible: false, width: 'w-32', sortable: true, filterable: false },
  { key: 'updatedAt', label: 'Updated At', visible: false, width: 'w-32', sortable: true, filterable: false },
  { key: 'actions', label: 'Actions', visible: true, required: true, width: 'w-32', sortable: false, filterable: false }
];

// Table View Component with Configurable Columns
export const TableView: React.FC<TableViewProps> = ({ 
  onEventClick, 
  selectedEvent, 
  selectedSequence, 
  onLetterSelect, 
  onGenerateSummary, 
  onDraftLetter 
}) => {
  // Get base letters - priority: sequence > event > all letters
  const baseLetters: Letter[] = selectedSequence ? 
    getLettersForSequence(selectedSequence) : 
    selectedEvent ? 
      getAllLettersFromEvent(selectedEvent) : 
      mockData.events.flatMap(event => getAllLettersFromEvent(event)).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // State for selected letters
  const [selectedLetters, setSelectedLetters] = useState<Set<string>>(new Set());
  
  // State for column configuration
  const [columnConfig, setColumnConfig] = useState<ColumnConfig[]>(DEFAULT_COLUMNS);
  const [showColumnConfig, setShowColumnConfig] = useState(false);
  
  // State for search, sort, and filter functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterConfig>({
    priority: [],
    status: [],
    from: [],
    to: [],
    dateRange: { start: '', end: '' }
  });
  
  // New state for inline filters and enhanced UI
  const [activeInlineFilters, setActiveInlineFilters] = useState<{[key: string]: string[]}>({});
  const [openFilterDropdown, setOpenFilterDropdown] = useState<string | null>(null);
  const [openActionDropdown, setOpenActionDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const actionDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenFilterDropdown(null);
      }
      if (actionDropdownRef.current && !actionDropdownRef.current.contains(event.target as Node)) {
        setOpenActionDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get unique values for inline filters
  const uniqueFilterValues = useMemo(() => ({
    from: [...new Set(baseLetters.map(item => item.from))],
    to: [...new Set(baseLetters.map(item => item.to))],
    priority: [...new Set(baseLetters.map(item => item.priority))],
    status: [...new Set(baseLetters.map(item => item.isOverdue ? 'overdue' : 'normal'))],
    assignee: [...new Set(baseLetters.map(item => item.assignee).filter(Boolean))]
  }), [baseLetters]);

  // Filter, search, and sort letters
  const lettersToShow = useMemo(() => {
    let filteredLetters = [...baseLetters];

    // Apply search filter
    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase();
      filteredLetters = filteredLetters.filter(letter =>
        letter.subject.toLowerCase().includes(lowercaseSearch) ||
        letter.description.toLowerCase().includes(lowercaseSearch) ||
        letter.letterNo.toLowerCase().includes(lowercaseSearch) ||
        letter.from.toLowerCase().includes(lowercaseSearch) ||
        letter.to.toLowerCase().includes(lowercaseSearch) ||
        letter.assignee?.toLowerCase().includes(lowercaseSearch)
      );
    }

    // Apply inline filters (priority over modal filters)
    const hasInlineFilters = Object.values(activeInlineFilters).some(values => values.length > 0);
    if (hasInlineFilters) {
      filteredLetters = filteredLetters.filter(letter => {
        return Object.entries(activeInlineFilters).every(([key, values]) => {
          if (!values || values.length === 0) return true;
          
          if (key === 'status') {
            const letterStatus = letter.isOverdue ? 'overdue' : 'normal';
            return values.includes(letterStatus);
          }
          
          const letterValue = letter[key as keyof Letter];
          return values.includes(String(letterValue));
        });
      });
    } else {
      // Apply old-style modal filters if no inline filters
      if (filters.priority.length > 0) {
        filteredLetters = filteredLetters.filter(letter => filters.priority.includes(letter.priority));
      }

      if (filters.status.length > 0) {
        filteredLetters = filteredLetters.filter(letter => {
          const status = letter.isOverdue ? 'overdue' : 'normal';
          return filters.status.includes(status);
        });
      }

      if (filters.from.length > 0) {
        filteredLetters = filteredLetters.filter(letter => filters.from.includes(letter.from));
      }

      if (filters.to.length > 0) {
        filteredLetters = filteredLetters.filter(letter => filters.to.includes(letter.to));
      }

      // Apply date range filter
      if (filters.dateRange.start || filters.dateRange.end) {
        filteredLetters = filteredLetters.filter(letter => {
          const letterDate = new Date(letter.date);
          const startDate = filters.dateRange.start ? new Date(filters.dateRange.start) : null;
          const endDate = filters.dateRange.end ? new Date(filters.dateRange.end) : null;
          
          if (startDate && letterDate < startDate) return false;
          if (endDate && letterDate > endDate) return false;
          return true;
        });
      }
    }

    // Apply sorting
    if (sortConfig) {
      filteredLetters.sort((a, b) => {
        let aValue: any = a[sortConfig.key as keyof Letter];
        let bValue: any = b[sortConfig.key as keyof Letter];

        // Handle special cases
        if (sortConfig.key === 'date' || sortConfig.key === 'contractDeadline' || sortConfig.key === 'createdAt' || sortConfig.key === 'updatedAt') {
          aValue = new Date(aValue || 0);
          bValue = new Date(bValue || 0);
        } else if (sortConfig.key === 'attachments') {
          aValue = a.attachments.length;
          bValue = b.attachments.length;
        } else if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filteredLetters;
  }, [baseLetters, searchTerm, filters, sortConfig, activeInlineFilters]);

  // Load saved column configuration from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('tableview-column-config');
    if (saved) {
      try {
        const savedConfig = JSON.parse(saved);
        // Merge with default columns to ensure new properties like 'filterable' are added
        const mergedConfig = DEFAULT_COLUMNS.map(defaultCol => {
          const savedCol = savedConfig.find((col: any) => col.key === defaultCol.key);
          return savedCol ? { ...defaultCol, ...savedCol } : defaultCol;
        });
        setColumnConfig(mergedConfig);
      } catch (error) {
        console.warn('Failed to load saved column configuration:', error);
        setColumnConfig(DEFAULT_COLUMNS);
      }
    }
  }, []);

  // Save column configuration to localStorage
  const saveColumnConfig = (newConfig: ColumnConfig[]) => {
    setColumnConfig(newConfig);
    localStorage.setItem('tableview-column-config', JSON.stringify(newConfig));
  };

  // Toggle column visibility
  const toggleColumn = (key: string) => {
    const newConfig = columnConfig.map(col => 
      col.key === key ? { ...col, visible: !col.visible } : col
    );
    saveColumnConfig(newConfig);
  };

  // Reset to default columns
  const resetToDefaults = () => {
    localStorage.removeItem('tableview-column-config');
    setColumnConfig(DEFAULT_COLUMNS);
    console.log('Reset to defaults:', DEFAULT_COLUMNS);
  };

  // Sorting functions
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' | null = 'asc';
    if (sortConfig && sortConfig.key === key) {
      if (sortConfig.direction === 'asc') direction = 'desc';
      else if (sortConfig.direction === 'desc') direction = null;
    }
    setSortConfig(direction ? { key, direction } : null);
  };

  // Enhanced inline filter functions
  const handleInlineFilterChange = (columnKey: string, value: string) => {
    setActiveInlineFilters(prev => {
      const currentValues = prev[columnKey] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [columnKey]: newValues
      };
    });
  };

  const removeInlineFilterChip = (columnKey: string, value: string) => {
    setActiveInlineFilters(prev => ({
      ...prev,
      [columnKey]: (prev[columnKey] || []).filter(v => v !== value)
    }));
  };

  const clearAllInlineFilters = () => {
    setActiveInlineFilters({});
  };

  // Enhanced sort icon function
  const getSortIcon = (columnKey: string) => {
    if (!sortConfig || sortConfig.key !== columnKey) {
      return (
        <div className="flex flex-col opacity-50">
          <ChevronUp size={12} className="text-gray-400" />
          <ChevronDown size={12} className="text-gray-400 -mt-1" />
        </div>
      );
    }
    
    return (
      <div className="flex flex-col">
        <ChevronUp 
          size={12} 
          className={sortConfig.direction === 'asc' ? 'text-blue-600' : 'text-gray-300'} 
        />
        <ChevronDown 
          size={12} 
          className={`${sortConfig.direction === 'desc' ? 'text-blue-600' : 'text-gray-300'} -mt-1`} 
        />
      </div>
    );
  };

  // Filter functions
  const handleFilterChange = (filterType: keyof FilterConfig, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      priority: [],
      status: [],
      from: [],
      to: [],
      dateRange: { start: '', end: '' }
    });
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  // Get unique values for filter dropdowns
  const getUniqueValues = (key: string) => {
    return [...new Set(baseLetters.map(letter => {
      const value = letter[key as keyof Letter];
      return typeof value === 'string' ? value : '';
    }).filter(Boolean))];
  };

  // Get visible columns
  const visibleColumns = columnConfig.filter(col => col.visible);
  
  // Check for active inline filters
  const hasActiveInlineFilters = Object.values(activeInlineFilters).some(values => values.length > 0);
  
  // Debug: Log column configurations
  useEffect(() => {
    console.log('Column Config:', columnConfig);
    console.log('Visible Columns:', visibleColumns);
    console.log('Filterable Columns:', columnConfig.filter(col => col.filterable));
  }, [columnConfig, visibleColumns]);

  // Handle checkbox changes
  const handleCheckboxChange = (letterId: string, checked: boolean) => {
    const newSelectedLetters = new Set(selectedLetters);
    if (checked) {
      newSelectedLetters.add(letterId);
    } else {
      newSelectedLetters.delete(letterId);
    }
    setSelectedLetters(newSelectedLetters);
  };
  
  // Handle select all checkbox
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedLetters(new Set(lettersToShow.map(letter => letter.id)));
    } else {
      setSelectedLetters(new Set());
    }
  };
  
  // Handle draft letter with selected references
  const handleDraftWithSelected = () => {
    if (selectedLetters.size === 0) return;
    
    const selectedLetterObjects = lettersToShow.filter(letter => selectedLetters.has(letter.id));
    const compositeReference: Letter = {
      id: 'composite-' + Date.now(),
      from: 'Contractor' as const,
      to: 'NHAI' as const,
      date: new Date().toISOString(),
      letterNo: `DRAFT-${Date.now()}`,
      subject: `Draft with ${selectedLetters.size} reference(s)`,
      description: `Draft letter referencing ${selectedLetters.size} selected letter(s): ${selectedLetterObjects.map(l => l.letterNo).join(', ')}`,
      priority: 'medium' as const,
      isOverdue: false,
      assignee: 'Current User',
      attachments: []
    };
    
    onDraftLetter?.(compositeReference);
  };

  // Render table cell content based on column key
  const renderCellContent = (letter: Letter, column: ColumnConfig, index: number) => {
    switch (column.key) {
      case 'checkbox':
        return (
          <input
            type="checkbox"
            checked={selectedLetters.has(letter.id)}
            onChange={(e) => {
              e.stopPropagation();
              handleCheckboxChange(letter.id, e.target.checked);
            }}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        );
      
      case 'sno':
        return <span className="text-body font-body text-gray-900">{index + 1}</span>;
      
      case 'from':
        return (
          <span className={`px-2 py-1 text-caption font-caption rounded ${letter.from === 'Contractor' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
            {letter.from}
          </span>
        );
      
      case 'to':
        return (
          <span className={`px-2 py-1 text-caption font-caption rounded ${letter.to === 'Contractor' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
            {letter.to}
          </span>
        );
      
      case 'date':
        return <span className="text-body font-body text-gray-900">{new Date(letter.date).toLocaleDateString()}</span>;
      
      case 'letterNo':
        return <span className="text-body-bold font-body-bold text-gray-900">{letter.letterNo}</span>;
      
      case 'subject':
        return (
          <div className="text-body font-body text-gray-900 max-w-xs truncate" title={letter.subject}>
            {letter.subject}
          </div>
        );
      
      case 'description':
        return (
          <div className="text-body font-body text-gray-900 max-w-sm truncate" title={letter.description}>
            {letter.description}
          </div>
        );
      
      case 'priority':
        return <PriorityBadge priority={letter.priority} />;
      
      case 'status':
        return <OverdueBadge isOverdue={letter.isOverdue || false} />;
      
      case 'assignee':
        return <span className="text-body font-body text-gray-900">{letter.assignee}</span>;
      
      case 'attachments':
        return (
          <div className="flex items-center space-x-1">
            <FileText size={14} className="text-gray-400" />
            <span className="text-caption font-caption text-gray-600">
              {letter.attachments.length} file{letter.attachments.length !== 1 ? 's' : ''}
            </span>
          </div>
        );
      
      case 'contractDeadline':
        return (
          <span className="text-body font-body text-gray-900">
            {letter.contractDeadline ? new Date(letter.contractDeadline).toLocaleDateString() : '-'}
          </span>
        );
      
      case 'createdAt':
        return (
          <span className="text-body font-body text-gray-900">
            {letter.createdAt ? new Date(letter.createdAt).toLocaleDateString() : '-'}
          </span>
        );
      
      case 'updatedAt':
        return (
          <span className="text-body font-body text-gray-900">
            {letter.updatedAt ? new Date(letter.updatedAt).toLocaleDateString() : '-'}
          </span>
        );
      
      case 'actions':
        return (
          <div className="relative" ref={openActionDropdown === letter.id ? actionDropdownRef : null}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenActionDropdown(openActionDropdown === letter.id ? null : letter.id);
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="More actions"
            >
              <MoreHorizontal size={16} className="text-gray-500" />
            </button>
            
            {openActionDropdown === letter.id && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-48">
                <div className="py-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onGenerateSummary?.(letter);
                      setOpenActionDropdown(null);
                    }}
                    className="flex items-center w-full px-4 py-2 text-body font-body text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FileText size={16} className="mr-3 text-blue-500" />
                    Generate Summary
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDraftLetter?.(letter);
                      setOpenActionDropdown(null);
                    }}
                    className="flex items-center w-full px-4 py-2 text-body font-body text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FileText size={16} className="mr-3 text-green-500" />
                    Draft Reply Letter
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  // Inline Filter Dropdown Component
  const InlineFilterDropdown: React.FC<{ column: ColumnConfig }> = ({ column }) => {
    const columnKey = column.key;
    const values = uniqueFilterValues[columnKey as keyof typeof uniqueFilterValues] || [];
    const selectedValues = activeInlineFilters[columnKey] || [];
    
    return (
      <div 
        ref={dropdownRef}
        className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-48"
      >
        <div className="p-3 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <span className="font-medium text-body font-body">Filter {column.label}</span>
            <button
              onClick={() => setOpenFilterDropdown(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          </div>
        </div>
        <div className="max-h-64 overflow-y-auto p-2">
          {values.map(value => (
            <label
              key={value}
              className="flex items-center px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(value)}
                onChange={() => handleInlineFilterChange(columnKey, value)}
                className="mr-2 rounded"
              />
              <span className="text-body font-body capitalize">{value}</span>
              {selectedValues.includes(value) && (
                <Check size={14} className="ml-auto text-blue-600" />
              )}
            </label>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full overflow-auto bg-white w-full max-w-full">
      <div className="bg-white shadow-md overflow-hidden w-full h-full">
        {/* Multi-select Filter Chips */}
        {hasActiveInlineFilters && (
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-body font-body text-gray-600">Active Filters:</span>
              {Object.entries(activeInlineFilters).map(([columnKey, values]) =>
                values.map(value => (
                  <div
                    key={`${columnKey}-${value}`}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-body font-body"
                  >
                    <span className="font-medium capitalize">{columnKey}:</span>
                    <span>{value}</span>
                    <button
                      onClick={() => removeInlineFilterChip(columnKey, value)}
                      className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))
              )}
              <button
                onClick={clearAllInlineFilters}
                className="text-body font-body text-red-600 hover:text-red-800 font-medium"
              >
                Clear All
              </button>
            </div>
          </div>
        )}
        
        {/* Header Section */}
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-heading-3 font-heading-3 text-gray-800">
              {selectedSequence ? `Letters for Sequence: ${selectedSequence.sequenceTitle}` : 
               selectedEvent ? `Letters for: ${selectedEvent.eventTitle}` : 'All Letters'}
            </h3>
            
            <div className="flex items-center space-x-2">
              {/* Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-3 py-2 text-body font-body rounded-lg transition-colors ${
                  showFilters ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Filter size={16} />
                <span>Filters</span>
                {(filters.priority.length > 0 || filters.status.length > 0 || filters.from.length > 0 || 
                  filters.to.length > 0 || filters.dateRange.start || filters.dateRange.end) && (
                  <span className="bg-red-500 text-white text-caption font-caption rounded-full px-2 py-0.5 ml-1">
                    {filters.priority.length + filters.status.length + filters.from.length + filters.to.length + 
                     (filters.dateRange.start ? 1 : 0) + (filters.dateRange.end ? 1 : 0)}
                  </span>
                )}
              </button>
              
              {/* Column Configuration Button */}
              <button
                onClick={() => setShowColumnConfig(!showColumnConfig)}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm text-body font-body"
              >
                <Settings size={16} />
                <span>Configure Columns</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search letters by subject, description, letter number, from, to, or assignee..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-body font-body placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-body font-boby text-gray-600">
              Showing {lettersToShow.length} of {baseLetters.length} letter{baseLetters.length !== 1 ? 's' : ''}
              {selectedSequence && ` from ${selectedSequence.phase}`}
              {searchTerm && (
                <span className="ml-2 text-blue-600">
                  (filtered by search: "{searchTerm}")
                </span>
              )}
            </div>
            
            {(searchTerm || filters.priority.length > 0 || filters.status.length > 0 || 
              filters.from.length > 0 || filters.to.length > 0 || filters.dateRange.start || filters.dateRange.end) && (
              <button
                onClick={() => { clearSearch(); clearFilters(); }}
                className="text-boby font-body text-blue-600 hover:text-blue-800 underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Column Configuration Overlay */}
        {showColumnConfig && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowColumnConfig(false)} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-auto">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-semibold text-gray-900">Configure Columns</h4>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={resetToDefaults}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                      >
                        Reset to Default
                      </button>
                      <button
                        onClick={() => {
                          localStorage.clear();
                          window.location.reload();
                        }}
                        className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
                      >
                        Clear All Storage (Debug)
                      </button>
                      <button
                        onClick={() => setShowColumnConfig(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X size={24} />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {columnConfig.map((column) => (
                      <label key={column.key} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <input
                          type="checkbox"
                          checked={column.visible}
                          onChange={() => !column.required && toggleColumn(column.key)}
                          disabled={column.required}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                        />
                        <span className={`flex-1 ${column.required ? 'text-gray-500' : 'text-gray-900'} ${column.visible ? 'font-medium' : ''}`}>
                          {column.label}
                          {column.required && <span className="text-xs text-gray-400 ml-1">(required)</span>}
                        </span>
                        {column.visible ? (
                          <Eye size={16} className="text-green-500" />
                        ) : (
                          <EyeOff size={16} className="text-gray-400" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Filters Overlay */}
        {showFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-auto">
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg text-heading-3 text-gray-900">Filters</h4>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={clearFilters}
                      className="px-3 py-1 bg-gray-600 text-white text-body font-body rounded hover:bg-gray-700 transition-colors"
                    >
                      Clear Filters
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Priority Filter */}
                  <div>
                    <label className="block text-body-bold font-body-bold text-gray-900 mb-2">Priority</label>
                    <div className="space-y-1">
                      {['high', 'medium', 'low'].map((priority) => (
                        <label key={priority} className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={filters.priority.includes(priority)}
                            onChange={(e) => {
                              const newPriorities = e.target.checked
                                ? [...filters.priority, priority]
                                : filters.priority.filter(p => p !== priority);
                              handleFilterChange('priority', newPriorities);
                            }}
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span className="capitalize">{priority}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <label className="block text-xs text-body-bold text-gray-900 mb-2">Status</label>
                    <div className="space-y-1">
                      {['normal', 'overdue'].map((status) => (
                        <label key={status} className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={filters.status.includes(status)}
                            onChange={(e) => {
                              const newStatuses = e.target.checked
                                ? [...filters.status, status]
                                : filters.status.filter(s => s !== status);
                              handleFilterChange('status', newStatuses);
                            }}
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span className="capitalize">{status}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* From Filter */}
                  <div>
                    <label className="block text-xs text-body-bold text-gray-900 mb-2">From</label>
                    <div className="space-y-1">
                      {getUniqueValues('from').map((from) => (
                        <label key={from} className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={filters.from.includes(from)}
                            onChange={(e) => {
                              const newFroms = e.target.checked
                                ? [...filters.from, from]
                                : filters.from.filter(f => f !== from);
                              handleFilterChange('from', newFroms);
                            }}
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span>{from}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* To Filter */}
                  <div>
                    <label className="block text-xs text-body-bold font-body-bold text-gray-900 mb-2">To</label>
                    <div className="space-y-1">
                      {getUniqueValues('to').map((to) => (
                        <label key={to} className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={filters.to.includes(to)}
                            onChange={(e) => {
                              const newTos = e.target.checked
                                ? [...filters.to, to]
                                : filters.to.filter(t => t !== to);
                              handleFilterChange('to', newTos);
                            }}
                            className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span>{to}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Date Range Filter */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-body-bold text-gray-900 mb-2">From Date</label>
                    <input
                      type="date"
                      value={filters.dateRange.start}
                      onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, start: e.target.value })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-body-bold text-gray-900 mb-2">To Date</label>
                    <input
                      type="date"
                      value={filters.dateRange.end}
                      onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, end: e.target.value })}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Selected Letters Actions */}
        {selectedLetters.size > 0 && (
          <div className="p-4 bg-yellow-50 border-b border-yellow-200 flex justify-between items-center">
            <div className="text-sm text-yellow-800">
              <span className="text-heading-3 font-heading-3">{selectedLetters.size}</span> letter{selectedLetters.size !== 1 ? 's' : ''} selected
            </div>
            <button
              onClick={handleDraftWithSelected}
              className="px-4 py-2 bg-green-600 text-white text-body font-body rounded hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <span>Draft Letter with Selected References</span>
            </button>
          </div>
        )}

        {/* Enhanced Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                {visibleColumns.map((column) => (
                  <th 
                    key={column.key} 
                    className={`px-4 py-3 text-left relative ${column.width || ''}`}
                  >
                    {column.key === 'checkbox' ? (
                      <input
                        type="checkbox"
                        checked={selectedLetters.size === lettersToShow.length && lettersToShow.length > 0}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="flex items-center justify-between">
                        <div 
                          className={`flex items-center space-x-2 ${column.sortable ? 'cursor-pointer select-none hover:text-blue-600' : ''}`}
                          onClick={() => column.sortable && handleSort(column.key)}
                        >
                          <span className="font-semibold text-sm text-gray-700">{column.label}</span>
                          {column.sortable && getSortIcon(column.key)}
                        </div>
                        
                        {/* Inline Filter Button */}
                        {column.filterable && (
                          <button
                            onClick={() => setOpenFilterDropdown(
                              openFilterDropdown === column.key ? null : column.key
                            )}
                            className={`ml-2 p-1 rounded hover:bg-gray-200 ${
                              (activeInlineFilters[column.key] || []).length > 0 
                                ? 'text-blue-600 bg-blue-50' 
                                : 'text-gray-400'
                            }`}
                          >
                            <Filter size={14} />
                          </button>
                        )}
                        
                        {/* Filter Dropdown */}
                        {column.filterable && openFilterDropdown === column.key && (
                          <InlineFilterDropdown column={column} />
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lettersToShow.map((letter, index) => (
                <tr key={letter.id} className="cursor-pointer hover:bg-blue-50 transition-colors" onClick={() => {}}>
                  {visibleColumns.map((column) => (
                    <td key={column.key} className={`px-4 py-3 whitespace-nowrap ${column.width || ''}`}>
                      {renderCellContent(letter, column, index)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {lettersToShow.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No letters found.</p>
          </div>
        )}
      </div>
    </div>
  );
};