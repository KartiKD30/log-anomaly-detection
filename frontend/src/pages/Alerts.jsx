import { useEffect, useState } from "react";

function Alerts() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("severity");

  useEffect(() => {
    setLoading(true);
    fetch("http://127.0.0.1:8000/api/logs/")
      .then(res => res.json())
      .then(data => {
        const anomalies = data.results?.filter(l => l.anomaly === -1) || [];
        setLogs(anomalies);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const sortedLogs = [...logs].sort((a, b) => {
    if (sortBy === "severity") {
      return b.severity - a.severity;
    } else {
      return new Date(b.timestamp) - new Date(a.timestamp);
    }
  });

  const getSeverityColor = (severity) => {
    if (severity > 0.7) return '#ff4b4b';
    if (severity > 0.4) return '#ffb84d';
    return '#4caf50';
  };

  const getSeverityLabel = (severity) => {
    if (severity > 0.7) return 'Critical';
    if (severity > 0.4) return 'Medium';
    return 'Low';
  };

  return (
    <div>
      {/* ALERT BAR */}
      <div className="alert-bar">
        <div className="alert-bar-icon">🚨</div>
        <div className="alert-bar-content">
          <div className="alert-bar-title">Anomaly Alerts</div>
          <div className="alert-bar-message">
            View all detected anomalies in your system
          </div>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="cards">
        <div className="card">
          <p>🚨 Total Anomalies</p>
          <h2 className="pink">{logs.length}</h2>
        </div>

        <div className="card">
          <p>⚠️ Critical</p>
          <h2 className="pink">{logs.filter(l => l.severity > 0.7).length}</h2>
        </div>

        <div className="card">
          <p>🟡 Medium</p>
          <h2>{logs.filter(l => l.severity > 0.4 && l.severity <= 0.7).length}</h2>
        </div>

        <div className="card">
          <p>✓ Low Priority</p>
          <h2>{logs.filter(l => l.severity <= 0.4).length}</h2>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3>📋 All Anomalies</h3>
          <div style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center'
          }}>
            <label style={{ fontSize: '13px', color: '#666', fontWeight: '500' }}>Sort by:</label>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '6px 10px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '13px',
                color: '#333',
                cursor: 'pointer',
                background: '#f9f9f9'
              }}
            >
              <option value="severity">Severity (High to Low)</option>
              <option value="time">Time (Newest First)</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#999' }}>Loading anomalies...</p>
        ) : logs.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#999'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>✅</div>
            <p style={{ fontSize: '16px', fontWeight: '500' }}>No anomalies detected!</p>
            <p style={{ fontSize: '13px' }}>Your system is running smoothly</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Severity</th>
                <th>Time</th>
                <th>Message</th>
                <th>Level</th>
                <th>Score</th>
              </tr>
            </thead>

            <tbody>
              {sortedLogs.map((log, i) => (
                <tr key={i} style={{
                  borderLeft: `4px solid ${getSeverityColor(log.severity)}`
                }}>
                  <td>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <div style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: getSeverityColor(log.severity)
                      }}></div>
                      <span style={{
                        fontWeight: '600',
                        color: getSeverityColor(log.severity)
                      }}>
                        {getSeverityLabel(log.severity)}
                      </span>
                    </div>
                  </td>

                  <td>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {new Date(log.timestamp).toLocaleString()}
                    </div>
                  </td>

                  <td style={{ maxWidth: '300px' }}>
                    <div style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {log.message}
                    </div>
                  </td>

                  <td>
                    <span className={`badge ${log.level.toLowerCase()}`}>
                      {log.level}
                    </span>
                  </td>

                  <td>
                    <strong style={{
                      color: getSeverityColor(log.severity),
                      fontSize: '14px'
                    }}>
                      {(log.severity * 100).toFixed(1)}%
                    </strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Alerts;