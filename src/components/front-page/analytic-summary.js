import React from 'react'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import isEmpty from 'lodash/isEmpty'

import './analytic-summary.scss'

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
          {documentsCount} {pluralize('documents', documentsCount)}
        </div>
        <div className='recent-summary'>
          +{recentDocumentsCount} in the past {recentDays} days
        </div>
      </div>
      <div className='analytic-summary-item'>
        <div className='analytic-summary-content'>
          {officersCount} {pluralize('officers', officersCount)}
        </div>
        <div className='recent-summary'>
          +{recentOfficersCount} in the past {recentDays} days
        </div>
      </div>
      <div className='analytic-summary-item'>
        <div className='analytic-summary-content'>
          {departmentsCount} {pluralize('departments', departmentsCount)}
        </div>
        <div className='recent-summary'>
          +{recentDepartmentsCount} in the past {recentDays} days
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
