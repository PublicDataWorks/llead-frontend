import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

import './analytic-summary.scss'
import { formatNumber, stringifyTotalItems } from 'utils/formatter'

const AnalyticSummary = ({ analyticSummary }) => {
  if (isEmpty(analyticSummary)) {
    return null
  }

  const {
    documentsCount,
    recentDocumentsCount,
    officersCount,
    recentOfficersCount,
    departmentsCount,
    recentDepartmentsCount,
    recentDays,
  } = analyticSummary

  return (
    <div className='analytic-summary'>
      <div className='analytic-summary-item'>
        <div className='analytic-summary-content'>
          {stringifyTotalItems(documentsCount, 'documents')}
        </div>
        <div className='recent-summary'>
          +{formatNumber(recentDocumentsCount)} in the past {recentDays} days
        </div>
      </div>
      <div className='analytic-summary-item'>
        <div className='analytic-summary-content'>
          {stringifyTotalItems(officersCount, 'officers')}
        </div>
        <div className='recent-summary'>
          +{formatNumber(recentOfficersCount)} in the past {recentDays} days
        </div>
      </div>
      <div className='analytic-summary-item'>
        <div className='analytic-summary-content'>
          {stringifyTotalItems(departmentsCount, 'departments')}
        </div>
        <div className='recent-summary'>
          +{formatNumber(recentDepartmentsCount)} in the past {recentDays} days
        </div>
      </div>
    </div>
  )
}

AnalyticSummary.propTypes = {
  analyticSummary: PropTypes.object,
}

AnalyticSummary.defaultProps = {
  analyticSummary: {},
}

export default AnalyticSummary
