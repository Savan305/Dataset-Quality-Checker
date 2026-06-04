import pandas as pd

from src.missingchecker import analyze_missing_values
from src.duplicate_checker import analyze_duplicates
from src.datatype_checker import analyze_data_types
from src.outlier_checker import detect_outliers
from src.statistics_checker import generate_statistics
from src.quality_score import calculate_quality_score
from src.recommendation_engine import generate_recommendations
from src.advanced_profiler import (
    detect_validation_issues,
    generate_ai_explanation,
    generate_cleaning_plan,
    generate_column_profiles,
    generate_data_profile
)


# Optional (only if you added charts later)
try:
    from src.chart_generator import (
        generate_missing_values_chart,
        generate_outlier_chart
    )
    CHARTS_ENABLED = True
except:
    CHARTS_ENABLED = False


def analyze_dataset(file_path: str):

    # ================= LOAD DATA =================
    df = pd.read_csv(file_path)

    # ================= CORE ANALYSIS =================
    missing_result = analyze_missing_values(df)

    duplicate_result = analyze_duplicates(df)

    datatype_result = analyze_data_types(df)

    outlier_result = detect_outliers(df)

    statistics_result = generate_statistics(df)

    # ================= QUALITY SCORE =================
    quality_result = calculate_quality_score(
        missing_result,
        duplicate_result,
        outlier_result,
        row_count=len(df),
        column_count=len(df.columns),
        numeric_count=datatype_result["numeric_count"]
    )

    # ================= RECOMMENDATIONS =================
    recommendation_result = generate_recommendations(
        missing_result,
        duplicate_result,
        outlier_result
    )

    column_profiles = generate_column_profiles(
        df,
        missing_result,
        outlier_result
    )

    data_profile = generate_data_profile(df)
    validation_issues = detect_validation_issues(df)
    cleaning_plan = generate_cleaning_plan(
        missing_result,
        duplicate_result,
        outlier_result,
        datatype_result
    )
    ai_explanation = generate_ai_explanation(
        quality_result,
        missing_result,
        duplicate_result,
        outlier_result
    )

    # ================= CHARTS (OPTIONAL) =================
    charts = {}

    if CHARTS_ENABLED:

        charts["missing_values_chart"] = generate_missing_values_chart(
            missing_result,
            "missing_values_chart.png"
        )

        charts["outliers_chart"] = generate_outlier_chart(
            outlier_result,
            "outliers_chart.png"
        )

    # ================= FINAL RESPONSE =================
    return {
        "dataset_info": {
            "rows": len(df),
            "columns": len(df.columns),
            "column_names": list(df.columns)
        },

        "missing_values": missing_result,
        "duplicates": duplicate_result,
        "datatypes": datatype_result,
        "outliers": outlier_result,
        "statistics": statistics_result,

        "quality_score": quality_result,
        "recommendations": recommendation_result,
        "column_profiles": column_profiles,
        "data_profile": data_profile,
        "validation_issues": validation_issues,
        "cleaning_plan": cleaning_plan,
        "ai_explanation": ai_explanation,

        "charts": charts
    }
