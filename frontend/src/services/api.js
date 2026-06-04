const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

async function postCsv(file, path = '/analyze') {
  if (!file) {
    throw new Error('Please select a CSV file before starting analysis.');
  }

  const formData = new FormData();
  formData.append('file', file);

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      body: formData
    });
  } catch {
    throw new Error('Unable to reach the analysis API. Confirm the backend is running on port 8000.');
  }

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const detail = payload?.detail || payload?.error || payload?.message;
    throw new Error(detail || `Analysis failed with status ${response.status}.`);
  }

  if (payload?.status && payload.status !== 'success') {
    throw new Error(payload?.message || 'The backend returned an unsuccessful analysis response.');
  }

  return payload?.data || payload;
}

async function downloadCsvResponse(file, path, fallbackName) {
  if (!file) throw new Error('Please select a CSV file first.');

  const formData = new FormData();
  formData.append('file', file);

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      body: formData
    });
  } catch {
    throw new Error('Unable to reach the analysis API. Confirm the backend is running on port 8000.');
  }

  if (!response.ok) {
    throw new Error(`Download failed with status ${response.status}.`);
  }

  const blob = await response.blob();
  const disposition = response.headers.get('content-disposition') || '';
  const match = disposition.match(/filename="?([^"]+)"?/);
  return {
    blob,
    fileName: match?.[1] || fallbackName
  };
}

async function downloadResponse(path, fallbackName) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`);
  } catch {
    throw new Error('Unable to reach the analysis API. Confirm the backend is running on port 8000.');
  }

  if (!response.ok) {
    throw new Error(`Download failed with status ${response.status}.`);
  }

  const blob = await response.blob();
  const disposition = response.headers.get('content-disposition') || '';
  const match = disposition.match(/filename="?([^"]+)"?/);
  return {
    blob,
    fileName: match?.[1] || fallbackName
  };
}

async function getJson(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload?.detail || payload?.message || `Request failed with status ${response.status}.`);
  }
  return payload?.data || payload;
}

export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    return response.ok;
  } catch {
    return false;
  }
}

export function uploadFile(file) {
  return postCsv(file, '/analyze');
}

export function analyzeDataset(file) {
  return postCsv(file, '/analyze');
}

export function generateReport(file) {
  return downloadCsvResponse(file, '/generate-report', 'dataset_quality_report.pdf');
}

export function cleanDataset(file) {
  return downloadCsvResponse(file, '/clean', `cleaned_${file?.name || 'dataset.csv'}`);
}

export function getServerHistory() {
  return getJson('/history');
}

export function getServerHistoryReport(id) {
  return getJson(`/history/${id}`);
}

export function generateHistoryReport(id, fileName = 'dataset') {
  return downloadResponse(`/history/${id}/report`, `${fileName}_quality_report.pdf`);
}

export function cleanHistoryDataset(id, fileName = 'dataset.csv') {
  return downloadResponse(`/history/${id}/clean`, `cleaned_${fileName}`);
}

export async function clearServerHistory() {
  const response = await fetch(`${API_BASE_URL}/history`, { method: 'DELETE' });
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload?.detail || payload?.message || `Request failed with status ${response.status}.`);
  }
  return payload;
}

export function downloadBlob({ blob, fileName }) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
