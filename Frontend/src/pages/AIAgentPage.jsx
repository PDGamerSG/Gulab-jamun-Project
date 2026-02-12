import { useState } from "react";
import axios from "axios";
import "../AIAgent.css";

const AIAgentPage = () => {
    const [scanning, setScanning] = useState(false);
    const [issues, setIssues] = useState([]);
    const [insights, setInsights] = useState(null);
    const [logs, setLogs] = useState(["System ready..."]);

    const addLog = (msg, type = "info") => {
        setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
    };

    const runDiagnostics = async () => {
        setScanning(true);
        addLog("Initiating system scan...", "info");
        try {
            const res = await axios.get("http://localhost:8000/ai-diagnose");
            setIssues(res.data.issues);
            setInsights(res.data.insights);
            addLog(`Scan complete. Found ${res.data.issues.length} issues.`, "success");
        } catch (err) {
            addLog("Scan failed: Network Error", "error");
        }
        setScanning(false);
    };

    const fixIssue = async (issueType) => {
        addLog(`Applying fix for: ${issueType}...`, "info");
        try {
            const res = await axios.post("http://localhost:8000/ai-fix", { fix_type: issueType });
            addLog(`Fix applied: ${res.data.message}`, "success");
            runDiagnostics(); 
        } catch (err) {
            addLog("Failed to apply fix.", "error");
        }
    };

    return (
        <div className="page-container ai-page">
            <header className="ai-header">
                <div>
                    <h1 className="ai-title">
                        <span>🤖</span> Gulabjamun AI Core
                    </h1>
                    <p className="page-subtitle">Autonomous Data Steward & Business Advisor</p>
                </div>
                <button
                    className="btn-scan"
                    onClick={runDiagnostics}
                    disabled={scanning}
                >
                    {scanning ? "Scanning..." : "Run Diagnostics"}
                </button>
            </header>

            <div className="ai-grid">
                {}
                <div className="ai-card">
                    <div className="ai-card-header">
                        <h2 className="ai-card-title">
                            <span className="ai-status-dot warning"></span>
                            Data Health
                        </h2>
                        <span className="ai-badge">{issues.length} Issues Detected</span>
                    </div>
                    <div className="ai-content">
                        {issues.length === 0 && !scanning && (
                            <div style={{ textAlign: "center", color: "#64748b", marginTop: 40 }}>
                                <h3>All Systems Nominal</h3>
                                <p>No data quality issues detected.</p>
                            </div>
                        )}
                        {issues.map((issue, i) => (
                            <div key={i} className="issue-item">
                                <div className="issue-info">
                                    <h4>{issue.title}</h4>
                                    <p>{issue.description}</p>
                                </div>
                                <button className="btn-fix" onClick={() => fixIssue(issue.type)}>
                                    ⚡ Fix Auto
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {}
                <div className="ai-card">
                    <div className="ai-card-header">
                        <h2 className="ai-card-title">
                            <span className="ai-status-dot"></span>
                            Strategic Insights
                        </h2>
                    </div>
                    <div className="ai-content">
                        {insights ? (
                            <>
                                <div className="insight-card">
                                    <h4>Projected Revenue Impact</h4>
                                    <div className="insight-metric">₹{insights.projected_revenue.toLocaleString()}</div>
                                    <p className="insight-desc">
                                        Based on current inventory turnover and fixing data gaps, we estimate this potential revenue boost.
                                    </p>
                                </div>
                                <div className="insight-card" style={{ borderLeftColor: "#10b981" }}>
                                    <h4>Inventory Optimization</h4>
                                    <div className="insight-metric">{insights.stock_health}%</div>
                                    <p className="insight-desc">
                                        Stock levels are healthy. Consider increasing stock for "Jumbo Pack" due to 15% demand spike.
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="terminal-logs">
                                {logs.map((log, i) => (
                                    <div key={i} className="log-entry">{log}</div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIAgentPage;
