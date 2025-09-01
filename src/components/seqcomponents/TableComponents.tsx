import React, { useState, useMemo } from 'react';
import { FileText, ChevronUp, ChevronDown, Settings, Filter, Eye, EyeOff } from 'lucide-react';
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
  { key: 'status', header: 'Status', sortable: true, filterable: true, visible: false, width: '120px', render: (sequence) => <SequenceStatusBadge status={sequence.status} /> },
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

// Enhanced Sequence Table Component with sorting, filtering, and configurable columns
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

  const config = tableConfig || internalConfig;
  const setConfig = onTableConfigChange || setInternalConfig;

  // Filter data based on current filter config
  const filteredData = useMemo(() => {
    return data.filter(sequence => {
      return Object.entries(config.filterConfig).every(([key, value]) => {
        if (!value || value === 'all') return true;
        const sequenceValue = sequence[key as keyof SequenceOfEvents];
        return String(sequenceValue).toLowerCase().includes(String(value).toLowerCase());
      });
    });
  }, [data, config.filterConfig]);

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

  const handleFilterChange = (columnKey: string, value: string) => {
    setConfig({
      ...config,
      filterConfig: {
        ...config.filterConfig,
        [columnKey]: value
      }
    });
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
  const uniqueValues = {
    phase: [...new Set(data.map(item => item.phase))],
    category: [...new Set(data.map(item => item.category))],
    status: [...new Set(data.map(item => item.status))],
    priority: [...new Set(data.map(item => item.priority))]
  };

  return (
    <div className="space-y-4">
      {/* Table Controls */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          {/* Filter Controls */}
          <select 
            className="px-3 py-2 border rounded-md text-body font-body"
            value={config.filterConfig.phase || 'all'}
            onChange={(e) => handleFilterChange('phase', e.target.value)}
          >
            <option value="all">All Phases</option>
            {uniqueValues.phase.map(phase => (
              <option key={phase} value={phase}>{phase}</option>
            ))}
          </select>

          <select 
            className="px-3 py-2 border rounded-md text-body font-body"
            value={config.filterConfig.status || 'all'}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="all">All Status</option>
            {uniqueValues.status.map(status => (
              <option key={status} value={status}>
                {status.replace('_', ' ').toUpperCase()}
              </option>
            ))}
          </select>

          <select 
            className="px-3 py-2 border rounded-md text-body font-body"
            value={config.filterConfig.priority || 'all'}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
          >
            <option value="all">All Priority</option>
            {uniqueValues.priority.map(priority => (
              <option key={priority} value={priority}>
                {priority.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Column Settings Toggle */}
        <div className="relative">
          <button
            onClick={() => setConfig({ ...config, showColumnSettings: !config.showColumnSettings })}
            className="flex items-center space-x-2 px-3 py-2 border rounded-md hover:bg-gray-50"
          >
            <Settings size={16} />
            <span className="text-body font-body">Columns</span>
          </button>

          {/* Column Settings Dropdown Overlay */}
          {config.showColumnSettings && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 z-40"
                onClick={() => setConfig({ ...config, showColumnSettings: false })}
              />
              
              {/* Dropdown Panel */}
              <div className="absolute right-0 top-full mt-2 z-50 bg-gray-50 p-4 rounded-md border shadow-lg min-w-80">
                <h4 className="font-body-bold mb-3">Configure Columns</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {config.columns.map(column => (
                    <label key={String(column.key)} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={column.visible !== false}
                        onChange={() => toggleColumnVisibility(String(column.key))}
                        className="rounded"
                      />
                      <span className="text-body font-body">{column.header}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            {visibleColumns.map((column, index) => (
              <TableHead 
                key={String(column.key)}
                className={`${column.sortable ? 'cursor-pointer select-none hover:bg-gray-50' : ''}`}
                style={{ width: column.width }}
                onClick={() => column.sortable && handleSort(String(column.key))}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.header}</span>
                  {column.sortable && (
                    <div className="flex flex-col">
                      <ChevronUp 
                        size={12} 
                        className={`${config.sortConfig.key === column.key && config.sortConfig.direction === 'asc' 
                          ? 'text-blue-600' : 'text-gray-400'}`} 
                      />
                      <ChevronDown 
                        size={12} 
                        className={`${config.sortConfig.key === column.key && config.sortConfig.direction === 'desc' 
                          ? 'text-blue-600' : 'text-gray-400'} -mt-1`} 
                      />
                    </div>
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
              className="cursor-pointer hover:bg-gray-50"
            >
              {visibleColumns.map(column => (
                <TableCell key={String(column.key)} style={{ width: column.width }}>
                  {column.render ? column.render(sequence) : (() => {
                    if (column.key === 'id') return index + 1;
                    if (column.key === 'sequenceTitle') {
                      return (
                        <div className="max-w-xs truncate font-body-bold" title={sequence.sequenceTitle}>
                          {sequence.sequenceTitle}
                        </div>
                      );
                    }
                    if (column.key === 'phase') {
                      return (
                        <span className={`px-2 py-1 rounded text-caption font-caption ${
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
                        <div className="max-w-sm truncate text-body font-body" title={sequence.description}>
                          {sequence.description}
                        </div>
                      );
                    }
                    return String(sequence[column.key as keyof SequenceOfEvents] || '-');
                  })()}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};