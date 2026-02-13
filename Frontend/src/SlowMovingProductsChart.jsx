import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Cell, CartesianGrid, LabelList
} from "recharts";

const COLORS = [
  "#FFB26B", "#ffc07d", "#ffce8f", "#ffdca1", "#ffeab3",
  "#FFB26B", "#ffc07d", "#ffce8f", "#ffdca1", "#ffeab3"
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="label">{label}</div>
      <div className="value">{payload[0].value?.toLocaleString("en-IN")} units sold</div>
      <div style={{ fontSize: '0.68rem', color: '#9CA3AF', marginTop: 2 }}>Low demand — consider promotions</div>
    </div>
  );
};

function SlowMovingProductsChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/slow-moving-products").then(res => {
      const formatted = Object.entries(res.data).map(([key, value]) => ({
        product: key.length > 14 ? key.substring(0, 14) + '…' : key,
        quantity: value
      }));
      setData(formatted);
    });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={340}>
      <BarChart data={data} layout="vertical" margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
        <defs>
          <linearGradient id="slowGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFB26B" stopOpacity={0.7} />
            <stop offset="100%" stopColor="#FFB26B" stopOpacity={1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" horizontal={false} />
        <XAxis type="number" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="product" tick={{ fill: '#6B7280', fontSize: 10, fontWeight: 500 }} axisLine={false} tickLine={false} width={85} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,178,107,0.06)' }} />
        <Bar dataKey="quantity" radius={[0, 8, 8, 0]} maxBarSize={22} animationDuration={1200} animationEasing="ease-out">
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
          <LabelList dataKey="quantity" position="right" style={{ fill: '#6B7280', fontSize: 10, fontWeight: 600 }} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SlowMovingProductsChart;
