from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import shutil
import os

from src.analyzer import analyze_dataset
from src.cleaner import clean_dataset
from src.history_store import add_history_entry, clear_history_entries, get_history_entry, load_history
from src.pdf_report import generate_pdf_report

app = FastAPI()

# ================= CORS (IMPORTANT FOR FRONTEND) =================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later replace with frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================= FOLDERS =================
UPLOAD_FOLDER = "uploads"
REPORT_FOLDER = "reports"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(REPORT_FOLDER, exist_ok=True)


# ================= HEALTH CHECK =================
@app.get("/")
def home():
    return {"message": "Dataset Quality Checker API is running 🚀"}


# ================= MAIN ANALYSIS API =================
@app.post("/analyze")
def analyze_file(file: UploadFile = File(...)):

    file_path = f"{UPLOAD_FOLDER}/{file.filename}"

    # save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # run analysis
    result = analyze_dataset(file_path)
    history_entry = add_history_entry(file.filename, file_path, result)

    return {
        "status": "success",
        "data": result,
        "history_id": history_entry["id"]
    }


# ================= PDF REPORT API =================
@app.post("/generate-report")
def generate_report(file: UploadFile = File(...)):

    file_path = f"{UPLOAD_FOLDER}/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = analyze_dataset(file_path)

    pdf_path = f"{REPORT_FOLDER}/dataset_report.pdf"

    generate_pdf_report(result, pdf_path)

    return FileResponse(
        pdf_path,
        media_type="application/pdf",
        filename="dataset_quality_report.pdf"
    )


@app.post("/clean")
def clean_file(file: UploadFile = File(...)):

    file_path = f"{UPLOAD_FOLDER}/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    output_path = f"{REPORT_FOLDER}/cleaned_{file.filename}"
    clean_dataset(file_path, output_path)

    return FileResponse(
        output_path,
        media_type="text/csv",
        filename=f"cleaned_{file.filename}"
    )


@app.get("/history")
def list_history():
    history = load_history()
    return {
        "status": "success",
        "data": [
            {
                "id": item["id"],
                "fileName": item["fileName"],
                "uploadedAt": item["uploadedAt"],
                "score": item["score"],
                "grade": item["grade"],
                "dataset_info": item["analysis"].get("dataset_info", {})
            }
            for item in history
        ]
    }


@app.get("/history/{report_id}")
def get_history_report(report_id: str):
    entry = get_history_entry(report_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Report not found")

    return {
        "status": "success",
        "data": entry
    }


@app.get("/history/{report_id}/report")
def download_history_report(report_id: str):
    entry = get_history_entry(report_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Report not found")

    pdf_path = f"{REPORT_FOLDER}/dataset_report_{report_id}.pdf"
    generate_pdf_report(entry["analysis"], pdf_path)

    return FileResponse(
        pdf_path,
        media_type="application/pdf",
        filename=f"{entry['fileName']}_quality_report.pdf"
    )


@app.get("/history/{report_id}/clean")
def download_history_cleaned_csv(report_id: str):
    entry = get_history_entry(report_id)
    if not entry:
        raise HTTPException(status_code=404, detail="Report not found")

    file_path = entry.get("filePath")
    if not file_path or not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Original uploaded file not found")

    output_path = f"{REPORT_FOLDER}/cleaned_{entry['fileName']}"
    clean_dataset(file_path, output_path)

    return FileResponse(
        output_path,
        media_type="text/csv",
        filename=f"cleaned_{entry['fileName']}"
    )


@app.delete("/history")
def clear_history():
    clear_history_entries()
    return {
        "status": "success",
        "message": "History cleared"
    }
