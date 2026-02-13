import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";

// Animated count-up hook
function useCountUp(target, duration = 1800, enabled = true) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (!enabled || target == null) return;
    setValue(0);
    startRef.current = null;

    const easeOutExpo = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

    const animate = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      setValue(easedProgress * target);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration, enabled]);

  return value;
}

function AnimatedValue({ value, format, prefix = "", delay = 0 }) {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const animated = useCountUp(value, 1800, started);

  return (
    <span style={{ display: 'inline-block', minWidth: 0 }}>
      {prefix}{format(Math.round(animated * 100) / 100)}
    </span>
  );
}

const CARDS = [
  {
    key: "total_revenue", label: "Total Revenue",
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>),
    prefix: "₹ ", format: v => v?.toLocaleString("en-IN", { maximumFractionDigits: 0 }), color: "#E85D75", bg: "linear-gradient(135deg, rgba(232,93,117,0.12), rgba(232,93,117,0.04))", borderColor: "#E85D75"
  },
  {
    key: "total_orders", label: "Total Orders",
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>),
    prefix: "", format: v => v?.toLocaleString("en-IN"), color: "#FFB26B", bg: "linear-gradient(135deg, rgba(255,178,107,0.15), rgba(255,178,107,0.04))", borderColor: "#FFB26B"
  },
  {
    key: "total_customers", label: "Active Customers",
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>),
    prefix: "", format: v => v?.toLocaleString("en-IN"), color: "#c9a0f0", bg: "linear-gradient(135deg, rgba(224,195,252,0.2), rgba(224,195,252,0.05))", borderColor: "#c9a0f0"
  },
  {
    key: "delivery_success_rate", label: "Delivery Success",
    icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>),
    prefix: "", format: v => v + "%", color: "#10b981", bg: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.03))", borderColor: "#10b981"
  },
];

function KPICards() {
  const [kpi, setKpi] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchKpi = () => {
      axios.get("http://localhost:8000/kpi-summary").then(res => {
        setKpi(res.data);
        setRefreshKey(k => k + 1);
      });
    };
    fetchKpi();
    window.addEventListener("data-refresh", fetchKpi);
    return () => window.removeEventListener("data-refresh", fetchKpi);
  }, []);

  if (!kpi) {
    return (
      <div className="kpi-grid stagger">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className="skeleton animate-in" style={{ height: 130, borderRadius: "var(--radius-lg)" }} />
        ))}
      </div>
    );
  }

  return (
    <div className="kpi-grid stagger" key={refreshKey}>
      {CARDS.map((card, idx) => (
        <div key={card.key} className="card kpi-card animate-in" style={{
          padding: "28px 24px",
          position: "relative",
          overflow: "hidden",
          borderLeft: `3px solid ${card.borderColor}`,
        }}>
          {/* Top accent gradient */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 3,
            background: `linear-gradient(90deg, ${card.color}, transparent)`
          }} />

          {/* Background glow */}
          <div style={{
            position: "absolute", top: -20, right: -20, width: 100, height: 100,
            borderRadius: "50%", background: card.bg, filter: "blur(24px)", opacity: 0.6
          }} />

          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", position: "relative" }}>
            <div>
              <div style={{
                fontSize: "0.7rem", fontWeight: 700, color: "var(--text-muted)",
                textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10
              }}>
                {card.label}
              </div>
              <div style={{
                fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em",
                color: "var(--text-primary)", lineHeight: 1.1,
                fontVariantNumeric: "tabular-nums"
              }}>
                <AnimatedValue
                  value={kpi[card.key]}
                  format={card.format}
                  prefix={card.prefix}
                  delay={idx * 150}
                />
              </div>
            </div>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: "var(--radius-md)",
              background: card.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: card.color,
              boxShadow: `0 4px 12px ${card.color}20`,
            }}>
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default KPICards;
