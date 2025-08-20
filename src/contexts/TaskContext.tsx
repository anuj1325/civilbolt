import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Task } from '../types/Task';
import { v4 as uuidv4 } from 'uuid';

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, newStatus: Task['status']) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Submit Programme for Works',
    description: 'Prepare and submit the programme for upcoming works',
    status: 'todo',
    priority: 'high',
    startDate: new Date(2025, 7, 4), // August 4, 2025
    endDate: new Date(2025, 7, 6),
    assignee: 'John Doe',
    tags: ['planning', 'submission'],
    color: '#3B82F6'
  },
  {
    id: '2',
    title: 'Submit Quality Assurance Plan',
    description: 'Create and submit comprehensive QA plan',
    status: 'todo',
    priority: 'medium',
    startDate: new Date(2025, 7, 5),
    endDate: new Date(2025, 7, 8),
    assignee: 'Jane Smith',
    tags: ['quality', 'planning'],
    color: '#10B981'
  },
  {
    id: '3',
    title: 'Joint site inspection & memorandum',
    description: 'Conduct site inspection with stakeholders',
    status: 'in-progress',
    priority: 'urgent',
    startDate: new Date(2025, 7, 6),
    endDate: new Date(2025, 7, 10),
    assignee: 'Mike Johnson',
    tags: ['inspection', 'site'],
    color: '#F59E0B'
  },
  {
    id: '4',
    title: 'Design Review Meeting',
    description: 'Review architectural designs with the team',
    status: 'done',
    priority: 'medium',
    startDate: new Date(2025, 7, 1),
    endDate: new Date(2025, 7, 2),
    assignee: 'Sarah Wilson',
    tags: ['design', 'review'],
    color: '#EF4444'
  },
  {
    id: '5',
    title: 'Budget Analysis Report',
    description: 'Analyze project budget and create detailed report',
    status: 'todo',
    priority: 'high',
    startDate: new Date(2025, 7, 12),
    endDate: new Date(2025, 7, 15),
    assignee: 'David Chen',
    tags: ['budget', 'analysis'],
    color: '#8B5CF6'
  }
];

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);

  const addTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: uuidv4(),
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const moveTask = (taskId: string, newStatus: Task['status']) => {
    updateTask(taskId, { status: newStatus });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, moveTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};