import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid, LabelList } from "recharts";

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
    <ResponsiveContainer width="100%" height={340}>
      <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
        <defs>
          {COLORS.map((color, i) => (
            <linearGradient key={i} id={`whGrad${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={1} />
              <stop offset="100%" stopColor={color} stopOpacity={0.65} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" vertical={false} />
        <XAxis dataKey="warehouse" tick={{ fill: '#6B7280', fontSize: 11, fontWeight: 500 }} axisLine={{ stroke: '#E5E7EB' }} tickLine={false} />
        <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,178,107,0.06)', radius: 4 }} />
        <Bar dataKey="revenue" radius={[8, 8, 0, 0]} maxBarSize={44} animationDuration={1200} animationEasing="ease-out">
          {data.map((_, i) => <Cell key={i} fill={`url(#whGrad${i % COLORS.length})`} />)}
          <LabelList dataKey="revenue" position="top" style={{ fill: '#6B7280', fontSize: 9, fontWeight: 600 }} formatter={v => `₹${(v / 1000).toFixed(0)}k`} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default WarehouseChart;
