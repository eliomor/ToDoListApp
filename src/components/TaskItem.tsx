import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { setSelectedTask } from '../state/tasksSlice'; 
import { Task, RootStackParamList } from '../types';
import { useMutation, useQueryClient } from 'react-query';
import { deleteTask as deleteTaskAPI } from '../api/tasksApi'; 

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'AddEditTask'>>();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleEdit = () => {
    dispatch(setSelectedTask(task)); 
    navigation.navigate('AddEditTask');
  };

  const deleteTaskMutation = useMutation((taskId: number) => deleteTaskAPI(taskId), {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks'); // Invalidate tasks query to trigger refetch
    },
  });

  const handleDelete = () => {
    deleteTaskMutation.mutate(task.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEdit}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3f51b5',
  },
  deleteButton: {
    backgroundColor: '#ff1744',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default TaskItem;
