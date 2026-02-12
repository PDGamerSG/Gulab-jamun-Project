import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ArchitecturePage from "./pages/ArchitecturePage";
import DataQualityPage from "./pages/DataQualityPage";
import StorageSecurityPage from "./pages/StorageSecurityPage";
import CustomDataPage from "./pages/CustomDataPage";
import "./CustomData.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/architecture" element={<ArchitecturePage />} />
        <Route path="/data-quality" element={<DataQualityPage />} />
        <Route path="/storage-security" element={<StorageSecurityPage />} />
        <Route path="/custom-data" element={<CustomDataPage />} />
      </Routes>
      <footer className="site-footer">
        <span className="footer-brand">Gulabjamun</span>
        {" · "}Smart Retail Supply Chain &amp; Customer Intelligence Platform · © 2026
      </footer>
    </BrowserRouter>
  );
}

export default App;
