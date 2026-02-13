import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NAV_LINKS = [
    {
        section: "Analytics",
        links: [
            {
                to: "/dashboard",
                label: "Dashboard",
                icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7" rx="1" />
                        <rect x="14" y="3" width="7" height="7" rx="1" />
                        <rect x="3" y="14" width="7" height="7" rx="1" />
                        <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                ),
            },
            {
                to: "/architecture",
                label: "Architecture",
                icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                    </svg>
                ),
            },
            {
                to: "/data-quality",
                label: "Data Quality",
                icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                ),
            },
        ],
    },
    {
        section: "Management",
        links: [
            {
                to: "/storage-security",
                label: "Storage & Security",
                icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                ),
            },
            {
                to: "/custom-data",
                label: "Custom Lab",
                icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                    </svg>
                ),
            },
        ],
    },
    {
        section: "AI Tools",
        links: [
            {
                to: "/ai-chat",
                label: "AI Copilot",
                icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        <line x1="9" y1="10" x2="9" y2="10" />
                        <line x1="12" y1="10" x2="12" y2="10" />
                        <line x1="15" y1="10" x2="15" y2="10" />
                    </svg>
                ),
            },
            {
                to: "/ai-agent",
                label: "AI Agent",
                icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="10" rx="2" />
                        <circle cx="12" cy="5" r="2" />
                        <path d="M12 7v4" />
                        <line x1="8" y1="16" x2="8" y2="16" />
                        <line x1="16" y1="16" x2="16" y2="16" />
                    </svg>
                ),
            },
        ],
    },
];

function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    function handleLogout() {
        logout();
        navigate("/");
    }

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <Link to="/dashboard" className="sidebar-logo">
                    <div className="logo-icon">G</div>
                    <span className="logo-text">Gulabjamun</span>
                </Link>
            </div>

            <nav className="sidebar-nav">
                {NAV_LINKS.map((group) => (
                    <div key={group.section} className="sidebar-section">
                        <div className="sidebar-section-label">{group.section}</div>
                        {group.links.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`sidebar-link ${location.pathname === link.to ? "active" : ""}`}
                            >
                                <span className="sidebar-icon">{link.icon}</span>
                                <span className="sidebar-label">{link.label}</span>
                            </Link>
                        ))}
                    </div>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button className="sidebar-link logout-btn" onClick={handleLogout}>
                    <span className="sidebar-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                    </span>
                    <span className="sidebar-label">Logout</span>
                </button>
                <div className="sidebar-version">v2.0 · Hackathon Edition</div>
            </div>
        </aside>
    );
}

export default Sidebar;
