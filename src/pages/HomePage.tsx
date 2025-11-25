import React from "react";
import MainTable from "../components/Table";
import YardMap from "../components/YardMap";
import StatusChart from "../components/StatusChart";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useStatusChartData } from "../hooks/useStatusChartData";

const HomePage: React.FC = () => {
  const items = useSelector((state: RootState) => state.containers.items);
  const statusData = useStatusChartData();

  return (
    <main className="space-y-6">
      <div className="grid gap-6 md:grid-cols-[2fr,1.4fr]">
        <YardMap />
        <StatusChart data={statusData} />
      </div>
      <MainTable data={items} />
    </main>
  );
};

export default HomePage;
