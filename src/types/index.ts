export interface ListStore {
  lists: List[] | [];
  selectedListId: string | null;
  loading: boolean;
  error: string | null;

  getLists(): void;
  setSelectedListId(id: string): void;
  createList(listInfo: { title: string; themeColor: string }): void;
  updateList(
    id: string,
    listInfo: { title?: string; themeColor?: string },
  ): void;
  deleteList(id: string): void;
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
}
