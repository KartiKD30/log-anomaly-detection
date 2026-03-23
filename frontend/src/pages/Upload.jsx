import { useState } from "react";

function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/upload/", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert("Upload successful ✅");
      } else {
        alert(data.error || "Upload failed");
      }

    } catch (error) {
      console.error(error);
      alert("Upload failed ❌");
    }

    setLoading(false);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">

        <div className="card p-4 shadow">

          <h3 className="text-center mb-4">Upload Log File</h3>

          <input
            type="file"
            className="form-control mb-3"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button
            className="btn btn-primary w-100"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload File"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default Upload;