export interface ListStore {
  lists: List[] | [];
  selectedListId: string | null;
  loading: boolean;
  error: string | null;

  getLists(): void;
  setSelectedListId(id: string): void;
}

export interface List {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  iconColor: string;

  tasks: Task[];
}

export interface Task {
  id: string;
  listId: string;
  text: string;
}
