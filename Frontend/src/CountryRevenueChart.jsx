import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell, CartesianGrid, LabelList
} from "recharts";

const COLORS = [
  "#E85D75", "#F0899B", "#FFB26B", "#E0C3FC", "#c9a0f0",
  "#f7a4b3", "#ffd1a6", "#d4a8f2", "#ff8fa3", "#ffcba4"
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const total = payload[0]?.payload?.total;
  const pct = total ? ((payload[0].value / total) * 100).toFixed(1) : null;
  return (
    <div className="custom-tooltip">
      <div className="label">{label}</div>
      <div className="value">₹ {payload[0].value?.toLocaleString("en-IN")}</div>
      {pct && <div style={{ fontSize: '0.68rem', color: '#9CA3AF', marginTop: 2 }}>{pct}% of total revenue</div>}
    </div>
  );
};

function CountryRevenueChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios.get("http://localhost:8000/country-revenue").then(res => {
        const entries = Object.entries(res.data)
          .map(([key, value]) => ({ country: key, revenue: value }))
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 10); // Top 10 countries
        const total = entries.reduce((s, e) => s + e.revenue, 0);
        setData(entries.map(e => ({ ...e, total })));
      });
    };
    fetchData();
    window.addEventListener("data-refresh", fetchData);
    return () => window.removeEventListener("data-refresh", fetchData);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={380}>
      <BarChart data={data} layout="vertical" margin={{ top: 8, right: 60, left: 10, bottom: 8 }}>
        <defs>
          {COLORS.map((color, i) => (
            <linearGradient key={i} id={`countryGrad${i}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={color} stopOpacity={0.75} />
              <stop offset="100%" stopColor={color} stopOpacity={1} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" horizontal={false} />
        <XAxis
          type="number"
          tick={{ fill: '#6B7280', fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={v => v >= 1000000 ? `₹${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `₹${(v / 1000).toFixed(0)}k` : `₹${v}`}
        />
        <YAxis
          type="category"
          dataKey="country"
          tick={{ fill: '#374151', fontSize: 11, fontWeight: 600 }}
          axisLine={false}
          tickLine={false}
          width={90}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(232,93,117,0.04)' }} />
        <Bar dataKey="revenue" radius={[0, 8, 8, 0]} maxBarSize={24} animationDuration={1200} animationEasing="ease-out">
          {data.map((_, i) => (
            <Cell key={i} fill={`url(#countryGrad${i % COLORS.length})`} />
          ))}
          <LabelList
            dataKey="revenue"
            position="right"
            style={{ fill: '#6B7280', fontSize: 10, fontWeight: 600 }}
            formatter={v => v >= 1000000 ? `₹${(v / 1000000).toFixed(1)}M` : `₹${(v / 1000).toFixed(0)}k`}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default CountryRevenueChart;
