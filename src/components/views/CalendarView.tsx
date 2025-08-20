import React, { useState } from 'react';
import { Calendar, momentLocalizer, Event } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useTask } from '../../contexts/TaskContext';
import { Task } from '../../types/Task';
import TaskModal from '../TaskModal';

const localizer = momentLocalizer(moment);

const CalendarView: React.FC = () => {
  const { tasks, updateTask, addTask } = useTask();
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);

  const events: Event[] = tasks.map(task => ({
    id: task.id,
    title: task.title,
    start: task.startDate,
    end: task.endDate,
    resource: task,
  }));

  const eventStyleGetter = (event: Event) => {
    const task = event.resource as Task;
    return {
      style: {
        backgroundColor: task.color || '#3B82F6',
        borderRadius: '6px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block',
        fontSize: '12px',
        fontWeight: '500',
      },
    };
  };

  const handleSelectEvent = (event: Event) => {
    setSelectedTask(event.resource as Task);
    setShowModal(true);
  };

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setSelectedTask(undefined);
    setShowModal(true);
  };

  const handleEventDrop = ({ event, start, end }: any) => {
    const task = event.resource as Task;
    updateTask(task.id, {
      startDate: start,
      endDate: end,
    });
  };

  const handleModalSubmit = (taskData: Omit<Task, 'id'>) => {
    if (selectedTask) {
      updateTask(selectedTask.id, taskData);
    } else {
      addTask(taskData);
    }
  };

  return (
    <div className="h-full bg-white">
      <style>
        {`
          .rbc-calendar {
            height: calc(100vh - 200px);
            font-family: inherit;
          }
          .rbc-header {
            background-color: #f8fafc;
            border-bottom: 1px solid #e2e8f0;
            padding: 12px 8px;
            font-weight: 600;
            color: #374151;
          }
          .rbc-today {
            background-color: #fef3c7;
          }
          .rbc-off-range-bg {
            background-color: #f9fafb;
          }
          .rbc-event {
            padding: 2px 6px;
            border-radius: 6px;
          }
          .rbc-date-cell {
            padding: 8px;
            text-align: right;
          }
          .rbc-month-view {
            border: 1px solid #e5e7eb;
          }
          .rbc-day-slot .rbc-time-slot {
            border-top: 1px solid #f3f4f6;
          }
          .rbc-timeslot-group {
            border-bottom: 1px solid #e5e7eb;
          }
        `}
      </style>

      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Calendar</h2>
          <div className="text-sm text-gray-600">
            August 2025
          </div>
        </div>

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          onEventDrop={handleEventDrop}
          selectable
          resizable
          dragFromOutsideItem={() => null}
          popup
          views={['month', 'week', 'day', 'agenda']}
          defaultView="month"
          step={60}
          showMultiDayTimes
        />
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

export default CalendarView;
