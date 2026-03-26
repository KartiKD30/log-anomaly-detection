import json
import random
import datetime
import re

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.utils import timezone

import pandas as pd
import numpy as np

from sklearn.ensemble import IsolationForest
from sklearn.feature_extraction.text import TfidfVectorizer

from .mongo import collection
from bson import ObjectId
from .models import OTP   # ✅ NEW


# =========================
# LOGIN WITH OTP (STORE IN DB)
# =========================
@csrf_exempt
def login_with_otp(request):
    data = json.loads(request.body)
    email = data.get("email")

    otp = str(random.randint(100000, 999999))

    # save OTP in database
    OTP.objects.create(email=email, otp=otp)

    send_mail(
        "Login OTP",
        f"Your OTP is {otp}",
        None,
        [email],
        fail_silently=False,
    )

    return JsonResponse({"message": "OTP sent"})


# =========================
# VERIFY OTP WITH EXPIRY
# =========================
@csrf_exempt
def verify_otp(request):
    data = json.loads(request.body)

    email = data.get("email")
    otp = data.get("otp")

    # get latest OTP for that email
    record = OTP.objects.filter(email=email).order_by('-created_at').first()

    if not record:
        return JsonResponse({"error": "No OTP found"}, status=400)

    # check expiry (5 min)
    if not record.is_valid():
        return JsonResponse({"error": "OTP expired"}, status=400)

    # match OTP
    if record.otp == otp:
        return JsonResponse({"success": True})
    else:
        return JsonResponse({"error": "Invalid OTP"}, status=400)


# =========================
# LOG UPLOAD (ML)
# =========================
@csrf_exempt
def upload_file(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    file = request.FILES.get("file")

    if not file:
        return JsonResponse({"error": "No file uploaded"}, status=400)

    raw_text = file.read().decode("utf-8")

    lines = re.split(
        r'(?=\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2})',
        raw_text
    )

    data = []

    pattern = r"(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2}:\d{2})\s+(INFO|WARNING|ERROR)\s+(.*)"

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
        return JsonResponse({"error": "No valid data"}, status=400)

    vectorizer = TfidfVectorizer()
    text_features = vectorizer.fit_transform(df["message"]).toarray()

    numeric_features = df[["hour", "level_num", "msg_len"]].values

    X = np.hstack((numeric_features, text_features))

    model = IsolationForest(contamination=0.05, random_state=42)
    df["anomaly"] = model.fit_predict(X)

    df.loc[df["level"] == "ERROR", "anomaly"] = -1

    scores = model.decision_function(X)
    df["severity"] = -scores

    df["severity"] = (df["severity"] - df["severity"].min()) / (
        df["severity"].max() - df["severity"].min()
    )

    results = df.to_dict(orient="records")

    collection.delete_many({})

    for log in results:
        collection.insert_one(dict(log))

    return JsonResponse({"results": results})


# =========================
# GET LOGS
# =========================
def get_logs(request):
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