def analyze_duplicates(df):
    duplicate_count = int(df.duplicated().sum())
    duplicate_indices = (df[df.duplicated()].index.tolist())
    return{
        "duplicate_count": duplicate_count,
        "duplicate_indices": duplicate_indices
    }