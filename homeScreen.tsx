import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../types';
import { useTasks } from '../TaskContext';
import { colors, shared } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { tasks } = useTasks();
  const done = tasks.filter((t) => t.completed).length;

  return (
    <View style={shared.screen}>
      <Text style={shared.heading}>Welcome 👋</Text>
      <Text style={shared.body}>Keep track of what you need to get done.</Text>

      <View style={[shared.card, styles.statsCard]}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{tasks.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{tasks.length - done}</Text>
          <Text style={styles.statLabel}>Open</Text>
        </View>
        <View style={styles.stat}>
          <Text style={[styles.statNumber, { color: colors.success }]}>{done}</Text>
          <Text style={styles.statLabel}>Done</Text>
        </View>
      </View>

      <TouchableOpacity style={shared.primaryButton} onPress={() => navigation.navigate('Tasks')}>
        <Text style={shared.primaryButtonText}>Go to My Tasks</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  statsCard: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  stat: { alignItems: 'center' },
  statNumber: { fontSize: 28, fontWeight: '700', color: colors.primary },
  statLabel: { color: colors.muted, marginTop: 2 },
});
