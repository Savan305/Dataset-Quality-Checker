import pandas as pd 

def analyze_missing_values(df):
    missing_info = {}
    total_rows = len(df)
    for column in df.columns:
        missing_count = df[column].isnull().sum()
        missing_percentage = float(round((missing_count / total_rows) * 100, 2))
        missing_info[column] = {
            "count": int(missing_count),
            "percentage": missing_percentage
        }
    return missing_info