import pandas as pd
from sklearn.ensemble import IsolationForest

def detect_anomalies(parsed_logs):
    if not parsed_logs:
        return []

    df = pd.DataFrame(parsed_logs)

    # Convert timestamp
    df['timestamp'] = pd.to_datetime(df['timestamp'])

    # Feature 1: Hour
    df['hour'] = df['timestamp'].dt.hour

    # Feature 2: Log level encoding
    level_map = {"INFO": 1, "WARNING": 2, "ERROR": 3}
    df['level_num'] = df['level'].map(level_map)

    # 🔥 NEW FEATURE: message length
    df['msg_length'] = df['message'].apply(len)

    # 🔥 NEW FEATURE: error flag
    df['is_error'] = df['level'].apply(lambda x: 1 if x == "ERROR" else 0)

    df.fillna(0, inplace=True)

    # Use more features
    X = df[['hour', 'level_num', 'msg_length', 'is_error']]

    model = IsolationForest(contamination=0.2)
    df['anomaly'] = model.fit_predict(X)

    return df.to_dict(orient='records')