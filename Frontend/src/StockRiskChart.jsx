import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, LabelList
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="label">{payload[0]?.payload?.fullName || label}</div>
      <div className="value" style={{ color: '#E85D75' }}>
        ⚠ {payload[0].value?.toLocaleString("en-IN")} units
      </div>
      <div style={{ fontSize: '0.68rem', color: '#9CA3AF', marginTop: 2 }}>High demand — stock-out risk</div>
    </div>
  );
};

// Custom bar shape with subtle shadow
const RoundedBar = (props) => {
  const { x, y, width, height, fill, index } = props;
  if (!height || height <= 0) return null;
  const radius = Math.min(10, width / 2);
  const opacity = 1 - (index * 0.06);
  return (
    <g>
      {/* Glow shadow behind bar */}
      <rect x={x + 2} y={y + 4} width={width - 4} height={height} rx={radius}
        fill={fill} opacity={0.15} filter="url(#barShadow)" />
      {/* Main bar */}
      <rect x={x} y={y} width={width} height={height} rx={radius}
        fill={`url(#stockGrad)`} opacity={opacity} />
    </g>
  );
};

function StockRiskChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/stock-risk")
      .then(res => {
        const formatted = Object.entries(res.data).map(([key, value]) => ({
          product: key.length > 12 ? key.substring(0, 12) + '…' : key,
          fullName: key,
          sales: value
        }));
        setData(formatted);
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner" style={{ borderColor: 'rgba(232,93,117,0.2)', borderTopColor: '#E85D75', width: 28, height: 28 }} />
      </div>
    );
  }

  if (!data.length) {
    return (
      <div style={{ height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF', fontSize: '0.88rem' }}>
        No stock risk data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={360}>
      <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }} barCategoryGap="18%">
        <defs>
          <linearGradient id="stockGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E85D75" stopOpacity={1} />
            <stop offset="50%" stopColor="#e86e84" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#f0899b" stopOpacity={0.7} />
          </linearGradient>
          <filter id="barShadow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" vertical={false} />
        <XAxis
          dataKey="product"
          tick={{ fill: '#6B7280', fontSize: 10, fontWeight: 500 }}
          axisLine={{ stroke: '#E5E7EB' }}
          tickLine={false}
          angle={-30}
          textAnchor="end"
          height={55}
        />
        <YAxis
          tick={{ fill: '#6B7280', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={v => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(232,93,117,0.04)', radius: 4 }} />
        <Bar
          dataKey="sales"
          shape={<RoundedBar />}
          maxBarSize={42}
          animationDuration={1500}
          animationEasing="ease-out"
          isAnimationActive={true}
        >
          <LabelList dataKey="sales" position="top" style={{ fill: '#E85D75', fontSize: 10, fontWeight: 700 }} formatter={v => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default StockRiskChart;
