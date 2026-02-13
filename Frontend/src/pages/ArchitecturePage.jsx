import { useState, useRef } from "react";
import "../Architecture.css";

// --- Icons ---
const IconDatabase = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>
);
const IconZap = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
);
const IconList = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
);
const IconLayers = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
);
const IconBarChart = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
);

const PIPELINE_STAGES = [
    {
        id: "sources", title: "Data Sources", icon: <IconDatabase />, color: "#E85D75", gradEnd: "#f7a4b3",
        items: [
            { name: "POS Systems", desc: "50+ store terminals", type: "Batch" },
            { name: "E-commerce", desc: "Real-time orders", type: "Stream" },
        ],
        detail: "Ingests data from dispersed POS terminals and high-velocity e-commerce events."
    },
    {
        id: "ingestion", title: "Ingestion Layer", icon: <IconZap />, color: "#FFB26B", gradEnd: "#ffd8b8",
        items: [
            { name: "Batch Pipeline", desc: "Daily loads", type: "Python" },
            { name: "Stream Pipeline", desc: "FastAPI events", type: "API" },
        ],
        detail: "Hybrid ingestion layer with automated schema detection and retry mechanisms."
    },
    {
        id: "modeling", title: "Warehouse", icon: <IconLayers />, color: "#10b981", gradEnd: "#6ee7b7",
        items: [
            { name: "Star Schema", desc: "Fact/Dim model", type: "DW" },
            { name: "SCD Type 2", desc: "History tracking", type: "Logic" },
        ],
        detail: "Star schema architecture optimized for high-performance analytical queries."
    },
    {
        id: "analytics", title: "Analytics Engine", icon: <IconBarChart />, color: "#8b5cf6", gradEnd: "#a78bfa",
        items: [
            { name: "KPI Engine", desc: "Revenue/CLV", type: "Calc" },
            { name: "Dashboard", desc: "React UI", type: "View" },
        ],
        detail: "Real-time dashboard computing complex business metrics and visualizations."
    },
];

function ArchitecturePage() {
    const [hoveredNode, setHoveredNode] = useState(null);

    // Dynamic class for highlighting connections
    const getConnClass = (targetNode) => {
        if (!hoveredNode) return "connection-path";
        // If hovering Fact, highlight all. If hovering Dim, highlight specific.
        if (hoveredNode === 'fact') return "connection-path highlighted";
        if (hoveredNode === targetNode) return "connection-path highlighted";
        return "connection-path";
    };

    return (
        <div className="page-container arch-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">System Architecture</h1>
                    <p className="page-subtitle">End-to-end data lifecycle: Source → Ingestion → Warehouse → Analytics</p>
                </div>
                <div className="arch-header-badge">
                    <span className="arch-pulse-ring" />
                    <span>System Active</span>
                </div>
            </div>

            {/* --- STAR SCHEMA VISUALIZATION --- */}
            <section className="schema-section animate-in">
                <div className="schema-bg-grid" />
                <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div className="icon" style={{
                        width: 32, height: 32, borderRadius: 8, background: "rgba(16,185,129,0.1)", color: "#10b981",
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <IconLayers />
                    </div>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#334155' }}>Core Data Model (Star Schema)</h2>
                </div>

                <div className="schema-visual-container">
                    {/* SVG Connector Lines - Paths drawn to connect centers */}
                    <svg className="schema-connections" width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="none">
                        {/* Center is approx 500, 300 */}
                        {/* Top Left (Cust) -> Center */}
                        <path d="M 250,120 Q 500,120 500,220" className={getConnClass('customer')} />

                        {/* Top Right (Prod) -> Center */}
                        <path d="M 750,120 Q 500,120 500,220" className={getConnClass('product')} />

                        {/* Bottom Left (Date) -> Center */}
                        <path d="M 250,480 Q 500,480 500,380" className={getConnClass('date')} />

                        {/* Bottom Right (Store) -> Center */}
                        <path d="M 750,480 Q 500,480 500,380" className={getConnClass('store')} />
                    </svg>

                    {/* Central Fact Table (Active Area) */}
                    <div
                        className="schema-node node-fact pos-center"
                        onMouseEnter={() => setHoveredNode('fact')}
                        onMouseLeave={() => setHoveredNode(null)}
                    >
                        <div className="node-header">
                            <IconDatabase size={14} /> FACT_SALES
                        </div>
                        <div className="node-columns">
                            <Column name="order_id" isPk />
                            <Column name="customer_id" isFk />
                            <Column name="product_id" isFk />
                            <Column name="date_id" isFk />
                            <Column name="store_id" isFk />
                            <Column name="quantity" />
                            <Column name="total_amount" />
                        </div>
                    </div>

                    {/* Dimension Tables */}
                    <div
                        className="schema-node node-dim pos-top-left"
                        onMouseEnter={() => setHoveredNode('customer')}
                        onMouseLeave={() => setHoveredNode(null)}
                    >
                        <div className="node-header">DIM_CUSTOMER</div>
                        <div className="node-columns">
                            <Column name="customer_id" isPk />
                            <Column name="full_name" />
                            <Column name="email" />
                            <Column name="segment" />
                            <Column name="region" />
                        </div>
                    </div>

                    <div
                        className="schema-node node-dim pos-top-right"
                        onMouseEnter={() => setHoveredNode('product')}
                        onMouseLeave={() => setHoveredNode(null)}
                    >
                        <div className="node-header">DIM_PRODUCT</div>
                        <div className="node-columns">
                            <Column name="product_id" isPk />
                            <Column name="sku_code" />
                            <Column name="category" />
                            <Column name="unit_price" />
                            <Column name="supplier" />
                        </div>
                    </div>

                    <div
                        className="schema-node node-dim pos-bottom-left"
                        onMouseEnter={() => setHoveredNode('date')}
                        onMouseLeave={() => setHoveredNode(null)}
                    >
                        <div className="node-header">DIM_DATE</div>
                        <div className="node-columns">
                            <Column name="date_id" isPk />
                            <Column name="full_date" />
                            <Column name="month_name" />
                            <Column name="quarter" />
                            <Column name="is_holiday" />
                        </div>
                    </div>

                    <div
                        className="schema-node node-dim pos-bottom-right"
                        onMouseEnter={() => setHoveredNode('store')}
                        onMouseLeave={() => setHoveredNode(null)}
                    >
                        <div className="node-header">DIM_STORE</div>
                        <div className="node-columns">
                            <Column name="store_id" isPk />
                            <Column name="store_name" />
                            <Column name="city" />
                            <Column name="manager" />
                            <Column name="size_sqft" />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- PIPELINE STAGES --- */}
            <div className="arch-pipeline animate-in stagger-1">
                {PIPELINE_STAGES.map((stage, index) => (
                    <div key={stage.id} className="arch-stage-card-simple" style={{ transitionDelay: `${index * 50}ms`, color: stage.color }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                            <div style={{
                                width: 40, height: 40, borderRadius: 10,
                                background: `linear-gradient(135deg, ${stage.color}15, ${stage.gradEnd}25)`,
                                color: stage.color,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: `0 4px 10px ${stage.color}15`
                            }}>
                                {stage.icon}
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b' }}>{stage.title}</h3>
                                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: stage.color, textTransform: 'uppercase' }}>
                                    Step {index + 1}
                                </div>
                            </div>
                        </div>

                        <div className="arch-items-grid">
                            {stage.items.map((item, i) => (
                                <div key={i} className="arch-item">
                                    <div className="arch-item-dot" style={{ background: stage.color }} />
                                    <div style={{ flex: 1, fontSize: '0.85rem' }}>
                                        <span style={{ fontWeight: 600, color: '#334155' }}>{item.name}</span>
                                        <span style={{ margin: '0 6px', color: '#cbd5e1' }}>|</span>
                                        <span style={{ color: '#64748b' }}>{item.type}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="arch-detail-text">{stage.detail}</p>
                    </div>
                ))}
            </div>

            {/* --- TECH STACK --- */}
            <section className="animate-in stagger-2" style={{ marginTop: "40px", textAlign: 'center' }}>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    padding: '8px 20px', background: 'white', borderRadius: 99,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: 24,
                    border: '1px solid #e2e8f0'
                }}>
                    <span style={{ color: "#38bdf8" }}><IconZap size={16} /></span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#334155' }}>Powered By Modern Tech Stack</span>
                </div>

                <div className="tech-stack-row">
                    {["Python 3.11", "FastAPI", "Pandas", "React 18", "Recharts", "Vite", "Apache Parquet"].map((tech) => (
                        <span key={tech} className="arch-tech-badge">{tech}</span>
                    ))}
                </div>
            </section>
        </div>
    );
}

// Helper for Column Row
const Column = ({ name, isPk, isFk }) => (
    <div className={`node-col ${isPk ? 'pk' : ''}`}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {isPk && <span className="key-badge key-pk">PK</span>}
            {isFk && <span className="key-badge key-fk">FK</span>}
            {name}
        </span>
        <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
            {isPk ? 'int' : isFk ? 'int' : 'var'}
        </span>
    </div>
);

export default ArchitecturePage;
