# API Documentation

**Log Anomaly Detection System (LDS)**

---

## 📌 Overview

This document describes the REST API endpoints used in the Log Anomaly Detection System. The APIs are responsible for handling authentication, log processing, and data retrieval.

**Base URL:**

```text
http://127.0.0.1:8000/api/
```

---

## 🔐 Authentication APIs (OTP-Based)

### 1. Send OTP (Login)

**Endpoint:**

```text
POST /login-otp/
```

**Description:**
Generates a one-time password (OTP) and sends it to the user’s email address.

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

**Response:**

```json
{
  "message": "OTP sent"
}
```

**Error Response:**

```json
{
  "error": "User not found"
}
```

---

### 2. Verify OTP

**Endpoint:**

```text
POST /verify-otp/
```

**Description:**
Validates the OTP entered by the user. On successful verification, login is granted.

**Request Body:**

```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response:**

```json
{
  "success": true
}
```

**Error Response:**

```json
{
  "error": "Invalid OTP"
}
```

---

## 📂 Log Processing APIs

### 3. Upload Log File

**Endpoint:**

```text
POST /upload/
```

**Description:**
Uploads and processes a log file. The backend parses the logs, extracts features, applies machine learning, and stores results in the database.

**Request:**

* Type: `multipart/form-data`
* Key: `file`

**Response:**

```json
{
  "results": [
    {
      "timestamp": "2024-01-01 12:00:00",
      "level": "ERROR",
      "message": "Error occurred",
      "anomaly": -1,
      "severity": 0.85
    }
  ]
}
```

---

### 4. Get Processed Logs

**Endpoint:**

```text
GET /logs/
```

**Description:**
Retrieves processed log data from the database.

**Response:**

```json
{
  "results": [
    {
      "timestamp": "2024-01-01 12:00:00",
      "level": "INFO",
      "message": "Service started",
      "anomaly": 1,
      "severity": 0.12
    }
  ]
}
```

---

## 🧠 Response Fields

| Field     | Description                       |
| --------- | --------------------------------- |
| timestamp | Date and time of log entry        |
| level     | Log level (INFO, WARNING, ERROR)  |
| message   | Log message                       |
| anomaly   | -1 = anomaly, 1 = normal          |
| severity  | Normalized anomaly score (0 to 1) |

---

## ⚠️ Notes

* OTP is stored temporarily in memory
* No authentication token is required (basic implementation)
* APIs are open for demonstration purposes
* Email delivery depends on SMTP configuration

---

## 🚀 Future Enhancements

* JWT-based authentication
* Token-protected APIs
* OTP expiration and retry limits
* Rate limiting for security
* HTTPS-based secure communication

---
