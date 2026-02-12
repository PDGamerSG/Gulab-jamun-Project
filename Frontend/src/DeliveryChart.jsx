import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#E0C3FC", "#E85D75"];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="label">{payload[0].name}</div>
      <div className="value">{payload[0].value?.toLocaleString("en-IN")} shipments</div>
    </div>
  );
};

const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={700}>
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

function DeliveryChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/delivery-performance").then(res => {
      const formatted = Object.entries(res.data).map(([key, value]) => ({
        name: key, value: value
      }));
      setData(formatted);
    });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={data} dataKey="value" nameKey="name" cx="50%" cy="50%"
          innerRadius={65} outerRadius={110} paddingAngle={3}
          labelLine={false} label={renderLabel} strokeWidth={0}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: '0.82rem', color: '#6B7280' }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default DeliveryChart;
