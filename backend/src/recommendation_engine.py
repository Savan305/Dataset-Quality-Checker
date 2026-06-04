def generate_recommendations(
        missing_result,
        duplicate_result,
        outlier_result):

    recommendations = []

    # Missing values
    for column in missing_result:

        if missing_result[column]["count"] > 0:

            recommendations.append(
                f"Handle missing values in '{column}' column."
            )

    # Duplicates
    if duplicate_result["duplicate_count"] > 0:

        recommendations.append(
            "Remove duplicate rows."
        )

    # Outliers
    for column in outlier_result:

        if outlier_result[column] > 0:

            recommendations.append(
                f"Investigate outliers in '{column}' column."
            )

    if not recommendations:

        recommendations.append(
            "Dataset quality looks good."
        )

    return recommendations