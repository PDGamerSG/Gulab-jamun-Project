import { useState, useRef, useMemo } from "react";
import * as XLSX from "xlsx";
import {
    BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from "recharts";
import axios from "axios";

/* ─── Icons ──────────────────────────────────────────────── */
const IconBarChart = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
);
const IconLineChart = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
);
const IconAreaChart = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 20L5 12l4 4 4-8 4 4 6-8v16H1z" /></svg>
);
const IconPieChart = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" /></svg>
);
const IconDownload = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
);
const IconUpload = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
);
const IconFolder = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
);
const IconX = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
);
const IconArrowUp = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
);
const IconPlus = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
);
const IconTrash = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
);

const CHART_TYPES = [
    { id: "bar", label: "Bar Chart", icon: <IconBarChart /> },
    { id: "line", label: "Line Chart", icon: <IconLineChart /> },
    { id: "area", label: "Area Chart", icon: <IconAreaChart /> },
    { id: "pie", label: "Pie Chart", icon: <IconPieChart /> },
];

const COLORS = ["#E85D75", "#FFB26B", "#E0C3FC", "#10b981", "#38bdf8", "#8b5cf6", "#fbbf24", "#f43f5e", "#06b6d4", "#ec4899"];

const CUSTOM_TOOLTIP_STYLE = {
    borderRadius: 10,
    border: 'none',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    padding: '10px 14px',
    fontSize: '0.85rem'
};

function CustomDataPage() {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [fileName, setFileName] = useState(null);

    const [chartConfig, setChartConfig] = useState({
        type: "bar",
        xAxis: "",
        yAxis: "",
        title: "Custom Analysis"
    });

    const [ingesting, setIngesting] = useState(false);
    const fileInputRef = useRef(null);

    /* ─── File Upload ────────────────────────────────────── */
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setFileName(file.name);
        const reader = new FileReader();

        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: "binary" });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const rawData = XLSX.utils.sheet_to_json(ws);

            if (rawData.length > 0) {
                const cols = Object.keys(rawData[0]);
                setColumns(cols);

                // Convert numeric strings to numbers
                const cleaned = rawData.map(row => {
                    const newRow = {};
                    cols.forEach(c => {
                        const val = row[c];
                        const num = parseFloat(val);
                        newRow[c] = (val !== "" && !isNaN(num) && String(num) === String(val)) ? num : val;
                    });
                    return newRow;
                });
                setData(cleaned);

                // Auto-detect best axes
                const numKeys = cols.filter(k => typeof cleaned[0][k] === 'number');
                const catKeys = cols.filter(k => typeof cleaned[0][k] === 'string');
                setChartConfig(prev => ({
                    ...prev,
                    xAxis: catKeys[0] || cols[0],
                    yAxis: numKeys[0] || cols[1] || cols[0]
                }));
            }
        };
        reader.readAsBinaryString(file);
        e.target.value = "";
    };

    /* ─── Data Editing ───────────────────────────────────── */
    const handleCellChange = (rowIndex, col, value) => {
        const newData = [...data];
        const num = parseFloat(value);
        newData[rowIndex] = { ...newData[rowIndex], [col]: (value !== "" && !isNaN(num)) ? num : value };
        setData(newData);
    };

    const addRow = () => {
        const newRow = {};
        columns.forEach(c => newRow[c] = "");
        setData([...data, newRow]);
    };

    const removeRow = (index) => {
        setData(data.filter((_, i) => i !== index));
    };

    /* ─── Chart Data (Aggregated) ────────────────────────── */
    const chartData = useMemo(() => {
        if (!data.length || !chartConfig.xAxis || !chartConfig.yAxis) return [];

        // Check if yAxis values are numeric
        const isNumericY = data.some(row => typeof row[chartConfig.yAxis] === 'number');

        if (!isNumericY) {
            // If yAxis is not numeric, count occurrences per xAxis category
            const countMap = {};
            data.forEach(row => {
                const key = String(row[chartConfig.xAxis] ?? "Unknown");
                countMap[key] = (countMap[key] || 0) + 1;
            });
            return Object.entries(countMap).map(([name, value]) => ({
                [chartConfig.xAxis]: name,
                [chartConfig.yAxis]: value
            }));
        }

        // Aggregate: sum yAxis values grouped by xAxis
        const grouped = {};
        data.forEach(row => {
            const key = String(row[chartConfig.xAxis] ?? "Unknown");
            const val = parseFloat(row[chartConfig.yAxis]);
            if (!isNaN(val)) {
                if (!grouped[key]) {
                    grouped[key] = { sum: 0, count: 0 };
                }
                grouped[key].sum += val;
                grouped[key].count += 1;
            }
        });

        return Object.entries(grouped).map(([name, { sum, count }]) => ({
            [chartConfig.xAxis]: name,
            [chartConfig.yAxis]: Math.round(sum * 100) / 100,
            _count: count
        }));
    }, [data, chartConfig.xAxis, chartConfig.yAxis]);

    /* ─── Summary Stats ──────────────────────────────────── */
    const stats = useMemo(() => {
        if (!data.length || !chartConfig.yAxis) return null;
        const vals = data
            .map(r => parseFloat(r[chartConfig.yAxis]))
            .filter(v => !isNaN(v));
        if (!vals.length) return null;
        return {
            total: vals.reduce((a, b) => a + b, 0),
            avg: vals.reduce((a, b) => a + b, 0) / vals.length,
            max: Math.max(...vals)
        };
    }, [data, chartConfig.yAxis]);

    /* ─── Numeric Columns List ───────────────────────────── */
    const numericColumns = useMemo(() => {
        if (!data.length) return [];
        return columns.filter(c => data.some(row => typeof row[c] === 'number'));
    }, [data, columns]);

    /* ─── Data Ingest ────────────────────────────────────── */
    const ingestData = async () => {
        setIngesting(true);
        try {
            const required = ["order_id", "revenue", "country"];
            const missing = required.filter(r => !columns.includes(r));
            if (missing.length > 0) {
                alert(`Cannot append to Sales Data. Missing columns: ${missing.join(", ")}`);
                setIngesting(false);
                return;
            }
            await axios.post("http://localhost:8000/ingest-data", data);
            window.dispatchEvent(new Event("data-refresh"));
            alert("Data successfully appended to system!");
        } catch (err) {
            alert("Failed to ingest data. Ensure backend is running.");
        }
        setIngesting(false);
    };

    const downloadTemplate = () => {
        const ws = XLSX.utils.json_to_sheet([
            { order_id: "999001", product_id: "P101", customer_id: "C501", order_date: "2026-03-01", revenue: 1200, quantity: 2, unit_price: 600, country: "India" },
            { order_id: "999002", product_id: "P102", customer_id: "C502", order_date: "2026-03-02", revenue: 850, quantity: 1, unit_price: 850, country: "UK" }
        ]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Template");
        XLSX.writeFile(wb, "Gulabjamun_Sales_Template.xlsx");
    };

    /* ─── Render Chart ───────────────────────────────────── */
    const renderChart = () => {
        if (!chartData.length) {
            return (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 280, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    No valid data to display. Check your axis selections.
                </div>
            );
        }

        const commonProps = { data: chartData };
        const xKey = chartConfig.xAxis;
        const yKey = chartConfig.yAxis;

        switch (chartConfig.type) {
            case "bar":
                return (
                    <BarChart {...commonProps}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                        <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={{ stroke: '#e5e7eb' }} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={CUSTOM_TOOLTIP_STYLE} />
                        <Bar dataKey={yKey} fill="#E85D75" radius={[6, 6, 0, 0]} maxBarSize={60}>
                            {chartData.map((_, i) => (
                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                );
            case "line":
                return (
                    <LineChart {...commonProps}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                        <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={{ stroke: '#e5e7eb' }} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={CUSTOM_TOOLTIP_STYLE} />
                        <Line type="monotone" dataKey={yKey} stroke="#E85D75" strokeWidth={3} dot={{ r: 5, fill: '#E85D75', stroke: 'white', strokeWidth: 2 }} activeDot={{ r: 7 }} />
                    </LineChart>
                );
            case "area":
                return (
                    <AreaChart {...commonProps}>
                        <defs>
                            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#E85D75" stopOpacity={0.3} />
                                <stop offset="100%" stopColor="#E85D75" stopOpacity={0.02} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                        <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={{ stroke: '#e5e7eb' }} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={CUSTOM_TOOLTIP_STYLE} />
                        <Area type="monotone" dataKey={yKey} stroke="#E85D75" strokeWidth={2.5} fill="url(#areaGradient)" />
                    </AreaChart>
                );
            case "pie":
                return (
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey={yKey}
                            nameKey={xKey}
                            cx="50%"
                            cy="50%"
                            outerRadius={110}
                            innerRadius={50}
                            paddingAngle={3}
                            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                            labelLine={{ stroke: '#d1d5db' }}
                        >
                            {chartData.map((_, i) => (
                                <Cell key={i} fill={COLORS[i % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={CUSTOM_TOOLTIP_STYLE} />
                        <Legend wrapperStyle={{ fontSize: '0.8rem' }} />
                    </PieChart>
                );
            default:
                return null;
        }
    };

    /* ─── Format Number ──────────────────────────────────── */
    const fmt = (n) => {
        if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
        if (n >= 1000) return (n / 1000).toFixed(1) + "K";
        return Math.round(n * 100) / 100;
    };

    /* ─── JSX ────────────────────────────────────────────── */
    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Custom Data Lab</h1>
                    <p className="page-subtitle">Upload, edit, and visualize your own data</p>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                    <button className="btn btn-outline" onClick={downloadTemplate}>
                        <IconDownload /> Template
                    </button>
                    <button className="btn btn-primary" onClick={() => fileInputRef.current.click()}>
                        <IconUpload /> Upload File
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept=".xlsx, .xls, .csv"
                        style={{ display: "none" }}
                    />
                </div>
            </div>

            {data.length === 0 ? (
                <div
                    className="upload-placeholder animate-in"
                    onClick={() => fileInputRef.current.click()}
                >
                    <div className="upload-icon">
                        <IconFolder />
                    </div>
                    <h3>No Data Loaded</h3>
                    <p>Upload an Excel or CSV file to start analyzing, or download a template first.</p>
                    <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); fileInputRef.current.click(); }}>
                        <IconUpload /> Select File
                    </button>
                </div>
            ) : (
                <div className="custom-workspace animate-in">
                    {/* ─ Left Column: Config + Chart ─ */}
                    <div className="workspace-left">
                        {/* File info */}
                        {fileName && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                                <span style={{ fontWeight: 600 }}>📄 {fileName}</span>
                                <span style={{ color: 'var(--text-muted)' }}>·</span>
                                <span>{data.length} rows · {columns.length} columns</span>
                            </div>
                        )}

                        {/* Config Card */}
                        <div className="card config-card">
                            <h3>
                                <span style={{ color: "var(--accent-primary)" }}><IconBarChart /></span>
                                Chart Configuration
                            </h3>

                            <div className="config-grid">
                                <div className="form-group">
                                    <label>Chart Type</label>
                                    <div className="chart-type-selector">
                                        {CHART_TYPES.map(t => (
                                            <button
                                                key={t.id}
                                                className={`type-btn ${chartConfig.type === t.id ? "active" : ""}`}
                                                onClick={() => setChartConfig(c => ({ ...c, type: t.id }))}
                                                title={t.label}
                                            >
                                                {t.icon}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Chart Title</label>
                                    <input
                                        type="text"
                                        className="chart-title-input"
                                        value={chartConfig.title}
                                        onChange={(e) => setChartConfig(c => ({ ...c, title: e.target.value }))}
                                        placeholder="Enter chart title"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>X Axis (Category)</label>
                                    <select
                                        value={chartConfig.xAxis}
                                        onChange={(e) => setChartConfig(c => ({ ...c, xAxis: e.target.value }))}
                                    >
                                        {columns.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Y Axis (Value)</label>
                                    <select
                                        value={chartConfig.yAxis}
                                        onChange={(e) => setChartConfig(c => ({ ...c, yAxis: e.target.value }))}
                                    >
                                        {columns.map(c => (
                                            <option key={c} value={c}>
                                                {c} {numericColumns.includes(c) ? "📊" : ""}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Summary Stats */}
                        {stats && (
                            <div className="data-summary">
                                <div className="summary-stat">
                                    <div className="stat-value">{fmt(stats.total)}</div>
                                    <div className="stat-label">Total</div>
                                </div>
                                <div className="summary-stat">
                                    <div className="stat-value">{fmt(stats.avg)}</div>
                                    <div className="stat-label">Average</div>
                                </div>
                                <div className="summary-stat">
                                    <div className="stat-value">{fmt(stats.max)}</div>
                                    <div className="stat-label">Maximum</div>
                                </div>
                            </div>
                        )}

                        {/* Chart */}
                        <div className="card analysis-chart-card">
                            <div className="chart-header">
                                <h3>{chartConfig.title}</h3>
                                <span className="badge">{chartData.length} groups</span>
                            </div>
                            <div style={{ width: '100%', height: 320 }}>
                                <ResponsiveContainer>
                                    {renderChart()}
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="action-bar">
                            <button className="btn btn-outline" onClick={() => { setData([]); setColumns([]); setFileName(null); }}>
                                <IconTrash /> Clear Data
                            </button>
                            <button
                                className="btn btn-success"
                                onClick={ingestData}
                                disabled={ingesting}
                            >
                                {ingesting ? (
                                    <>
                                        <span className="spinner" /> Ingesting...
                                    </>
                                ) : (
                                    <>
                                        <IconArrowUp /> Append to System
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* ─ Right Column: Data Editor ─ */}
                    <div className="workspace-right">
                        <div className="card grid-card">
                            <div className="grid-header">
                                <h3>Data Editor</h3>
                                <button className="btn btn-sm btn-outline" onClick={addRow}>
                                    <IconPlus /> Add Row
                                </button>
                            </div>
                            <div className="table-wrapper">
                                <table className="custom-table">
                                    <thead>
                                        <tr>
                                            <th style={{ width: 40, textAlign: 'center' }}>#</th>
                                            {columns.map(c => <th key={c}>{c}</th>)}
                                            <th style={{ width: 40 }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((row, rIndex) => (
                                            <tr key={rIndex}>
                                                <td style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', padding: '0 8px' }}>
                                                    {rIndex + 1}
                                                </td>
                                                {columns.map(c => (
                                                    <td key={c}>
                                                        <input
                                                            type="text"
                                                            value={row[c] ?? ""}
                                                            onChange={(e) => handleCellChange(rIndex, c, e.target.value)}
                                                            className="cell-input"
                                                        />
                                                    </td>
                                                ))}
                                                <td>
                                                    <button
                                                        className="delete-row-btn"
                                                        onClick={() => removeRow(rIndex)}
                                                        title="Delete row"
                                                    >
                                                        <IconX />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomDataPage;
