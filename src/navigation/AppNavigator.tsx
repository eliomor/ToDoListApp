import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TaskListScreen from '../screens/TaskListScreen';
import AddEditTaskScreen from '../screens/AddEditTaskScreen';
import { NavigationContainer } from '@react-navigation/native';

export type RootStackParamList = {
  TaskList: undefined;
  AddEditTask: { taskId?: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TaskList">
        <Stack.Screen name="TaskList" component={TaskListScreen} options={{ title: 'Tasks' }} />
        <Stack.Screen name="AddEditTask" component={AddEditTaskScreen} options={({ route }) => ({ title: route.params?.taskId ? 'Edit Task' : 'Add Task' })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
