import React, { useEffect } from 'react'
import { Redirect, useParams, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import noop from 'lodash/noop'
import isEmpty from 'lodash/isEmpty'
import toNumber from 'lodash/toNumber'
import isNaN from 'lodash/isNaN'
import startCase from 'lodash/startCase'
import isInteger from 'lodash/isInteger'
import head from 'lodash/head'
import last from 'lodash/last'
import size from 'lodash/size'

import './officer-page.scss'
import OfficerBadges from 'components/common/items/officer-badges'
import TimelineContainer from 'containers/officer-page/timeline'
import { RECENT_ITEM_TYPES } from 'constants/common'
import { stringifyTotalItems } from 'utils/formatter'
import { generateOfficerSlug } from 'utils/paths'
import OfficerDepartments from 'components/common/items/officer-departments'

const Officer = (props) => {
  const {
    officer,
    timelinePeriod,
    fetchOfficer,
    isRequesting,
    saveRecentItem,
    recentData,
    clearDocumentHead,
    setDocumentHead,
    clearOfficer,
  } = props

  const { id, officerName } = useParams()
  const history = useHistory()

  const officerId = toNumber(id)
  if (isNaN(officerId)) {
    return <Redirect to='/' />
  }

  const {
    name,
    departments,
    badges,
    latestRank,
    description,
    salary,
    documentsCount,
    articlesCount,
    complaintsCount,
    sustainedComplaintsCount,
    complaintsYearCount,
    incidentForceCount,
    terminationCount,
    articlesDocumentsYears,
    awardCount,
  } = officer

  useEffect(() => {
    return () => {
      clearOfficer()
    }
  }, [])

  useEffect(() => {
    fetchOfficer(officerId)
  }, [officerId])

  useEffect(() => {
    const officerSlug = generateOfficerSlug(name)

    if (officerSlug && officerSlug != officerName) {
      const newLocation = {
        pathname: `/officers/${id}/${officerSlug}`,
      }
      history.replace(newLocation)
    }
  }, [name])

  useEffect(() => {
    if (!isRequesting && !isEmpty(officer) && officerId == officer.id) {
      saveRecentItem({
        type: RECENT_ITEM_TYPES.OFFICER,
        id: officerId,
        data: recentData,
      })
    }
  }, [officerId, isRequesting])

  useEffect(() => {
    if (!isEmpty(name)) {
      setDocumentHead({
        title: name,
      })
    }

    return () => clearDocumentHead()
  }, [name, setDocumentHead])

  const displaySummaryInfo = () => {
    if (complaintsCount > 0) {
      return (
        <div className='officer-summary-info'>
          {complaintsCount > 0 && (
            <span>
              {startCase(name)} was named in&nbsp;
              <b>{stringifyTotalItems(complaintsCount, 'allegations')}</b>
              {sustainedComplaintsCount > 0 && (
                <b>, {sustainedComplaintsCount} sustained</b>
              )}
              &nbsp;over {stringifyTotalItems(complaintsYearCount, 'years')}.
            </span>
          )}

          {(incidentForceCount > 0 || awardCount > 0) && (
            <span>
              &nbsp;
              {startCase(name)} has&nbsp;
              {incidentForceCount > 0 && (
                <span>
                  <b>{incidentForceCount} use of force</b>&nbsp;
                  {pluralize('incidents', incidentForceCount)}
                </span>
              )}
              {awardCount > 0 && (
                <span>
                  {incidentForceCount ? ', ' : ''}
                  <b>{stringifyTotalItems(awardCount, 'commendations')}</b>
                </span>
              )}
              {terminationCount > 0 && (
                <span>
                  , and&nbsp;
                  <b>{stringifyTotalItems(terminationCount, 'terminations')}</b>
                </span>
              )}
              .
            </span>
          )}
          {size(departments) > 1 && (
            <span>
              &nbsp;
              {startCase(name)} has worked in {size(departments)} law
              enforcement agencies in Louisiana.
            </span>
          )}
        </div>
      )
    } else if (documentsCount > 0 || articlesCount > 0) {
      return (
        <div className='officer-summary-info'>
          {startCase(name)} was named in&nbsp;
          {articlesCount > 0 && (
            <b>{stringifyTotalItems(articlesCount, 'news articles')}</b>
          )}
          {documentsCount > 0 && articlesCount > 0 && <span> and </span>}
          {documentsCount > 0 && (
            <b>{stringifyTotalItems(documentsCount, 'documents')}</b>
          )}
          {articlesDocumentsYears.length > 1 &&
            ` between ${head(articlesDocumentsYears)} and ${last(
              articlesDocumentsYears
            )}`}
          {articlesDocumentsYears.length === 1 &&
            ` in ${articlesDocumentsYears[0]}`}
          .
        </div>
      )
    }
  }

  return (
    !isRequesting &&
    !isEmpty(officer) && (
      <div className='officer-page'>
        {!isEmpty(timelinePeriod) && (
          <div className='officer-period'>
            Incident data for this officer is limited to the&nbsp;
            {isInteger(toNumber(timelinePeriod)) ? 'year' : 'years'}&nbsp;
            {timelinePeriod}
          </div>
        )}
        <div className='officer-basic-info'>
          <div className='officer-rank'>{startCase(latestRank)}</div>
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
          {!isEmpty(departments) && (
            <OfficerDepartments departments={departments} />
          )}
          {displaySummaryInfo()}
        </div>

        <TimelineContainer officerId={officerId} officerName={name} />
      </div>
    )
  )
}

Officer.propTypes = {
  timelinePeriod: PropTypes.string,
  officer: PropTypes.object,
  recentData: PropTypes.object,
  fetchOfficer: PropTypes.func,
  saveRecentItem: PropTypes.func,
  clearDocumentHead: PropTypes.func,
  setDocumentHead: PropTypes.func,
  clearOfficer: PropTypes.func,
  isRequesting: PropTypes.bool,
}

Officer.defaultProps = {
  officer: {},
  recentData: {},
  timelineFilterGroups: {},
  fetchOfficer: noop,
  saveRecentItem: noop,
  clearDocumentHead: noop,
  setDocumentHead: noop,
  clearOfficer: noop,
  isRequesting: false,
}

export default Officer
