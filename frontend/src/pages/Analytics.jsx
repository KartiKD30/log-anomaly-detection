import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function Analytics() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/logs/")
      .then(res => res.json())
      .then(data => setLogs(data.results || []));
  }, []);

  if (!logs.length) return <h4>No Data</h4>;

  // 🔥 1. LOG VOLUME OVER TIME
  const timeMap = {};
  logs.forEach(l => {
    const hour = new Date(l.timestamp).getHours();
    timeMap[hour] = (timeMap[hour] || 0) + 1;
  });

  const volumeData = {
    labels: Object.keys(timeMap),
    datasets: [{
      label: "Logs per Hour",
      data: Object.values(timeMap),
      borderColor: "#0d6efd"
    }]
  };

  // 🔥 2. ERROR DISTRIBUTION
  const info = logs.filter(l => l.level === "INFO").length;
  const warn = logs.filter(l => l.level === "WARNING").length;
  const err = logs.filter(l => l.level === "ERROR").length;

  const errorData = {
    labels: ["INFO", "WARNING", "ERROR"],
    datasets: [{
      label: "Log Levels",
      data: [info, warn, err],
      backgroundColor: ["#0d6efd", "orange", "red"]
    }]
  };

  // 🔥 3. ANOMALY TREND
  const anomalyMap = {};
  logs.forEach(l => {
    const hour = new Date(l.timestamp).getHours();
    if (l.anomaly === -1) {
      anomalyMap[hour] = (anomalyMap[hour] || 0) + 1;
    }
  });

  const anomalyTrend = {
    labels: Object.keys(anomalyMap),
    datasets: [{
      label: "Anomalies over Time",
      data: Object.values(anomalyMap),
      borderColor: "red"
    }]
  };

  // 🔥 4. SERVICE LEVEL (using message first word)
  const serviceMap = {};
  logs.forEach(l => {
    const service = l.message.split(" ")[0];
    serviceMap[service] = (serviceMap[service] || 0) + 1;
  });

  const serviceData = {
    labels: Object.keys(serviceMap),
    datasets: [{
      label: "Service Activity",
      data: Object.values(serviceMap),
      backgroundColor: "#20c997"
    }]
  };

  // 🔥 5. ANOMALY SUMMARY
  const anomalies = logs.filter(l => l.anomaly === -1).length;

  return (
    <div className="container mt-4">

      {/* ALERT */}
      <div className="alert alert-danger">
        🚨 Total Anomalies Detected: {anomalies}
      </div>

      <div className="row">

        <div className="col-md-6 mb-4">
          <div className="card p-3 shadow">
            <h5>📈 Log Volume Over Time</h5>
            <Line data={volumeData} />
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card p-3 shadow">
            <h5>🚨 Anomaly Trend</h5>
            <Line data={anomalyTrend} />
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card p-3 shadow">
            <h5>📊 Error Distribution</h5>
            <Bar data={errorData} />
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card p-3 shadow">
            <h5>🧠 Service Activity</h5>
            <Bar data={serviceData} />
          </div>
        </div>

      </div>

    </div>
  );
}

export default Analytics;