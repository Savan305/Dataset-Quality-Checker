def calculate_quality_score(missing_result,
                            duplicate_result,
                            outlier_result):

    score = 100

    # Missing values penalty
    total_missing = 0

    for column in missing_result:
        total_missing += missing_result[column]["count"]

    score -= total_missing * 2

    # Duplicate penalty
    score -= duplicate_result["duplicate_count"] * 5

    # Outlier penalty
    total_outliers = sum(outlier_result.values())

    score -= total_outliers * 3

    # Keep score between 0 and 100
    score = max(0, min(score, 100))

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
        "grade": grade
    }