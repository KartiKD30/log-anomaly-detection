# LDS - Log Anomaly Detection System

---

## 📌 Project Overview

LDS (Log Anomaly Detection System) is a full-stack application designed to analyze large volumes of system logs and detect anomalies using machine learning techniques. The system processes structured and semi-structured log files, identifies abnormal patterns, and provides insights through a dynamic dashboard.

The project demonstrates integration of backend processing, machine learning, database management, and frontend visualization in a scalable architecture.

---

## 🎯 Objectives

* Automate log analysis
* Detect anomalies in system logs
* Reduce manual monitoring effort
* Provide actionable insights through visualization
* Handle real-world unstructured log data

---

## 🏗 System Architecture

Frontend (React Dashboard)
↓
REST API (Django Backend)
↓
Log Parsing Engine (Regex-based)
↓
Feature Engineering (Numeric + Text)
↓
Machine Learning Model (Isolation Forest + TF-IDF)
↓
MongoDB Database
↓
Analytics & Visualization Layer

---

## ⚙️ Key Features

### 📂 Log Processing

* Upload and process log files
* Handles large datasets (1000+ logs)
* Supports noisy and merged logs
* Regex-based parsing

---

### 🤖 Machine Learning

* Algorithm: Isolation Forest
* Enhanced using TF-IDF vectorization
* Detects anomalies using:

  * Temporal patterns
  * Log severity levels
  * Message semantics

Outputs:

* Anomaly label (-1 or 1)
* Severity score

---

### 📊 Dashboard & Analytics

* Log distribution and trends
* Error and anomaly visualization
* Severity-based insights
* Filtering (date, level)
* Tabular exploration of logs

---

### 🗄 Database Design

MongoDB is used for scalable storage.

#### Schema:

```
{
  "timestamp": "YYYY-MM-DD HH:MM:SS",
  "level": "INFO | WARNING | ERROR",
  "message": "log message",
  "hour": integer,
  "level_num": integer,
  "anomaly": -1 or 1,
  "severity": float
}
```

---

## 🔌 API Architecture

The system follows RESTful principles:

* Stateless communication
* JSON-based responses
* Clear separation of frontend and backend

---

## 🔗 API Endpoints

### Authentication (Bonus Feature)

#### POST /api/login-otp/

Generates and sends OTP to user email.

#### POST /api/verify-otp/

Verifies OTP and allows login.

---

### Log Processing APIs

#### POST /api/upload/

Uploads log file and processes it.

#### GET /api/logs/

Fetches processed logs.

---

## 🔐 Authentication (Bonus Feature)

The system includes an OTP-based authentication mechanism:

* User enters email
* System sends OTP via SMTP
* OTP verification grants access

This eliminates the need for password storage and demonstrates secure authentication concepts.

---

## ⚡ Non-Functional Requirements

### ✔ Scalability

* MongoDB supports large datasets
* Efficient batch processing

### ✔ Performance

* Vectorized operations using NumPy and Pandas
* Lightweight ML model

### ✔ Maintainability

* Modular architecture
* Clear separation of concerns

### ✔ Security

* Environment variables for sensitive data
* No hardcoded credentials
* OTP-based authentication

---

## ⚠️ Limitations

* OTP stored in memory
* No real-time streaming
* Basic authentication (no JWT/session)
* Limited log format support

---

## 🚀 Future Improvements

* Real-time log streaming
* JWT-based authentication
* OTP expiration and rate limiting
* Role-based access control
* Integration with monitoring tools

---

## 📌 Conclusion

This project demonstrates a scalable and intelligent log analysis system combining machine learning with practical engineering solutions. It effectively detects anomalies and provides actionable insights for system monitoring, while maintaining a modular architecture for future enhancements.

---

## 👨‍💻 Author

Kartik Deshmukh
