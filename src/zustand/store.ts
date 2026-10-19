import axios from "axios";
import { create } from "zustand";
import { color } from "../types/listColors.ts";
import type { List, ListStore } from "../types/index.ts";

axios.defaults.baseURL = "http://localhost:5108";

export const useListStore = create<ListStore>((set) => ({
  lists: [],
  selectedListId: null,
  loading: false,
  error: null,
  getLists: async () => {
    set({ loading: true, error: null });
    try {
      const respose = await axios("/lists");
      const data = respose.data.data;

      const lists = data.map((list: List) => ({
        ...list,
        iconColor: color.PURPLE,
      }));

      set({ lists, loading: false });
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
}));
