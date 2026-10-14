import { lazy, Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.tsx"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
