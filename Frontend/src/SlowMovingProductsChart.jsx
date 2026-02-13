import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, LabelList, Cell
} from "recharts";

const COLORS = [
  "#FFB26B", "#ffbc7d", "#ffc68f", "#ffd1a1", "#ffdbb3",
  "#FFB26B", "#ffbc7d", "#ffc68f", "#ffd1a1", "#ffdbb3"
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="label">{payload[0]?.payload?.fullName || label}</div>
      <div className="value">{payload[0].value?.toLocaleString("en-IN")} units sold</div>
      <div style={{ fontSize: '0.68rem', color: '#9CA3AF', marginTop: 2 }}>Low demand — consider promotions</div>
    </div>
  );
};

function SlowMovingProductsChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/slow-moving-products")
      .then(res => {
        const formatted = Object.entries(res.data).map(([key, value]) => ({
          product: key.length > 16 ? key.substring(0, 16) + '…' : key,
          fullName: key,
          quantity: value
        }));
        setData(formatted);
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ height: 360, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner" style={{ borderColor: 'rgba(255,178,107,0.2)', borderTopColor: '#FFB26B', width: 28, height: 28 }} />
      </div>
    );
  }

  if (!data.length) {
    return (
      <div style={{ height: 360, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', fontSize: '0.88rem' }}>
        No slow-moving product data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={Math.max(360, data.length * 38)}>
      <BarChart data={data} layout="vertical" margin={{ top: 10, right: 50, left: 10, bottom: 10 }} barCategoryGap="25%">
        <defs>
          {COLORS.map((color, i) => (
            <linearGradient key={i} id={`slowGr${i}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={color} stopOpacity={0.5} />
              <stop offset="100%" stopColor={color} stopOpacity={1} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" horizontal={false} />
        <XAxis
          type="number"
          tick={{ fill: '#6B7280', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="product"
          tick={{ fill: '#374151', fontSize: 11, fontWeight: 500 }}
          axisLine={false}
          tickLine={false}
          width={100}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,178,107,0.06)' }} />
        <Bar dataKey="quantity" radius={[0, 8, 8, 0]} maxBarSize={20} animationDuration={1500} animationEasing="ease-out">
          {data.map((_, i) => (
            <Cell key={i} fill={`url(#slowGr${i % COLORS.length})`} />
          ))}
          <LabelList dataKey="quantity" position="right" style={{ fill: '#e8913b', fontSize: 10, fontWeight: 700 }} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SlowMovingProductsChart;
