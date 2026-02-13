import { useState } from "react";
import "../Security.css";

// --- Icons (Lucide) ---
const IconShield = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
);
const IconLock = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
);
const IconKey = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" /></svg>
);
const IconEye = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
);
const IconFileText = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
);
const IconRefresh = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>
);
const IconGlobe = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
);
const IconCheck = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);
const IconX = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
);
const IconFolder = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
);
const IconChevron = () => (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
);
const IconFileCode = ({ type }) => {
    const color = type === 'parquet' ? '#10b981' : type === 'csv' ? '#a855f7' : '#94a3b8';
    return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>;
};

// --- Data Structure for File Explorer ---
const FILE_SYSTEM = [
    {
        id: 's3-root', name: 's3://data-lake-prod', type: 'bucket', expanded: true, children: [
            {
                id: 'raw', name: 'layer=raw', type: 'folder', expanded: false, children: [
                    { id: 'raw-pos', name: 'source=pos_terminals', type: 'folder', children: [] },
                    { id: 'raw-web', name: 'source=web_events', type: 'folder', children: [] },
                ]
            },
            {
                id: 'staging', name: 'layer=staging', type: 'folder', expanded: false, children: [
                    { id: 'stg-sales', name: 'table=sales_transactions', type: 'folder', children: [] },
                ]
            },
            {
                id: 'warehouse', name: 'layer=warehouse', type: 'folder', expanded: true, children: [
                    {
                        id: 'fact-sales', name: 'table=fact_sales', type: 'folder', expanded: true, children: [
                            {
                                id: 'y2025', name: 'year=2025', type: 'folder', expanded: true, children: [
                                    {
                                        id: 'm01', name: 'month=01', type: 'folder', children: [
                                            { id: 'p1', name: 'part-0001.snappy.parquet', type: 'file', ext: 'parquet', size: '245 MB' },
                                            { id: 'p2', name: 'part-0002.snappy.parquet', type: 'file', ext: 'parquet', size: '210 MB' }
                                        ]
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        id: 'dim-cust', name: 'table=dim_customer', type: 'folder', expanded: false, children: [
                            { id: 'c1', name: 'customer_full.parquet', type: 'file', ext: 'parquet', size: '45 MB' }
                        ]
                    }
                ]
            }
        ]
    }
];

// Recursive Tree Component
const FileTreeItem = ({ item, level, onToggle, activeId, onSelect }) => {
    const isFolder = item.type === 'folder' || item.type === 'bucket';
    const paddingLeft = level * 16 + 8;

    return (
        <div className="start-tree-node">
            <div
                className={`dl-item-row ${activeId === item.id ? 'active' : ''}`}
                style={{ paddingLeft: `${paddingLeft}px` }}
                onClick={(e) => {
                    e.stopPropagation();
                    if (isFolder) onToggle(item.id);
                    onSelect(item);
                }}
            >
                <span className={`dl-arrow ${item.expanded ? 'expanded' : ''}`} style={{ opacity: isFolder ? 1 : 0 }}>
                    <IconChevron />
                </span>
                <span className={`dl-icon ${item.type === 'bucket' ? 'icon-bucket' : 'icon-folder'}`}>
                    {item.type === 'bucket' ? <IconGlobe size={14} /> : isFolder ? <IconFolder /> : <IconFileCode type={item.ext} />}
                </span>
                <span className={`dl-text-name ${item.type === 'bucket' ? 'dl-bucket-text' : ''}`}>
                    {item.name}
                </span>
                {item.size && <span className="dl-size-badge">{item.size}</span>}
            </div>
            {item.expanded && item.children && (
                <div className="slide-down">
                    {item.children.map(child => (
                        <FileTreeItem
                            key={child.id}
                            item={child}
                            level={level + 1}
                            onToggle={onToggle}
                            activeId={activeId}
                            onSelect={onSelect}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const DataLakeExplorer = () => {
    // Clone initial state to avoid mutation issues during renders if we mutated directly
    // Ideally use useReducer but State is fine for simple tree
    const [fileSystem, setFileSystem] = useState(JSON.parse(JSON.stringify(FILE_SYSTEM)));
    const [activeFile, setActiveFile] = useState(null);

    const toggleNode = (id) => {
        const toggleRecursive = (nodes) => {
            return nodes.map(node => {
                if (node.id === id) {
                    return { ...node, expanded: !node.expanded };
                }
                if (node.children) {
                    return { ...node, children: toggleRecursive(node.children) };
                }
                return node;
            });
        };
        setFileSystem(toggleRecursive(fileSystem));
    };

    return (
        <div className="dl-explorer-container animate-in">
            <div className="dl-header">
                <span className="dl-sidebar-title">Explorer: Data Lake</span>
                <div style={{ display: 'flex', gap: 4 }}>
                    <span className="dl-action-dot" style={{ background: '#ed6a5e' }} />
                    <span className="dl-action-dot" style={{ background: '#f5bd4f' }} />
                    <span className="dl-action-dot" style={{ background: '#61c554' }} />
                </div>
            </div>
            <div style={{ display: 'flex', height: '400px' }}>
                <div className="dl-tree-content" style={{ width: '50%', borderRight: '1px solid #333' }}>
                    {fileSystem.map(node => (
                        <FileTreeItem
                            key={node.id}
                            item={node}
                            level={0}
                            onToggle={toggleNode}
                            activeId={activeFile?.id}
                            onSelect={setActiveFile}
                        />
                    ))}
                </div>
                <div className="dl-preview-pane" style={{ width: '50%' }}>
                    {activeFile && activeFile.type === 'file' ? (
                        <>
                            <div style={{ marginBottom: 16, borderBottom: '1px solid #333', paddingBottom: 8 }}>
                                <span className="dl-keyword">PREVIEWING</span> {activeFile.name}
                            </div>
                            <span className="dl-cmt"># Parquet Metadata</span><br />
                            <span className="dl-key">compression</span>: <span className="dl-str">"SNAPPY"</span><br />
                            <span className="dl-key">created_at</span>: <span className="dl-num">1709823400</span><br />
                            <span className="dl-key">row_count</span>: <span className="dl-num">1,450,200</span><br />
                            <span className="dl-key">schema</span>: {'{'}<br />
                            &nbsp;&nbsp;<span className="dl-key">columns</span>: [<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;{"{ name: 'order_id', type: 'UTF8' }"},<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;{"{ name: 'amount', type: 'FLOAT' }"}<br />
                            &nbsp;&nbsp;]<br />
                            {'}'}
                        </>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#444' }}>
                            Select a file to preview metadata
                        </div>
                    )}
                </div>
            </div>
            <div className="dl-header" style={{ borderTop: '1px solid #333', borderBottom: 'none', fontSize: 11 }}>
                <span>s3-us-east-1</span>
                <span>UTF-8</span>
            </div>
        </div>
    );
};

function StorageSecurityPage() {
    return (
        <div className="page-container sec-container">
            {/* HERO */}
            <header className="sec-hero fade-in-up">
                <div className="sec-shield-bg" />
                <div className="sec-hero-content">
                    <h1>Enterprise-Grade Security</h1>
                    <p>
                        Our platform is built with a defense-in-depth approach, safeguarding data through
                        advanced encryption, strict access controls (RBAC), and automated auditing.
                    </p>
                </div>
            </header>

            {/* SECURITY GRID - REUSED FROM PREVIOUS STEP */}
            <section className="dashboard-section fade-in-up delay-1">
                <div className="section-title">
                    <span className="icon" style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10b981" }}>
                        <IconShield />
                    </span>
                    Core Security Measures
                </div>
                <div className="sec-features-grid">
                    {[
                        { icon: <IconLock size={24} />, title: "Encryption at Rest", desc: "AES-256 encryption for all Parquet files and databases. Keys managed via secure KMS." },
                        { icon: <IconKey size={24} />, title: "Secure API Access", desc: "JWT-based authentication with auto-rotation. OAuth2 integration for SSO login." },
                        { icon: <IconEye size={24} />, title: "Data Masking", desc: "Dynamic masking of PII fields (emails, phones) based on user role priviledges." },
                        { icon: <IconFileText size={24} />, title: "Audit Logging", desc: "Immutable logs tracking 100% of data access, queries, and administrative actions." },
                        { icon: <IconRefresh size={24} />, title: "Disaster Recovery", desc: "Point-in-time recovery (PITR) with daily off-site backups retained for 90 days." },
                        { icon: <IconGlobe size={24} />, title: "Network Isolation", desc: "VPC-peering only. No public database access. strict firewall rules." },
                    ].map((feature, i) => (
                        <div key={i} className="sec-feature-card">
                            <div className="sec-icon-box">{feature.icon}</div>
                            <h3 className="sec-feature-title">{feature.title}</h3>
                            <p className="sec-feature-desc">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* PARTITIONING & STORAGE LAYOUT - UPDATED */}
            <section className="dashboard-section fade-in-up delay-3">
                <div className="section-title">
                    <span className="icon" style={{ background: "rgba(139, 92, 246, 0.1)", color: "#8b5cf6" }}>
                        <IconFolder size={20} />
                    </span>
                    Data Lake Storage Layout
                </div>
                {/* REPLACED OLD TREE WITH NEW EXPLORER */}
                <DataLakeExplorer />
            </section>

            {/* ACCESS MATRIX */}
            <section className="dashboard-section fade-in-up delay-2">
                <div className="section-title">
                    <span className="icon" style={{ background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b" }}>
                        <IconKey />
                    </span>
                    Role-Based Access Control (RBAC) Matrix
                </div>
                <div className="rbac-wrapper">
                    <table className="rbac-table">
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
                                ["View Dashboards", true, true, true],
                                ["Run Ad-hoc Queries", true, true, true],
                                ["Export Data Reports", false, true, true],
                                ["View Unmasked PII", false, "partial", true],
                                ["Configure Data Pipelines", false, false, true],
                                ["Manage User Roles", false, false, true],
                                ["Delete Records", false, false, "audit"],
                            ].map(([perm, analyst, manager, admin], i) => (
                                <tr key={i}>
                                    <td>{perm}</td>
                                    <td>{analyst === true ? <IconCheck /> : <IconX />}</td>
                                    <td>
                                        {manager === true ? <IconCheck /> : manager === "partial" ? <span className="perm-partial">Masked PII</span> : <IconX />}
                                    </td>
                                    <td>
                                        {admin === "audit" ? <span className="perm-partial">Audit Logged</span> : <IconCheck />}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* SCHEMA & DICTIONARY */}
            <section className="dashboard-section fade-in-up delay-3">
                <div className="section-title">
                    <span className="icon" style={{ background: "rgba(59, 130, 246, 0.1)", color: "#3b82f6" }}>
                        <IconFileText />
                    </span>
                    Data Dictionary & Schema
                </div>
                <div className="sec-dictionary-grid">
                    {/* Fact Table */}
                    <div className="sec-table-card">
                        <div className="sec-card-header fact">
                            <span>FACT_SALES</span>
                            <span className="sec-badge scd">Parquet</span>
                        </div>
                        <div className="sec-col-list">
                            <div className="sec-col-item"><span><span className="sec-key pk">PK</span> order_id</span> <span>string</span></div>
                            <div className="sec-col-item"><span><span className="sec-key fk">FK</span> customer_id</span> <span>string</span></div>
                            <div className="sec-col-item"><span><span className="sec-key fk">FK</span> product_id</span> <span>string</span></div>
                            <div className="sec-col-item"><span>order_date</span> <span>timestamp</span></div>
                            <div className="sec-col-item"><span>sales_amount</span> <span>double</span></div>
                        </div>
                    </div>
                    {/* Dim Customer */}
                    <div className="sec-table-card">
                        <div className="sec-card-header dim">
                            <span>DIM_CUSTOMER</span>
                            <span className="sec-badge scd">SCD Type 2</span>
                        </div>
                        <div className="sec-col-list">
                            <div className="sec-col-item"><span><span className="sec-key pk">PK</span> customer_key</span> <span>int</span></div>
                            <div className="sec-col-item"><span>name</span> <span>string</span></div>
                            <div className="sec-col-item"><span>email</span> <span>string</span></div>
                            <div className="sec-col-item"><span>valid_from</span> <span>date</span></div>
                            <div className="sec-col-item"><span>is_current</span> <span>boolean</span></div>
                        </div>
                    </div>
                    {/* Dim Product */}
                    <div className="sec-table-card">
                        <div className="sec-card-header dim">
                            <span>DIM_PRODUCT</span>
                            <span className="sec-badge scd">SCD Type 2</span>
                        </div>
                        <div className="sec-col-list">
                            <div className="sec-col-item"><span><span className="sec-key pk">PK</span> product_key</span> <span>int</span></div>
                            <div className="sec-col-item"><span>sku</span> <span>string</span></div>
                            <div className="sec-col-item"><span>category</span> <span>string</span></div>
                            <div className="sec-col-item"><span>unit_price</span> <span>decimal</span></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default StorageSecurityPage;
