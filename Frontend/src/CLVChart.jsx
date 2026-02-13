import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid, LabelList } from "recharts";

const COLORS = ["#E0C3FC", "#c9a0f0", "#b47de8", "#9f5ce0", "#8b3dd8", "#d4acf7", "#c89bf3", "#bc8aef", "#af79eb", "#a368e7"];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="label">Customer {label}</div>
      <div className="value">₹ {payload[0].value?.toLocaleString("en-IN")}</div>
      <div style={{ fontSize: '0.68rem', color: '#9CA3AF', marginTop: 2 }}>Lifetime value</div>
    </div>
  );
};

function CLVChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/customer-clv").then(res => {
      const formatted = Object.entries(res.data).map(([key, value]) => ({
        customer: key.length > 10 ? key.substring(0, 10) + '…' : key,
        revenue: value
      }));
      setData(formatted);
    });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={340}>
      <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
        <defs>
          {COLORS.map((color, i) => (
            <linearGradient key={i} id={`clvGrad${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={1} />
              <stop offset="100%" stopColor={color} stopOpacity={0.65} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" vertical={false} />
        <XAxis dataKey="customer" tick={{ fill: '#6B7280', fontSize: 10, fontWeight: 500 }} axisLine={{ stroke: '#E5E7EB' }} tickLine={false} />
        <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(224,195,252,0.06)', radius: 4 }} />
        <Bar dataKey="revenue" radius={[8, 8, 0, 0]} maxBarSize={38} animationDuration={1200} animationEasing="ease-out">
          {data.map((_, i) => <Cell key={i} fill={`url(#clvGrad${i % COLORS.length})`} />)}
          <LabelList dataKey="revenue" position="top" style={{ fill: '#6B7280', fontSize: 9, fontWeight: 600 }} formatter={v => `₹${(v / 1000).toFixed(0)}k`} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default CLVChart;
