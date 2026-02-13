import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="label">{label}</div>
      <div className="value">₹ {payload[0].value?.toLocaleString("en-IN")}</div>
    </div>
  );
};

const RoundedBar = (props) => {
  const { x, y, width, height, index } = props;
  if (!height || height <= 0) return null;
  const radius = Math.min(10, width / 2);
  const opacity = 1 - (index * 0.06);
  return (
    <g>
      <rect x={x + 2} y={y + 4} width={width - 4} height={height} rx={radius}
        fill="#FFB26B" opacity={0.12} filter="url(#whShadow)" />
      <rect x={x} y={y} width={width} height={height} rx={radius}
        fill="url(#whGrad)" opacity={opacity} />
    </g>
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
    <ResponsiveContainer width="100%" height={360}>
      <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }} barCategoryGap="18%">
        <defs>
          <linearGradient id="whGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFB26B" stopOpacity={1} />
            <stop offset="50%" stopColor="#ffc88e" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#ffd8b8" stopOpacity={0.7} />
          </linearGradient>
          <filter id="whShadow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" vertical={false} />
        <XAxis dataKey="warehouse" tick={{ fill: '#6B7280', fontSize: 11, fontWeight: 500 }} axisLine={{ stroke: '#E5E7EB' }} tickLine={false} />
        <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,178,107,0.06)', radius: 4 }} />
        <Bar dataKey="revenue" shape={<RoundedBar />} maxBarSize={44} animationDuration={1500} animationEasing="ease-out">
          <LabelList dataKey="revenue" position="top" style={{ fill: '#e8913b', fontSize: 10, fontWeight: 700 }} formatter={v => `₹${(v / 1000).toFixed(0)}k`} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default WarehouseChart;
