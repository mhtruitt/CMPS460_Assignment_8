import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../types';
import { useTasks } from '../TaskContext';
import { colors, shared } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'TaskDetails'>;

export default function TaskDetailsScreen({ route, navigation }: Props) {
  const { taskId } = route.params; // typed as string
  const { tasks, toggleTask, deleteTask } = useTasks();

  // Use the ID to find the correct task
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return (
      <View style={shared.screen}>
        <Text style={shared.heading}>Task not found</Text>
        <Text style={shared.body}>This task may have been deleted.</Text>
        <TouchableOpacity style={shared.secondaryButton} onPress={() => navigation.goBack()}>
          <Text style={shared.secondaryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const confirmDelete = () => {
    Alert.alert('Delete task', `Delete "${task.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteTask(task.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={shared.screen}>
      <View style={shared.card}>
        <Text style={shared.heading}>{task.title}</Text>
        <Text style={[styles.badge, task.completed ? styles.done : styles.open]}>
          {task.completed ? 'Completed' : 'Open'}
        </Text>

        <Text style={styles.sectionLabel}>Notes</Text>
        <Text style={styles.value}>{task.notes || 'No notes added.'}</Text>

        <Text style={styles.sectionLabel}>Created</Text>
        <Text style={styles.value}>{new Date(task.createdAt).toLocaleString()}</Text>

        <Text style={styles.sectionLabel}>Task ID</Text>
        <Text style={styles.value}>{task.id}</Text>
      </View>

      <TouchableOpacity
        style={[shared.primaryButton, { marginBottom: 10 }]}
        onPress={() => toggleTask(task.id)}
      >
        <Text style={shared.primaryButtonText}>
          {task.completed ? 'Mark as Open' : 'Mark as Completed'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[shared.secondaryButton, { marginBottom: 10 }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={shared.secondaryButtonText}>Back to Tasks</Text>
      </TouchableOpacity>

      <TouchableOpacity style={shared.dangerButton} onPress={confirmDelete}>
        <Text style={shared.primaryButtonText}>Delete Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
    marginBottom: 12,
  },
  open: { backgroundColor: '#f59e0b' },
  done: { backgroundColor: colors.success },
  sectionLabel: { color: colors.muted, fontSize: 12, fontWeight: '700', marginTop: 10, textTransform: 'uppercase' },
  value: { color: colors.text, fontSize: 16, marginTop: 2 },
});
