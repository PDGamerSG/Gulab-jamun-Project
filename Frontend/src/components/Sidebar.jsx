import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const NAV_ITEMS = [
    {
        to: "/dashboard",
        label: "Dashboard",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
        ),
    },
    {
        to: "/storage-security",
        label: "Security",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
        ),
    },
    {
        to: "/custom-data",
        label: "Custom Lab",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
        ),
    },
    {
        to: "/ai-chat",
        label: "AI Copilot",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        ),
    },
];

/* Hamburger SVG icon matching the reference ≡ style */
const HamburgerIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
);

function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [expanded, setExpanded] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);

    function handleLogout() {
        logout();
        navigate("/");
    }

    return (
        <aside className={`sidebar ${expanded ? "sidebar-expanded" : ""}`}>
            {/* Header: Hamburger + Brand */}
            <div className="sidebar-header">
                <button
                    className="sidebar-hamburger"
                    onClick={() => setExpanded(!expanded)}
                    title={expanded ? "Collapse sidebar" : "Expand sidebar"}
                >
                    <HamburgerIcon />
                </button>
                {/* Brand text (always rendered, CSS handles visibility via opacity/width) */}
                <Link to="/dashboard" className="sidebar-brand">
                    <span className="sidebar-brand-text">Gulabjamun</span>
                </Link>
            </div>

            <div className="sidebar-divider" />

            {/* Nav Items */}
            <nav className="sidebar-nav">
                {NAV_ITEMS.map((item) => {
                    const isActive = location.pathname === item.to;
                    return (
                        <div
                            key={item.to}
                            className="sidebar-item-wrapper"
                            onMouseEnter={() => setHoveredItem(item.to)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            <Link
                                to={item.to}
                                className={`sidebar-nav-btn ${isActive ? "active" : ""}`}
                            >
                                <span className="sidebar-icon">{item.icon}</span>
                                <span className="sidebar-label">{item.label}</span>
                            </Link>
                            {/* Tooltip - only in collapsed mode */}
                            {!expanded && hoveredItem === item.to && (
                                <div className="sidebar-tooltip">{item.label}</div>
                            )}
                        </div>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="sidebar-divider" />
            <div className="sidebar-footer">
                <div
                    className="sidebar-item-wrapper"
                    onMouseEnter={() => setHoveredItem("logout")}
                    onMouseLeave={() => setHoveredItem(null)}
                >
                    <button
                        className="sidebar-nav-btn logout-btn"
                        onClick={handleLogout}
                    >
                        <span className="sidebar-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                        </span>
                        <span className="sidebar-label">Logout</span>
                    </button>
                    {!expanded && hoveredItem === "logout" && (
                        <div className="sidebar-tooltip logout-tooltip">Logout</div>
                    )}
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
