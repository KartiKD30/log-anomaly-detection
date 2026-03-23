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

  if (loading) return <p style={{ textAlign: 'center', color: '#999', marginTop: '40px' }}>📊 Loading analytics...</p>;
  if (!logs.length) return <p style={{ textAlign: 'center', color: '#999', marginTop: '40px' }}>No data available</p>;

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
      borderColor: "#ee2a68",
      backgroundColor: "rgba(238, 42, 104, 0.1)",
      borderWidth: 3,
      tension: 0.4,
      fill: true,
      pointBackgroundColor: "#ee2a68",
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
      pointRadius: 5
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
      backgroundColor: ["#4caf50", "#ffb84d", "#ff4b4b"],
      borderRadius: 8,
      borderSkipped: false
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
      borderColor: "#ee2a68",
      backgroundColor: "rgba(238, 42, 104, 0.15)",
      borderWidth: 3,
      tension: 0.4,
      fill: true,
      pointBackgroundColor: "#ee2a68",
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
      pointRadius: 5
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
      backgroundColor: "#20c997",
      borderRadius: 8,
      borderSkipped: false
    }]
  };

  // 🔥 5. ANOMALY SUMMARY
  const anomalies = logs.filter(l => l.anomaly === -1).length;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: '#666',
          font: { size: 12, weight: 500 }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderColor: '#ee2a68',
        borderWidth: 1,
        titleColor: '#fff',
        padding: 10,
        cornerRadius: 4
      }
    },
    scales: {
      y: {
        ticks: { color: '#999' },
        grid: { color: 'rgba(0,0,0,0.05)' }
      },
      x: {
        ticks: { color: '#999' },
        grid: { color: 'rgba(0,0,0,0.05)' }
      }
    }
  };

  return (
    <div style={{ width: '100%' }}>

      {/* ALERT BAR */}
      <div className="alert-bar">
        <div className="alert-bar-icon">📊</div>
        <div className="alert-bar-content">
          <div className="alert-bar-title">Analytics Dashboard</div>
          <div className="alert-bar-message">
            Real-time insights into your log patterns and anomalies
          </div>
        </div>
      </div>

      {/* ALERT CARD */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(238, 42, 104, 0.1), rgba(238, 42, 104, 0.05))',
        border: '1px solid rgba(238, 42, 104, 0.3)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '30px',
        color: '#ee2a68'
      }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '20px' }}>🚨 Anomaly Alert</h3>
        <p style={{ margin: 0, fontSize: '16px' }}>
          <strong>{anomalies}</strong> anomalies detected out of <strong>{logs.length}</strong> logs
        </p>
      </div>

      {/* CHARTS GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
        gap: '24px'
      }}>

        {/* VOLUME CHART */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: 600, color: '#333' }}>
            📈 Log Volume Over Time
          </h3>
          <div style={{ height: '300px' }}>
            <Line data={volumeData} options={chartOptions} />
          </div>
        </div>

        {/* ANOMALY TREND */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: 600, color: '#333' }}>
            🔴 Anomaly Trend
          </h3>
          <div style={{ height: '300px' }}>
            <Line data={anomalyTrend} options={chartOptions} />
          </div>
        </div>

        {/* ERROR DISTRIBUTION */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: 600, color: '#333' }}>
            📊 Error Distribution
          </h3>
          <div style={{ height: '300px' }}>
            <Bar data={errorData} options={chartOptions} />
          </div>
        </div>

        {/* SERVICE ACTIVITY */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: 600, color: '#333' }}>
            🧠 Service Activity
          </h3>
          <div style={{ height: '300px' }}>
            <Bar data={serviceData} options={chartOptions} />
          </div>
        </div>

      </div>

    </div>
  );
}

export default Analytics;