import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'; 
import { addTask, editTask, selectSelectedTask } from '../state/tasksSlice'; 
import { Task } from '../types';
import { useMutation } from 'react-query';
import { createTask as createTaskApi, updateTask as updateTaskApi } from '../api/tasksApi';

const AddEditTaskScreen = () => {
  const [task, setTask] = useState<Omit<Task, 'id'>>({ title: '', description: '' });
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selectedTask: Task | null = useSelector(selectSelectedTask);

  useEffect(() => {
    if (selectedTask) {
      setTask(selectedTask);
    }
  }, [selectedTask]);

  const createMutation = useMutation(createTaskApi, {
    onSuccess: (data) => {
      dispatch(addTask(data)); 
      navigation.goBack();
    },
  });

  const updateMutation = useMutation(async (updateData: { id: number, task: Partial<Omit<Task, 'id'>> }) => {
    const { id, task } = updateData;
    return await updateTaskApi(id, task);
  }, {
    onSuccess: (data) => {
      dispatch(editTask(data));
      navigation.goBack();
    },
  });

  const handleSave = () => {
    if (selectedTask) {
      updateMutation.mutate({ id: selectedTask.id, task });
    } else {
      createMutation.mutate(task);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={task.title}
        onChangeText={(title) => setTask((prev) => ({ ...prev, title }))}
      />
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        value={task.description}
        multiline
        onChangeText={(description) => setTask((prev) => ({ ...prev, description }))}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  descriptionInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#3f51b5',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddEditTaskScreen;
