import { useCallback } from 'react';
import FileUpload from '../components/FileUpload';
import { useUpload } from '../hooks/useUpload';

export default function Upload({ onAnalysisComplete, onNavigate }) {
  const handleComplete = useCallback(
    (result, file) => {
      onAnalysisComplete(result, file);
      onNavigate('dashboard');
    },
    [onAnalysisComplete, onNavigate]
  );

  const { file, error, isUploading, selectFile, startUpload } = useUpload(handleComplete);

  return (
    <div className="upload-page">
      <section className="upload-hero">
        <p className="eyebrow">CSV intake</p>
        <h2>Analyze dataset quality in one upload</h2>
        <p>
          The scanner profiles structure, completeness, duplicate density, outliers, and corrective recommendations
          through the live FastAPI backend.
        </p>
      </section>

      <FileUpload
        file={file}
        onSelectFile={selectFile}
        onSubmit={startUpload}
        isUploading={isUploading}
        error={error}
      />
    </div>
  );
}
