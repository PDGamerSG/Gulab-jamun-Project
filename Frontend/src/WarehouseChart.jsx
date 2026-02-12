import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const COLORS = ["#FFB26B", "#ffcba4", "#ffd8b8", "#ffe4cc", "#fff0e0"];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="label">{label}</div>
      <div className="value">₹ {payload[0].value?.toLocaleString("en-IN")}</div>
    </div>
  );
};

function WarehouseChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios.get("http://localhost:8000/warehouse-sales").then(res => {
        const formatted = Object.entries(res.data)
          .map(([key, value]) => ({ warehouse: key, revenue: value }))
          .sort((a, b) => b.revenue - a.revenue);
        setData(formatted);
      });
    };
    fetchData();
    window.addEventListener("data-refresh", fetchData);
    return () => window.removeEventListener("data-refresh", fetchData);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <XAxis dataKey="warehouse" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={{ stroke: '#E5E7EB' }} tickLine={false} />
        <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,178,107,0.06)' }} />
        <Bar dataKey="revenue" radius={[6, 6, 0, 0]} maxBarSize={50}>
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default WarehouseChart;
