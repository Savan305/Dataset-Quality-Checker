import pandas as pd 

def load_data(file_path):
    try:
        if file_path.endswith('.csv'):
            df = pd.read_csv(file_path)
        elif file_path.endswith('.xlsx'):
            df = pd.read_excel(file_path)
        
        else:
            return{
                'status': 'error',
                'message': 'Unsupported file type. Only CSV and XLSX files are allowed.'
            }
        
        if df.empty:
            return {
                'status': 'error',
                'message': 'Dataset is empty.'
            }
        
        return {
            "status": "success",
            "rows": df.shape[0],
            "columns": df.shape[1],
            "column_names": list(df.columns),
            "preview": df.head().to_dict(orient="records")
        }
    except FileNotFoundError:
        return {
            'status': 'error',
            'message': 'File not found. Please check the file path and try again.'
        }
    
    
    except Exception as e:
        return {
            'status': 'error',
            'message': str(e)
        }
