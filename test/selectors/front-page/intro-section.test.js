import {
  analyticSummarySelector,
  frontPageCardsSelector,
} from 'selectors/front-page/intro-section'

describe('#analyticSummarySelector', () => {
  describe('has data', () => {
    it('returns analytic summary data', () => {
      const rawAnalyticSummary = {
        departmentsCount: 4,
        officersCount: 5,
        documentsCount: 6,
        newsArticlesCount: 10,
      }

      const expectedAnalyticSummary = {
        departmentsCount: 4,
        officersCount: 5,
        documentsCount: 6,
        newsArticlesCount: 10,
      }

      const state = {
        frontPage: {
          analyticSummary: rawAnalyticSummary,
        },
      }

      const analyticSummary = analyticSummarySelector(state)

      expect(analyticSummary).toStrictEqual(expectedAnalyticSummary)
    })
  })

  describe('does not have data', () => {
    it('returns empty data', () => {
      const analyticSummary = analyticSummarySelector({})

      expect(analyticSummary).toStrictEqual({})
    })
  })
})

describe('#frontPageCardsSelector', () => {
  describe('has data', () => {
    it('returns introduction content', () => {
      const rawIntroCards = [
        {
          content: 'Content 1',
        },
        {
          content: 'Content 2',
        },
      ]

      const expectedIntroCards = ['Content 1', 'Content 2']

      const state = {
        frontPage: {
          frontPageCards: rawIntroCards,
        },
      }

      const introContents = frontPageCardsSelector(state)

      expect(introContents).toStrictEqual(expectedIntroCards)
    })
  })

  describe('does not have data', () => {
    it('returns empty data', () => {
      const analyticSummary = analyticSummarySelector({})

      expect(analyticSummary).toStrictEqual({})
    })
  })
})
