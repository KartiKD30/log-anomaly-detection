# API Documentation - LDS Log Anomaly Detection System

---

## 🔹 Base URL

http://127.0.0.1:8000/api/


---

## 📤 1. Upload Log File

### Endpoint:

POST /upload/


### Description:
Uploads a log file, processes it using the parsing engine and machine learning model, and stores results in MongoDB.

---

### Request:
- Method: POST
- Content-Type: multipart/form-data

---

### Body Parameters:
| Parameter | Type | Description |
|----------|------|------------|
| file     | File | Log file |

---

### Response:

{
"results": [
{
"timestamp": "2026-03-21 10:01:05",
"level": "ERROR",
"message": "Database connection failed",
"anomaly": -1,
"severity": 0.78
}
]
}


---

## 📥 2. Get Logs

### Endpoint:

GET /logs/


### Description:
Fetches all processed logs from MongoDB.

---

### Response:

{
"results": [
{
"_id": "abc123",
"timestamp": "2026-03-21 10:01:05",
"level": "INFO",
"message": "User login successful",
"anomaly": 1,
"severity": 0.02
}
]
}


---

## ⚠️ Error Handling

### Example Errors:

{
"error": "No file uploaded"
}

{
"error": "No valid data"
}


---

## 🧠 System Notes
- APIs follow REST architecture
- Stateless communication
- JSON-based responses
- Designed to handle large log datasets
- Integrated with machine learning model

---

## 🔐 Assumptions
- Log format follows timestamp + level + message
- Backend server is running locally
- MongoDB is connected