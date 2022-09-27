import React from 'react'
import sinon from 'sinon'
import { render } from '@testing-library/react'

import IntroSection from 'components/front-page/intro-section'

describe('FrontPage component', () => {
  it('fetches data', () => {
    const fetchAnalyticSummarySpy = sinon.spy()
    const fetchFrontPageCardsSpy = sinon.spy()

    render(
      <IntroSection
        fetchAnalyticSummary={fetchAnalyticSummarySpy}
        fetchFrontPageCards={fetchFrontPageCardsSpy}
      />
    )

    expect(fetchAnalyticSummarySpy).toHaveBeenCalled()
    expect(fetchFrontPageCardsSpy).toHaveBeenCalled()
  })

  it('renders correctly', () => {
    const analyticSummary = {
      departmentsCount: 45,
      documentsCount: 669,
      newsArticlesCount: 37390,
      officersCount: 65871,
    }

    const frontPageCards = ['Content 1', 'Content 2']

    const container = render(
      <IntroSection
        analyticSummary={analyticSummary}
        frontPageCards={frontPageCards}
      />
    )
    const { baseElement } = container

    expect(baseElement.getElementsByClassName('intro-card').length).toEqual(1)
  })

  it('renders correctly when only front page cards', () => {
    const analyticSummary = {}

    const frontPageCards = ['Content 1', 'Content 2']

    const container = render(
      <IntroSection
        analyticSummary={analyticSummary}
        frontPageCards={frontPageCards}
      />
    )
    const { baseElement } = container

    expect(baseElement.getElementsByClassName('intro-card').length).toEqual(1)
  })

  it('does not render when only analytic summary', () => {
    const analyticSummary = {
      departmentsCount: 45,
      documentsCount: 669,
      newsArticlesCount: 37390,
      officersCount: 65871,
    }

    const frontPageCards = []

    const container = render(
      <IntroSection
        analyticSummary={analyticSummary}
        frontPageCards={frontPageCards}
      />
    )
    const { baseElement } = container

    expect(baseElement.getElementsByClassName('intro-card').length).toEqual(1)
  })

  it('does not render when no analytic summary and front page cards', () => {
    const analyticSummary = {}

    const frontPageCards = []

    const container = render(
      <IntroSection
        analyticSummary={analyticSummary}
        frontPageCards={frontPageCards}
      />
    )
    const { baseElement } = container

    expect(baseElement.getElementsByClassName('intro-card').length).toEqual(0)
  })
})
