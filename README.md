# LDS - Log Anomaly Detection System

## 📌 Project Overview
LDS (Log Anomaly Detection System) is a full-stack application designed to analyze large volumes of system logs and detect anomalies using machine learning techniques. The system processes structured and semi-structured log files, identifies abnormal patterns, and provides insights through a dynamic dashboard.

This project demonstrates the integration of backend processing, machine learning, database management, and frontend visualization.

---

## 🎯 Objectives
- Automate log analysis
- Detect anomalies in system logs
- Reduce manual monitoring effort
- Provide actionable insights through visualization
- Handle real-world messy log data

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
Machine Learning Model (Isolation Forest)
↓
MongoDB Database
↓
Analytics & Alert System


## ⚙️ Key Features

### 📂 Log Processing
- Upload log files
- Handles large datasets (1000+ logs)
- Supports messy and merged logs
- Regex-based parsing engine

---

### 🤖 Machine Learning
- Algorithm: Isolation Forest
- Enhanced using TF-IDF text vectorization
- Detects anomalies based on:
  - Timestamp patterns
  - Log severity levels
  - Message content
- Outputs:
  - Anomaly label (-1 or 1)
  - Severity score

---

### 📊 Dashboard & Analytics
- Log volume over time
- Error distribution
- Service-level activity
- Anomaly trend analysis
- Search, filter, and sorting
- Date range filtering

---

### 🚨 Alert System
- Displays anomaly alerts
- Includes:
  - Timestamp
  - Affected service
  - Severity score
- Uses rule-based filtering to reduce false positives

---

### 🗄 Database Design
MongoDB is used for scalable storage.

#### Schema:

{
"timestamp": "YYYY-MM-DD HH:MM:SS",
"level": "INFO | WARNING | ERROR",
"message": "log message",
"hour": integer,
"level_num": integer,
"anomaly": -1 or 1,
"severity": float
}


---

## 🔌 API Architecture (REST)
The system follows RESTful principles:
- Stateless communication
- JSON responses
- Separation of frontend and backend

---

## ⚡ Non-Functional Requirements

### ✔ Scalability
- MongoDB supports large datasets
- Efficient batch processing using Pandas

### ✔ Performance
- Vectorized operations
- ML model optimized for speed

### ✔ Maintainability
- Modular code structure
- Separation of concerns:
  - Parser
  - ML model
  - API
  - UI

### ✔ Error Handling
- Try-catch blocks implemented
- Meaningful API error responses
- Logging for debugging

---

## 🛠 Tech Stack

### Frontend:
- React.js
- Bootstrap
- Chart.js

### Backend:
- Django
- Python

### Database:
- MongoDB

### Machine Learning:
- Isolation Forest
- TF-IDF Vectorizer

---

## 🔄 System Workflow
1. User uploads log file
2. Logs are parsed using regex
3. Features are extracted (numeric + text)
4. ML model detects anomalies
5. Results stored in MongoDB
6. Dashboard displays insights and alerts

---


## 🚀 Future Improvements
- Real-time log streaming
- User authentication system
- Export reports (PDF/CSV)
- Integration with monitoring tools

---

## 📌 Conclusion
This project demonstrates a scalable and intelligent log analysis system combining machine 
## ⚙️ Key Features

### 📂 Log Processing
- Upload log files
- Handles large datasets (1000+ logs)
- Supports messy and merged logs
- Regex-based parsing engine

---

### 🤖 Machine Learning
- Algorithm: Isolation Forest
- Enhanced using TF-IDF text vectorization
- Detects anomalies based on:
  - Timestamp patterns
  - Log severity levels
  - Message content
- Outputs:
  - Anomaly label (-1 or 1)
  - Severity score

---

### 📊 Dashboard & Analytics
- Log volume over time
- Error distribution
- Service-level activity
- Anomaly trend analysis
- Search, filter, and sorting
- Date range filtering

---

### 🚨 Alert System
- Displays anomaly alerts
- Includes:
  - Timestamp
  - Affected service
  - Severity score
- Uses rule-based filtering to reduce false positives

---

### 🗄 Database Design
MongoDB is used for scalable storage.

#### Schema:

{
"timestamp": "YYYY-MM-DD HH:MM:SS",
"level": "INFO | WARNING | ERROR",
"message": "log message",
"hour": integer,
"level_num": integer,
"anomaly": -1 or 1,
"severity": float
}


---

## 🔌 API Architecture (REST)
The system follows RESTful principles:
- Stateless communication
- JSON responses
- Separation of frontend and backend

---

## ⚡ Non-Functional Requirements

### ✔ Scalability
- MongoDB supports large datasets
- Efficient batch processing using Pandas

### ✔ Performance
- Vectorized operations
- ML model optimized for speed

### ✔ Maintainability
- Modular code structure
- Separation of concerns:
  - Parser
  - ML model
  - API
  - UI

### ✔ Error Handling
- Try-catch blocks implemented
- Meaningful API error responses
- Logging for debugging

---

## 🛠 Tech Stack

### Frontend:
- React.js
- Bootstrap
- Chart.js

### Backend:
- Django
- Python

### Database:
- MongoDB

### Machine Learning:
- Isolation Forest
- TF-IDF Vectorizer

---

## 🔄 System Workflow
1. User uploads log file
2. Logs are parsed using regex
3. Features are extracted (numeric + text)
4. ML model detects anomalies
5. Results stored in MongoDB
6. Dashboard displays insights and alerts

---

## 📸 Screenshots
(Add screenshots of:)
- Dashboard
- Analytics
- Alerts

---

## 🚀 Future Improvements
- Real-time log streaming
- User authentication system
- Export reports (PDF/CSV)
- Integration with monitoring tools

---

## 📌 Conclusion
This project demonstrates a scalable and intelligent log analysis system combining machine 
## ⚙️ Key Features

### 📂 Log Processing
- Upload log files
- Handles large datasets (1000+ logs)
- Supports messy and merged logs
- Regex-based parsing engine

---

### 🤖 Machine Learning
- Algorithm: Isolation Forest
- Enhanced using TF-IDF text vectorization
- Detects anomalies based on:
  - Timestamp patterns
  - Log severity levels
  - Message content
- Outputs:
  - Anomaly label (-1 or 1)
  - Severity score

---

### 📊 Dashboard & Analytics
- Log volume over time
- Error distribution
- Service-level activity
- Anomaly trend analysis
- Search, filter, and sorting
- Date range filtering

---

### 🚨 Alert System
- Displays anomaly alerts
- Includes:
  - Timestamp
  - Affected service
  - Severity score
- Uses rule-based filtering to reduce false positives

---

### 🗄 Database Design
MongoDB is used for scalable storage.

#### Schema:

{
"timestamp": "YYYY-MM-DD HH:MM:SS",
"level": "INFO | WARNING | ERROR",
"message": "log message",
"hour": integer,
"level_num": integer,
"anomaly": -1 or 1,
"severity": float
}


---

## 🔌 API Architecture (REST)
The system follows RESTful principles:
- Stateless communication
- JSON responses
- Separation of frontend and backend

---

## ⚡ Non-Functional Requirements

### ✔ Scalability
- MongoDB supports large datasets
- Efficient batch processing using Pandas

### ✔ Performance
- Vectorized operations
- ML model optimized for speed

### ✔ Maintainability
- Modular code structure
- Separation of concerns:
  - Parser
  - ML model
  - API
  - UI

### ✔ Error Handling
- Try-catch blocks implemented
- Meaningful API error responses
- Logging for debugging

---

## 🛠 Tech Stack

### Frontend:
- React.js
- Bootstrap
- Chart.js

### Backend:
- Django
- Python

### Database:
- MongoDB

### Machine Learning:
- Isolation Forest
- TF-IDF Vectorizer

---

## 🔄 System Workflow
1. User uploads log file
2. Logs are parsed using regex
3. Features are extracted (numeric + text)
4. ML model detects anomalies
5. Results stored in MongoDB
6. Dashboard displays insights and alerts

---

## 📸 Screenshots
(Add screenshots of:)
- Dashboard
- Analytics
- Alerts

---

## 🚀 Future Improvements
- Real-time log streaming
- User authentication system
- Export reports (PDF/CSV)
- Integration with monitoring tools

---

## 📌 Conclusion
This project demonstrates a scalable and intelligent log analysis system combining machine practical engineering solutions. It effectively detects anomalies and provides actionable insights for system monitoring.