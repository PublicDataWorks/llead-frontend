import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import isEmpty from 'lodash/isEmpty'

import IntroCard from './intro-card'

const IntroSection = (props) => {
  const {
    fetchAnalyticSummary,
    fetchFrontPageCards,
    analyticSummary,
    frontPageCards,
  } = props

  const [introCardIndex, setIntroCardIndex] = useState(0)
  const isRendered = !isEmpty(frontPageCards) || !isEmpty(analyticSummary)

  useEffect(() => {
    fetchAnalyticSummary()
    fetchFrontPageCards()
  }, [])

  const handleIntroCardClick = (index) => {
    setIntroCardIndex(index)
  }

  return (
    <>
      {isRendered && (
        <IntroCard
          cardIndex={introCardIndex}
          content={frontPageCards[introCardIndex]}
          setCardIndex={handleIntroCardClick}
          analyticSummary={analyticSummary}
          lastCardIndex={frontPageCards.length}
        />
      )}
    </>
  )
}

IntroSection.propTypes = {
  analyticSummary: PropTypes.object,
  frontPageCards: PropTypes.array,
  fetchAnalyticSummary: PropTypes.func,
  fetchFrontPageCards: PropTypes.func,
}

IntroSection.defaultProps = {
  analyticSummary: {},
  frontPageCards: [],
  fetchAnalyticSummary: noop,
  fetchFrontPageCards: noop,
}

export default IntroSection
