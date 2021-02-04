import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import isEmpty from 'lodash/isEmpty'

import Header from 'pages/common/header'
import Footer from 'components/common/footer'
import AnalyticSummary from './analytic-summary'
import './front-page.scss'
import DepartmentsCarousel from 'components/common/carousel/departments-carousel'
import OfficersCarousel from 'components/common/carousel/officers-carousel'
import DocumentsCarousel from 'components/common/carousel/documents-carousel'

const FrontPage = (props) => {
  const {
    cms,
    fetchAnalyticSummary,
    fetchDepartments,
    fetchOfficers,
    fetchDocuments,
    analyticSummary,
    departments,
    officers,
    documents,
  } = props

  useEffect(() => {
    fetchAnalyticSummary()
    fetchDepartments()
    fetchOfficers()
    fetchDocuments()
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
        {!isEmpty(departments) && (
          <DepartmentsCarousel
            items={departments}
            sortedField='size'
            className='front-page-carousel'
          />
        )}
        {!isEmpty(officers) && (
          <OfficersCarousel
            items={officers}
            sortedField='most recently added'
            className='front-page-carousel'
          />
        )}
        {!isEmpty(documents) && (
          <DocumentsCarousel
            items={documents}
            sortedField='most recently added'
            className='front-page-carousel'
          />
        )}
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
  documents: PropTypes.array,
  fetchAnalyticSummary: PropTypes.func,
  fetchDepartments: PropTypes.func,
  fetchOfficers: PropTypes.func,
  fetchDocuments: PropTypes.func,
}

FrontPage.defaultProps = {
  cms: {},
  analyticSummary: {},
  departments: [],
  officers: [],
  documents: [],
  fetchAnalyticSummary: noop,
  fetchDepartments: noop,
  fetchOfficers: noop,
  fetchDocuments: noop,
}

export default FrontPage
