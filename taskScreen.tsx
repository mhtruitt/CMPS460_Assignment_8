import React, { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../types';
import { useTasks } from '../TaskContext';
import { colors, shared } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Tasks'>;

export default function TasksScreen({ navigation }: Props) {
  const { tasks, addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    // trim() turns whitespace-only input into '' so it is rejected too
    if (title.trim().length === 0) {
      setError('Task title cannot be blank.');
      return;
    }
    addTask(title, notes);
    setTitle('');
    setNotes('');
    setError('');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={shared.screen}>
        {/* Task-entry form */}
        <View style={shared.card}>
          <Text style={styles.label}>New task</Text>
          <TextInput
            style={[styles.input, !!error && styles.inputError]}
            placeholder="Task title"
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              if (error) setError('');
            }}
            onSubmitEditing={handleAdd}
            returnKeyType="done"
            maxLength={100}
          />
          {!!error && <Text style={styles.errorText}>{error}</Text>}

          <TextInput
            style={[styles.input, styles.notesInput]}
            placeholder="Notes (optional)"
            value={notes}
            onChangeText={setNotes}
            multiline
          />

          <TouchableOpacity style={shared.primaryButton} onPress={handleAdd}>
            <Text style={shared.primaryButtonText}>Add Task</Text>
          </TouchableOpacity>
        </View>

        {/* Task list with empty state */}
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={tasks.length === 0 ? styles.emptyContainer : undefined}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyTitle}>No tasks yet</Text>
              <Text style={styles.emptyText}>Add your first task using the form above.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[shared.card, styles.taskRow]}
              // Typed route param: TypeScript requires { taskId: string } here
              onPress={() => navigation.navigate('TaskDetails', { taskId: item.id })}
            >
              <View style={{ flex: 1 }}>
                <Text style={[styles.taskTitle, item.completed && styles.taskDone]}>
                  {item.title}
                </Text>
                <Text style={styles.taskStatus}>{item.completed ? 'Completed' : 'Open'}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  label: { fontWeight: '700', color: colors.text, marginBottom: 8, fontSize: 16 },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  notesInput: { minHeight: 60, textAlignVertical: 'top', marginBottom: 12 },
  inputError: { borderColor: colors.danger },
  errorText: { color: colors.danger, marginBottom: 8, fontSize: 14 },
  emptyContainer: { flexGrow: 1, justifyContent: 'center' },
  empty: { alignItems: 'center', padding: 24 },
  emptyTitle: { fontSize: 18, fontWeight: '600', color: colors.text },
  emptyText: { color: colors.muted, marginTop: 6, textAlign: 'center' },
  taskRow: { flexDirection: 'row', alignItems: 'center' },
  taskTitle: { fontSize: 17, fontWeight: '600', color: colors.text },
  taskDone: { textDecorationLine: 'line-through', color: colors.muted },
  taskStatus: { color: colors.muted, marginTop: 2, fontSize: 13 },
  chevron: { fontSize: 28, color: colors.muted, marginLeft: 8 },
});
