import axiosInstance from './axiosConfig';
import { Task } from '../types';

const basePath: string = '/tasks';

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    console.log('Fetching tasks...');
    const { data } = await axiosInstance.get<Task[]>(basePath);
    console.log('Tasks fetched:', data);
    return data;
  } catch (error: any) {
    console.error('Failed to fetch tasks:', error);
    throw new Error(`Failed to fetch tasks: ${error.message}`);
  }
};

export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  try {
    console.log('Creating task:', task);
    const { data } = await axiosInstance.post<Task>(basePath, task);
    console.log('Task created:', data);
    return data;
  } catch (error: any) {
    console.error('Failed to create task:', error);
    throw new Error(`Failed to create task: ${error.message}`);
  }
};

export const updateTask = async (id: number, task: Partial<Omit<Task, 'id'>>): Promise<Task> => {
  try {
    console.log('Updating task with ID', id, 'with data:', task);
    const { data } = await axiosInstance.put<Task>(`${basePath}/${id}`, task);
    console.log('Task updated:', data);
    return data;
  } catch (error: any) {
    console.error('Failed to update task:', error);
    throw new Error(`Failed to update task: ${error.message}`);
  }
};

export const deleteTask = async (id: number): Promise<void> => {
  try {
    console.log('Deleting task with ID', id);
    await axiosInstance.delete(`${basePath}/${id}`);
    console.log('Task deleted successfully');
  } catch (error: any) {
    console.error('Failed to delete task:', error);
    throw new Error(`Failed to delete task: ${error.message}`);
  }
};
