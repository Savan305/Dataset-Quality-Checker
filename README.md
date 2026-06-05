# 📊 Dataset Quality Checker

<div align="center">

### Assess • Validate • Improve

AI-Powered Data Quality Assessment Platform built with **React, FastAPI, Pandas, and Machine Learning**

![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi)
![Python](https://img.shields.io/badge/Python-3776AB?logo=python)
![Pandas](https://img.shields.io/badge/Pandas-150458?logo=pandas)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite)
![Status](https://img.shields.io/badge/Status-Completed-success)

</div>

---

## 🚀 Overview

Dataset Quality Checker is a Full-Stack Data Quality Assessment Platform that helps Data Scientists, Data Analysts, and Machine Learning Engineers evaluate dataset quality before model training and analytics workflows.

The system automatically analyzes uploaded CSV datasets and generates quality metrics, statistical insights, visual reports, and actionable recommendations to improve dataset reliability.

---

## ✨ Features

* 📂 CSV Dataset Upload
* 📊 Dataset Quality Score Generation
* 🔍 Missing Value Detection
* 🧹 Duplicate Record Detection
* 🏷️ Data Type Validation
* ⚠️ Outlier Detection
* 📈 Statistical Profiling
* 💡 Automated Recommendations
* 📄 PDF Report Generation
* 📊 Interactive Dashboard
* ⚡ FastAPI-Powered Backend
* 🎨 Modern React User Interface

---

## 🏗️ Architecture

```text
Frontend (React + Vite)
          │
          ▼
Backend API (FastAPI)
          │
 ┌────────┼────────┐
 ▼        ▼        ▼

Missing  Duplicate  Datatype
Check    Check      Validation

 ▼
Outlier Detection

 ▼
Statistical Profiling

 ▼
Quality Score Engine

 ▼
Recommendation Engine

 ▼
PDF Report Generation
```

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* CSS

### Backend

* FastAPI
* Python

### Data Processing

* Pandas
* NumPy

### Visualization

* Matplotlib

### Tools

* Git
* GitHub
* VS Code

---

## 📂 Project Structure

```text
Dataset-Quality-Checker
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── layouts
│   │   ├── hooks
│   │   └── services
│   ├── package.json
│   └── vite.config.js
│
├── backend
│   ├── datasets
│   ├── uploads
│   ├── reports
│   │
│   ├── src
│   │   ├── analyzer.py
│   │   ├── advanced_profiler.py
│   │   ├── chart_generator.py
│   │   ├── cleaner.py
│   │   ├── datatype_checker.py
│   │   ├── duplicate_checker.py
│   │   ├── missingchecker.py
│   │   ├── outlier_checker.py
│   │   ├── pdf_report.py
│   │   ├── quality_score.py
│   │   ├── recommendation_engine.py
│   │   └── statistics_checker.py
│   │
│   ├── main.py
│   └── requirements.txt
│
└── README.md
```

---

## ⚙️ How It Works

### 1. Upload Dataset

Users upload a CSV dataset through the web interface.

### 2. Dataset Processing

The FastAPI backend validates and processes the uploaded file.

### 3. Quality Assessment

The system performs:

* Missing Value Analysis
* Duplicate Detection
* Datatype Validation
* Outlier Detection
* Statistical Profiling

### 4. Score Generation

A quality score is calculated using multiple dataset quality metrics.

### 5. Recommendation Generation

The platform generates suggestions to improve dataset quality.

### 6. Reporting

Users receive:

* Interactive Dashboard
* Quality Metrics
* Visual Analytics
* Downloadable PDF Reports

---

## 📈 Analysis Modules

| Module                | Purpose                         |
| --------------------- | ------------------------------- |
| Missing Value Checker | Detect incomplete records       |
| Duplicate Checker     | Identify duplicate rows         |
| Datatype Validator    | Validate schema consistency     |
| Outlier Checker       | Detect abnormal values          |
| Statistical Profiler  | Generate descriptive statistics |
| Quality Score Engine  | Calculate dataset quality       |
| Recommendation Engine | Suggest improvements            |
| PDF Generator         | Export professional reports     |

---

## 💻 Installation

### Clone Repository

```bash
git clone https://github.com/Savan305/Dataset-Quality-Checker.git

cd Dataset-Quality-Checker
```

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🌐 Deployment

### Frontend

Deploy on Netlify

### Backend

Deploy on Render or Railway

---

## 🎯 Use Cases

* Machine Learning Data Preparation
* Data Analytics Projects
* Business Intelligence Workflows
* Academic Research
* Data Engineering Pipelines
* Dataset Auditing

---

## 🔮 Future Enhancements

* Excel File Support
* AI-Powered Cleaning Suggestions
* Automated Data Repair
* Database Integration
* User Authentication
* Cloud Storage Support
* Advanced Dataset Profiling

---

## 👨‍💻 Author

<div align="center">

### Savan Patel

**Aspiring Data Scientist | AI/ML Engineer | Full-Stack Developer**

Passionate about building practical AI, Machine Learning, Data Analytics, and Data Engineering solutions.

<p align="center">
  <a href="https://github.com/YOUR_GITHUB_USERNAME">
    <img src="https://img.shields.io/badge/GitHub-Profile-black?logo=github" />
  </a>

  <a href="https://www.linkedin.com/in/savan-patel-777aa3323/">
    <img src="https://img.shields.io/badge/LinkedIn-Connect-blue?logo=linkedin" />
  </a>
</p>

</div>

---

## ⭐ Support

If you found this project useful, consider giving it a star on GitHub.

---

## 📜 License

This project is intended for educational, research, and portfolio purposes.

© 2026 Savan Patel. All Rights Reserved.
