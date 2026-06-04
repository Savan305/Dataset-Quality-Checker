import json
import os
from datetime import datetime
from uuid import uuid4


HISTORY_FILE = os.path.join("reports", "history.json")


def load_history():
    if not os.path.exists(HISTORY_FILE):
        return []

    try:
        with open(HISTORY_FILE, "r", encoding="utf-8") as file:
            return json.load(file)
    except (json.JSONDecodeError, OSError):
        return []


def save_history(history):
    os.makedirs(os.path.dirname(HISTORY_FILE), exist_ok=True)
    with open(HISTORY_FILE, "w", encoding="utf-8") as file:
        json.dump(history, file, indent=2)


def add_history_entry(filename, file_path, analysis):
    quality = analysis.get("quality_score", {})
    entry = {
        "id": str(uuid4()),
        "fileName": filename,
        "filePath": file_path,
        "uploadedAt": datetime.utcnow().isoformat() + "Z",
        "score": quality.get("quality_score", 0),
        "grade": quality.get("grade", "N/A"),
        "analysis": analysis
    }

    history = [entry] + load_history()
    save_history(history[:100])
    return entry


def get_history_entry(report_id):
    for entry in load_history():
        if entry.get("id") == report_id:
            return entry
    return None


def clear_history_entries():
    save_history([])
