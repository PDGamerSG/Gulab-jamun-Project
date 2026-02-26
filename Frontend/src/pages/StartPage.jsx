import { useNavigate } from "react-router-dom";
import "../Auth.css";

function StartPage() {
    const navigate = useNavigate();

    return (
        <div className="start-page">
            <div className="start-bg" />
            <div className="start-blob start-blob-1" />
            <div className="start-blob start-blob-2" />
            <div className="start-blob start-blob-3" />

            <div className="start-content animate-in">
                <div className="start-logo">
                    <span className="logo-dot" />
                    Gulabjamun
                </div>

                <h1>
                    Smart Retail{" "}
                    <span className="highlight">Supply Chain</span> &amp;
                    Customer Intelligence
                </h1>

                <p>
                    Unified analytics for sales, inventory, logistics, and
                    customer data — powered by real-time insights.
                </p>

                <button
                    className="start-btn"
                    onClick={() => navigate("/login")}
                >
                    Get Started <span className="arrow">→</span>
                </button>
            </div>

            <div className="start-footer">
                © 2026 Gulabjamun · Built for Hackathon
            </div>
        </div>
    );
}

export default StartPage;
