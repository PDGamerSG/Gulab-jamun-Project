import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Cell, CartesianGrid, LabelList
} from "recharts";

const GRADIENT_COLORS = [
  "#E85D75", "#e6647b", "#e46b81", "#e27287", "#e0798d",
  "#de8093", "#dc8799", "#da8e9f", "#d895a5", "#d69cab"
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="label">{label}</div>
      <div className="value" style={{ color: '#E85D75' }}>
        ⚠ {payload[0].value?.toLocaleString("en-IN")} units
      </div>
      <div style={{ fontSize: '0.68rem', color: '#9CA3AF', marginTop: 2 }}>High demand — stock-out risk</div>
    </div>
  );
};

function StockRiskChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/stock-risk")
      .then(res => {
        const formatted = Object.entries(res.data).map(([key, value]) => ({
          product: key.length > 12 ? key.substring(0, 12) + '…' : key,
          fullName: key,
          sales: value
        }));
        setData(formatted);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner" style={{ borderColor: 'rgba(232,93,117,0.2)', borderTopColor: '#E85D75', width: 28, height: 28 }} />
      </div>
    );
  }

  if (!data.length) {
    return (
      <div style={{ height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', fontSize: '0.88rem' }}>
        No stock risk data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={340}>
      <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="stockRiskGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E85D75" stopOpacity={1} />
            <stop offset="100%" stopColor="#E85D75" stopOpacity={0.6} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" vertical={false} />
        <XAxis
          dataKey="product"
          tick={{ fill: '#6B7280', fontSize: 10, fontWeight: 500 }}
          axisLine={{ stroke: '#E5E7EB' }}
          tickLine={false}
          angle={-30}
          textAnchor="end"
          height={55}
        />
        <YAxis
          tick={{ fill: '#6B7280', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={v => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(232,93,117,0.04)', radius: 4 }} />
        <Bar dataKey="sales" radius={[8, 8, 0, 0]} maxBarSize={38} animationDuration={1200} animationEasing="ease-out">
          {data.map((_, i) => (
            <Cell key={i} fill={GRADIENT_COLORS[i % GRADIENT_COLORS.length]} />
          ))}
          <LabelList dataKey="sales" position="top" style={{ fill: '#6B7280', fontSize: 10, fontWeight: 600 }} formatter={v => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default StockRiskChart;
