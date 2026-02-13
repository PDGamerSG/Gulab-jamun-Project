import { Link } from "react-router-dom";

const IconZap = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
);
const IconBarChart = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
);
const IconCpu = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" /></svg>
);
const IconShield = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
);
const IconLayers = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
);
const IconCheckCircle = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
);
const IconTrendUp = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
);
const IconLock = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
);
const IconPackage = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
);
const IconColumns = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18" /></svg>
);
const IconSettings = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
);

function HomePage() {
    return (
        <>
            { }
            <section className="hero">
                <div className="hero-bg" />
                <div className="hero-blob hero-blob-1" />
                <div className="hero-blob hero-blob-2" />
                <div className="hero-blob hero-blob-3" />

                <div className="hero-content">
                    <div className="hero-eyebrow animate-in">
                        Smart Retail Intelligence Platform
                    </div>

                    <h1 className="animate-in" style={{ animationDelay: "0.1s" }}>
                        Make Retail Data{" "}
                        <span className="highlight">Sweet, Smart,</span> and Unified
                    </h1>

                    <p className="hero-sub animate-in" style={{ animationDelay: "0.2s" }}>
                        Gulabjamun brings sales, inventory, logistics, and customer data
                        into one real-time analytics platform — so retailers can move faster
                        and sell smarter.
                    </p>

                    <div className="hero-actions animate-in" style={{ animationDelay: "0.3s" }}>
                        <Link to="/dashboard" className="btn btn-primary">View Dashboard</Link>
                        <Link to="/architecture" className="btn btn-outline">Explore Architecture</Link>
                    </div>

                    { }
                    <div className="hero-cards animate-in" style={{ animationDelay: "0.5s" }}>
                        <div className="hero-float-card">
                            <div className="card-label">Monthly Revenue</div>
                            <div className="card-value">₹12.4L</div>
                            <span className="card-tag tag-green">↑ 12.3%</span>
                        </div>
                        <div className="hero-float-card">
                            <div className="card-label">Inventory Health</div>
                            <div className="card-value">94.2%</div>
                            <span className="card-tag tag-rose">3 at risk</span>
                        </div>
                        <div className="hero-float-card">
                            <div className="card-label">Active Customers</div>
                            <div className="card-value">4,372</div>
                            <span className="card-tag tag-amber">+218 new</span>
                        </div>
                    </div>
                </div>
            </section>

            { }
            <section className="section-bg" style={{ margin: "0 auto", maxWidth: 1280, padding: "var(--space-3xl) var(--space-2xl)" }}>
                <div className="section-title" style={{ justifyContent: "center", marginBottom: "var(--space-xl)" }}>
                    <span className="icon" style={{ background: "rgba(232,93,117,0.08)", color: "#E85D75" }}>
                        <IconZap />
                    </span>
                    Why Gulabjamun?
                </div>
                <div className="features-grid">
                    {[
                        { icon: <IconBarChart size={24} />, title: "Unified Analytics", desc: "Sales, inventory, and logistics dashboards in one platform", color: "#E85D75" },
                        { icon: <IconZap size={24} />, title: "Hybrid Ingestion", desc: "Batch + real-time data pipelines with fault tolerance and retry logic", color: "#FFB26B" },
                        { icon: <IconCpu size={24} />, title: "Customer Intelligence", desc: "CLV, segmentation, purchase frequency, and basket analysis", color: "#E0C3FC" },
                        { icon: <IconShield size={24} />, title: "Secure by Design", desc: "Role-based access control, partitioned storage, data masking", color: "#10b981" },
                        { icon: <IconLayers size={24} />, title: "Star Schema Modeling", desc: "Fact & dimension tables with SCD tracking for historical analysis", color: "#8b5cf6" },
                        { icon: <IconCheckCircle size={24} />, title: "Data Quality Engine", desc: "Automated validation checks with quality scoring and profiling", color: "#38bdf8" },
                    ].map((f, i) => (
                        <div key={i} className="card feature-card animate-in" style={{ animationDelay: `${i * 0.08}s` }}>
                            <div className="feature-icon" style={{ color: f.color }}>{f.icon}</div>
                            <h4>{f.title}</h4>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            { }
            <section className="deliverables-section">
                <div className="section-title" style={{ justifyContent: "center", marginBottom: "var(--space-xl)" }}>
                    <span className="icon" style={{ background: "rgba(255,178,107,0.12)", color: "#FFB26B" }}>
                        <IconPackage />
                    </span>
                    Platform Deliverables
                </div>
                <p style={{ textAlign: "center", color: "var(--text-secondary)", maxWidth: 600, margin: "0 auto var(--space-xl)", fontSize: "0.95rem" }}>
                    Explore each component of the end-to-end data platform
                </p>
                <div className="deliverables-grid">
                    {[
                        { icon: <IconColumns size={24} />, title: "Architecture Diagram", desc: "Interactive end-to-end data lifecycle visualization", link: "/architecture", color: "#E85D75" },
                        { icon: <IconTrendUp size={24} />, title: "Analytics Dashboard", desc: "Real-time KPIs, revenue trends, and operational insights", link: "/dashboard", color: "#FFB26B" },
                        { icon: <IconCheckCircle size={24} />, title: "Data Quality Reports", desc: "Automated validation checks and quality scoring", link: "/data-quality", color: "#10b981" },
                        { icon: <IconLock size={24} />, title: "Storage & Security", desc: "Partitioning strategy, access controls, and schema design", link: "/storage-security", color: "#E0C3FC" },
                    ].map((d, i) => (
                        <Link to={d.link} key={i} className="card deliverable-card animate-in" style={{ animationDelay: `${i * 0.1}s`, textDecoration: "none" }}>
                            <div className="deliverable-accent" style={{ background: d.color }} />
                            <div className="deliverable-icon" style={{ color: d.color }}>{d.icon}</div>
                            <h4>{d.title}</h4>
                            <p>{d.desc}</p>
                            <span className="deliverable-arrow">→</span>
                        </Link>
                    ))}
                </div>
            </section>

            { }
            <section className="section-bg" style={{ margin: "0 auto", maxWidth: 1280, padding: "var(--space-2xl)" }}>
                <div className="section-title" style={{ justifyContent: "center", marginBottom: "var(--space-lg)" }}>
                    <span className="icon" style={{ background: "rgba(224,195,252,0.2)", color: "#c9a0f0" }}>
                        <IconSettings />
                    </span>
                    Tech Stack
                </div>
                <div className="tech-stack-grid">
                    {[
                        { name: "Python", role: "ETL & Backend" },
                        { name: "Pandas", role: "Data Processing" },
                        { name: "FastAPI", role: "REST API" },
                        { name: "Parquet", role: "Columnar Storage" },
                        { name: "React", role: "Frontend UI" },
                        { name: "Recharts", role: "Visualization" },
                        { name: "Faker", role: "Data Simulation" },
                        { name: "Star Schema", role: "Data Modeling" },
                    ].map((t, i) => (
                        <div key={i} className="tech-badge animate-in" style={{ animationDelay: `${i * 0.05}s` }}>
                            <strong>{t.name}</strong>
                            <span>{t.role}</span>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default HomePage;
