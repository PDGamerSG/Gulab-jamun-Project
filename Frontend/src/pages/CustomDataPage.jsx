import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import {
    BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from "recharts";
import axios from "axios";

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
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
);
const IconX = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
);
const IconArrowUp = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></svg>
);

const CHART_TYPES = [
    { id: "bar", label: "Bar Chart", icon: <IconBarChart /> },
    { id: "line", label: "Line Chart", icon: <IconLineChart /> },
    { id: "area", label: "Area Chart", icon: <IconAreaChart /> },
    { id: "pie", label: "Pie Chart", icon: <IconPieChart /> },
];

const COLORS = ["#E85D75", "#FFB26B", "#E0C3FC", "#10b981", "#38bdf8", "#8b5cf6", "#fbbf24", "#f43f5e"];

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
                setColumns(Object.keys(rawData[0]));
                setData(rawData);

                const numKey = Object.keys(rawData[0]).find(k => typeof rawData[0][k] === 'number');
                const catKey = Object.keys(rawData[0]).find(k => typeof rawData[0][k] === 'string');
                setChartConfig(prev => ({
                    ...prev,
                    xAxis: catKey || Object.keys(rawData[0])[0],
                    yAxis: numKey || Object.keys(rawData[0])[1] || Object.keys(rawData[0])[0]
                }));
            }
        };
        reader.readAsBinaryString(file);
        // Reset input so same file can be re-uploaded
        e.target.value = "";
    };

    const handleCellChange = (rowIndex, col, value) => {
        const newData = [...data];

        const num = parseFloat(value);
        newData[rowIndex] = { ...newData[rowIndex], [col]: isNaN(num) ? value : num };
        setData(newData);
    };

    const addRow = () => {
        const newRow = {};
        columns.forEach(c => newRow[c] = "");
        setData([...data, newRow]);
    };

    const removeRow = (index) => {
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
    };

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
            // Notify all dashboard charts to refresh their data
            window.dispatchEvent(new Event("data-refresh"));
            alert("Analysis data successfully appended to system!");
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

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Custom Data Lab</h1>
                    <p className="page-subtitle">Upload Excel/CSV files, edit interactively, and generate custom visualizations</p>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <button className="btn btn-outline" onClick={downloadTemplate}><IconDownload /> Download Template</button>
                    <button className="btn btn-primary" onClick={() => fileInputRef.current.click()}><IconUpload /> Upload File</button>
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
                <div className="upload-placeholder animate-in">
                    <div className="upload-icon" style={{ color: "var(--text-muted)" }}><IconFolder /></div>
                    <h3>No Data Loaded</h3>
                    <p>Upload an Excel or CSV file to start analyzing.</p>
                    <button className="btn btn-primary" onClick={() => fileInputRef.current.click()}>Select File</button>
                </div>
            ) : (
                <div className="custom-workspace animate-in">
                    { }
                    <div className="workspace-left">
                        <div className="card config-card">
                            <h3 style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ color: "var(--accent-primary)" }}><IconBarChart /></span> Analysis Configuration
                            </h3>
                            <div className="config-grid">
                                <div className="form-group">
                                    <label>Chart Type</label>
                                    <div className="chart-type-selector">
                                        {CHART_TYPES.map(t => (
                                            <button
                                                key={t.id}
                                                className={`type-btn ${chartConfig.type === t.id ? "active" : ""}`}
                                                onClick={() => setChartConfig({ ...chartConfig, type: t.id })}
                                                title={t.label}
                                            >
                                                {t.icon}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>X Axis (Category)</label>
                                    <select
                                        value={chartConfig.xAxis}
                                        onChange={(e) => setChartConfig({ ...chartConfig, xAxis: e.target.value })}
                                    >
                                        {columns.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Y Axis (Value)</label>
                                    <select
                                        value={chartConfig.yAxis}
                                        onChange={(e) => setChartConfig({ ...chartConfig, yAxis: e.target.value })}
                                    >
                                        {columns.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="card analysis-chart-card">
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                                <h3>{chartConfig.title}</h3>
                                <span className="badge">{data.length} records</span>
                            </div>
                            <div style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                    {chartConfig.type === "bar" ? (
                                        <BarChart data={data}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                            <XAxis dataKey={chartConfig.xAxis} tick={{ fontSize: 11 }} />
                                            <YAxis tick={{ fontSize: 11 }} />
                                            <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                            <Bar dataKey={chartConfig.yAxis} fill="#E85D75" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    ) : chartConfig.type === "line" ? (
                                        <LineChart data={data}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                            <XAxis dataKey={chartConfig.xAxis} tick={{ fontSize: 11 }} />
                                            <YAxis tick={{ fontSize: 11 }} />
                                            <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                            <Line type="monotone" dataKey={chartConfig.yAxis} stroke="#E85D75" strokeWidth={3} dot={{ r: 4 }} />
                                        </LineChart>
                                    ) : chartConfig.type === "area" ? (
                                        <AreaChart data={data}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                            <XAxis dataKey={chartConfig.xAxis} tick={{ fontSize: 11 }} />
                                            <YAxis tick={{ fontSize: 11 }} />
                                            <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                            <Area type="monotone" dataKey={chartConfig.yAxis} stroke="#E85D75" fill="rgba(232, 93, 117, 0.2)" />
                                        </AreaChart>
                                    ) : (
                                        <PieChart>
                                            <Pie
                                                data={data} dataKey={chartConfig.yAxis} nameKey={chartConfig.xAxis}
                                                cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label
                                            >
                                                {data.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    )}
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
                            <button className="btn btn-outline" onClick={() => setData([])} style={{ flex: 1 }}>Clear All Data</button>
                            <button
                                className="btn btn-primary"
                                onClick={ingestData}
                                disabled={ingesting}
                                style={{ flex: 1, background: "linear-gradient(135deg, #10b981, #059669)" }}
                            >
                                {ingesting ? "Ingesting..." : <><IconArrowUp /> Append to System Data</>}
                            </button>
                        </div>
                    </div>

                    { }
                    <div className="workspace-right">
                        <div className="card grid-card">
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                                <h3>Data Editor</h3>
                                <button className="btn btn-sm btn-outline" onClick={addRow}>+ Add Row</button>
                            </div>
                            <div className="table-wrapper">
                                <table className="custom-table">
                                    <thead>
                                        <tr>
                                            {columns.map(c => <th key={c}>{c}</th>)}
                                            <th style={{ width: 40 }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((row, rIndex) => (
                                            <tr key={rIndex}>
                                                {columns.map(c => (
                                                    <td key={c}>
                                                        <input
                                                            type="text"
                                                            value={row[c] || ""}
                                                            onChange={(e) => handleCellChange(rIndex, c, e.target.value)}
                                                            className="cell-input"
                                                        />
                                                    </td>
                                                ))}
                                                <td>
                                                    <button
                                                        onClick={() => removeRow(rIndex)}
                                                        style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}
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
