import React, { useState } from 'react';
import { useTask } from '../../contexts/TaskContext';
import { Task } from '../../types/Task';
import TaskModal from '../TaskModal';

const GanttView: React.FC = () => {
  const { tasks, updateTask } = useTask();
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);

  // Calculate the date range for the Gantt chart
  const getDatesRange = () => {
    if (tasks.length === 0) return { startDate: new Date(), endDate: new Date() };
    
    const dates = tasks.flatMap(task => [task.startDate, task.endDate]);
    const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));
    
    // Extend the range slightly
    minDate.setDate(minDate.getDate() - 7);
    maxDate.setDate(maxDate.getDate() + 7);
    
    return { startDate: minDate, endDate: maxDate };
  };

  const { startDate, endDate } = getDatesRange();
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  const generateDateHeaders = () => {
    const headers = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < totalDays; i++) {
      headers.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return headers;
  };

  const getTaskPosition = (task: Task) => {
    const taskStart = Math.max(0, Math.floor((task.startDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
    const taskEnd = Math.min(totalDays, Math.ceil((task.endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
    const duration = taskEnd - taskStart;
    
    return {
      left: `${(taskStart / totalDays) * 100}%`,
      width: `${(duration / totalDays) * 100}%`,
    };
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleModalSubmit = (taskData: Omit<Task, 'id'>) => {
    if (selectedTask) {
      updateTask(selectedTask.id, taskData);
    }
  };

  const dateHeaders = generateDateHeaders();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const formatTaskDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="bg-white">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-heading-2 font-heading-2 text-gray-900">Gantt Chart</h2>
          <p className="text-body font-body text-gray-600 mt-1">Timeline view of all tasks</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Header */}
              <div className="flex border-b border-gray-200">
                <div className="w-80 px-6 py-3 bg-gray-50 text-body font-body-bold text-gray-700 border-r border-gray-200 flex-shrink-0">
                  Task
                </div>
                <div className="w-48 px-6 py-3 bg-gray-50 text-body font-body-bold text-gray-700 border-r border-gray-200 flex items-center flex-shrink-0">
                  Assignee(s)
                </div>
                <div className="flex-1 bg-gray-50">
                  <div className="flex" style={{ minWidth: `${Math.max(800, totalDays * 40)}px` }}>
                    {dateHeaders.map((date, index) => (
                      <div
                        key={index}
                        className="flex-1 px-2 py-3 text-caption font-caption text-center text-gray-600 border-r border-gray-200"
                        style={{ minWidth: '40px' }}
                      >
                        <div>{formatDate(date)}</div>
                        <div className="text-caption font-caption text-gray-400">{date.getDate()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tasks */}
              <div className="divide-y divide-gray-200">
                {tasks.map((task) => (
                  <div key={task.id} className="flex hover:bg-gray-50">
                    <div className="w-80 px-6 py-4 border-r border-gray-200 flex-shrink-0">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: task.color }}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-body font-body-bold text-gray-900 truncate">
                            {task.title}
                          </div>
                          <div className="text-caption font-caption text-gray-500">
                            {formatTaskDate(task.startDate)} - {formatTaskDate(task.endDate)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-48 px-6 py-4 border-r border-gray-200 flex items-center flex-shrink-0">
                      {task.assignee ? (
                        <div className="flex items-center space-x-3 w-full">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-caption font-caption text-white">
                              {task.assignee.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-body font-body text-gray-700 truncate">{task.assignee}</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-3 w-full">
                          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-caption font-caption text-gray-500">?</span>
                          </div>
                          <span className="text-body font-body text-gray-400 truncate">Unassigned</span>
                        </div>
                      )}
                    </div>
                    <div 
                      className="flex-1 relative py-4"
                      style={{ minWidth: `${Math.max(800, totalDays * 40)}px` }}
                    >
                      <div
                        className="absolute top-1/2 transform -translate-y-1/2 h-6 rounded cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center"
                        style={{
                          backgroundColor: task.color,
                          ...getTaskPosition(task),
                        }}
                        onClick={() => handleTaskClick(task)}
                      >
                        <span className="text-white text-caption font-caption px-2 truncate">
                          {task.title}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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

export default GanttView;
