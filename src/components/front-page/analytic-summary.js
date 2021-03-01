import React from 'react'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import isEmpty from 'lodash/isEmpty'

import './analytic-summary.scss'
import { formatNumber } from 'utils/formatter'

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
          {formatNumber(documentsCount)}{' '}
          {pluralize('documents', documentsCount)}
        </div>
        <div className='recent-summary'>
          +{formatNumber(recentDocumentsCount)} in the past {recentDays} days
        </div>
      </div>
      <div className='analytic-summary-item'>
        <div className='analytic-summary-content'>
          {formatNumber(officersCount)} {pluralize('officers', officersCount)}
        </div>
        <div className='recent-summary'>
          +{formatNumber(recentOfficersCount)} in the past {recentDays} days
        </div>
      </div>
      <div className='analytic-summary-item'>
        <div className='analytic-summary-content'>
          {formatNumber(departmentsCount)}{' '}
          {pluralize('departments', departmentsCount)}
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
