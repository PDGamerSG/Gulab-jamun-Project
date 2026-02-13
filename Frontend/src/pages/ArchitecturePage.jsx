import { useState, useEffect, useRef } from "react";

const IconDatabase = ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>
);
const IconZap = ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
);
const IconRefresh = ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>
);
const IconLayers = ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
);
const IconSave = ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
);
const IconBarChart = ({ size = 22 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
);
const IconArrowDown = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></svg>
);

const PIPELINE_STAGES = [
    {
        id: "sources", title: "Data Sources", icon: <IconDatabase />, color: "#E85D75", gradEnd: "#f7a4b3",
        items: [
            { name: "POS Systems", desc: "50+ store terminals", type: "Batch" },
            { name: "E-commerce Platform", desc: "Real-time order events", type: "Stream" },
            { name: "Warehouse DB", desc: "Inventory snapshots", type: "Batch" },
            { name: "Clickstream Logs", desc: "User behavior events", type: "Stream" },
        ],
        detail: "Multi-source data across POS terminals, e-commerce platform, warehouse management systems, and web clickstream logs. Each source has different update frequencies and formats."
    },
    {
        id: "ingestion", title: "Data Ingestion", icon: <IconZap />, color: "#FFB26B", gradEnd: "#ffd8b8",
        items: [
            { name: "Batch Pipeline", desc: "Daily CSV/Parquet loads", type: "Python" },
            { name: "Stream Pipeline", desc: "Near real-time events", type: "FastAPI" },
            { name: "Schema Evolution", desc: "Auto-detect new columns", type: "Pandas" },
            { name: "Retry Logic", desc: "3x retry with backoff", type: "Resilient" },
        ],
        detail: "Hybrid ingestion supporting both daily batch loads (CSV → Parquet) and near real-time streaming via FastAPI endpoints. Includes fault tolerance with retry logic and automated schema evolution handling."
    },
    {
        id: "transform", title: "Transformation", icon: <IconRefresh />, color: "#c9a0f0", gradEnd: "#E0C3FC",
        items: [
            { name: "Null Handling", desc: "Drop/impute null values", type: "Quality" },
            { name: "Deduplication", desc: "Remove duplicate records", type: "Quality" },
            { name: "Logic Validation", desc: "No negative prices/qty", type: "Quality" },
            { name: "SCD Type 2", desc: "Track attribute history", type: "Historical" },
        ],
        detail: "Data cleansing pipeline implements null value handling, duplicate removal, and business logic validation. Slowly Changing Dimensions (SCD Type 2) track customer and product attribute changes over time."
    },
    {
        id: "modeling", title: "Data Modeling", icon: <IconLayers />, color: "#10b981", gradEnd: "#6ee7b7",
        items: [
            { name: "fact_sales", desc: "Order transactions", type: "Fact" },
            { name: "fact_shipment", desc: "Delivery records", type: "Fact" },
            { name: "dim_customer", desc: "Customer attributes", type: "Dimension" },
            { name: "dim_product", desc: "Product catalog", type: "Dimension" },
        ],
        detail: "Star schema with Fact tables (Sales, Shipments) and Dimension tables (Customer, Product, Date, Warehouse). Optimized for analytical queries with denormalized dimensions and surrogate keys."
    },
    {
        id: "storage", title: "Storage Layer", icon: <IconSave />, color: "#38bdf8", gradEnd: "#7dd3fc",
        items: [
            { name: "Parquet Format", desc: "Columnar compression", type: "Storage" },
            { name: "Date Partitioning", desc: "By month/region", type: "Partition" },
            { name: "RBAC", desc: "Role-based access", type: "Security" },
            { name: "Data Masking", desc: "PII protection", type: "Security" },
        ],
        detail: "Apache Parquet columnar storage for optimal analytical query performance. 60-80% compression vs CSV. Partitioned by date and region for scan reduction."
    },
    {
        id: "analytics", title: "Analytics & ML", icon: <IconBarChart />, color: "#8b5cf6", gradEnd: "#a78bfa",
        items: [
            { name: "KPI Engine", desc: "Revenue, CLV, Turnover", type: "Metrics" },
            { name: "Dashboards", desc: "Interactive Recharts UI", type: "Visual" },
            { name: "Quality Reports", desc: "Data validation scores", type: "Quality" },
            { name: "ML-Ready", desc: "Feature store pipeline", type: "Future" },
        ],
        detail: "Business KPIs computed via FastAPI endpoints: Daily/Monthly Revenue, Customer Lifetime Value, Inventory Turnover Ratio. Interactive React dashboard with real-time simulation capabilities."
    },
];

const SUMMARY_STATS = [
    { value: "4", label: "Data Sources", color: "#E85D75" },
    { value: "2", label: "Ingestion Modes", color: "#FFB26B" },
    { value: "6", label: "Quality Checks", color: "#c9a0f0" },
    { value: "6", label: "Analytical Tables", color: "#10b981" },
    { value: "10+", label: "API Endpoints", color: "#38bdf8" },
    { value: "11", label: "Visualizations", color: "#8b5cf6" },
];

// Animated data flow dots in the connector
function FlowConnector({ color, nextColor }) {
    return (
        <div className="arch-connector">
            <div className="arch-connector-track">
                <div className="arch-connector-line" style={{
                    background: `linear-gradient(180deg, ${color}, ${nextColor})`
                }} />
                <div className="arch-flow-dot" style={{
                    background: color,
                    boxShadow: `0 0 8px ${color}80`
                }} />
                <div className="arch-flow-dot arch-flow-dot-2" style={{
                    background: nextColor,
                    boxShadow: `0 0 8px ${nextColor}80`
                }} />
            </div>
            <div className="arch-connector-arrow" style={{ color: nextColor }}>
                <IconArrowDown />
            </div>
        </div>
    );
}

// Animated counter for summary
function AnimatedStat({ value, delay }) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), delay);
        return () => clearTimeout(t);
    }, [delay]);
    return (
        <span className={`arch-stat-value ${visible ? 'arch-stat-visible' : ''}`}>
            {value}
        </span>
    );
}

function ArchitecturePage() {
    const [expandedStage, setExpandedStage] = useState(null);
    const [hoveredStage, setHoveredStage] = useState(null);
    const [visibleStages, setVisibleStages] = useState(new Set());
    const stageRefs = useRef([]);

    // Intersection observer for scroll-triggered animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const idx = entry.target.dataset.index;
                        setVisibleStages(prev => new Set([...prev, idx]));
                    }
                });
            },
            { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
        );
        stageRefs.current.forEach(ref => ref && observer.observe(ref));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Architecture Diagram</h1>
                    <p className="page-subtitle">End-to-end data lifecycle — from raw sources to analytics</p>
                </div>
                <div className="arch-header-badge">
                    <span className="arch-pulse-ring" />
                    <span>Data Pipeline Active</span>
                </div>
            </div>

            {/* Pipeline Flow */}
            <div className="arch-pipeline">
                {PIPELINE_STAGES.map((stage, index) => (
                    <div key={stage.id}>
                        {/* Animated connector between stages */}
                        {index > 0 && (
                            <FlowConnector
                                color={PIPELINE_STAGES[index - 1].color}
                                nextColor={stage.color}
                            />
                        )}

                        {/* Stage card */}
                        <div
                            ref={el => stageRefs.current[index] = el}
                            data-index={index}
                            className={`arch-stage ${visibleStages.has(String(index)) ? 'arch-stage-visible' : ''} ${expandedStage === stage.id ? 'arch-stage-expanded' : ''} ${hoveredStage === stage.id ? 'arch-stage-hovered' : ''}`}
                            style={{
                                '--stage-color': stage.color,
                                '--stage-grad-end': stage.gradEnd,
                                transitionDelay: `${index * 0.08}s`
                            }}
                            onClick={() => setExpandedStage(expandedStage === stage.id ? null : stage.id)}
                            onMouseEnter={() => setHoveredStage(stage.id)}
                            onMouseLeave={() => setHoveredStage(null)}
                        >
                            {/* Animated gradient border top */}
                            <div className="arch-stage-accent" />

                            {/* Background orb */}
                            <div className="arch-stage-orb" style={{
                                background: `radial-gradient(circle, ${stage.color}15 0%, transparent 70%)`
                            }} />

                            {/* Header */}
                            <div className="arch-stage-header">
                                <div className="arch-stage-icon" style={{
                                    background: `linear-gradient(135deg, ${stage.color}20, ${stage.gradEnd}20)`,
                                    color: stage.color,
                                    boxShadow: `0 4px 14px ${stage.color}20`
                                }}>
                                    {stage.icon}
                                    {/* Spinning ring on hover */}
                                    <div className="arch-icon-ring" style={{ borderColor: `${stage.color}30` }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 className="arch-stage-title">{stage.title}</h3>
                                    <div className="arch-stage-step">
                                        <span className="arch-step-num" style={{ background: stage.color }}>{index + 1}</span>
                                        Step {index + 1} of {PIPELINE_STAGES.length}
                                    </div>
                                </div>
                                <div className="arch-expand-btn" style={{
                                    background: expandedStage === stage.id ? stage.color : `${stage.color}10`,
                                    color: expandedStage === stage.id ? '#fff' : stage.color
                                }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                                        style={{ transform: expandedStage === stage.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </div>
                            </div>

                            {/* Item cards */}
                            <div className="arch-items-grid">
                                {stage.items.map((item, i) => (
                                    <div key={i} className="arch-item" style={{ animationDelay: `${i * 0.05}s` }}>
                                        <div className="arch-item-dot" style={{ background: stage.color }} />
                                        <div style={{ flex: 1 }}>
                                            <div className="arch-item-name">{item.name}</div>
                                            <div className="arch-item-desc">{item.desc}</div>
                                        </div>
                                        <span className="arch-item-badge" style={{
                                            background: `${stage.color}10`,
                                            color: stage.color,
                                            borderColor: `${stage.color}25`
                                        }}>
                                            {item.type}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Expanded detail */}
                            <div className={`arch-detail ${expandedStage === stage.id ? 'arch-detail-open' : ''}`}>
                                <div className="arch-detail-inner">
                                    <div className="arch-detail-divider" style={{
                                        background: `linear-gradient(90deg, transparent, ${stage.color}30, transparent)`
                                    }} />
                                    <p>{stage.detail}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary Section */}
            <div className="arch-summary">
                <div className="arch-summary-header">
                    <div className="arch-summary-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
                        </svg>
                    </div>
                    <h3>ETL Pipeline Summary</h3>
                </div>
                <div className="arch-summary-grid">
                    {SUMMARY_STATS.map((stat, i) => (
                        <div key={i} className="arch-summary-stat" style={{ '--stat-color': stat.color }}>
                            <AnimatedStat value={stat.value} delay={600 + i * 120} />
                            <div className="arch-stat-label">{stat.label}</div>
                            <div className="arch-stat-bar">
                                <div className="arch-stat-bar-fill" style={{
                                    background: `linear-gradient(90deg, ${stat.color}, ${stat.color}80)`,
                                    animationDelay: `${800 + i * 120}ms`
                                }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ArchitecturePage;
