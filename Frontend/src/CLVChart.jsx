import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList } from "recharts";

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

const RoundedBar = (props) => {
  const { x, y, width, height, index } = props;
  if (!height || height <= 0) return null;
  const radius = Math.min(10, width / 2);
  const opacity = 1 - (index * 0.05);
  return (
    <g>
      <rect x={x + 2} y={y + 4} width={width - 4} height={height} rx={radius}
        fill="#c9a0f0" opacity={0.12} filter="url(#clvShadow)" />
      <rect x={x} y={y} width={width} height={height} rx={radius}
        fill="url(#clvGrad)" opacity={opacity} />
    </g>
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
    <ResponsiveContainer width="100%" height={360}>
      <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }} barCategoryGap="18%">
        <defs>
          <linearGradient id="clvGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b47de8" stopOpacity={1} />
            <stop offset="50%" stopColor="#c9a0f0" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#E0C3FC" stopOpacity={0.7} />
          </linearGradient>
          <filter id="clvShadow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" vertical={false} />
        <XAxis dataKey="customer" tick={{ fill: '#6B7280', fontSize: 10, fontWeight: 500 }} axisLine={{ stroke: '#E5E7EB' }} tickLine={false} />
        <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(224,195,252,0.06)', radius: 4 }} />
        <Bar dataKey="revenue" shape={<RoundedBar />} maxBarSize={42} animationDuration={1500} animationEasing="ease-out">
          <LabelList dataKey="revenue" position="top" style={{ fill: '#9f5ce0', fontSize: 10, fontWeight: 700 }} formatter={v => `₹${(v / 1000).toFixed(0)}k`} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default CLVChart;
