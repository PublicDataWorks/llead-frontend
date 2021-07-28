import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

import './analytic-summary.scss'
import { formatNumber, stringifyTotalItems } from 'utils/formatter'

const AnalyticSummary = (props) => {
  const { analyticSummary, departmentRef, officerRef, documentRef } = props
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

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      })
    }
  }

  const scrollToDepartmentSection = () => {
    scrollToSection(departmentRef)
  }

  const scrollToOfficerSection = () => {
    scrollToSection(officerRef)
  }

  const scrollToDocumentSection = () => {
    scrollToSection(documentRef)
  }

  return (
    <div className='analytic-summary'>
      <div className='analytic-summary-item' onClick={scrollToDocumentSection}>
        <div className='analytic-summary-content'>
          {stringifyTotalItems(documentsCount, 'documents')}
        </div>
        <div className='recent-summary'>
          +{formatNumber(recentDocumentsCount)} in the past&nbsp;
          {stringifyTotalItems(recentDays, 'days')}
        </div>
      </div>
      <div className='analytic-summary-item' onClick={scrollToOfficerSection}>
        <div className='analytic-summary-content'>
          {stringifyTotalItems(officersCount, 'officers')}
        </div>
        <div className='recent-summary'>
          +{formatNumber(recentOfficersCount)} in the past&nbsp;
          {stringifyTotalItems(recentDays, 'days')}
        </div>
      </div>
      <div
        className='analytic-summary-item'
        onClick={scrollToDepartmentSection}
      >
        <div className='analytic-summary-content'>
          {stringifyTotalItems(departmentsCount, 'departments')}
        </div>
        <div className='recent-summary'>
          +{formatNumber(recentDepartmentsCount)} in the past&nbsp;
          {stringifyTotalItems(recentDays, 'days')}
        </div>
      </div>
    </div>
  )
}

AnalyticSummary.propTypes = {
  analyticSummary: PropTypes.object,
  departmentRef: PropTypes.object,
  officerRef: PropTypes.object,
  documentRef: PropTypes.object,
}

AnalyticSummary.defaultProps = {
  analyticSummary: {},
}

export default AnalyticSummary
