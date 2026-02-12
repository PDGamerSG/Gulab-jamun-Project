import { Link } from "react-router-dom";

function HomePage() {
    return (
        <>
            {}
            <section className="hero">
                <div className="hero-bg" />
                <div className="hero-blob hero-blob-1" />
                <div className="hero-blob hero-blob-2" />
                <div className="hero-blob hero-blob-3" />

                <div className="hero-content">
                    <div className="hero-eyebrow animate-in">
                        🍬 Smart Retail Intelligence Platform
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

                    {}
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

            {}
            <section className="section-bg" style={{ margin: "0 auto", maxWidth: 1280, padding: "var(--space-3xl) var(--space-2xl)" }}>
                <div className="section-title" style={{ justifyContent: "center", marginBottom: "var(--space-xl)" }}>
                    <span className="icon" style={{ background: "rgba(232,93,117,0.08)" }}>⚡</span>
                    Why Gulabjamun?
                </div>
                <div className="features-grid">
                    {[
                        { icon: "📊", title: "Unified Analytics", desc: "Sales, inventory, and logistics dashboards in one platform" },
                        { icon: "⚡", title: "Hybrid Ingestion", desc: "Batch + real-time data pipelines with fault tolerance and retry logic" },
                        { icon: "🧠", title: "Customer Intelligence", desc: "CLV, segmentation, purchase frequency, and basket analysis" },
                        { icon: "🔒", title: "Secure by Design", desc: "Role-based access control, partitioned storage, data masking" },
                        { icon: "🏗️", title: "Star Schema Modeling", desc: "Fact & dimension tables with SCD tracking for historical analysis" },
                        { icon: "✅", title: "Data Quality Engine", desc: "Automated validation checks with quality scoring and profiling" },
                    ].map((f, i) => (
                        <div key={i} className="card feature-card animate-in" style={{ animationDelay: `${i * 0.08}s` }}>
                            <div className="feature-icon">{f.icon}</div>
                            <h4>{f.title}</h4>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {}
            <section className="deliverables-section">
                <div className="section-title" style={{ justifyContent: "center", marginBottom: "var(--space-xl)" }}>
                    <span className="icon" style={{ background: "rgba(255,178,107,0.12)" }}>📦</span>
                    Platform Deliverables
                </div>
                <p style={{ textAlign: "center", color: "var(--text-secondary)", maxWidth: 600, margin: "0 auto var(--space-xl)", fontSize: "0.95rem" }}>
                    Explore each component of the end-to-end data platform
                </p>
                <div className="deliverables-grid">
                    {[
                        { icon: "🏛️", title: "Architecture Diagram", desc: "Interactive end-to-end data lifecycle visualization", link: "/architecture", color: "#E85D75" },
                        { icon: "📈", title: "Analytics Dashboard", desc: "Real-time KPIs, revenue trends, and operational insights", link: "/dashboard", color: "#FFB26B" },
                        { icon: "✅", title: "Data Quality Reports", desc: "Automated validation checks and quality scoring", link: "/data-quality", color: "#10b981" },
                        { icon: "🔐", title: "Storage & Security", desc: "Partitioning strategy, access controls, and schema design", link: "/storage-security", color: "#E0C3FC" },
                    ].map((d, i) => (
                        <Link to={d.link} key={i} className="card deliverable-card animate-in" style={{ animationDelay: `${i * 0.1}s`, textDecoration: "none" }}>
                            <div className="deliverable-accent" style={{ background: d.color }} />
                            <div className="deliverable-icon">{d.icon}</div>
                            <h4>{d.title}</h4>
                            <p>{d.desc}</p>
                            <span className="deliverable-arrow">→</span>
                        </Link>
                    ))}
                </div>
            </section>

            {}
            <section className="section-bg" style={{ margin: "0 auto", maxWidth: 1280, padding: "var(--space-2xl)" }}>
                <div className="section-title" style={{ justifyContent: "center", marginBottom: "var(--space-lg)" }}>
                    <span className="icon" style={{ background: "rgba(224,195,252,0.2)" }}>🛠</span>
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
