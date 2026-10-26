import { lazy, Suspense, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useListStore } from "./zustand/store.ts";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.tsx"));

function App() {
  const getLists = useListStore((state) => state.getLists);

  useEffect(() => {
    getLists();
  }, [getLists]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
