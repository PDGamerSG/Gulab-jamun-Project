import { useState } from "react";
import axios from "axios";
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

const TABS = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "revenue", label: "Revenue & Sales", icon: "📈" },
    { id: "customer", label: "Customer Intelligence", icon: "👥" },
    { id: "operations", label: "Operations", icon: "🚚" },
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


            {}
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

            {}
            {
                activeTab === "overview" && (
                    <div className="animate-in">
                        <section className="dashboard-section">
                            <div className="section-title">
                                <span className="icon" style={{ background: "rgba(232,93,117,0.08)" }}>📊</span>
                                Executive Summary
                            </div>
                            <KPICards />
                        </section>

                        <section className="dashboard-section">
                            <div className="section-title">
                                <span className="icon" style={{ background: "rgba(255,178,107,0.12)" }}>📈</span>
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
                    </div>
                )
            }

            {
                activeTab === "revenue" && (
                    <div className="animate-in">
                        <section className="dashboard-section">
                            <div className="section-title">
                                <span className="icon" style={{ background: "rgba(255,178,107,0.12)" }}>📈</span>
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
                )
            }

            {
                activeTab === "customer" && (
                    <div className="animate-in">
                        <section className="dashboard-section">
                            <div className="section-title">
                                <span className="icon" style={{ background: "rgba(224,195,252,0.2)" }}>👥</span>
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
                )
            }

            {
                activeTab === "operations" && (
                    <div className="animate-in">
                        <section className="dashboard-section">
                            <div className="section-title">
                                <span className="icon" style={{ background: "rgba(232,93,117,0.08)" }}>🚚</span>
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
                )
            }
        </div >
    );
}

export default DashboardPage;
