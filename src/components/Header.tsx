import React from 'react';
import { Calendar, List, LayoutDashboard, Table, BarChart3, Plus, Filter, Search, Users, Bell, Settings } from 'lucide-react';
import { ViewType } from '../types/Task';

interface HeaderProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onAddTask: () => void;
}

const viewIcons = {
  list: List,
  board: LayoutDashboard,
  table: Table,
  calendar: Calendar,
  gantt: BarChart3,
};

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange, onAddTask }) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            
          
            
          </div>
        </div>

        
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1 flex-shrink-0">
          {(Object.entries(viewIcons) as [ViewType, any][]).map(([view, Icon]) => (
            <button
              key={view}
              onClick={() => onViewChange(view)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-body-bold transition-colors whitespace-nowrap ${
                currentView === view
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="capitalize">{view}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3 flex-shrink-0 ml-4">
          <button className="flex items-center space-x-2 px-3 py-2 text-body font-body text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 whitespace-nowrap">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button
            onClick={onAddTask}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-body font-body-bold text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
