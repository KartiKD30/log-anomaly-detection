import { useEffect, useState } from "react";

function Dashboard() {
  const [logs, setLogs] = useState([]);
  const [filterLevel, setFilterLevel] = useState("ALL");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [onlyAnomaly, setOnlyAnomaly] = useState(false);

  // -------------------------------
  // Fetch logs from backend
  // -------------------------------
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/logs/")
      .then(res => res.json())
      .then(data => setLogs(data.results || []));
  }, []);

  // -------------------------------
  // Filtering + Sorting Logic
  // -------------------------------
  const filteredLogs = logs
    .filter(log => {
      // Level filter
      if (filterLevel !== "ALL" && log.level !== filterLevel) return false;

      // Only anomalies toggle
      if (onlyAnomaly && log.anomaly !== -1) return false;

      // Search filter
      if (search && !log.message.toLowerCase().includes(search.toLowerCase()))
        return false;

      // Date filter
      if (startDate && new Date(log.timestamp) < new Date(startDate))
        return false;

      if (endDate && new Date(log.timestamp) > new Date(endDate))
        return false;

      return true;
    })
    .sort((a, b) => {
      if (sortOrder === "latest")
        return new Date(b.timestamp) - new Date(a.timestamp);
      else
        return new Date(a.timestamp) - new Date(b.timestamp);
    });

  // Stats
  const totalLogs = filteredLogs.length;
  const anomalies = filteredLogs.filter(l => l.anomaly === -1).length;

  return (
    <div className="container mt-4">

      {/* TITLE */}
      <h2 className="text-white mb-4">📊 Dashboard</h2>

      {/* ---------------- FILTERS ---------------- */}
      <div className="mb-3 text-white">

        {/* Level Filter */}
        <label>Level:</label>
        <select
          className="form-select w-auto d-inline ms-2"
          onChange={(e) => setFilterLevel(e.target.value)}
        >
          <option value="ALL">All</option>
          <option value="INFO">INFO</option>
          <option value="WARNING">WARNING</option>
          <option value="ERROR">ERROR</option>
        </select>

        {/* Only anomaly toggle */}
        <label className="ms-3">
          <input
            type="checkbox"
            onChange={(e) => setOnlyAnomaly(e.target.checked)}
          /> Only Anomalies
        </label>
      </div>

      {/* ---------------- SEARCH + DATE + SORT ---------------- */}
      <div className="row mb-3">

        {/* Search */}
        <div className="col-md-3">
          <input
            type="text"
            placeholder="Search logs..."
            className="form-control"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Start Date */}
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        {/* End Date */}
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* Sort */}
        <div className="col-md-3">
          <select
            className="form-select"
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

      </div>

      {/* ---------------- STATS ---------------- */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card p-3 shadow">
            <h5>Total Logs</h5>
            <h3>{totalLogs}</h3>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3 shadow">
            <h5>Anomalies</h5>
            <h3 className="text-danger">{anomalies}</h3>
          </div>
        </div>
      </div>

      {/* ---------------- TABLE ---------------- */}
      <div className="card p-3 shadow">

        <table className="table table-hover">

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
            {filteredLogs.map((log, index) => (
              <tr
                key={index}
                className={
                  log.level === "ERROR"
                    ? "table-danger"
                    : log.level === "WARNING"
                    ? "table-warning"
                    : ""
                }
              >

                {/* TIME */}
                <td>{log.timestamp}</td>

                {/* LEVEL (COLORED BADGE) */}
                <td>
                  <span
                    className={
                      log.level === "ERROR"
                        ? "badge bg-danger"
                        : log.level === "WARNING"
                        ? "badge bg-warning text-dark"
                        : "badge bg-success"
                    }
                  >
                    {log.level}
                  </span>
                </td>

                {/* MESSAGE */}
                <td>{log.message}</td>

                {/* STATUS */}
                <td>
                  {log.anomaly === -1 ? "🚨 Anomaly" : "Normal"}
                </td>

                {/* SEVERITY */}
                <td>{log.severity?.toFixed(3)}</td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Dashboard;