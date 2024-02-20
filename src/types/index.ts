export interface Task {
    id: number;
    title: string;
    description?: string; 
  }
  
  export type RootStackParamList = {
    TaskList: undefined; 
    AddEditTask: undefined;  
  };
  