import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#10b981", "#E85D75"];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const total = payload[0]?.payload?.total;
  const pct = total ? ((payload[0].value / total) * 100).toFixed(1) : null;
  return (
    <div className="custom-tooltip">
      <div className="label">{payload[0].name}</div>
      <div className="value">{payload[0].value?.toLocaleString("en-IN")} shipments</div>
      {pct && <div style={{ fontSize: '0.68rem', color: '#9CA3AF', marginTop: 2 }}>{pct}% of total</div>}
    </div>
  );
};

const renderOuterLabel = ({ cx, cy, midAngle, outerRadius, name, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 28;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#374151" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central"
      fontSize={12} fontWeight={600}>
      {name} · {(percent * 100).toFixed(0)}%
    </text>
  );
};

function DeliveryChart() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [onTimePct, setOnTimePct] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:8000/delivery-performance").then(res => {
      const entries = Object.entries(res.data).map(([key, value]) => ({
        name: key, value: value
      }));
      const t = entries.reduce((s, e) => s + e.value, 0);
      setTotal(t);
      const onTime = entries.find(e => e.name === "On Time");
      if (onTime && t > 0) setOnTimePct(((onTime.value / t) * 100).toFixed(1));
      setData(entries.map(e => ({ ...e, total: t })));
    });
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: 380 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            {COLORS.map((color, i) => (
              <linearGradient key={i} id={`delGrad${i}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={1} />
                <stop offset="100%" stopColor={color} stopOpacity={0.75} />
              </linearGradient>
            ))}
          </defs>
          <Pie
            data={data} dataKey="value" nameKey="name" cx="50%" cy="50%"
            innerRadius={75} outerRadius={120} paddingAngle={5}
            labelLine={{ stroke: '#D1D5DB', strokeWidth: 1 }}
            label={renderOuterLabel}
            strokeWidth={2} stroke="#fff"
            animationDuration={1400} animationEasing="ease-out"
            cornerRadius={4}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={`url(#delGrad${index % COLORS.length})`}
                style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.1))' }} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      {/* Center statistic */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center', pointerEvents: 'none'
      }}>
        <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          {onTimePct}%
        </div>
        <div style={{ fontSize: '0.65rem', fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 4 }}>
          On Time Rate
        </div>
      </div>
      {/* Bottom legend */}
      <div style={{
        position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 28
      }}>
        {data.map((entry, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              width: 10, height: 10, borderRadius: '50%', background: COLORS[i],
              boxShadow: `0 2px 8px ${COLORS[i]}50`, display: 'inline-block'
            }} />
            <span style={{ fontSize: '0.78rem', color: '#6B7280', fontWeight: 500 }}>
              {entry.name} ({entry.value?.toLocaleString("en-IN")})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeliveryChart;
