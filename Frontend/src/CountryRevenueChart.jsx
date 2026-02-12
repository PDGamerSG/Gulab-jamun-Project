import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell } from "recharts";

const COLORS = ["#E85D75", "#F0899B", "#FFB26B", "#E0C3FC", "#c9a0f0", "#f7a4b3", "#ffd1a6", "#d4a8f2", "#ff8fa3", "#ffcba4"];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="label">{label}</div>
      <div className="value">₹ {payload[0].value?.toLocaleString("en-IN")}</div>
    </div>
  );
};

function CountryRevenueChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios.get("http://localhost:8000/country-revenue").then(res => {
        const formatted = Object.entries(res.data)
          .map(([key, value]) => ({ country: key, revenue: value }))
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
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="country" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={{ stroke: '#E5E7EB' }} tickLine={false} angle={-25} textAnchor="end" height={60} />
        <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(232,93,117,0.04)' }} />
        <Bar dataKey="revenue" radius={[6, 6, 0, 0]} maxBarSize={40}>
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default CountryRevenueChart;
