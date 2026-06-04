import { useMemo, useState } from 'react';
import { analyzeDataset } from '../services/api';

const initialState = {
  raw: null,
  file: null,
  fileName: '',
  uploadedAt: '',
  isAnalyzing: false,
  error: ''
};

export function useAnalysis() {
  const [state, setState] = useState(initialState);

  const runAnalysis = async (file) => {
    setState((current) => ({ ...current, isAnalyzing: true, error: '' }));
    try {
      const raw = await analyzeDataset(file);
      setState({
        raw,
        file,
        fileName: file?.name || 'dataset.csv',
        uploadedAt: new Date().toISOString(),
        isAnalyzing: false,
        error: ''
      });
      return raw;
    } catch (err) {
      setState((current) => ({
        ...current,
        isAnalyzing: false,
        error: err.message || 'Analysis failed.'
      }));
      throw err;
    }
  };

  const normalized = useMemo(() => normalizeAnalysis(state.raw), [state.raw]);

  return {
    ...state,
    analysis: normalized,
    hasAnalysis: Boolean(state.raw),
    runAnalysis,
    setAnalysis: (raw, file, meta = {}) =>
      setState({
        raw,
        file,
        fileName: meta.fileName || file?.name || state.fileName || 'dataset.csv',
        uploadedAt: meta.uploadedAt || new Date().toISOString(),
        isAnalyzing: false,
        error: ''
      }),
    resetAnalysis: () => setState(initialState)
  };
}

export function normalizeAnalysis(raw) {
  const data = raw?.data || raw || {};
  const dataset = data.dataset_info || data.dataset || {};
  const quality = data.quality_score || data.quality || {};
  const missing = data.missing_values || {};
  const duplicates = data.duplicates || {};
  const outliers = data.outliers || {};
  const datatypes = data.datatypes || {};
  const statistics = data.statistics || {};
  const columnProfiles = data.column_profiles || {};
  const dataProfile = data.data_profile || {};
  const validationIssues = data.validation_issues || [];
  const cleaningPlan = data.cleaning_plan || [];
  const aiExplanation = data.ai_explanation || {};

  const rows = numberOrZero(dataset.rows ?? data.rows);
  const columns = numberOrZero(dataset.columns ?? data.columns ?? dataset.column_names?.length);
  const score = clampScore(quality.quality_score ?? quality.score ?? data.quality_score ?? data.score);
  const grade = quality.grade || data.grade || gradeFromScore(score);

  const missingEntries = Object.entries(missing).map(([name, value]) => ({
    name,
    count: numberOrZero(typeof value === 'object' ? value.count : value),
    percentage: numberOrZero(typeof value === 'object' ? value.percentage : 0)
  }));

  const outlierEntries = Object.entries(outliers).map(([name, value]) => ({
    name,
    count: numberOrZero(typeof value === 'object' ? value.count : value)
  }));

  const duplicateCount = numberOrZero(
    duplicates.duplicate_count ?? duplicates.count ?? data.duplicate_count ?? data.duplicates_count
  );

  const recommendations = Array.isArray(data.recommendations)
    ? data.recommendations
    : Object.values(data.recommendations || {});

  return {
    rows,
    columns,
    columnNames: dataset.column_names || dataset.columns_names || [],
    score,
    grade,
    missingEntries,
    missingTotal: missingEntries.reduce((sum, item) => sum + item.count, 0),
    duplicateCount,
    duplicateIndices: duplicates.duplicate_indices || [],
    outlierEntries,
    outlierTotal: outlierEntries.reduce((sum, item) => sum + item.count, 0),
    datatypes,
    statistics,
    columnProfiles: Object.entries(columnProfiles).map(([name, value]) => ({ name, ...value })),
    dataProfile,
    validationIssues,
    cleaningPlan,
    aiExplanation,
    penaltyBreakdown: quality.penalty_breakdown || {},
    recommendations,
    charts: data.charts || {}
  };
}

function numberOrZero(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
}

function clampScore(value) {
  return Math.max(0, Math.min(100, numberOrZero(value)));
}

function gradeFromScore(score) {
  if (score >= 90) return 'A';
  if (score >= 75) return 'B';
  if (score >= 60) return 'C';
  return 'D';
}
