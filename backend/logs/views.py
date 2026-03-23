"""
LDS - Log Anomaly Detection System
Backend (Django)

Features:
- Upload log file
- Parse logs (even messy ones)
- Feature extraction (numeric + text)
- Anomaly detection (Isolation Forest)
- Smart severity scoring
- MongoDB storage
"""

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

import pandas as pd
import numpy as np
import datetime
import re

from sklearn.ensemble import IsolationForest
from sklearn.feature_extraction.text import TfidfVectorizer

from .mongo import collection
from bson import ObjectId


@csrf_exempt
def upload_file(request):
    """
    Upload → Parse → ML → Store → Return
    """

    # Only POST allowed
    if request.method != "POST":
        return JsonResponse({"error": "Only POST method allowed"}, status=405)

    file = request.FILES.get("file")

    if not file:
        return JsonResponse({"error": "No file uploaded"}, status=400)

    try:
        # --------------------------------------------------
        # STEP 1: Read & Split Logs (handles merged logs)
        # --------------------------------------------------
        raw_text = file.read().decode("utf-8")

        lines = re.split(
            r'(?=\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2})',
            raw_text
        )

        data = []

        pattern = r"(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2}:\d{2})\s+(INFO|WARNING|ERROR)\s+(.*)"

        # --------------------------------------------------
        # STEP 2: Parse Logs
        # --------------------------------------------------
        for line in lines:
            line = line.strip()
            if not line:
                continue

            match = re.match(pattern, line)
            if not match:
                continue

            date, time, level, message = match.groups()
            timestamp = f"{date} {time}"

            try:
                dt = datetime.datetime.strptime(timestamp, "%Y-%m-%d %H:%M:%S")
                hour = dt.hour
            except:
                hour = 0

            level_map = {"INFO": 1, "WARNING": 2, "ERROR": 3}

            data.append({
                "timestamp": timestamp,
                "level": level,
                "message": message,
                "hour": hour,
                "level_num": level_map.get(level, 0),
                "msg_len": len(message)
            })

        df = pd.DataFrame(data)

        if df.empty:
            return JsonResponse({"error": "No valid data found"}, status=400)

        # --------------------------------------------------
        # STEP 3: Feature Engineering
        # --------------------------------------------------

        # Text features (meaning understanding)
        vectorizer = TfidfVectorizer()
        text_features = vectorizer.fit_transform(df["message"]).toarray()

        # Numeric features
        numeric_features = df[["hour", "level_num", "msg_len"]].values

        # Combine features
        X = np.hstack((numeric_features, text_features))

        # --------------------------------------------------
        # STEP 4: ML Model (Isolation Forest)
        # --------------------------------------------------

        model = IsolationForest(
            contamination=0.05,   # realistic anomaly %
            random_state=42
        )

        df["anomaly"] = model.fit_predict(X)

        # Force ERROR logs as anomaly
        df.loc[df["level"] == "ERROR", "anomaly"] = -1

        # Remove false positives (normal logs)
        safe_words = ["login", "logout", "started", "processed"]

        df.loc[
            df["message"].str.lower().str.contains('|'.join(safe_words)),
            "anomaly"
        ] = 1

        # --------------------------------------------------
        # STEP 5: Severity Calculation (FINAL CORRECT)
        # --------------------------------------------------

        scores = model.decision_function(X)

        # Base severity (higher = more anomalous)
        df["severity"] = -scores

        # Normalize (0 → 1)
        df["severity"] = (df["severity"] - df["severity"].min()) / (
            df["severity"].max() - df["severity"].min()
        )

        # Boost but keep variation (IMPORTANT FIX)
        df.loc[df["level"] == "ERROR", "severity"] = df["severity"] * 1.2 + 0.2
        df.loc[df["level"] == "WARNING", "severity"] = df["severity"] * 1.1 + 0.1

        # Normalize again to keep values clean
        df["severity"] = (df["severity"] - df["severity"].min()) / (
            df["severity"].max() - df["severity"].min()
        )

        # Clip range
        df["severity"] = df["severity"].clip(0, 1)

        # --------------------------------------------------
        # STEP 6: Save to MongoDB (avoid duplicates)
        # --------------------------------------------------

        results = df.to_dict(orient="records")

        for log in results:
            if not collection.find_one({
                "timestamp": log["timestamp"],
                "message": log["message"]
            }):
                collection.insert_one(dict(log))

        # --------------------------------------------------
        # STEP 7: Clean Response (remove ObjectId)
        # --------------------------------------------------

        clean_results = []

        for log in results:
            log_copy = dict(log)
            log_copy.pop("_id", None)
            clean_results.append(log_copy)

        return JsonResponse({"results": clean_results})

    except Exception as e:
        print("ERROR:", str(e))
        return JsonResponse({"error": str(e)}, status=500)


def get_logs(request):
    """
    Fetch logs from MongoDB (limited for performance)
    """

    logs = list(collection.find().limit(1000))

    fixed_logs = []

    for log in logs:
        new_log = {}

        for key, value in log.items():
            if isinstance(value, ObjectId):
                new_log[key] = str(value)
            else:
                new_log[key] = value

        fixed_logs.append(new_log)

    return JsonResponse({"results": fixed_logs})