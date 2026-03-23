import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Upload from "./pages/Upload";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import History from "./pages/History";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Alerts from "./pages/Alerts";

function App() {
  return (
    <BrowserRouter>

      {/*  NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark px-4 shadow custom-navbar">
        <div className="container-fluid">

          <span className="navbar-brand fw-bold fs-4">⚡ LDS</span>

          <div className="ms-auto">
            <Link className="nav-btn" to="/">Upload</Link>
            <Link className="nav-btn" to="/dashboard">Dashboard</Link>
            <Link className="nav-btn" to="/analytics">Analytics</Link>
            <Link className="nav-btn" to="/alerts">Alerts</Link>
            <Link className="nav-btn" to="/history">History</Link>
          </div>

        </div>
      </nav>

      {/*  HERO */}
      <div className="hero">
        <h1>LDS - Log Anomaly Detection</h1>
        <p>Analyze, detect, and monitor logs using AI</p>
      </div>

      {/*  MAIN CONTENT  */}
      <div className="container-fluid px-5 mt-4">
        <Routes>
          <Route path="/" element={<Upload />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;