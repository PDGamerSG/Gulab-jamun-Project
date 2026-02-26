import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Sidebar from "./components/Sidebar";
import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ArchitecturePage from "./pages/ArchitecturePage";
import DataQualityPage from "./pages/DataQualityPage";
import StorageSecurityPage from "./pages/StorageSecurityPage";
import CustomDataPage from "./pages/CustomDataPage";
import AIChatPage from "./pages/AIChatPage";
import "./CustomData.css";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

function AppLayout() {
  const { isAuthenticated } = useAuth();

  return (
    <div className={`app-shell ${isAuthenticated ? "with-sidebar" : ""}`}>
      {isAuthenticated && <Sidebar />}
      <main className="app-main">
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/architecture" element={<ProtectedRoute><ArchitecturePage /></ProtectedRoute>} />
          <Route path="/data-quality" element={<ProtectedRoute><DataQualityPage /></ProtectedRoute>} />
          <Route path="/storage-security" element={<ProtectedRoute><StorageSecurityPage /></ProtectedRoute>} />
          <Route path="/custom-data" element={<ProtectedRoute><CustomDataPage /></ProtectedRoute>} />
          <Route path="/ai-chat" element={<ProtectedRoute><AIChatPage /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
