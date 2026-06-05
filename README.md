# 📊 Dataset Quality Checker

<div align="center">

### AI-Powered Data Quality Assessment & Profiling Platform

Analyze, Validate, Score, and Improve Dataset Quality Before Machine Learning & Analytics Workflows.

![React](https://img.shields.io/badge/Frontend-React-blue)
![Vite](https://img.shields.io/badge/Build-Vite-purple)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-green)
![Python](https://img.shields.io/badge/Python-3.10+-yellow)
![Pandas](https://img.shields.io/badge/Data-Pandas-orange)
![Machine Learning](https://img.shields.io/badge/ML-Ready-red)
![Status](https://img.shields.io/badge/Status-Completed-success)

🚀 Full Stack Data Quality Platform • 📈 Interactive Dashboard • 📄 Automated PDF Reports • 🧠 Intelligent Recommendations

</div>

---

## 🌟 Overview

Dataset Quality Checker is a Full-Stack Data Quality Assessment Platform designed to help Data Scientists, Machine Learning Engineers, Data Analysts, and Researchers evaluate dataset health before model development and business analytics.

The platform automatically analyzes uploaded CSV datasets and generates comprehensive quality insights including missing values, duplicates, outliers, datatype validation, statistical profiling, quality scoring, and actionable recommendations.

Instead of manually checking dataset quality, users can upload a dataset and instantly receive a professional analysis report with visualizations and improvement suggestions.

---

## 🎯 Problem Statement

Poor-quality datasets can significantly impact:

* Machine Learning Model Performance
* Business Intelligence Accuracy
* Data Analytics Results
* Research Outcomes
* Decision-Making Processes

Dataset Quality Checker addresses these challenges by providing an automated and scalable quality assessment workflow.

---

## ✨ Key Features

| Feature                       | Description                                        |
| ----------------------------- | -------------------------------------------------- |
| 📂 Dataset Upload             | Upload CSV datasets through an intuitive interface |
| 📊 Quality Score Generation   | Generate overall dataset quality score             |
| 🔍 Missing Value Detection    | Identify incomplete records and columns            |
| 🧹 Duplicate Record Detection | Detect duplicate rows and redundancy               |
| 🏷️ Data Type Validation      | Validate datatype consistency                      |
| 📈 Statistical Profiling      | Generate descriptive statistics                    |
| ⚠️ Outlier Detection          | Detect abnormal data points                        |
| 🧠 Recommendation Engine      | Provide actionable improvement suggestions         |
| 📄 PDF Report Generation      | Download professional analysis reports             |
| 📊 Interactive Dashboard      | Real-time visual analytics                         |
| 📉 Data Visualization         | Graphical quality insights                         |
| ⚡ Fast Processing             | Efficient backend processing using FastAPI         |

---

## 🏗️ System Architecture

```text
                        ┌────────────────────┐
                        │   React Frontend   │
                        └─────────┬──────────┘
                                  │
                                  ▼
                        ┌────────────────────┐
                        │   FastAPI Backend  │
                        └─────────┬──────────┘
                                  │
         ┌──────────────┬─────────┼─────────┬──────────────┐
         ▼              ▼         ▼         ▼              ▼

 Missing Value   Duplicate   Datatype   Outlier   Statistics
    Checker       Checker     Checker    Checker    Profiler

         └──────────────┬─────────┬──────────────┘
                        ▼
                Quality Score Engine
                        ▼
              Recommendation Engine
                        ▼
                PDF Report Generator
                        ▼
                 Dashboard Results
```

---

## 🚀 Technology Stack

### Frontend

* React.js
* Vite
* JavaScript (ES6+)
* HTML5
* CSS3

### Backend

* FastAPI
* Python

### Data Processing

* Pandas
* NumPy

### Data Visualization

* Matplotlib

### Reporting

* PDF Report Generation

### Development Tools

* Git
* GitHub
* VS Code

---

## 📂 Project Structure

```text
Dataset-Quality-Checker
│
├── frontend
│   ├── dist
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── layouts
│   │   ├── services
│   │   ├── hooks
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
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
│   │   ├── history_store.py
│   │   ├── missingchecker.py
│   │   ├── outlier_checker.py
│   │   ├── pdf_report.py
│   │   ├── quality_score.py
│   │   ├── recommendation_engine.py
│   │   └── statistics_checker.py
│   │
│   ├── main.py
│   ├── requirements.txt
│   └── dataset_report.pdf
│
└── README.md
```

---

## ⚙️ How It Works

### Step 1 — Upload Dataset

Users upload CSV datasets through the React frontend.

### Step 2 — Backend Processing

FastAPI receives and validates the dataset.

### Step 3 — Quality Assessment

The system performs:

* Missing Value Analysis
* Duplicate Detection
* Datatype Validation
* Outlier Detection
* Statistical Profiling

### Step 4 — Quality Score Generation

A dataset quality score is calculated based on multiple quality metrics.

### Step 5 — Recommendation Generation

The Recommendation Engine suggests data cleaning and improvement actions.

### Step 6 — Visualization & Reporting

Users receive:

* Dashboard Analytics
* Charts
* Quality Metrics
* Downloadable PDF Reports

---

## 📈 Analysis Modules

### 🔍 Missing Value Checker

Identifies:

* Missing entries
* Null values
* Completeness percentage

### 🧹 Duplicate Checker

Detects:

* Duplicate rows
* Repeated observations
* Dataset redundancy

### 🏷️ Datatype Checker

Validates:

* Column datatypes
* Data consistency
* Schema correctness

### ⚠️ Outlier Checker

Finds:

* Statistical anomalies
* Extreme values
* Data distribution issues

### 📊 Statistics Profiler

Generates:

* Mean
* Median
* Standard Deviation
* Variance
* Distribution Metrics

### 🧠 Recommendation Engine

Provides:

* Data cleaning suggestions
* Quality improvement actions
* Optimization recommendations

---

## 📄 Sample Outputs

The platform generates:

✅ Dataset Quality Score

✅ Missing Value Summary

✅ Duplicate Record Summary

✅ Datatype Validation Report

✅ Outlier Detection Results

✅ Statistical Analysis

✅ Recommendation Report

✅ Downloadable PDF Report

---

## 💻 Local Installation

### Clone Repository

```bash
git clone https://github.com/your-username/Dataset-Quality-Checker.git

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

Backend Server:

```text
http://127.0.0.1:8000
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend Server:

```text
http://localhost:5173
```

---

## 🌐 Deployment

### Frontend Deployment

* Netlify

### Backend Deployment

* Render
* Railway

---

## 📊 Use Cases

### Machine Learning

Validate datasets before model training.

### Data Analytics

Ensure data quality for reliable insights.

### Business Intelligence

Improve dashboard and reporting accuracy.

### Academic Research

Validate datasets for research projects.

### Data Engineering

Perform quality checks before ETL pipelines.

---

## 🔮 Future Enhancements

* Excel File Support
* Multi-File Analysis
* Automated Data Cleaning
* AI-Powered Suggestions
* Database Integration
* User Authentication
* Cloud Storage Support
* Advanced Profiling Metrics
* Data Drift Detection
* Real-Time Monitoring

---

## 🏆 Project Highlights

✔ Full Stack Development

✔ FastAPI Backend

✔ React Dashboard

✔ Data Quality Assessment

✔ Statistical Profiling

✔ PDF Report Generation

✔ Data Visualization

✔ Machine Learning Ready

✔ Production Deployment

---

## 👨‍💻 Author

### Savan Patel

Aspiring Data Scientist | AI/ML Engineer | Full-Stack Developer

Passionate about building practical AI, Machine Learning, Data Analytics, and Data Engineering solutions that solve real-world problems.

### Connect With Me

* LinkedIn: https://www.linkedin.com/in/savan-patel-777aa3323?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app
* GitHub: https://github.com/

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

It helps others discover the project and supports future development.

---

## 📜 License

This project is developed for educational, research, and portfolio purposes.

© 2026 Savan Patel. All Rights Reserved.
