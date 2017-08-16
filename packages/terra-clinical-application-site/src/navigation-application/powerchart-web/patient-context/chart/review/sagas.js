import { call, put, takeLatest } from 'redux-saga/effects';

import {
  LOAD_CHART_REVIEW,
  LOAD_CHART_REVIEW_SUCCEEDED,
  LOAD_CHART_REVIEW_FAILED,
} from './actions';

import ChartReviewApi from './ChartReviewApi';

function* fetchChartReview(action) {
  try {
    const chartReview = yield call(ChartReviewApi.getChartReview, action.data.physicianId, action.data.patientId);
    yield put({ type: LOAD_CHART_REVIEW_SUCCEEDED, chartReview });
  } catch (e) {
    yield put({ type: LOAD_CHART_REVIEW_FAILED, message: e.message });
  }
}

function* fetchChartSummarySaga() {
  yield takeLatest(LOAD_CHART_REVIEW, fetchChartReview);
}

export default [fetchChartSummarySaga];
