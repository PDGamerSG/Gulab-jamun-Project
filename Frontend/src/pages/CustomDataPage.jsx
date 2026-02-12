import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import {
    BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from "recharts";
import axios from "axios";

const CHART_TYPES = [
    { id: "bar", label: "Bar Chart", icon: "📊" },
    { id: "line", label: "Line Chart", icon: "📈" },
    { id: "area", label: "Area Chart", icon: "🏔️" },
    { id: "pie", label: "Pie Chart", icon: "🍰" },
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
                    <button className="btn btn-outline" onClick={downloadTemplate}>📥 Download Template</button>
                    <button className="btn btn-primary" onClick={() => fileInputRef.current.click()}>📤 Upload File</button>
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
                    <div className="upload-icon">📂</div>
                    <h3>No Data Loaded</h3>
                    <p>Upload an Excel or CSV file to start analyzing.</p>
                    <button className="btn btn-primary" onClick={() => fileInputRef.current.click()}>Select File</button>
                </div>
            ) : (
                <div className="custom-workspace animate-in">
                    {}
                    <div className="workspace-left">
                        <div className="card config-card">
                            <h3>📊 Analysis Configuration</h3>
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
                                {ingesting ? "Ingesting..." : "Append to System Data 🚀"}
                            </button>
                        </div>
                    </div>

                    {}
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
                                                        style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', padding: 4 }}
                                                    >
                                                        ❌
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
