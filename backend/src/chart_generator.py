import matplotlib.pyplot as plt
import os


def generate_missing_values_chart(missing_result, output_path="missing_chart.png"):

    columns = []
    values = []

    for col, data in missing_result.items():
        columns.append(col)
        values.append(data["count"])

    plt.figure(figsize=(8, 4))
    plt.bar(columns, values)
    plt.title("Missing Values Per Column")
    plt.xlabel("Columns")
    plt.ylabel("Missing Count")

    plt.tight_layout()
    plt.savefig(output_path)
    plt.close()

    return output_path


def generate_outlier_chart(outlier_result, output_path="outlier_chart.png"):

    columns = list(outlier_result.keys())
    values = list(outlier_result.values())

    plt.figure(figsize=(8, 4))
    plt.bar(columns, values)
    plt.title("Outliers Per Column")
    plt.xlabel("Columns")
    plt.ylabel("Outlier Count")

    plt.tight_layout()
    plt.savefig(output_path)
    plt.close()

    return output_path