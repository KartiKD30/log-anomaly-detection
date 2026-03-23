import { useEffect, useState } from "react";

function Dashboard() {
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

  const totalLogs = logs.length;
  const anomaliesCount = logs.filter(l => l.anomaly === -1).length;
  const errorsCount = logs.filter(l => l.level === "ERROR").length;
  const anomalyPercent = totalLogs > 0 ? ((anomaliesCount / totalLogs) * 100).toFixed(1) : 0;
  const errorPercent = totalLogs > 0 ? ((errorsCount / totalLogs) * 100).toFixed(1) : 0;

  const getSeverityColor = (severity) => {
    if (severity > 0.7) return '#ff4b4b'; // Red
    if (severity > 0.4) return '#ffb84d'; // Orange
    return '#4caf50'; // Green
  };

  const getSeverityLabel = (severity) => {
    if (severity > 0.7) return 'Critical';
    if (severity > 0.4) return 'Medium';
    return 'Low';
  };

  const getLevelBadgeStyle = (level) => {
    const colors = {
      'ERROR': '#ff4b4b',
      'WARNING': '#ffb84d',
      'INFO': '#4caf50',
      'DEBUG': '#2196F3',
    };
    return {
      background: colors[level] || '#999',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '10px',
      fontWeight: '600'
    };
  };

  return (
    <div style={{ padding: '25px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* ALERT BAR */}
      <div style={{
        background: 'linear-gradient(135deg, #ee2a68 0%, #ff4b7d 100%)',
        borderRadius: '15px',
        padding: '20px',
        marginBottom: '25px',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        boxShadow: '0 8px 24px rgba(238, 42, 104, 0.25)'
      }}>
        <span style={{ fontSize: '24px' }}>📊</span>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>LDS Dashboard</h2>
      </div>

      {/* SUMMARY CARDS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {/* Total Logs Card */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '15px',
          padding: '20px',
          color: 'white',
          boxShadow: '0 8px 24px rgba(102, 126, 234, 0.2)'
        }}>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', marginBottom: '8px' }}>
            TOTAL LOGS
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
            {totalLogs}
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>
            All system logs
          </div>
        </div>

        {/* Anomalies Card */}
        <div style={{
          background: 'linear-gradient(135deg, #ee2a68 0%, #ff4b7d 100%)',
          borderRadius: '15px',
          padding: '20px',
          color: 'white',
          boxShadow: '0 8px 24px rgba(238, 42, 104, 0.2)'
        }}>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', marginBottom: '8px' }}>
            ANOMALIES DETECTED
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
            {anomaliesCount}
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>
            {anomalyPercent}% of logs
          </div>
        </div>

        {/* Errors Card */}
        <div style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          borderRadius: '15px',
          padding: '20px',
          color: 'white',
          boxShadow: '0 8px 24px rgba(245, 87, 108, 0.2)'
        }}>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', marginBottom: '8px' }}>
            ERROR COUNT
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
            {errorsCount}
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>
            {errorPercent}% of logs
          </div>
        </div>
      </div>

      {/* RECENT LOGS TABLE */}
      <div style={{
        background: 'white',
        borderRadius: '15px',
        padding: '25px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(0, 0, 0, 0.05)'
      }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#333' }}>
          📋 Recent Logs
        </h3>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#999', padding: '40px 0' }}>Loading logs...</p>
        ) : logs.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999', padding: '40px 0' }}>No logs available</p>
        ) : (
          <div style={{
            overflowX: 'auto',
            borderRadius: '10px',
            border: '1px solid rgba(0, 0, 0, 0.08)'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '13px'
            }}>
              <thead>
                <tr style={{ background: 'rgba(238, 42, 104, 0.08)', borderBottom: '2px solid #ee2a68' }}>
                  <th style={{ padding: '14px 12px', textAlign: 'left', fontWeight: '600', color: '#333' }}>Timestamp</th>
                  <th style={{ padding: '14px 12px', textAlign: 'left', fontWeight: '600', color: '#333' }}>Level</th>
                  <th style={{ padding: '14px 12px', textAlign: 'left', fontWeight: '600', color: '#333' }}>Message</th>
                  <th style={{ padding: '14px 12px', textAlign: 'center', fontWeight: '600', color: '#333' }}>Anomaly</th>
                  <th style={{ padding: '14px 12px', textAlign: 'center', fontWeight: '600', color: '#333' }}>Severity</th>
                </tr>
              </thead>
              <tbody>
                {logs.slice(0, 10).map((log, idx) => (
                  <tr 
                    key={idx}
                    style={{
                      borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                      background: log.anomaly === -1 ? 'rgba(238, 42, 104, 0.05)' : 'white',
                      transition: 'background 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = log.anomaly === -1 ? 'rgba(238, 42, 104, 0.12)' : 'rgba(0, 0, 0, 0.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = log.anomaly === -1 ? 'rgba(238, 42, 104, 0.05)' : 'white';
                    }}
                  >
                    <td style={{ padding: '12px', color: '#555' }}>
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={getLevelBadgeStyle(log.level)}>
                        {log.level}
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: '#666', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {log.message}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center', color: log.anomaly === -1 ? '#ee2a68' : '#4caf50', fontWeight: '600' }}>
                      {log.anomaly === -1 ? '🚨 Yes' : '✓ No'}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <span style={{
                        background: getSeverityColor(log.severity),
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '600',
                        display: 'inline-block'
                      }}>
                        {getSeverityLabel(log.severity)} ({(log.severity * 100).toFixed(0)}%)
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;