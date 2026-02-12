import { useState } from "react";

const PIPELINE_STAGES = [
    {
        id: "sources",
        title: "Data Sources",
        icon: "🗄️",
        color: "#E85D75",
        items: [
            { name: "POS Systems", desc: "50+ store terminals", type: "Batch" },
            { name: "E-commerce Platform", desc: "Real-time order events", type: "Stream" },
            { name: "Warehouse DB", desc: "Inventory snapshots", type: "Batch" },
            { name: "Clickstream Logs", desc: "User behavior events", type: "Stream" },
        ],
        detail: "Multi-source data across POS terminals, e-commerce platform, warehouse management systems, and web clickstream logs. Each source has different update frequencies and formats."
    },
    {
        id: "ingestion",
        title: "Data Ingestion",
        icon: "⚡",
        color: "#FFB26B",
        items: [
            { name: "Batch Pipeline", desc: "Daily CSV/Parquet loads", type: "Python" },
            { name: "Stream Pipeline", desc: "Near real-time events", type: "FastAPI" },
            { name: "Schema Evolution", desc: "Auto-detect new columns", type: "Pandas" },
            { name: "Retry Logic", desc: "3x retry with backoff", type: "Resilient" },
        ],
        detail: "Hybrid ingestion supporting both daily batch loads (CSV → Parquet) and near real-time streaming via FastAPI endpoints. Includes fault tolerance with retry logic, dead-letter queuing, and automated schema evolution handling."
    },
    {
        id: "transform",
        title: "Transformation",
        icon: "🔄",
        color: "#E0C3FC",
        items: [
            { name: "Null Handling", desc: "Drop/impute null values", type: "Quality" },
            { name: "Deduplication", desc: "Remove duplicate records", type: "Quality" },
            { name: "Logic Validation", desc: "No negative prices/qty", type: "Quality" },
            { name: "SCD Type 2", desc: "Track attribute history", type: "Historical" },
        ],
        detail: "Data cleansing pipeline implements null value handling, duplicate removal, and business logic validation (negative prices, zero quantities). Slowly Changing Dimensions (SCD Type 2) track customer and product attribute changes over time."
    },
    {
        id: "modeling",
        title: "Data Modeling",
        icon: "🏗️",
        color: "#10b981",
        items: [
            { name: "fact_sales", desc: "Order transactions", type: "Fact" },
            { name: "fact_shipment", desc: "Delivery records", type: "Fact" },
            { name: "dim_customer", desc: "Customer attributes", type: "Dimension" },
            { name: "dim_product", desc: "Product catalog", type: "Dimension" },
        ],
        detail: "Star schema with Fact tables (Sales, Shipments) and Dimension tables (Customer, Product, Date, Warehouse). Optimized for analytical queries with denormalized dimensions and surrogate keys."
    },
    {
        id: "storage",
        title: "Storage",
        icon: "💾",
        color: "#38bdf8",
        items: [
            { name: "Parquet Format", desc: "Columnar compression", type: "Storage" },
            { name: "Date Partitioning", desc: "By month/region", type: "Partition" },
            { name: "RBAC", desc: "Role-based access", type: "Security" },
            { name: "Data Masking", desc: "PII protection", type: "Security" },
        ],
        detail: "Apache Parquet columnar storage for optimal analytical query performance. 60-80% compression vs CSV. Partitioned by date and region for scan reduction. Role-based access control with data masking for PII fields."
    },
    {
        id: "analytics",
        title: "Analytics & ML",
        icon: "📊",
        color: "#8b5cf6",
        items: [
            { name: "KPI Engine", desc: "Revenue, CLV, Turnover", type: "Metrics" },
            { name: "Dashboards", desc: "Interactive Recharts UI", type: "Visual" },
            { name: "Quality Reports", desc: "Data validation scores", type: "Quality" },
            { name: "ML-Ready", desc: "Feature store pipeline", type: "Future" },
        ],
        detail: "Business KPIs computed via FastAPI endpoints: Daily/Monthly Revenue, Customer Lifetime Value, Inventory Turnover Ratio, Purchase Frequency Analysis. Interactive React dashboard with real-time simulation capabilities."
    },
];

function ArchitecturePage() {
    const [expandedStage, setExpandedStage] = useState(null);

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Architecture Diagram</h1>
                    <p className="page-subtitle">End-to-end data lifecycle — from raw sources to analytics</p>
                </div>
            </div>

            {}
            <div className="pipeline-flow">
                {PIPELINE_STAGES.map((stage, index) => (
                    <div key={stage.id} className="pipeline-stage-wrapper animate-in" style={{ animationDelay: `${index * 0.1}s` }}>
                        {}
                        {index > 0 && (
                            <div className="pipeline-connector">
                                <div className="connector-line" />
                                <div className="connector-arrow" />
                            </div>
                        )}

                        {}
                        <div
                            className={`pipeline-stage card ${expandedStage === stage.id ? "expanded" : ""}`}
                            onClick={() => setExpandedStage(expandedStage === stage.id ? null : stage.id)}
                            style={{ "--stage-color": stage.color }}
                        >
                            <div className="stage-accent" style={{ background: stage.color }} />
                            <div className="stage-header">
                                <div className="stage-icon" style={{ background: `${stage.color}15` }}>
                                    {stage.icon}
                                </div>
                                <div>
                                    <h3 className="stage-title">{stage.title}</h3>
                                    <span className="stage-step">Step {index + 1} of {PIPELINE_STAGES.length}</span>
                                </div>
                                <span className="stage-expand">{expandedStage === stage.id ? "−" : "+"}</span>
                            </div>

                            {}
                            <div className="stage-items">
                                {stage.items.map((item, i) => (
                                    <div key={i} className="stage-item">
                                        <div className="item-name">{item.name}</div>
                                        <div className="item-desc">{item.desc}</div>
                                        <span className="item-badge" style={{ background: `${stage.color}15`, color: stage.color }}>
                                            {item.type}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {}
                            {expandedStage === stage.id && (
                                <div className="stage-detail animate-in">
                                    <div className="detail-divider" />
                                    <p>{stage.detail}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {}
            <div className="card" style={{ padding: "var(--space-xl)", marginTop: "var(--space-2xl)" }}>
                <h3 style={{ marginBottom: "var(--space-md)", fontSize: "1.1rem" }}>📋 ETL Pipeline Summary</h3>
                <div className="flow-summary-grid">
                    <div className="flow-stat">
                        <div className="flow-stat-value">4</div>
                        <div className="flow-stat-label">Data Sources</div>
                    </div>
                    <div className="flow-stat">
                        <div className="flow-stat-value">2</div>
                        <div className="flow-stat-label">Ingestion Modes</div>
                    </div>
                    <div className="flow-stat">
                        <div className="flow-stat-value">6</div>
                        <div className="flow-stat-label">Quality Checks</div>
                    </div>
                    <div className="flow-stat">
                        <div className="flow-stat-value">6</div>
                        <div className="flow-stat-label">Analytical Tables</div>
                    </div>
                    <div className="flow-stat">
                        <div className="flow-stat-value">10+</div>
                        <div className="flow-stat-label">API Endpoints</div>
                    </div>
                    <div className="flow-stat">
                        <div className="flow-stat-value">11</div>
                        <div className="flow-stat-label">Visualizations</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArchitecturePage;
