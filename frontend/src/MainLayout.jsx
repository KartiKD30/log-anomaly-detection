import { useEffect, useState } from "react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Analytics from "./pages/Analytics";
import History from "./pages/History";
import Alerts from "./pages/Alerts";

function MainLayout({ onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState(null);
  const [alertCount, setAlertCount] = useState(0);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/logs/");
        const data = await response.json();
        const logs = data.results || [];
        
        if (logs.length > 0) {
          // Get the latest log with highest severity
          const latestAnomaly = logs
            .filter(l => l.anomaly === -1)
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
          
          const totalAnomalies = logs.filter(l => l.anomaly === -1).length;
          setAlertCount(totalAnomalies);
          
          if (latestAnomaly) {
            setAlerts({
              severity: Math.round(latestAnomaly.severity * 100),
              time: new Date(latestAnomaly.timestamp),
              message: latestAnomaly.message
            });
          }
        }
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const isActive = (path) => location.pathname === path ? "active" : "";

  const getSeverityColor = (severity) => {
    if (severity > 70) return '#ff4b4b'; // Red
    if (severity > 40) return '#ffb84d'; // Orange
    return '#4caf50'; // Green
  };

  const getTimeAgo = (time) => {
    const now = new Date();
    const diff = Math.floor((now - time) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return time.toLocaleDateString();
  };

  return (
    <div className="layout">
      <div className="sidebar">
        <div className="logo">
          <h2>🔍 LDS</h2>
        </div>

        <nav>
          <Link to="/upload" className={isActive("/upload")}>
            📤 Upload
          </Link>
          <Link to="/" className={isActive("/")}>
            📊 Dashboard
          </Link>
          <Link to="/analytics" className={isActive("/analytics")}>
            📈 Analytics
          </Link>
          <Link to="/alerts" className={isActive("/alerts")}>
            🚨 Alerts
          </Link>
          <Link to="/history" className={isActive("/history")}>
            📋 History
          </Link>
        </nav>

        {/* ALERT BADGE */}
        {alerts && (
          <div 
            onClick={() => navigate('/alerts')}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '12px',
              padding: '14px',
              marginBottom: '20px',
              backdropFilter: 'blur(10px)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(238, 42, 104, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '10px'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: getSeverityColor(alerts.severity),
                boxShadow: `0 0 8px ${getSeverityColor(alerts.severity)}`,
                animation: 'pulse 2s infinite'
              }}></div>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#fff' }}>
                Alert Detected
              </span>
            </div>
            
            <div style={{
              background: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '8px',
              padding: '10px',
              fontSize: '11px',
              color: '#fff',
              lineHeight: '1.4'
            }}>
              <div style={{ fontWeight: '600', marginBottom: '6px' }}>
                Severity: <span style={{ color: getSeverityColor(alerts.severity) }}>
                  {alerts.severity}%
                </span>
              </div>
              <div style={{ color: '#ddd', marginBottom: '6px' }}>
                {alerts.message.substring(0, 45)}...
              </div>
              <div style={{ color: '#aaa', fontSize: '10px' }}>
                {getTimeAgo(alerts.time)}
              </div>
            </div>

            {alertCount > 0 && (
              <div 
                onClick={() => navigate('/alerts')}
                style={{
                  marginTop: '10px',
                  padding: '8px',
                  background: 'rgba(255, 75, 75, 0.2)',
                  borderRadius: '6px',
                  textAlign: 'center',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#ffcdd2',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255, 75, 75, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 75, 75, 0.35)';
                  e.target.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 75, 75, 0.2)';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                {alertCount} anomalies detected
              </div>
            )}
          </div>
        )}

        <button onClick={onLogout}>🚪 Logout</button>
      </div>

      <div className="main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}

export default MainLayout;