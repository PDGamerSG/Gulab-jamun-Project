import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid, LabelList } from "recharts";

const COLORS = ["#E85D75", "#f0899b", "#f7b3be", "#fad0c4", "#fde4df", "#E85D75", "#f0899b", "#f7b3be", "#fad0c4", "#fde4df"];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="label">Customer {label}</div>
      <div className="value">{payload[0].value} orders</div>
    </div>
  );
};

function PurchaseFrequencyChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/purchase-frequency").then(res => {
      const formatted = Object.entries(res.data).map(([key, value]) => ({
        customer: key.length > 10 ? key.substring(0, 10) + '…' : key,
        orders: value
      }));
      setData(formatted);
    });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={340}>
      <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
        <defs>
          {COLORS.map((color, i) => (
            <linearGradient key={i} id={`freqGrad${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={1} />
              <stop offset="100%" stopColor={color} stopOpacity={0.65} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" vertical={false} />
        <XAxis dataKey="customer" tick={{ fill: '#6B7280', fontSize: 10, fontWeight: 500 }} axisLine={{ stroke: '#E5E7EB' }} tickLine={false} />
        <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(232,93,117,0.04)', radius: 4 }} />
        <Bar dataKey="orders" radius={[8, 8, 0, 0]} maxBarSize={38} animationDuration={1200} animationEasing="ease-out">
          {data.map((_, i) => <Cell key={i} fill={`url(#freqGrad${i % COLORS.length})`} />)}
          <LabelList dataKey="orders" position="top" style={{ fill: '#6B7280', fontSize: 10, fontWeight: 600 }} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default PurchaseFrequencyChart;
