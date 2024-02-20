import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useQuery } from 'react-query';
import { fetchTasks } from '../api/tasksApi'; 
import TaskItem from '../components/TaskItem'; 
import { Task, RootStackParamList } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks, selectAllTasks } from '../state/tasksSlice';

const TaskListScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'AddEditTask'>>();

  const { data: tasks, isLoading, error } = useQuery<Task[], Error>('tasks', fetchTasks);

  useEffect(() => {
    if (!isLoading && !error && tasks) {
      console.log("Dispatching tasks to Redux:", tasks);
      dispatch(setTasks(tasks));
    }
  }, [isLoading, tasks, error, dispatch]);

  const tasksFromStore = useSelector(selectAllTasks);

  const handleAddTask = () => {
    navigation.navigate('AddEditTask');
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3f51b5" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
      <FlatList
        data={tasksFromStore} 
        renderItem={({ item }) => <TaskItem task={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 16,
  },
  addButton: {
    backgroundColor: '#3f51b5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default TaskListScreen;
