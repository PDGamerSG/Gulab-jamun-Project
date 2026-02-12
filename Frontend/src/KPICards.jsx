import { useEffect, useState } from "react";
import axios from "axios";

const CARDS = [
  { key: "total_revenue", label: "Total Revenue", icon: "💰", prefix: "₹ ", format: v => v?.toLocaleString("en-IN", { maximumFractionDigits: 0 }), color: "#E85D75", bg: "rgba(232,93,117,0.08)" },
  { key: "total_orders", label: "Total Orders", icon: "📦", prefix: "", format: v => v?.toLocaleString("en-IN"), color: "#FFB26B", bg: "rgba(255,178,107,0.1)" },
  { key: "total_customers", label: "Active Customers", icon: "👥", prefix: "", format: v => v?.toLocaleString("en-IN"), color: "#E0C3FC", bg: "rgba(224,195,252,0.15)" },
  { key: "delivery_success_rate", label: "Delivery Success", icon: "🚚", prefix: "", format: v => v + "%", color: "#10b981", bg: "rgba(16,185,129,0.08)" },
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
          {}
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
              fontSize: "1.2rem",
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
