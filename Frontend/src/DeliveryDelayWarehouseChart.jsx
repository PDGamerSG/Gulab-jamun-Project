import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  ResponsiveContainer, CartesianGrid, LabelList
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="label">{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, display: 'inline-block', boxShadow: `0 1px 4px ${p.color}40` }} />
          <span className="value">{p.name}: {p.value?.toLocaleString("en-IN")}</span>
        </div>
      ))}
    </div>
  );
};

const renderLegend = (props) => {
  const { payload } = props;
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 8 }}>
      {payload.map((entry, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            width: 10, height: 10, borderRadius: 3, background: entry.color,
            boxShadow: `0 2px 6px ${entry.color}40`, display: 'inline-block'
          }} />
          <span style={{ fontSize: '0.82rem', color: '#6B7280', fontWeight: 500 }}>{entry.value}</span>
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
        warehouse: w.length > 10 ? w.substring(0, 10) + '…' : w,
        on_time: res.data["On Time"]?.[w] || 0,
        delayed: res.data["Delayed"]?.[w] || 0
      }));
      setData(formatted);
    });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={360}>
      <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="onTimeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
            <stop offset="100%" stopColor="#10b981" stopOpacity={0.7} />
          </linearGradient>
          <linearGradient id="delayedGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E85D75" stopOpacity={1} />
            <stop offset="100%" stopColor="#E85D75" stopOpacity={0.7} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" vertical={false} />
        <XAxis
          dataKey="warehouse"
          tick={{ fill: '#6B7280', fontSize: 11, fontWeight: 500 }}
          axisLine={{ stroke: '#E5E7EB' }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#6B7280', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(232,93,117,0.04)', radius: 4 }} />
        <Legend content={renderLegend} />
        <Bar dataKey="on_time" name="On Time" fill="url(#onTimeGrad)" radius={[4, 4, 0, 0]} maxBarSize={32} animationDuration={1200}>
          <LabelList dataKey="on_time" position="top" style={{ fill: '#10b981', fontSize: 9, fontWeight: 600 }} />
        </Bar>
        <Bar dataKey="delayed" name="Delayed" fill="url(#delayedGrad)" radius={[4, 4, 0, 0]} maxBarSize={32} animationDuration={1200}>
          <LabelList dataKey="delayed" position="top" style={{ fill: '#E85D75', fontSize: 9, fontWeight: 600 }} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default DeliveryDelayWarehouseChart;
