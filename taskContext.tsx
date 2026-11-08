import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Task } from './types';

interface TaskContextValue {
  tasks: Task[];
  addTask: (title: string, notes: string) => Task;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextValue | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = useCallback((title: string, notes: string): Task => {
    const task: Task = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: title.trim(),
      notes: notes.trim(),
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [task, ...prev]); // newest first
    return task;
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = useMemo(
    () => ({ tasks, addTask, toggleTask, deleteTask }),
    [tasks, addTask, toggleTask, deleteTask]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks(): TaskContextValue {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTasks must be used inside a TaskProvider');
  return ctx;
}
