# from src.data_loader import load_data
# result = load_data('datasets/sample.csv')
# print(result)
# import pandas as pd
# from src.missingchecker import analyze_missing_values

# df = pd.read_csv("datasets/sample.csv")

# result = analyze_missing_values(df)

# print(result)
# from src.duplicate_checker import analyze_duplicates
# import pandas as pd
# df = pd.read_csv("datasets/sample.csv")
# result = analyze_duplicates(df)
# print(result)
# import pandas as pd
# from src.datatype_checker import analyze_data_types

# df = pd.read_csv("datasets/sample.csv")

# result = analyze_data_types(df)

# print(result)
# import pandas as pd

# from src.outlier_checker import detect_outliers
# df = pd.read_csv("datasets/sample.csv")
# result = detect_outliers(df)
# print(result)
# import pandas as pd
# from src.statistics_checker import generate_statistics

# df = pd.read_csv("datasets/sample.csv")

# result = generate_statistics(df)

# print(result)
# import pandas as pd

# from src.missingchecker import analyze_missing_values
# from src.duplicate_checker import analyze_duplicates
# from src.outlier_checker import detect_outliers
# from src.quality_score import calculate_quality_score

# df = pd.read_csv("datasets/sample.csv")

# missing_result = analyze_missing_values(df)
# duplicate_result = analyze_duplicates(df)
# outlier_result = detect_outliers(df)

# result = calculate_quality_score(
#     missing_result,
#     duplicate_result,
#     outlier_result
# )

# print(result)
# import pandas as pd

# from src.missingchecker import analyze_missing_values
# from src.duplicate_checker import analyze_duplicates
# from src.outlier_checker import detect_outliers
# from src.recommendation_engine import generate_recommendations

# df = pd.read_csv("datasets/sample.csv")

# missing_result = analyze_missing_values(df)
# duplicate_result = analyze_duplicates(df)
# outlier_result = detect_outliers(df)

# result = generate_recommendations(
#     missing_result,
#     duplicate_result,
#     outlier_result
# )

# print(result)
# from src.analyzer import analyze_dataset

# result = analyze_dataset("datasets/sample.csv")

# print(result)
from src.analyzer import analyze_dataset
from src.pdf_report import generate_pdf_report

result = analyze_dataset("datasets/sample.csv")

generate_pdf_report(result)