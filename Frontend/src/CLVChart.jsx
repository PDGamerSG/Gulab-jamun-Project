import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const COLORS = ["#E0C3FC", "#c9a0f0", "#b47de8", "#9f5ce0", "#8b3dd8", "#d4acf7", "#c89bf3", "#bc8aef", "#af79eb", "#a368e7"];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="label">Customer {label}</div>
      <div className="value">₹ {payload[0].value?.toLocaleString("en-IN")}</div>
    </div>
  );
};

function CLVChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/customer-clv").then(res => {
      const formatted = Object.entries(res.data).map(([key, value]) => ({
        customer: key, revenue: value
      }));
      setData(formatted);
    });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <XAxis dataKey="customer" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={{ stroke: '#E5E7EB' }} tickLine={false} />
        <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(224,195,252,0.08)' }} />
        <Bar dataKey="revenue" radius={[6, 6, 0, 0]} maxBarSize={40}>
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default CLVChart;
