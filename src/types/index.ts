export interface State {
  lists: List[] | null;
  loading: boolean;
  error: string | null;

  getLists(): void;
}

export interface List {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;

  tasks: Task[];
}

export interface Task {
  id: string;
  listId: string;
  text: string;
}
