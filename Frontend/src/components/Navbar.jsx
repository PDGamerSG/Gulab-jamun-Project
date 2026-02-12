import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
    { to: "/", label: "Home" },
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

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
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
                <Link to="/dashboard" className="btn btn-primary">View Dashboard</Link>
            </div>
        </nav>
    );
}

export default Navbar;
