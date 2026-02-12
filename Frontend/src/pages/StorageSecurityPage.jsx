function StorageSecurityPage() {
    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Storage & Security</h1>
                    <p className="page-subtitle">Partitioning strategy, access controls, and schema design documentation</p>
                </div>
            </div>

            {}
            <section className="dashboard-section">
                <div className="section-title">
                    <span className="icon" style={{ background: "rgba(232,93,117,0.08)" }}>🏗️</span>
                    Star Schema Design
                </div>
                <div className="schema-diagram animate-in">
                    {}
                    <div className="schema-fact">
                        <div className="schema-card fact-card">
                            <div className="schema-card-header fact">Fact Table</div>
                            <div className="schema-card-title">fact_sales</div>
                            <ul className="schema-cols">
                                <li><span className="col-key">PK</span> order_id</li>
                                <li><span className="col-key">FK</span> customer_id</li>
                                <li><span className="col-key">FK</span> product_id</li>
                                <li>order_date</li>
                                <li>quantity</li>
                                <li>unit_price</li>
                                <li>revenue</li>
                                <li>country</li>
                            </ul>
                        </div>
                    </div>

                    {}
                    <div className="schema-dimensions">
                        {[
                            { name: "dim_customer", cols: ["customer_id (PK)", "name", "email", "segment", "country", "valid_from", "valid_to", "is_current"], scd: true },
                            { name: "dim_product", cols: ["product_id (PK)", "description", "stock_code", "category", "weight_gms", "importance", "valid_from", "valid_to"], scd: true },
                            { name: "dim_date", cols: ["date_key (PK)", "full_date", "day", "month", "quarter", "year", "is_weekend"], scd: false },
                            { name: "dim_warehouse", cols: ["warehouse_id (PK)", "block_name", "region", "capacity", "manager"], scd: false },
                            { name: "fact_shipment", cols: ["shipment_id (PK)", "order_id (FK)", "warehouse_id (FK)", "shipment_mode", "delivery_status", "discount_offered", "customer_rating"], scd: false },
                        ].map((dim, i) => (
                            <div key={i} className="schema-card dim-card animate-in" style={{ animationDelay: `${i * 0.08}s` }}>
                                <div className={`schema-card-header ${dim.scd ? "scd" : "dim"}`}>
                                    {dim.scd ? "SCD Type 2" : dim.name === "fact_shipment" ? "Fact Table" : "Dimension"}
                                </div>
                                <div className="schema-card-title">{dim.name}</div>
                                <ul className="schema-cols">
                                    {dim.cols.map((c, j) => <li key={j}>{c}</li>)}
                                </ul>
                                {dim.scd && <div className="scd-badge">Tracks History</div>}
                            </div>
                        ))}
                    </div>

                    {}
                    <div className="schema-relations-label">← Foreign Key Relationships →</div>
                </div>
            </section>

            {}
            <section className="dashboard-section">
                <div className="section-title">
                    <span className="icon" style={{ background: "rgba(255,178,107,0.12)" }}>💾</span>
                    Storage Format: Parquet vs CSV
                </div>
                <div className="card animate-in" style={{ padding: "var(--space-xl)", overflow: "auto" }}>
                    <table className="comparison-table">
                        <thead>
                            <tr>
                                <th>Feature</th>
                                <th>CSV</th>
                                <th className="highlight-col">Parquet ★</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ["Format", "Row-based text", "Columnar binary"],
                                ["Compression", "None (raw text)", "Snappy/GZIP (60-80% smaller)"],
                                ["Schema", "Not embedded", "Self-describing metadata"],
                                ["Read Speed", "Full scan required", "Column pruning + predicate pushdown"],
                                ["Write Speed", "Fast (append)", "Moderate (encoding overhead)"],
                                ["Type Safety", "None (all strings)", "Strong typing (int, float, timestamp)"],
                                ["Partitioning", "Manual", "Native support"],
                                ["Our Choice", "—", "✅ Used for all fact/dim tables"],
                            ].map(([feature, csv, parquet], i) => (
                                <tr key={i}>
                                    <td className="feature-name">{feature}</td>
                                    <td>{csv}</td>
                                    <td className="highlight-col">{parquet}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {}
            <section className="dashboard-section">
                <div className="section-title">
                    <span className="icon" style={{ background: "rgba(16,185,129,0.08)" }}>📂</span>
                    Partitioning Strategy
                </div>
                <div className="partition-visual animate-in">
                    <div className="card" style={{ padding: "var(--space-xl)" }}>
                        <div className="partition-tree">
                            <div className="ptree-root">
                                <span className="ptree-icon">📁</span> data_warehouse/
                            </div>
                            <div className="ptree-level-1">
                                <div className="ptree-branch">
                                    <span className="ptree-icon">📁</span> fact_sales/
                                    <div className="ptree-level-2">
                                        <div className="ptree-leaf"><span className="ptree-icon">📁</span> year=2010/</div>
                                        <div className="ptree-leaf"><span className="ptree-icon">📁</span> year=2011/
                                            <div className="ptree-level-3">
                                                <div className="ptree-file"><span className="ptree-icon">📄</span> month=01/ <span className="ptree-size">part-00001.parquet (2.1MB)</span></div>
                                                <div className="ptree-file"><span className="ptree-icon">📄</span> month=02/ <span className="ptree-size">part-00001.parquet (1.8MB)</span></div>
                                                <div className="ptree-file ptree-more">... (12 partitions/year)</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ptree-branch">
                                    <span className="ptree-icon">📁</span> fact_shipment/
                                    <div className="ptree-level-2">
                                        <div className="ptree-leaf"><span className="ptree-icon">📁</span> warehouse=A/ <span className="ptree-size">shipments.parquet</span></div>
                                        <div className="ptree-leaf"><span className="ptree-icon">📁</span> warehouse=B/ <span className="ptree-size">shipments.parquet</span></div>
                                        <div className="ptree-file ptree-more">... (5 warehouses)</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="partition-benefits">
                            <h4>Benefits</h4>
                            <div className="benefits-grid">
                                {[
                                    { icon: "⚡", title: "Query Performance", desc: "Scan only relevant partitions, skip 90%+ of data" },
                                    { icon: "💰", title: "Cost Efficiency", desc: "Read less data → lower I/O, faster execution" },
                                    { icon: "🗑️", title: "Data Lifecycle", desc: "Drop old partitions without rewriting entire table" },
                                    { icon: "📈", title: "Scalability", desc: "Add new partitions as data grows, no schema changes" },
                                ].map((b, i) => (
                                    <div key={i} className="benefit-item">
                                        <span className="benefit-icon">{b.icon}</span>
                                        <div>
                                            <strong>{b.title}</strong>
                                            <p>{b.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {}
            <section className="dashboard-section">
                <div className="section-title">
                    <span className="icon" style={{ background: "rgba(224,195,252,0.2)" }}>🔐</span>
                    Access Control Matrix (RBAC)
                </div>
                <div className="card animate-in" style={{ padding: "var(--space-xl)", overflow: "auto" }}>
                    <table className="comparison-table rbac-table">
                        <thead>
                            <tr>
                                <th>Permission</th>
                                <th>Analyst</th>
                                <th>Manager</th>
                                <th>Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ["View Dashboards", "✅", "✅", "✅"],
                                ["Run Analytics Queries", "✅", "✅", "✅"],
                                ["Export Reports", "❌", "✅", "✅"],
                                ["View Raw Data", "❌", "✅ (masked PII)", "✅"],
                                ["Modify Pipelines", "❌", "❌", "✅"],
                                ["Manage Users", "❌", "❌", "✅"],
                                ["Delete Data", "❌", "❌", "✅ (audit logged)"],
                            ].map(([perm, analyst, manager, admin], i) => (
                                <tr key={i}>
                                    <td className="feature-name">{perm}</td>
                                    <td>{analyst}</td>
                                    <td>{manager}</td>
                                    <td>{admin}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {}
            <section className="dashboard-section">
                <div className="section-title">
                    <span className="icon" style={{ background: "rgba(232,93,117,0.08)" }}>🛡️</span>
                    Security Measures
                </div>
                <div className="security-grid">
                    {[
                        { icon: "🔒", title: "Encryption at Rest", desc: "All Parquet files encrypted using AES-256. Encryption keys managed separately from data storage." },
                        { icon: "🔐", title: "API Authentication", desc: "FastAPI endpoints secured with JWT tokens. Rate limiting applied to prevent abuse. CORS configured for authorized domains." },
                        { icon: "🎭", title: "Data Masking", desc: "PII fields (customer name, email) are masked for Analyst role. Full data only visible to Admin or via approved queries." },
                        { icon: "📝", title: "Audit Logging", desc: "All data access and modification events logged with timestamps, user IDs, and IP addresses for compliance." },
                        { icon: "🔄", title: "Backup & Recovery", desc: "Daily automated backups with 30-day retention. Point-in-time recovery (PITR) capability for critical datasets." },
                        { icon: "🌐", title: "Network Security", desc: "API served over HTTPS. Internal communication via private VPC. Firewall rules restrict access to authorized IPs." },
                    ].map((s, i) => (
                        <div key={i} className="card security-card animate-in" style={{ animationDelay: `${i * 0.08}s` }}>
                            <div className="security-icon">{s.icon}</div>
                            <h4>{s.title}</h4>
                            <p>{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default StorageSecurityPage;
