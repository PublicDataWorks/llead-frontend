import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
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
    fetchRecentItems,
    fetchDepartments,
    fetchOfficers,
    fetchDocuments,
    analyticSummary,
    departments,
    officers,
    documents,
    saveRecentItem,
    recentItemIds,
    recentItems,
  } = props

  useEffect(() => {
    if (!isEmpty(recentItemIds)) {
      fetchRecentItems(recentItemIds)
    }
    fetchAnalyticSummary()
    fetchDepartments()
    fetchOfficers()
    fetchDocuments()
  }, [])

  return (
    <div className='front-page'>
      <div
        className='summary'
        data-testid='test--summary'
        dangerouslySetInnerHTML={{ __html: cms.summary }}
      />
      <AnalyticSummary analyticSummary={analyticSummary} />
      {!isEmpty(recentItems) && (
        <RecentItemsCarousel
          items={recentItems}
          className='front-page-carousel'
        />
      )}
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
          sortedField='complaints'
          className='front-page-carousel'
        />
      )}
      {!isEmpty(documents) && (
        <DocumentsCarousel
          items={documents}
          saveRecentItem={saveRecentItem}
          sortedField='most recently added'
          className='front-page-carousel'
        />
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
  recentItemIds: PropTypes.object,
  recentItems: PropTypes.array,
  fetchAnalyticSummary: PropTypes.func,
  fetchRecentItems: PropTypes.func,
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
  recentItemIds: {},
  recentItems: [],
  fetchAnalyticSummary: noop,
  fetchRecentItems: noop,
  fetchDepartments: noop,
  fetchOfficers: noop,
  fetchDocuments: noop,
  saveRecentItem: noop,
}

export default FrontPage
