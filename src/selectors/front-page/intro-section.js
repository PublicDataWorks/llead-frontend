import { createSelector } from 'reselect'
import get from 'lodash/get'
import map from 'lodash/map'
import pick from 'lodash/pick'

const getAnalyticSummary = (state) =>
  get(state.frontPage, 'analyticSummary', {})
const getFrontPageCards = (state) => get(state.frontPage, 'frontPageCards', [])

export const analyticSummarySelector = (state) => {
  const rawAnalyticSummary = getAnalyticSummary(state)

  const attributes = [
    'departmentsCount',
    'officersCount',
    'documentsCount',
    'newsArticlesCount',
  ]

  return pick(rawAnalyticSummary, attributes)
}

export const frontPageCardsSelector = createSelector(
  getFrontPageCards,
  (frontPageCards) => map(frontPageCards, 'content')
)
