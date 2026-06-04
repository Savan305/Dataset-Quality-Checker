import { useCallback, useState } from 'react';
import { uploadFile } from '../services/api';

export function useUpload(onComplete) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const selectFile = useCallback((nextFile) => {
    setError('');
    if (!nextFile) {
      setFile(null);
      return;
    }

    const isCsv = nextFile.type === 'text/csv' || nextFile.name.toLowerCase().endsWith('.csv');
    if (!isCsv) {
      setFile(null);
      setError('Only CSV files are supported.');
      return;
    }

    setFile(nextFile);
  }, []);

  const startUpload = useCallback(async () => {
    setError('');
    setIsUploading(true);
    try {
      const result = await uploadFile(file);
      onComplete?.(result, file);
      return result;
    } catch (err) {
      setError(err.message || 'Upload failed.');
      throw err;
    } finally {
      setIsUploading(false);
    }
  }, [file, onComplete]);

  return {
    file,
    error,
    isUploading,
    selectFile,
    startUpload,
    clearError: () => setError('')
  };
}
