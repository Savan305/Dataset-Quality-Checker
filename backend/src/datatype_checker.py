import pandas as pd 


def analyze_data_types(df):
    column_types = {}
    numeric_columns = []
    categorical_columns = []
    for col in df.columns:
        dtype = str(df[col].dtype)
        column_types[col] = dtype


        if pd.api.types.is_numeric_dtype(df[col]):
            numeric_columns.append(col)

        else:
            categorical_columns.append(col)
        
    return {
        "column_types": column_types,
        "numeric_columns": numeric_columns,
        "categorical_columns": categorical_columns,
        "numeric_count": len(numeric_columns),
        "categorical_count": len(categorical_columns)
    }