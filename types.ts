// Typed navigation: every screen and its route params are declared here.
// `undefined` means the screen takes no params; TaskDetails requires a taskId.
export type RootStackParamList = {
  Home: undefined;
  Tasks: undefined;
  TaskDetails: { taskId: string };
};

export interface Task {
  id: string;
  title: string;
  notes: string;
  completed: boolean;
  createdAt: number;
}
