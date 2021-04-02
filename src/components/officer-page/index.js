import React, { useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import cx from 'classnames'
import noop from 'lodash/noop'
import isEmpty from 'lodash/isEmpty'
import toNumber from 'lodash/toNumber'
import isNaN from 'lodash/isNaN'
import startCase from 'lodash/startCase'
import map from 'lodash/map'

import './officer-page.scss'
import CustomLink from 'components/common/links/custom-link'
import OfficerBadges from 'components/common/items/officer-badges'
import DocumentItem from 'components/common/items/document-item'
import { departmentPath } from 'utils/paths'
import { stringifyTotalItems } from 'utils/formatter'
import { formatNumber } from 'utils/formatter'
import { RECENT_ITEM_TYPES } from 'constants/common'
import Timeline from './timeline'

const Officer = (props) => {
  const {
    officer,
    documents,
    fetchOfficer,
    fetchOfficerDocuments,
    fetchOfficerTimeline,
    isRequesting,
    saveRecentItem,
    recentData,
    timeline,
  } = props
  const { id } = useParams()

  const officerId = toNumber(id)
  if (isNaN(officerId)) {
    return <Redirect to='/' />
  }

  const {
    name,
    department,
    badges,
    description,
    annualSalary,
    documentsCount,
    complaintsCount,
    dataPeriod,
    documentsDataPeriod,
    complaintsDataPeriod,
  } = officer

  useEffect(() => {
    fetchOfficer(officerId)
    fetchOfficerDocuments(officerId)
    fetchOfficerTimeline(officerId)
  }, [officerId])

  useEffect(() => {
    if (!isRequesting && !isEmpty(officer) && officerId == officer.id) {
      saveRecentItem({
        type: RECENT_ITEM_TYPES.OFFICER,
        id: officerId,
        data: recentData,
      })
    }
  }, [officerId, isRequesting])

  const displaySummaryInfo = () => {
    if (complaintsCount > 0) {
      return (
        <div className='officer-summary-info'>
          {startCase(name)} has&nbsp;
          <b>{stringifyTotalItems(complaintsCount, 'allegation')}</b>
          {complaintsDataPeriod && ` in ${complaintsDataPeriod}`}
        </div>
      )
    } else if (documentsCount > 0) {
      return (
        <div className='officer-summary-info'>
          {startCase(name)} was named in&nbsp;
          <b>{stringifyTotalItems(documentsCount, 'document')}</b>
          {documentsDataPeriod && ` in ${documentsDataPeriod}`}
        </div>
      )
    }
  }

  const hasTimeline = !isEmpty(timeline)

  return (
    <div className={cx('officer-page', { 'empty-timeline': !hasTimeline })}>
      {!isRequesting && !isEmpty(officer) && (
        <>
          {!isEmpty(dataPeriod) && (
            <div className='officer-period'>
              Data for this officer is limited to the years&nbsp;
              {dataPeriod}
            </div>
          )}
          <div className='officer-basic-info'>
            <div className='officer-title'>Police Officer</div>
            <div className='officer-name'>{startCase(name)}</div>
            {!isEmpty(badges) && (
              <div className='officer-basic-info-row'>
                <OfficerBadges badges={badges} />
              </div>
            )}
            {description && (
              <div className='officer-basic-info-row'>{description}</div>
            )}
            {annualSalary && (
              <div className='officer-basic-info-row'>{annualSalary}</div>
            )}
            {!isEmpty(department) && (
              <CustomLink
                className='officer-department'
                to={departmentPath(department.id)}
              >
                {department.name}
              </CustomLink>
            )}
            {displaySummaryInfo()}
          </div>

          {hasTimeline && <Timeline timeline={timeline} />}

          {documentsCount > 0 && (
            <div className='officer-documents'>
              <div className='officer-documents-title'>
                Documents ({formatNumber(documentsCount)})
              </div>
              <div className='officer-documents-listview'>
                {map(documents, (document) => (
                  <DocumentItem
                    key={document.id}
                    {...document}
                    saveRecentItem={saveRecentItem}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

Officer.propTypes = {
  officer: PropTypes.object,
  recentData: PropTypes.object,
  documents: PropTypes.array,
  timeline: PropTypes.array,
  fetchOfficer: PropTypes.func,
  fetchOfficerDocuments: PropTypes.func,
  fetchOfficerTimeline: PropTypes.func,
  saveRecentItem: PropTypes.func,
  isRequesting: PropTypes.bool,
}

Officer.defaultProps = {
  officer: {},
  recentData: {},
  documents: [],
  timeline: [],
  fetchOfficer: noop,
  fetchOfficerDocuments: noop,
  fetchOfficerTimeline: noop,
  saveRecentItem: noop,
  isRequesting: false,
}

export default Officer
