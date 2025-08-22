export type ViewType = 'calendar' | 'list' | 'board' | 'table' | 'gantt';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  startDate: Date;
  endDate: Date;
  assignee?: string;
  tags?: string[];
  color?: string;
}

