import { useEffect, useState } from "react";
import "./Dashboard.css"; 

function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [levelFilter, setLevelFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("http://127.0.0.1:8000/api/logs/")
      .then(res => res.json())
      .then(data => {
        const logsData = data.results || [];
        setLogs(logsData);
        setFilteredLogs(logsData);
        setLoading(false);
      })
      .catch(() => {
        setLogs([]);
        setFilteredLogs([]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let temp = [...logs];

    if (levelFilter !== "ALL") {
      temp = temp.filter(log => log.level === levelFilter);
    }

    if (dateFilter) {
      temp = temp.filter(log =>
        log.timestamp.startsWith(dateFilter)
      );
    }

    temp.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    setFilteredLogs(temp);
  }, [logs, levelFilter, dateFilter]);

  const totalLogs = filteredLogs.length;
  const anomaliesCount = filteredLogs.filter(l => l.anomaly === -1).length;
  const errorsCount = filteredLogs.filter(l => l.level === "ERROR").length;

  return (
    <div className="dashboard"> {/* ✅ ORIGINAL CLASS RESTORED */}

      <h2>📊 Dashboard</h2>

      {/* FILTERS */}
      <div style={{ marginBottom: "15px" }}>
        <select onChange={e => setLevelFilter(e.target.value)}>
          <option value="ALL">All Levels</option>
          <option value="INFO">INFO</option>
          <option value="WARNING">WARNING</option>
          <option value="ERROR">ERROR</option>
        </select>

        <input
          type="date"
          onChange={e => setDateFilter(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
      </div>

      {/* CARDS */}
      <div className="cards">
        <div className="card">
          <p>Total Logs</p>
          <h2>{totalLogs}</h2>
        </div>

        <div className="card">
          <p>Anomalies</p>
          <h2 className="pink">{anomaliesCount}</h2>
        </div>

        <div className="card">
          <p>Errors</p>
          <h2>{errorsCount}</h2>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-container">
        {loading ? (
          <p>Loading...</p>
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
              {filteredLogs.map((log, i) => {
                const severity = log.severity || 0;

                return (
                  <tr key={i}>
                    <td>{new Date(log.timestamp).toLocaleString()}</td>

                    <td>
                      <span className={`badge ${log.level.toLowerCase()}`}>
                        {log.level}
                      </span>
                    </td>

                    <td>{log.message}</td>

                    <td>
                      <span className={
                        log.anomaly === -1 ? "danger" : "normal"
                      }>
                        {log.anomaly === -1 ? "Anomaly" : "Normal"}
                      </span>
                    </td>

                    <td>
                      <strong>
                        {(severity * 100).toFixed(1)}%
                      </strong>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;