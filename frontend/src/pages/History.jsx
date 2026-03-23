import { useEffect, useState } from "react";

function History() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/logs/")
      .then(res => res.json())
      .then(data => setLogs(data.results || []));
  }, []);

  return (
    <div className="container mt-4">

      <h3 className="mb-3">📜 Log History</h3>

      <div className="card p-3 shadow">
        <table className="table table-hover">

          <thead>
            <tr>
              <th>Time</th>
              <th>Level</th>
              <th>Message</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log, i) => (
              <tr key={i} className={log.anomaly === -1 ? "table-danger" : ""}>
                <td>{log.timestamp}</td>
                <td>{log.level}</td>
                <td>{log.message}</td>
                <td>{log.anomaly === -1 ? "🚨 Anomaly" : "Normal"}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default History;