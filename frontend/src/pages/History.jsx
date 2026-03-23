import { useEffect, useState } from "react";

function History() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://127.0.0.1:8000/api/logs/")
      .then(res => res.json())
      .then(data => {
        setLogs(data.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* ALERT BAR */}
      <div className="alert-bar">
        <div className="alert-bar-icon">📜</div>
        <div className="alert-bar-content">
          <div className="alert-bar-title">Log History</div>
          <div className="alert-bar-message">
            Complete history of all monitored logs
          </div>
        </div>
      </div>

      <div className="table-container">
        <h3>📜 Log History</h3>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#999' }}>Loading history...</p>
        ) : logs.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999' }}>No logs available</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Level</th>
                <th>Message</th>
                <th>Status</th>
                <th>Severity</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log, i) => (
                <tr key={i} style={{
                  background: log.anomaly === -1 ? 'rgba(238, 42, 104, 0.05)' : 'transparent'
                }}>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                  <td>
                    <span className={`badge ${log.level.toLowerCase()}`}>
                      {log.level}
                    </span>
                  </td>
                  <td>{log.message.substring(0, 60)}...</td>
                  <td>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      background: log.anomaly === -1 ? 'rgba(238, 42, 104, 0.1)' : 'rgba(76, 175, 80, 0.1)',
                      color: log.anomaly === -1 ? '#ee2a68' : '#4caf50'
                    }}>
                      {log.anomaly === -1 ? '⚠️ Anomaly' : '✓ Normal'}
                    </span>
                  </td>
                  <td>
                    <strong style={{ color: log.severity > 0.7 ? '#ee2a68' : log.severity > 0.4 ? '#ffb84d' : '#4caf50' }}>
                      {log.severity?.toFixed(2)}
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

export default History;