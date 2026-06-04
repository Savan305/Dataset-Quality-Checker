import re

import pandas as pd


EMAIL_PATTERN = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
PHONE_PATTERN = re.compile(r"^[+]?[0-9\s().-]{7,}$")


def generate_column_profiles(df, missing_result, outlier_result):
    profiles = {}

    for column in df.columns:
        series = df[column]
        missing_count = int(missing_result.get(column, {}).get("count", 0))
        missing_rate = missing_count / max(len(df), 1)
        unique_count = int(series.nunique(dropna=True))
        unique_rate = unique_count / max(len(df), 1)
        outlier_count = int(outlier_result.get(column, 0))
        outlier_rate = outlier_count / max(len(df), 1)
        dtype = str(series.dtype)

        score = 100
        score -= missing_rate * 45
        score -= outlier_rate * 30
        if unique_count == 1 and len(df) > 1:
            score -= 15
        if dtype == "object" and _mixed_numeric_text_rate(series) > 0.1:
            score -= 10

        profiles[column] = {
            "dtype": dtype,
            "missing_count": missing_count,
            "missing_rate": round(missing_rate * 100, 2),
            "unique_count": unique_count,
            "unique_rate": round(unique_rate * 100, 2),
            "outlier_count": outlier_count,
            "quality_score": round(max(0, min(score, 100)), 2),
            "sample_values": [str(value) for value in series.dropna().head(5).tolist()]
        }

    return profiles


def generate_data_profile(df):
    profile = {}

    for column in df.columns:
        series = df[column]
        base = {
            "null_count": int(series.isna().sum()),
            "unique_count": int(series.nunique(dropna=True)),
            "mode": _safe_value(series.mode(dropna=True).iloc[0]) if not series.mode(dropna=True).empty else None
        }

        if pd.api.types.is_numeric_dtype(series):
            base.update({
                "minimum": _safe_value(series.min()),
                "maximum": _safe_value(series.max()),
                "mean": round(float(series.mean()), 2) if not series.dropna().empty else None,
                "median": round(float(series.median()), 2) if not series.dropna().empty else None,
                "skewness": round(float(series.skew()), 2) if len(series.dropna()) > 2 else 0
            })

        profile[column] = base

    return profile


def detect_validation_issues(df):
    issues = []

    for column in df.columns:
        lowered = column.lower()
        values = df[column].dropna().astype(str).str.strip()

        if "email" in lowered and not values.empty:
            invalid = int((~values.apply(lambda value: bool(EMAIL_PATTERN.match(value)))).sum())
            if invalid:
                issues.append({"column": column, "type": "invalid_email", "count": invalid})

        if ("phone" in lowered or "mobile" in lowered) and not values.empty:
            invalid = int((~values.apply(lambda value: bool(PHONE_PATTERN.match(value)))).sum())
            if invalid:
                issues.append({"column": column, "type": "invalid_phone", "count": invalid})

        if "date" in lowered and not values.empty:
            parsed = pd.to_datetime(values, errors="coerce")
            invalid = int(parsed.isna().sum())
            if invalid:
                issues.append({"column": column, "type": "invalid_date", "count": invalid})

    return issues


def generate_cleaning_plan(missing_result, duplicate_result, outlier_result, datatype_result):
    plan = []

    for column, detail in missing_result.items():
        if detail["count"] > 0:
            strategy = "Fill numeric blanks with median" if column in datatype_result["numeric_columns"] else "Fill blanks with mode"
            plan.append({"column": column, "issue": "missing_values", "action": strategy})

    if duplicate_result["duplicate_count"] > 0:
        plan.append({"column": "all", "issue": "duplicates", "action": "Remove duplicate rows"})

    for column, count in outlier_result.items():
        if count > 0:
            plan.append({"column": column, "issue": "outliers", "action": "Cap extreme values using IQR bounds"})

    return plan


def generate_ai_explanation(quality_result, missing_result, duplicate_result, outlier_result):
    total_missing = sum(item["count"] for item in missing_result.values())
    total_outliers = sum(outlier_result.values())
    duplicate_count = duplicate_result["duplicate_count"]
    score = quality_result["quality_score"]

    if score >= 90:
        tone = "The dataset is strong and ready for analysis with only light review."
    elif score >= 75:
        tone = "The dataset is usable, but targeted cleanup will improve reliability."
    else:
        tone = "The dataset needs cleanup before production analytics."

    return {
        "summary": tone,
        "drivers": [
            f"{total_missing} missing values detected.",
            f"{duplicate_count} duplicate rows detected.",
            f"{total_outliers} outliers detected across numeric columns."
        ],
        "priority": "outliers" if total_outliers >= total_missing else "missing_values"
    }


def _mixed_numeric_text_rate(series):
    values = series.dropna().astype(str)
    if values.empty:
        return 0
    numeric_like = pd.to_numeric(values, errors="coerce").notna().sum()
    return min(numeric_like, len(values) - numeric_like) / max(len(values), 1)


def _safe_value(value):
    if pd.isna(value):
        return None
    if hasattr(value, "item"):
        value = value.item()
    return value
