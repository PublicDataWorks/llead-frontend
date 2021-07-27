import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import noop from 'lodash/noop'
import isEmpty from 'lodash/isEmpty'

import AnalyticSummary from './analytic-summary'
import './front-page.scss'
import DepartmentsCarousel from 'components/common/carousel/departments-carousel'
import OfficersCarousel from 'components/common/carousel/officers-carousel'
import DocumentsCarousel from 'components/common/carousel/documents-carousel'
import RecentItemsCarousel from './recent-items-carousel'

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
    saveRecentItem,
    recentItems,
  } = props

  const departmentRef = useRef(null)
  const officerRef = useRef(null)
  const documentRef = useRef(null)

  useEffect(() => {
    fetchAnalyticSummary()
    fetchDepartments()
    fetchOfficers()
    fetchDocuments()
  }, [])

  return (
    <div className='front-page'>
      <ReactMarkdown className='summary'>{cms.summary}</ReactMarkdown>
      <AnalyticSummary
        analyticSummary={analyticSummary}
        departmentRef={departmentRef}
        officerRef={officerRef}
        documentRef={documentRef}
      />
      {!isEmpty(recentItems) && (
        <RecentItemsCarousel
          items={recentItems}
          className='front-page-carousel'
        />
      )}
      {!isEmpty(departments) && (
        <>
          <div className='section-anchor' ref={departmentRef} />
          <DepartmentsCarousel
            items={departments}
            sortedField='size'
            className='front-page-carousel'
          />
        </>
      )}
      {!isEmpty(officers) && (
        <>
          <div className='section-anchor' ref={officerRef} />
          <OfficersCarousel
            items={officers}
            sortedField='complaints'
            className='front-page-carousel'
          />
        </>
      )}
      {!isEmpty(documents) && (
        <>
          <div className='section-anchor' ref={documentRef} />
          <DocumentsCarousel
            items={documents}
            saveRecentItem={saveRecentItem}
            sortedField='most recently added'
            className='front-page-carousel'
          />
        </>
      )}
    </div>
  )
}

FrontPage.propTypes = {
  cms: PropTypes.object,
  analyticSummary: PropTypes.object,
  departments: PropTypes.array,
  officers: PropTypes.array,
  documents: PropTypes.array,
  recentItems: PropTypes.array,
  fetchAnalyticSummary: PropTypes.func,
  fetchDepartments: PropTypes.func,
  fetchOfficers: PropTypes.func,
  fetchDocuments: PropTypes.func,
  saveRecentItem: PropTypes.func,
}

FrontPage.defaultProps = {
  cms: {},
  analyticSummary: {},
  departments: [],
  officers: [],
  documents: [],
  recentItems: [],
  fetchAnalyticSummary: noop,
  fetchDepartments: noop,
  fetchOfficers: noop,
  fetchDocuments: noop,
  saveRecentItem: noop,
}

export default FrontPage
