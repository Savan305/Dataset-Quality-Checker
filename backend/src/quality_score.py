def calculate_quality_score(missing_result,
                            duplicate_result,
                            outlier_result,
                            row_count,
                            column_count,
                            numeric_count):

    score = 100

    total_cells = max(row_count * column_count, 1)
    numeric_cells = max(row_count * numeric_count, 1)

    total_missing = sum(
        missing_result[column]["count"]
        for column in missing_result
    )

    duplicate_count = duplicate_result["duplicate_count"]

    total_outliers = sum(outlier_result.values())

    # Use ratios instead of raw counts so large datasets are scored fairly.
    missing_rate = total_missing / total_cells
    duplicate_rate = duplicate_count / max(row_count, 1)
    outlier_rate = total_outliers / numeric_cells

    missing_penalty = missing_rate * 45
    duplicate_penalty = duplicate_rate * 30
    outlier_penalty = outlier_rate * 25

    score -= (missing_penalty + duplicate_penalty + outlier_penalty)

    # Keep score between 0 and 100
    score = round(max(0, min(score, 100)), 2)

    # Grade
    if score >= 90:
        grade = "A"

    elif score >= 80:
        grade = "B"

    elif score >= 70:
        grade = "C"

    elif score >= 60:
        grade = "D"

    else:
        grade = "F"

    return {
        "quality_score": score,
        "grade": grade,
        "penalty_breakdown": {
            "missing_rate": round(missing_rate * 100, 2),
            "duplicate_rate": round(duplicate_rate * 100, 2),
            "outlier_rate": round(outlier_rate * 100, 2),
            "missing_penalty": round(missing_penalty, 2),
            "duplicate_penalty": round(duplicate_penalty, 2),
            "outlier_penalty": round(outlier_penalty, 2)
        }
    }
