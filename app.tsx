import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootStackParamList } from './src/types';
import { TaskProvider } from './src/TaskContext';
import HomeScreen from './src/screens/HomeScreen';
import TasksScreen from './src/screens/TasksScreen';
import TaskDetailsScreen from './src/screens/TaskDetailsScreen';
import { colors } from './src/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <TaskProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: { backgroundColor: colors.primary },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: '700' },
              contentStyle: { backgroundColor: colors.background },
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Task Manager' }} />
            <Stack.Screen name="Tasks" component={TasksScreen} options={{ title: 'My Tasks' }} />
            <Stack.Screen
              name="TaskDetails"
              component={TaskDetailsScreen}
              options={{ title: 'Task Details' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="light" />
      </TaskProvider>
    </SafeAreaProvider>
  );
}
