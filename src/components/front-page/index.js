import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import Header from 'pages/common/header'
import Footer from 'components/common/footer'
import AnalyticSummary from './analytic-summary'
import './front-page.scss'
import DepartmentsCarousel from 'components/common/carousel/departments-carousel'

const FrontPage = (props) => {
  const {
    cms,
    fetchAnalyticSummary,
    fetchDepartments,
    analyticSummary,
    departments,
  } = props

  useEffect(() => {
    fetchAnalyticSummary()
    fetchDepartments()
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
        <DepartmentsCarousel
          fetchDepartments={fetchDepartments}
          departments={departments}
        />
      </div>
      <Footer />
    </>
  )
}

FrontPage.propTypes = {
  cms: PropTypes.object,
  analyticSummary: PropTypes.object,
  departments: PropTypes.array,
  fetchAnalyticSummary: PropTypes.func,
  fetchDepartments: PropTypes.func,
}

FrontPage.defaultProps = {
  cms: {},
  analyticSummary: {},
  departments: [],
  fetchAnalyticSummary: noop,
  fetchDepartments: noop,
}

export default FrontPage
