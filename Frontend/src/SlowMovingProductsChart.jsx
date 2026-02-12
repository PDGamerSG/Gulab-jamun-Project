import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="label">{label}</div>
      <div className="value">{payload[0].value} units sold</div>
    </div>
  );
};

function SlowMovingProductsChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/slow-moving-products").then(res => {
      const formatted = Object.entries(res.data).map(([key, value]) => ({
        product: key, quantity: value
      }));
      setData(formatted);
    });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
        <XAxis type="number" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="product" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,178,107,0.06)' }} />
        <Bar dataKey="quantity" radius={[0, 6, 6, 0]} maxBarSize={20}>
          {data.map((_, i) => (
            <Cell key={i} fill={`hsl(${20 + i * 6}, 85%, ${65 + i * 2}%)`} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SlowMovingProductsChart;
