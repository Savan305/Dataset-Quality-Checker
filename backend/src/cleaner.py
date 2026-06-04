import pandas as pd


def clean_dataset(file_path, output_path):
    df = pd.read_csv(file_path)

    df = df.drop_duplicates()

    for column in df.columns:
        if pd.api.types.is_numeric_dtype(df[column]):
            median = df[column].median()
            df[column] = df[column].fillna(median)

            q1 = df[column].quantile(0.25)
            q3 = df[column].quantile(0.75)
            iqr = q3 - q1
            lower = q1 - 1.5 * iqr
            upper = q3 + 1.5 * iqr
            df[column] = df[column].clip(lower=lower, upper=upper)
        else:
            mode = df[column].mode(dropna=True)
            fill_value = mode.iloc[0] if not mode.empty else "Unknown"
            df[column] = df[column].fillna(fill_value)
            df[column] = df[column].astype(str).str.strip()

    df.to_csv(output_path, index=False)
    return output_path
