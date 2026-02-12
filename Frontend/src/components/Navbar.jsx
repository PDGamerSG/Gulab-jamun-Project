import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NAV_LINKS = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/architecture", label: "Architecture" },
    { to: "/data-quality", label: "Data Quality" },
    { to: "/storage-security", label: "Storage & Security" },
    { to: "/custom-data", label: "Custom Lab" },
    { to: "/ai-agent", label: "🤖 AI Copilot" },
];

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    function handleLogout() {
        logout();
        navigate("/");
    }

    return (
        <nav className="navbar">
            <Link to="/home" className="navbar-logo" onClick={() => setMenuOpen(false)}>
                <span className="logo-dot" />
                Gulabjamun
            </Link>

            <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? "✕" : "☰"}
            </button>

            <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
                {NAV_LINKS.map((link) => (
                    <li key={link.to}>
                        <Link
                            to={link.to}
                            className={location.pathname === link.to ? "active" : ""}
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="navbar-cta">
                <button className="btn btn-outline" onClick={handleLogout} style={{ marginRight: 8 }}>
                    Logout
                </button>
                <Link to="/dashboard" className="btn btn-primary">View Dashboard</Link>
            </div>
        </nav>
    );
}

export default Navbar;
