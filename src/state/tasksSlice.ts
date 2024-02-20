import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types';

interface TasksState {
  list: Task[];
  selectedTask: Task | null; 
}

const initialState: TasksState = {
  list: [],
  selectedTask: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.list = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.list.push(action.payload);
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.list.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(task => task.id !== action.payload);
    },
    setSelectedTask: (state, action: PayloadAction<Task | null>) => {
      state.selectedTask = action.payload;
    },
  },
});

export const { setTasks, addTask, editTask, deleteTask, setSelectedTask } = tasksSlice.actions;

export const selectSelectedTask = (state: { tasks: TasksState }) => state.tasks.selectedTask;
export const selectAllTasks = (state: { tasks: TasksState }) => state.tasks.list;

export default tasksSlice.reducer;
