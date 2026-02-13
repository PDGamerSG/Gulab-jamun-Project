import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="label">Customer {label}</div>
      <div className="value">{payload[0].value} orders</div>
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
        fill="#E85D75" opacity={0.12} filter="url(#freqShadow)" />
      <rect x={x} y={y} width={width} height={height} rx={radius}
        fill="url(#freqGrad)" opacity={opacity} />
    </g>
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
    <ResponsiveContainer width="100%" height={360}>
      <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }} barCategoryGap="18%">
        <defs>
          <linearGradient id="freqGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E85D75" stopOpacity={1} />
            <stop offset="50%" stopColor="#f0899b" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#f7b3be" stopOpacity={0.7} />
          </linearGradient>
          <filter id="freqShadow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" vertical={false} />
        <XAxis dataKey="customer" tick={{ fill: '#6B7280', fontSize: 10, fontWeight: 500 }} axisLine={{ stroke: '#E5E7EB' }} tickLine={false} />
        <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(232,93,117,0.04)', radius: 4 }} />
        <Bar dataKey="orders" shape={<RoundedBar />} maxBarSize={42} animationDuration={1500} animationEasing="ease-out">
          <LabelList dataKey="orders" position="top" style={{ fill: '#E85D75', fontSize: 10, fontWeight: 700 }} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default PurchaseFrequencyChart;
