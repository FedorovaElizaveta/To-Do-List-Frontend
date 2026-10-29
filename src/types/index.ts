export interface ListStore {
  lists: List[] | [];
  loading: boolean;
  error: string | null;

  getLists(): void;
  createList(listInfo: { title: string; themeColor: string }): void;
  updateList(
    id: string,
    listInfo: { title?: string; themeColor?: string },
  ): void;
  deleteList(id: string): void;

  addTask(listId: string, text: string): void;
  updateTask(
    id: string,
    listId: string,
    payload: { text?: string; completed?: boolean },
  ): void;
  deleteTask(id: string, listId: string): void;
}

export interface List {
  id: string;
  title: string;
  themeColor: string;
  createdAt: string;
  updatedAt: string;

  tasks: Task[];
}

export interface Task {
  id: string;
  listId: string;
  text: string;
  completed: boolean;
}
