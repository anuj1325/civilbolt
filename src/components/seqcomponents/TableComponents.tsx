import React, { useState, useMemo, useRef, useEffect } from 'react';
import { FileText, ChevronUp, ChevronDown, Settings, Filter, Eye, EyeOff, X, Check } from 'lucide-react';
import { Event, SequenceOfEvents, ColumnConfig, EventTableProps, SequenceTableProps, SortConfig, FilterConfig, TableConfig } from '@/types';
import { PriorityBadge, OverdueBadge, SequenceStatusBadge } from './SharedComponents';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './Table';

// Define columns for the EventTable
export const eventColumns: ColumnConfig<Event>[] = [
  { key: 'id', header: 'ID' },
  { key: 'from', header: 'From' },
  { key: 'to', header: 'To' },
  { key: 'date', header: 'Date', render: (event) => new Date(event.date).toLocaleDateString() },
  { key: 'letterNo', header: 'Letter No.' },
  { key: 'subject', header: 'Subject' },
  { key: 'priority', header: 'Priority', render: (event) => <PriorityBadge priority={event.priority} /> },
  { key: 'isOverdue', header: 'Overdue', render: (event) => <OverdueBadge isOverdue={event.isOverdue || false} /> },
  { key: 'assignee', header: 'Assignee' },
];

// Define default columns for the SequenceTable
export const defaultSequenceColumns: ColumnConfig<SequenceOfEvents>[] = [
  { key: 'id', header: 'S.No', sortable: true, visible: true, width: '80px' },
  { key: 'sequenceTitle', header: 'Sequence', sortable: true, visible: true, width: '250px' },
  { key: 'phase', header: 'Phase', sortable: true, filterable: true, visible: true, width: '180px' },
  { key: 'category', header: 'Category', sortable: true, filterable: true, visible: true, width: '150px' },
  { key: 'description', header: 'Description', visible: true, width: '300px' },
  { key: 'status', header: 'Status', sortable: true, filterable: true, visible: true, width: '120px', render: (sequence) => <SequenceStatusBadge status={sequence.status} /> },
  { key: 'priority', header: 'Priority', sortable: true, filterable: true, visible: true, width: '100px', render: (sequence) => <PriorityBadge priority={sequence.priority} /> },
  { key: 'expectedDuration', header: 'Duration', sortable: true, visible: true, width: '120px' },
  { key: 'targetDate', header: 'Target Date', sortable: true, visible: true, width: '120px', render: (sequence) => sequence.targetDate ? new Date(sequence.targetDate).toLocaleDateString() : '-' },
  { key: 'keyDocuments', header: 'Key Documents', visible: true, width: '140px', render: (sequence) => (
    <div className="flex items-center space-x-1">
      <Eye size={14} className="text-blue-500 hover:text-blue-700 cursor-pointer" />
      <span className="text-caption font-caption text-gray-600">
        {sequence.keyDocuments.length} doc{sequence.keyDocuments.length !== 1 ? 's' : ''}
      </span>
    </div>
  ) },
];

// Generic Event Table Component
export const EventTable: React.FC<EventTableProps> = ({ data, columns = eventColumns, onEventClick }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={String(column.key)}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id} onClick={() => onEventClick?.(item)} className="cursor-pointer">
            {columns.map((column) => (
              <TableCell key={String(column.key)}>
                {column.render ? column.render(item) : String(item[column.key as keyof Event])}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

// Enhanced Sequence Table Component with inline filters, multi-select chips, improved sorting, and configurable columns
export const SequenceTable: React.FC<SequenceTableProps> = ({ 
  data, 
  onSequenceClick, 
  tableConfig,
  onTableConfigChange 
}) => {
  // Initialize default config if not provided
  const [internalConfig, setInternalConfig] = useState<TableConfig<SequenceOfEvents>>(() => ({
    columns: defaultSequenceColumns,
    sortConfig: { key: '', direction: null },
    filterConfig: {},
    showColumnSettings: false
  }));

  const [activeFilters, setActiveFilters] = useState<{[key: string]: string[]}>({});
  const [openFilterDropdown, setOpenFilterDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const config = tableConfig || internalConfig;
  const setConfig = onTableConfigChange || setInternalConfig;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenFilterDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get unique values for filters
  const uniqueValues = useMemo(() => ({
    phase: [...new Set(data.map(item => item.phase))],
    category: [...new Set(data.map(item => item.category))],
    status: [...new Set(data.map(item => item.status))],
    priority: [...new Set(data.map(item => item.priority))]
  }), [data]);

  // Filter data based on multi-select filters
  const filteredData = useMemo(() => {
    return data.filter(sequence => {
      return Object.entries(activeFilters).every(([key, values]) => {
        if (!values || values.length === 0) return true;
        const sequenceValue = sequence[key as keyof SequenceOfEvents];
        return values.includes(String(sequenceValue));
      });
    });
  }, [data, activeFilters]);

  // Sort data based on current sort config
  const sortedData = useMemo(() => {
    if (!config.sortConfig.key || !config.sortConfig.direction) {
      return filteredData;
    }

    return [...filteredData].sort((a, b) => {
      const aValue = a[config.sortConfig.key as keyof SequenceOfEvents];
      const bValue = b[config.sortConfig.key as keyof SequenceOfEvents];
      
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      let comparison = 0;
      if (aValue < bValue) comparison = -1;
      if (aValue > bValue) comparison = 1;

      return config.sortConfig.direction === 'desc' ? -comparison : comparison;
    });
  }, [filteredData, config.sortConfig]);

  const handleSort = (columnKey: string) => {
    const currentSort = config.sortConfig;
    let newDirection: 'asc' | 'desc' | null = 'asc';
    
    if (currentSort.key === columnKey) {
      if (currentSort.direction === 'asc') newDirection = 'desc';
      else if (currentSort.direction === 'desc') newDirection = null;
    }

    setConfig({
      ...config,
      sortConfig: { key: newDirection ? columnKey : '', direction: newDirection }
    });
  };

  const handleMultiSelectFilter = (columnKey: string, value: string) => {
    setActiveFilters(prev => {
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

  const removeFilterChip = (columnKey: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [columnKey]: (prev[columnKey] || []).filter(v => v !== value)
    }));
  };

  const clearAllFilters = () => {
    setActiveFilters({});
  };

  const toggleColumnVisibility = (columnKey: string) => {
    const updatedColumns = config.columns.map(col => 
      col.key === columnKey ? { ...col, visible: !col.visible } : col
    );
    setConfig({
      ...config,
      columns: updatedColumns
    });
  };

  const visibleColumns = config.columns.filter(col => col.visible !== false);
  const hasActiveFilters = Object.values(activeFilters).some(values => values.length > 0);

  const getSortIcon = (columnKey: string) => {
    if (config.sortConfig.key !== columnKey) {
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
          className={config.sortConfig.direction === 'asc' ? 'text-blue-600' : 'text-gray-300'} 
        />
        <ChevronDown 
          size={12} 
          className={`${config.sortConfig.direction === 'desc' ? 'text-blue-600' : 'text-gray-300'} -mt-1`} 
        />
      </div>
    );
  };

  const FilterDropdown: React.FC<{ column: ColumnConfig<SequenceOfEvents> }> = ({ column }) => {
    const columnKey = String(column.key);
    const values = uniqueValues[columnKey as keyof typeof uniqueValues] || [];
    const selectedValues = activeFilters[columnKey] || [];
    
    return (
      <div 
        ref={dropdownRef}
        className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-48"
      >
        <div className="p-3 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm">Filter {column.header}</span>
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
                onChange={() => handleMultiSelectFilter(columnKey, value)}
                className="mr-2 rounded"
              />
              <span className="text-sm">{value}</span>
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
    <div className="space-y-4">
      {/* Multi-select Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-600">Active Filters:</span>
          {Object.entries(activeFilters).map(([columnKey, values]) =>
            values.map(value => (
              <div
                key={`${columnKey}-${value}`}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                <span className="font-medium capitalize">{columnKey}:</span>
                <span>{value}</span>
                <button
                  onClick={() => removeFilterChip(columnKey, value)}
                  className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X size={12} />
                </button>
              </div>
            ))
          )}
          <button
            onClick={clearAllFilters}
            className="text-sm text-red-600 hover:text-red-800 font-medium"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Column Configuration */}
      <div className="flex justify-end">
        <div className="relative">
          <button
            onClick={() => setConfig({ ...config, showColumnSettings: !config.showColumnSettings })}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm"
          >
            <Settings size={16} />
            <span className="text-sm font-medium">Configure Columns</span>
          </button>

          {config.showColumnSettings && (
            <>
              <div 
                className="fixed inset-0 z-40"
                onClick={() => setConfig({ ...config, showColumnSettings: false })}
              />
              
              <div className="absolute right-0 top-full mt-2 z-50 bg-white p-4 rounded-lg border border-gray-200 shadow-lg min-w-80">
                <h4 className="font-semibold mb-3">Configure Columns</h4>
                <div className="grid grid-cols-2 gap-3">
                  {config.columns.map(column => (
                    <label key={String(column.key)} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={column.visible !== false}
                        onChange={() => toggleColumnVisibility(String(column.key))}
                        className="rounded"
                      />
                      <span className="text-sm">{column.header}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Enhanced Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              {visibleColumns.map((column) => (
                <TableHead 
                  key={String(column.key)}
                  className="px-4 py-3 relative"
                  style={{ width: column.width }}
                >
                  <div className="flex items-center justify-between">
                    <div 
                      className={`flex items-center space-x-2 ${column.sortable ? 'cursor-pointer select-none hover:text-blue-600' : ''}`}
                      onClick={() => column.sortable && handleSort(String(column.key))}
                    >
                      <span className="font-semibold text-sm">{column.header}</span>
                      {column.sortable && getSortIcon(String(column.key))}
                    </div>
                    
                    {/* Inline Filter Button */}
                    {column.filterable && (
                      <button
                        onClick={() => setOpenFilterDropdown(
                          openFilterDropdown === String(column.key) ? null : String(column.key)
                        )}
                        className={`ml-2 p-1 rounded hover:bg-gray-200 ${
                          (activeFilters[String(column.key)] || []).length > 0 
                            ? 'text-blue-600 bg-blue-50' 
                            : 'text-gray-400'
                        }`}
                      >
                        <Filter size={14} />
                      </button>
                    )}
                    
                    {/* Filter Dropdown */}
                    {column.filterable && openFilterDropdown === String(column.key) && (
                      <FilterDropdown column={column} />
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((sequence, index) => (
              <TableRow 
                key={sequence.id} 
                onClick={() => onSequenceClick?.(sequence)} 
                className="cursor-pointer hover:bg-blue-50 transition-colors"
              >
                {visibleColumns.map(column => (
                  <TableCell key={String(column.key)} className="px-4 py-3" style={{ width: column.width }}>
                    {column.render ? column.render(sequence) : (() => {
                      if (column.key === 'id') return index + 1;
                      if (column.key === 'sequenceTitle') {
                        return (
                          <div className="max-w-xs truncate font-semibold text-gray-900" title={sequence.sequenceTitle}>
                            {sequence.sequenceTitle}
                          </div>
                        );
                      }
                      if (column.key === 'phase') {
                        return (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            sequence.phase === 'Pre-Contract Phase' ? 'bg-purple-100 text-purple-800' :
                            sequence.phase === 'Contract Execution Phase' ? 'bg-blue-100 text-blue-800' :
                            sequence.phase === 'Operational Phase' ? 'bg-green-100 text-green-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {sequence.phase}
                          </span>
                        );
                      }
                      if (column.key === 'description') {
                        return (
                          <div className="max-w-sm truncate text-gray-600" title={sequence.description}>
                            {sequence.description}
                          </div>
                        );
                      }
                      return (
                        <span className="text-gray-700">
                          {String(sequence[column.key as keyof SequenceOfEvents] || '-')}
                        </span>
                      );
                    })()}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};