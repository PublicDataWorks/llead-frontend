import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import Header from 'components/common/header'
import Footer from 'components/common/footer'
import AnalyticSummary from './analytic-summary'
import './front-page.scss'

const FrontPage = (props) => {
  const { cms, fetchAnalyticSummary, analyticSummary } = props

  useEffect(() => {
    fetchAnalyticSummary()
  }, [])

  return (
    <>
      <Header />
      <div className='front-page'>
        <div className='content-container'>
          <div
            className='summary'
            data-testid='test--summary'
            dangerouslySetInnerHTML={{ __html: cms.summary }}
          />
        </div>
        <AnalyticSummary analyticSummary={analyticSummary} />
      </div>
      <Footer />
    </>
  )
}

FrontPage.propTypes = {
  cms: PropTypes.object,
  analyticSummary: PropTypes.object,
  fetchAnalyticSummary: PropTypes.func,
}

FrontPage.defaultProps = {
  cms: {},
  analyticSummary: {},
  fetchAnalyticSummary: noop,
}

export default FrontPage
