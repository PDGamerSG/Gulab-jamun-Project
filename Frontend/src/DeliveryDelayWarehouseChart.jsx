import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="label">{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, display: 'inline-block' }} />
          <span className="value">{p.name}: {p.value}</span>
        </div>
      ))}
    </div>
  );
};

function DeliveryDelayWarehouseChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/delivery-delay-by-warehouse").then(res => {
      const warehouses = Object.keys(res.data["On Time"] || {});
      const formatted = warehouses.map(w => ({
        warehouse: w,
        on_time: res.data["On Time"]?.[w] || 0,
        delayed: res.data["Delayed"]?.[w] || 0
      }));
      setData(formatted);
    });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="warehouse" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={{ stroke: '#E5E7EB' }} tickLine={false} />
        <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(232,93,117,0.04)' }} />
        <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: '0.82rem', color: '#6B7280' }} />
        <Bar dataKey="on_time" name="On Time" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={35} />
        <Bar dataKey="delayed" name="Delayed" fill="#E85D75" radius={[4, 4, 0, 0]} maxBarSize={35} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default DeliveryDelayWarehouseChart;
