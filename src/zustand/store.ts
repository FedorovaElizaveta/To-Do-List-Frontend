import axios from "axios";
import { create } from "zustand";
import type { ListStore } from "../types/index.ts";

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
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  setSelectedListId: (id) => {
    set({ loading: true, error: null });
    try {
      set({ selectedListId: id });
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  createList: async (listInfo) => {
    set({ loading: true, error: null });
    try {
      await axios.post("/lists", listInfo);

      const response = await axios("/lists");
      const data = response.data.data;

      set({ lists: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
  updateList: async (id, listInfo) => {
    set({ loading: true, error: null });
    try {
      await axios.put(`/lists/${id}`, listInfo);

      const response = await axios("/lists");
      const data = response.data.data;

      set({ lists: data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
  deleteList: async (id) => {
    await axios.delete(`/lists/${id}`);

    const response = await axios("/lists");
    const data = response.data.data;

    set({ lists: data, loading: false });
  },
  addTask: async (listId, text) => {
    set({ loading: true, error: null });
    try {
      await axios.post("/task", { listId, text });
      set({ loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
  updateTask: async (listId, text) => {
    set({ loading: true, error: null });
    try {
      await axios.put(`/task`, { listId, text });
      set({ loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
  deleteTask: async (id) => {
    set({ loading: true, error: null });
    try {
      set({ loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));
