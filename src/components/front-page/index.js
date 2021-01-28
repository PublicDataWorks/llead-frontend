import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import Header from 'pages/common/header'
import Footer from 'components/common/footer'
import AnalyticSummary from './analytic-summary'
import './front-page.scss'
import DepartmentsCarousel from 'components/common/carousel/departments-carousel'
import OfficersCarousel from 'components/common/carousel/officers-carousel'

const FrontPage = (props) => {
  const {
    cms,
    fetchAnalyticSummary,
    fetchDepartments,
    fetchOfficers,
    analyticSummary,
    departments,
    officers,
  } = props

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
        <DepartmentsCarousel
          fetchDepartments={fetchDepartments}
          departments={departments}
        />
        <OfficersCarousel fetchOfficers={fetchOfficers} officers={officers} />
      </div>
      <Footer />
    </>
  )
}

FrontPage.propTypes = {
  cms: PropTypes.object,
  analyticSummary: PropTypes.object,
  departments: PropTypes.array,
  officers: PropTypes.array,
  fetchAnalyticSummary: PropTypes.func,
  fetchDepartments: PropTypes.func,
  fetchOfficers: PropTypes.func,
}

FrontPage.defaultProps = {
  cms: {},
  analyticSummary: {},
  departments: [],
  officers: [],
  fetchAnalyticSummary: noop,
  fetchDepartments: noop,
  fetchOfficers: noop,
}

export default FrontPage
