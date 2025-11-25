import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppRouter from "./router/AppRouter";
import Header from "./components/Header";
import type { AppDispatch } from "./store";
import { fetchContainers } from "./store/containersSlice";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchContainers());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors">
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <AppRouter />
      </div>
    </div>
  );
};

export default App;
