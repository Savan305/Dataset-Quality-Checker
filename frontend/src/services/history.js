const HISTORY_KEY = 'datasetqc_history';

export function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

export async function saveHistoryEntry(result, file) {
  const quality = result?.quality_score || {};
  const csvText = file ? await file.text() : '';
  const entry = {
    id: `${Date.now()}-${file?.name || 'dataset.csv'}`,
    fileName: file?.name || 'dataset.csv',
    uploadedAt: new Date().toISOString(),
    score: quality.quality_score ?? 0,
    grade: quality.grade || 'N/A',
    analysis: result,
    csvText
  };

  const nextHistory = [entry, ...getHistory().filter((item) => item.id !== entry.id)].slice(0, 20);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory));
  return entry;
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}

export function fileFromHistory(entry) {
  if (!entry?.csvText) return null;
  return new File([entry.csvText], entry.fileName || 'dataset.csv', { type: 'text/csv' });
}
