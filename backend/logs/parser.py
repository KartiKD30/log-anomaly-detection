import re

def parse_log_file(file_path):
    parsed_logs = []

    with open(file_path, 'r') as f:
        lines = f.readlines()

    for line in lines:
        # Example format:
        # 2026-03-21 10:01:05 ERROR Message

        match = re.match(r'(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) (\w+) (.*)', line)

        if match:
            parsed_logs.append({
                "timestamp": match.group(1),
                "level": match.group(2),
                "message": match.group(3)
            })

    return parsed_logs