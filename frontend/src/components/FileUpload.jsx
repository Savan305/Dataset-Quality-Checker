import { FileSpreadsheet, Loader2, UploadCloud, XCircle } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';

export default function FileUpload({ file, onSelectFile, onSubmit, isUploading, error }) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = useCallback(
    (files) => {
      const nextFile = files?.[0];
      if (nextFile) onSelectFile(nextFile);
    },
    [onSelectFile]
  );

  return (
    <section className="upload-panel">
      <div
        className={`dropzone ${isDragging ? 'dragging' : ''}`}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          handleFiles(event.dataTransfer.files);
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv,text/csv"
          onChange={(event) => handleFiles(event.target.files)}
          hidden
        />
        <div className="dropzone-icon">
          <UploadCloud size={30} />
        </div>
        <h2>Drop your CSV file here</h2>
        <p>Run a complete quality scan for missing values, duplicates, outliers, datatypes, and statistical drift.</p>
        <button className="secondary-button" type="button" onClick={() => inputRef.current?.click()}>
          Browse files
        </button>
      </div>

      {file ? (
        <div className="selected-file">
          <FileSpreadsheet size={20} />
          <div>
            <strong>{file.name}</strong>
            <span>{formatFileSize(file.size)}</span>
          </div>
        </div>
      ) : null}

      {error ? (
        <div className="error-banner">
          <XCircle size={18} />
          <span>{error}</span>
        </div>
      ) : null}

      <button className="primary-button upload-button" type="button" onClick={onSubmit} disabled={!file || isUploading}>
        {isUploading ? <Loader2 className="spin" size={18} /> : <UploadCloud size={18} />}
        <span>{isUploading ? 'Analyzing dataset' : 'Analyze dataset'}</span>
      </button>
    </section>
  );
}

function formatFileSize(size = 0) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}
