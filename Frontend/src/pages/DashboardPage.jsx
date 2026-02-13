import { useState } from "react";
import KPICards from "../KPICards";
import RevenueChart from "../RevenueChart";
import CountryRevenueChart from "../CountryRevenueChart";
import WarehouseChart from "../WarehouseChart";
import CustomerSegmentationChart from "../CustomerSegmentationChart";
import CLVChart from "../CLVChart";
import PurchaseFrequencyChart from "../PurchaseFrequencyChart";
import DeliveryChart from "../DeliveryChart";
import DeliveryDelayWarehouseChart from "../DeliveryDelayWarehouseChart";
import SlowMovingProductsChart from "../SlowMovingProductsChart";
import StockRiskChart from "../StockRiskChart";
import SimulateOrderButton from "../SimulateOrderButton";

const IconGrid = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
);
const IconTrendUp = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
);
const IconUsers = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);
const IconTruck = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
);
const IconAlert = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
);

const TABS = [
    { id: "overview", label: "Overview", icon: <IconGrid /> },
    { id: "revenue", label: "Revenue & Sales", icon: <IconTrendUp /> },
    { id: "customer", label: "Customer Intelligence", icon: <IconUsers /> },
    { id: "operations", label: "Operations", icon: <IconTruck /> },
];

function DashboardPage() {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Analytics Dashboard</h1>
                    <p className="page-subtitle">Real-time KPIs, revenue trends, and operational insights</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div className="live-badge">
                        <span className="live-dot" />
                        Live
                    </div>
                    <SimulateOrderButton />
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="tab-nav">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <span className="tab-icon">{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
                <div className="animate-in">
                    <section className="dashboard-section">
                        <div className="section-title">
                            <span className="icon" style={{ background: "rgba(232,93,117,0.08)", color: "#E85D75" }}>
                                <IconGrid />
                            </span>
                            Executive Summary
                        </div>
                        <KPICards />
                    </section>

                    <section className="dashboard-section">
                        <div className="section-title">
                            <span className="icon" style={{ background: "rgba(255,178,107,0.12)", color: "#FFB26B" }}>
                                <IconTrendUp />
                            </span>
                            Revenue Trend
                        </div>
                        <div className="card chart-card animate-in">
                            <h3>Monthly Revenue</h3>
                            <RevenueChart />
                        </div>
                    </section>

                    <section className="dashboard-section">
                        <div className="charts-grid">
                            <div className="card chart-card animate-in">
                                <h3>New vs Returning Customers</h3>
                                <CustomerSegmentationChart />
                            </div>
                            <div className="card chart-card animate-in">
                                <h3>Delivery Performance</h3>
                                <DeliveryChart />
                            </div>
                        </div>
                    </section>

                    {/* Quick stock alert on overview */}
                    <section className="dashboard-section">
                        <div className="section-title">
                            <span className="icon" style={{ background: "rgba(232,93,117,0.08)", color: "#E85D75" }}>
                                <IconAlert />
                            </span>
                            Stock-Out Risk Alert
                        </div>
                        <div className="card chart-card animate-in">
                            <h3>High Demand Products — Monitor Stock Levels</h3>
                            <StockRiskChart />
                        </div>
                    </section>
                </div>
            )}

            {/* Revenue Tab */}
            {activeTab === "revenue" && (
                <div className="animate-in">
                    <section className="dashboard-section">
                        <div className="section-title">
                            <span className="icon" style={{ background: "rgba(255,178,107,0.12)", color: "#FFB26B" }}>
                                <IconTrendUp />
                            </span>
                            Revenue Analytics
                        </div>
                        <div className="charts-grid">
                            <div className="card chart-card full-width animate-in">
                                <h3>Monthly Revenue Trend</h3>
                                <RevenueChart />
                            </div>
                            <div className="card chart-card animate-in">
                                <h3>Revenue by Country</h3>
                                <CountryRevenueChart />
                            </div>
                            <div className="card chart-card animate-in">
                                <h3>Warehouse Sales Performance</h3>
                                <WarehouseChart />
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {/* Customer Tab */}
            {activeTab === "customer" && (
                <div className="animate-in">
                    <section className="dashboard-section">
                        <div className="section-title">
                            <span className="icon" style={{ background: "rgba(224,195,252,0.2)", color: "#c9a0f0" }}>
                                <IconUsers />
                            </span>
                            Customer Intelligence
                        </div>
                        <div className="charts-grid">
                            <div className="card chart-card animate-in">
                                <h3>New vs Returning Customers</h3>
                                <CustomerSegmentationChart />
                            </div>
                            <div className="card chart-card animate-in">
                                <h3>Delivery Performance</h3>
                                <DeliveryChart />
                            </div>
                            <div className="card chart-card animate-in">
                                <h3>Top Customers by Lifetime Value</h3>
                                <CLVChart />
                            </div>
                            <div className="card chart-card animate-in">
                                <h3>Purchase Frequency (Top 10)</h3>
                                <PurchaseFrequencyChart />
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {/* Operations Tab */}
            {activeTab === "operations" && (
                <div className="animate-in">
                    <section className="dashboard-section">
                        <div className="section-title">
                            <span className="icon" style={{ background: "rgba(232,93,117,0.08)", color: "#E85D75" }}>
                                <IconTruck />
                            </span>
                            Operations &amp; Supply Chain
                        </div>
                        <div className="charts-grid">
                            <div className="card chart-card full-width animate-in">
                                <h3>Delivery Delay by Warehouse</h3>
                                <DeliveryDelayWarehouseChart />
                            </div>
                            <div className="card chart-card animate-in">
                                <h3>Slow-Moving Products</h3>
                                <SlowMovingProductsChart />
                            </div>
                            <div className="card chart-card animate-in">
                                <h3>Stock-Out Risk (High Demand)</h3>
                                <StockRiskChart />
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </div >
    );
}

export default DashboardPage;
