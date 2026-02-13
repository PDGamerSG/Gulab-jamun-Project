import { useEffect, useState } from "react";
import axios from "axios";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  ResponsiveContainer
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="label">{label}</div>
      <div className="value">₹ {payload[0].value?.toLocaleString("en-IN")}</div>
    </div>
  );
};

function RevenueChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      // Add timestamp to prevent caching
      axios.get(`http://localhost:8000/monthly-revenue?t=${new Date().getTime()}`).then(res => {
        const formatted = Object.entries(res.data)
          .map(([key, value]) => ({ month: key, revenue: value }))
          .sort((a, b) => a.month.localeCompare(b.month))
          .slice(-12); // Show only last 12 months so new data is visible
        setData(formatted);
      });
    };
    fetchData();
    window.addEventListener("data-refresh", fetchData);
    return () => window.removeEventListener("data-refresh", fetchData);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E85D75" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#E85D75" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={{ stroke: '#E5E7EB' }} tickLine={false} />
        <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="revenue" stroke="#E85D75" strokeWidth={2.5} fill="url(#revenueGrad)" dot={{ r: 3, fill: '#E85D75', strokeWidth: 0 }} activeDot={{ r: 5, fill: '#E85D75', stroke: '#fff', strokeWidth: 2 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default RevenueChart;
