import React, { useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import isEmpty from 'lodash/isEmpty'
import toNumber from 'lodash/toNumber'
import isNaN from 'lodash/isNaN'
import startCase from 'lodash/startCase'

import './officer-page.scss'
import CustomLink from 'components/common/links/custom-link'
import OfficerBadges from 'components/common/items/officer-badges'
import { departmentPath } from 'utils/paths'
import { stringifyTotalItems } from 'utils/formatter'
import { RECENT_ITEM_TYPES } from 'constants/common'
import TimelineContainer from 'containers/officer-page/timeline'

const Officer = (props) => {
  const {
    officer,
    fetchOfficer,
    isRequesting,
    saveRecentItem,
    recentData,
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
    salary,
    documentsCount,
    complaintsCount,
    dataPeriod,
    documentsDataPeriod,
    complaintsDataPeriod,
  } = officer

  useEffect(() => {
    fetchOfficer(officerId)
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
          <b>{stringifyTotalItems(complaintsCount, 'complaints')}</b>
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

  return (
    !isRequesting &&
    !isEmpty(officer) && (
      <div className='officer-page'>
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
          {salary && <div className='officer-basic-info-row'>{salary}</div>}
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

        <TimelineContainer officerId={officerId} />
      </div>
    )
  )
}

Officer.propTypes = {
  officer: PropTypes.object,
  recentData: PropTypes.object,
  fetchOfficer: PropTypes.func,
  saveRecentItem: PropTypes.func,
  isRequesting: PropTypes.bool,
}

Officer.defaultProps = {
  officer: {},
  recentData: {},
  timelineFilterGroups: {},
  fetchOfficer: noop,
  saveRecentItem: noop,
  isRequesting: false,
}

export default Officer
