import * as actionTypes from 'action-types/department-page'
import { get } from 'utils/api'
import { DEPARTMENTS_API_URL } from 'constants/api'

export const fetchDepartment = (id) =>
  get(
    [
      actionTypes.DEPARTMENT_FETCH_START,
      actionTypes.DEPARTMENT_FETCH_SUCCESS,
      actionTypes.DEPARTMENT_FETCH_FAILURE,
    ],
    `${DEPARTMENTS_API_URL}${id}/`
  )()

export const fetchFeaturedOfficers = (id) =>
  get(
    [
      actionTypes.DEPARTMENT_FEATURED_OFFICERS_FETCH_START,
      actionTypes.DEPARTMENT_FEATURED_OFFICERS_FETCH_SUCCESS,
      actionTypes.DEPARTMENT_FEATURED_OFFICERS_FETCH_FAILURE,
    ],
    `${DEPARTMENTS_API_URL}${id}/officers/`
  )()

export const fetchFeaturedDocuments = (id) =>
  get(
    [
      actionTypes.DEPARTMENT_FEATURED_DOCUMENTS_FETCH_START,
      actionTypes.DEPARTMENT_FEATURED_DOCUMENTS_FETCH_SUCCESS,
      actionTypes.DEPARTMENT_FEATURED_DOCUMENTS_FETCH_FAILURE,
    ],
    `${DEPARTMENTS_API_URL}${id}/documents/`
  )()

export const fetchFeaturedNewsArticles = (id) =>
  get(
    [
      actionTypes.DEPARTMENT_FEATURED_NEWS_ARTICLES_FETCH_START,
      actionTypes.DEPARTMENT_FEATURED_NEWS_ARTICLES_FETCH_SUCCESS,
      actionTypes.DEPARTMENT_FEATURED_NEWS_ARTICLES_FETCH_FAILURE,
    ],
    `${DEPARTMENTS_API_URL}${id}/news_articles/`
  )()

export const fetchDatasets = (id) =>
  get(
    [
      actionTypes.DEPARTMENT_DATASETS_FETCH_START,
      actionTypes.DEPARTMENT_DATASETS_FETCH_SUCCESS,
      actionTypes.DEPARTMENT_DATASETS_FETCH_FAILURE,
    ],
    `${DEPARTMENTS_API_URL}${id}/datasets/`
  )()
