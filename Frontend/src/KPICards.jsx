import { useEffect, useState } from "react";
import axios from "axios";

const CARDS = [
  {
    key: "total_revenue", label: "Total Revenue",
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>),
    prefix: "₹ ", format: v => v?.toLocaleString("en-IN", { maximumFractionDigits: 0 }), color: "#E85D75", bg: "rgba(232,93,117,0.08)"
  },
  {
    key: "total_orders", label: "Total Orders",
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>),
    prefix: "", format: v => v?.toLocaleString("en-IN"), color: "#FFB26B", bg: "rgba(255,178,107,0.1)"
  },
  {
    key: "total_customers", label: "Active Customers",
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>),
    prefix: "", format: v => v?.toLocaleString("en-IN"), color: "#E0C3FC", bg: "rgba(224,195,252,0.15)"
  },
  {
    key: "delivery_success_rate", label: "Delivery Success",
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>),
    prefix: "", format: v => v + "%", color: "#10b981", bg: "rgba(16,185,129,0.08)"
  },
];

function KPICards() {
  const [kpi, setKpi] = useState(null);

  useEffect(() => {
    const fetchKpi = () => axios.get("http://localhost:8000/kpi-summary").then(res => setKpi(res.data));
    fetchKpi();
    window.addEventListener("data-refresh", fetchKpi);
    return () => window.removeEventListener("data-refresh", fetchKpi);
  }, []);

  if (!kpi) {
    return (
      <div className="kpi-grid stagger">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className="skeleton animate-in" style={{ height: 120, borderRadius: "var(--radius-lg)" }} />
        ))}
      </div>
    );
  }

  return (
    <div className="kpi-grid stagger">
      {CARDS.map((card) => (
        <div key={card.key} className="card animate-in" style={{ padding: "24px", position: "relative", overflow: "hidden" }}>
          { }
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: card.color }} />

          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                {card.label}
              </div>
              <div style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text-primary)" }}>
                {card.prefix}{card.format(kpi[card.key])}
              </div>
            </div>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: "var(--radius-md)",
              background: card.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: card.color,
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
