import { useEffect, useState } from "react";

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/logs/")
      .then(res => res.json())
      .then(data => {

        const anomalies = data.results.filter(l => l.anomaly === -1);

        // Sort highest severity first
        anomalies.sort((a, b) => b.severity - a.severity);

        setAlerts(anomalies);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h3>🚨 Anomaly Alerts</h3>

      <div className="card p-3 shadow mt-3">
        <table className="table table-hover">

          <thead>
            <tr>
              <th>Time</th>
              <th>Level</th>
              <th>Message</th>
              <th>Severity</th>
            </tr>
          </thead>

          <tbody>
            {alerts.map((log, i) => (
              <tr key={i} className="table-danger">
                <td>{log.timestamp}</td>
                <td>{log.level}</td>
                <td>{log.message}</td>
                <td>{log.severity.toFixed(3)}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default Alerts;