export const LOAD_CHART_REVIEW = 'LOAD_CHART_REVIEW';
export const LOAD_CHART_REVIEW_SUCCEEDED = 'LOAD_CHART_REVIEW_SUCCEEDED';
export const LOAD_CHART_REVIEW_FAILED = 'LOAD_CHART_REVIEW_FAILED';

export const FOCUS_CHART_REVIEW_SECTION = 'FOCUS_CHART_REVIEW_SECTION';

export function loadChartReview(physicianId, patientId) {
  return {
    type: LOAD_CHART_REVIEW,
    data: {
      physicianId,
      patientId,
    },
  };
}

export function focusChartReviewSection(sectionId) {
  return {
    type: FOCUS_CHART_REVIEW_SECTION,
    data: {
      sectionId,
    },
  };
}
