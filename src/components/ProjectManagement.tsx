import React, { useState } from 'react';
import { TaskProvider } from '../contexts/TaskContext';
import { ViewType } from '../types/Task';
import { Component4 } from "@/ui/components/Component4";
import Header from './Header';
import CalendarView from './views/CalendarView';
import ListView from './views/ListView';
import BoardView from './views/BoardView';
import TableView from './views/TableView';
import GanttView from './views/GanttView';
import TaskModal from './TaskModal';
import { useTask } from '../contexts/TaskContext';
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";

const ProjectManagement: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('board');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const { addTask } = useTask();

  const handleAddTask = () => {
    setShowTaskModal(true);
  };

  const handleTaskModalSubmit = (taskData: any) => {
    addTask(taskData);
    setShowTaskModal(false);
  };

  const renderView = () => {
    switch (currentView) {
      case 'calendar':
        return <CalendarView />;
      case 'list':
        return <ListView />;
      case 'board':
        return <BoardView />;
      case 'table':
        return <TableView />;
      case 'gantt':
        return <GanttView />;
      default:
        return <BoardView />;
    }
  };

  return (
    <DefaultPageLayout>
      <Component4 text="Iron Triangle Limited / Obligation Calendar" />
    <div className="flex h-full w-full flex-col">
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        onAddTask={handleAddTask}
      />
      <main className="flex-1">
        {renderView()}
      </main>
      
      <TaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        onSubmit={handleTaskModalSubmit}
      />
    </div>
    </DefaultPageLayout>
  );
};

export default function ProjectManagementWrapper() {
  return (
    <TaskProvider>
      <ProjectManagement />
    </TaskProvider>
  );
}
