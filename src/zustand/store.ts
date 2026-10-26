import axios from "axios";
import { create } from "zustand";
import type { List, ListStore, Task } from "../types/index.ts";

axios.defaults.baseURL = "http://localhost:5108";

export const useListStore = create<ListStore>((set) => ({
  lists: [],
  selectedListId: null,
  loading: false,
  error: null,

  getLists: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios("/lists");
      const data = response.data.data;

      set({ lists: data, loading: false });
    } catch (error: unknown) {
      set({
        error: error instanceof Error ? error.message : String(error),
        loading: false,
      });
    }
  },
  createList: async (listInfo) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post("/lists", listInfo);
      const newList: List = response.data.data;

      set((state) => ({
        lists: [...state.lists, newList],
        loading: false,
      }));
    } catch (error: unknown) {
      set({
        error: error instanceof Error ? error.message : String(error),
        loading: false,
      });
    }
  },
  updateList: async (id, listInfo) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`/lists/${id}`, listInfo);

      const updatedList: List = response.data.data;

      set((state) => ({
        lists: state.lists.map((list) => (list.id === id ? updatedList : list)),
        loading: false,
      }));
    } catch (error: unknown) {
      set({
        error: error instanceof Error ? error.message : String(error),
        loading: false,
      });
    }
  },
  deleteList: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`/lists/${id}`);

      set((state) => ({
        lists: state.lists.filter((list) => {
          return list.id !== id;
        }),
        loading: false,
      }));
    } catch (error: unknown) {
      set({
        error: error instanceof Error ? error.message : String(error),
        loading: false,
      });
    }
  },

  addTask: async (listId, text) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post("/task", { listId, text });
      const task: Task = response.data.data;

      set((state) => ({
        lists: state.lists.map((list) =>
          list.id === listId ? { ...list, tasks: [...list.tasks, task] } : list,
        ),
        loading: false,
      }));
    } catch (error: unknown) {
      set({
        error: error instanceof Error ? error.message : String(error),
        loading: false,
      });
    }
  },
  updateTask: async (id, listId, taskInfo) => {
    set({ loading: true, error: null });
    try {
      console.log(id, taskInfo);
      const response = await axios.put(`/task/${id}`, taskInfo);
      const updatedTask: Task = response.data.data;

      set((state) => ({
        lists: state.lists.map((list) =>
          list.id === listId
            ? {
                ...list,
                tasks: list.tasks.map((task) =>
                  task.id === id ? updatedTask : task,
                ),
              }
            : list,
        ),
        loading: false,
      }));
    } catch (error: unknown) {
      set({
        error: error instanceof Error ? error.message : String(error),
        loading: false,
      });
    }
  },
  deleteTask: async (id, listId) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`/task/${id}`);

      set((state) => ({
        lists: state.lists.map((list) =>
          list.id === listId
            ? { ...list, tasks: list.tasks.filter((task) => task.id !== id) }
            : list,
        ),
        loading: false,
      }));
    } catch (error: unknown) {
      set({
        error: error instanceof Error ? error.message : String(error),
        loading: false,
      });
    }
  },
}));
