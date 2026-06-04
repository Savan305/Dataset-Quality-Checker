def generate_statistics(df):

    statistics = {}

    numeric_columns = df.select_dtypes(include="number")

    for col in numeric_columns.columns:

        statistics[col] = {
            "mean": float(round(df[col].mean(), 2)),
            "median": float(round(df[col].median(), 2)),
            "minimum": int(df[col].min()),
            "maximum": int(df[col].max()),
            "std": float(round(df[col].std(), 2))
        }

    return statistics