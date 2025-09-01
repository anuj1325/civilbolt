import React, { useState } from 'react';
import { useTask } from '../../contexts/TaskContext';
import { MoreHorizontal, Calendar, User, Flag } from 'lucide-react';
import { Task } from '../../types/Task';
import TaskModal from '../TaskModal';

const ListView: React.FC = () => {
  const { tasks, updateTask, deleteTask } = useTask();
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);

  const priorityColors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-blue-100 text-blue-800',
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800'
  };

  const statusColors = {
    todo: 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    done: 'bg-green-100 text-green-800'
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

  const formatDate = (date: Date) => {
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
          <h2 className="text-heading-2 font-heading-2 text-gray-900">Task List</h2>
          <p className="text-body font-body text-gray-600 mt-1">{tasks.length} tasks total</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 text-body font-body-bold text-gray-700">
              <div className="col-span-4">Task</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Priority</div>
              <div className="col-span-2">Assignee</div>
              <div className="col-span-2">Due Date</div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleTaskClick(task)}
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: task.color }}
                      />
                      <div>
                        <h3 className="text-body font-body-bold text-gray-900">{task.title}</h3>
                        {task.description && (
                          <p className="text-body font-body text-gray-500 mt-1">{task.description}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-caption font-caption ${statusColors[task.status]}`}>
                      {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </span>
                  </div>

                  <div className="col-span-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-caption font-caption ${priorityColors[task.priority]}`}>
                      <Flag className="w-3 h-3 mr-1" />
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                  </div>

                  <div className="col-span-2">
                    {task.assignee && (
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-caption font-caption text-white">
                            {task.assignee.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-sm text-gray-700">{task.assignee}</span>
                      </div>
                    )}
                  </div>

                  <div className="col-span-2">
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(task.endDate)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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

export default ListView;
