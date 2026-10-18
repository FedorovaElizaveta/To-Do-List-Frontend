import axios from "axios";
import { create } from "zustand";

axios.defaults.baseURL = "http://localhost:5107";

export const useListStore = create((set) => ({
  lists: null,
  loading: false,
  error: null,
  getLists: async () => {
    set({ loading: true, error: null });
    try {
      const respose = await axios("/lists");
      const data = respose.data.data;

      set({ lists: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
