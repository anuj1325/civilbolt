import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Plus } from 'lucide-react';

interface DroppableColumnProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const DroppableColumn: React.FC<DroppableColumnProps> = ({ id, title, children }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`bg-gray-100 rounded-lg p-4 min-h-[500px] transition-colors ${
        isOver ? 'bg-blue-50 border-2 border-blue-300 border-dashed' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
          {title}
        </h3>
        <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
          <Plus className="w-4 h-4" />
        </button>
      </div>
      {children}
    </div>
  );
};

export default DroppableColumn;