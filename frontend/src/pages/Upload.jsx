import { useState } from "react";

function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file");
      setSuccess(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/upload/", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setMessage("✅ Upload successful! Your logs are being analyzed.");
        setSuccess(true);
        setFile(null);
        setTimeout(() => setMessage(""), 4000);
      } else {
        setMessage("❌ " + (data.error || "Upload failed"));
        setSuccess(false);
      }

    } catch (error) {
      console.error(error);
      setMessage("❌ Upload failed. Please try again.");
      setSuccess(false);
    }

    setLoading(false);
  };

  return (
    <div>
      {/* ALERT BAR */}
      <div className="alert-bar">
        <div className="alert-bar-icon">📤</div>
        <div className="alert-bar-content">
          <div className="alert-bar-title">Upload Logs</div>
          <div className="alert-bar-message">
            Upload your log files for anomaly detection analysis
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '10px', color: '#333', marginTop: 0 }}>Upload Log File</h2>
          <p style={{ color: '#999', marginBottom: '30px', fontSize: '14px' }}>
            Upload your log file for anomaly detection analysis
          </p>

          {/* FILE INPUT */}
          <div style={{
            border: '2px dashed #ee2a68',
            borderRadius: '12px',
            padding: '40px 20px',
            marginBottom: '20px',
            cursor: 'pointer',
            background: 'rgba(238, 42, 104, 0.05)',
            transition: 'all 0.3s ease'
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.currentTarget.style.background = 'rgba(238, 42, 104, 0.1)';
          }}
          onDragLeave={(e) => {
            e.currentTarget.style.background = 'rgba(238, 42, 104, 0.05)';
          }}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files.length) {
              setFile(e.dataTransfer.files[0]);
            }
          }}
          >
            <input
              type="file"
              accept=".log,.txt,.csv"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: 'none' }}
              id="file-input"
            />
            <label htmlFor="file-input" style={{ cursor: 'pointer', display: 'block' }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>📁</div>
              <p style={{ margin: '0', fontSize: '14px', color: '#333', fontWeight: '500' }}>
                Drag and drop your file here
              </p>
              <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#999' }}>
                or click to browse
              </p>
            </label>
          </div>

          {/* FILE NAME */}
          {file && (
            <div style={{
              padding: '12px 16px',
              background: '#f0f0f0',
              borderRadius: '8px',
              marginBottom: '20px',
              textAlign: 'left',
              fontSize: '14px',
              color: '#333'
            }}>
              <strong>Selected File:</strong> {file.name}
            </div>
          )}

          {/* UPLOAD BUTTON */}
          <button
            onClick={handleUpload}
            disabled={loading || !file}
            style={{
              width: '100%',
              padding: '14px 20px',
              background: loading || !file
                ? 'linear-gradient(135deg, #ccc, #ddd)'
                : 'linear-gradient(135deg, #ee2a68, #ff4b7d)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: loading || !file ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              opacity: loading || !file ? 0.6 : 1
            }}
            onMouseEnter={(e) => {
              if (!loading && file) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 24px rgba(238, 42, 104, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            {loading ? '⏳ Uploading...' : '🚀 Upload File'}
          </button>

          {/* MESSAGE */}
          {message && (
            <div style={{
              marginTop: '20px',
              padding: '14px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              background: success ? 'rgba(76, 175, 80, 0.1)' : 'rgba(238, 42, 104, 0.1)',
              color: success ? '#4caf50' : '#ee2a68',
              border: `1px solid ${success ? 'rgba(76, 175, 80, 0.3)' : 'rgba(238, 42, 104, 0.3)'}`
            }}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Upload;