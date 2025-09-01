import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useTask } from '../../contexts/TaskContext';
import { Task } from '../../types/Task';
import TaskCard from '../TaskCard';
import DroppableColumn from '../DroppableColumn';
import TaskModal from '../TaskModal';

const BoardView: React.FC = () => {
  const { tasks, moveTask, addTask, updateTask } = useTask();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);

  const columns = [
    { id: 'todo', title: 'To Do', status: 'todo' as const },
    { id: 'in-progress', title: 'In Progress', status: 'in-progress' as const },
    { id: 'done', title: 'Done', status: 'done' as const },
  ];

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find(t => t.id === event.active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const taskId = active.id as string;
      const newStatus = over.id as Task['status'];
      
      // Check if we're dropping into a column
      const column = columns.find(col => col.id === over.id);
      if (column) {
        moveTask(taskId, column.status);
      }
    }
    
    setActiveTask(null);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleModalSubmit = (taskData: Omit<Task, 'id'>) => {
    if (selectedTask) {
      updateTask(selectedTask.id, taskData);
    } else {
      addTask(taskData);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-heading-2 font-heading-2 text-gray-900">Board</h2>
          <p className="text-body font-body text-gray-600 mt-1">Manage tasks across different stages</p>
        </div>

        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {columns.map((column) => (
              <DroppableColumn key={column.id} id={column.id} title={column.title}>
                <SortableContext
                  items={getTasksByStatus(column.status).map(task => task.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-3">
                    {getTasksByStatus(column.status).map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onClick={() => handleTaskClick(task)}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DroppableColumn>
            ))}
          </div>

          <DragOverlay>
            {activeTask && (
              <TaskCard task={activeTask} onClick={() => {}} isDragging />
            )}
          </DragOverlay>
        </DndContext>
      </div>

      <TaskModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedTask(undefined);
        }}
        onSubmit={handleModalSubmit}
        task={selectedTask}
      />
    </div>
  );
};

export default BoardView;
