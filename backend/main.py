from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os

from src.analyzer import analyze_dataset
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

    return {
        "status": "success",
        "data": result
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

    return {
        "status": "success",
        "pdf_url": pdf_path
    }