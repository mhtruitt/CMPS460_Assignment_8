# Task Manager (React Native + TypeScript)

A three-screen task manager built with Expo, TypeScript, and React Navigation.

## Screens

| Screen | Purpose |
|--------|---------|
| **Home** | Welcome page with task counts and a button to open the task list |
| **Tasks** | Task-entry form, validation message, task list, and an empty state |
| **Task Details** | Shows one task, looked up by the `taskId` route param; mark complete, delete, go back |

## Install and Run

Prerequisites: Node.js 18+ and the Expo Go app (or an iOS/Android emulator).

```bash
# 1. Create the project (if starting fresh)
npx create-expo-app@latest TaskManager --template blank-typescript
cd TaskManager

# 2. Install navigation dependencies
npx expo install @react-navigation/native @react-navigation/native-stack \
  react-native-screens react-native-safe-area-context

# 3. Copy App.tsx and the src/ folder from this repo into the project, then:
npx expo start
```

Cloning this repository instead:

```bash
git clone <your-repo-url>
cd TaskManager
npm install
npx expo start
```

Scan the QR code with Expo Go, or press `i` (iOS simulator) / `a` (Android emulator).
