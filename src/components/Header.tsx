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
            <div className="w-6 h-6 bg-blue-600 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold">Cb</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Civilbolt</h1>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">Obligation Calendar</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <Users className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
          {(Object.entries(viewIcons) as [ViewType, any][]).map(([view, Icon]) => (
            <button
              key={view}
              onClick={() => onViewChange(view)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
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

        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button
            onClick={onAddTask}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
