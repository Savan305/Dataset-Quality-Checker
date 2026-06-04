def detect_outliers(df):
    outliers = {}
    numeric_columns = df.select_dtypes(include=['number']).columns

    for col in numeric_columns:
        Q1 = df[col].quantile(0.25)
        Q3 = df[col].quantile(0.75)
        IQR = Q3 - Q1
        lower_bound = Q1 - 1.5 * IQR
        upper_bound = Q3 + 1.5 * IQR
        count = ((df[col] < lower_bound) |
                 (df[col] > upper_bound)).sum()
        outliers[col]=int(count)
    return outliers