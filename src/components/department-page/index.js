import React, { useEffect, useState, useMemo } from 'react'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import pluralize from 'pluralize'
import qs from 'qs'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import isString from 'lodash/isString'
import compact from 'lodash/compact'
import filter from 'lodash/filter'
import concat from 'lodash/concat'

import './department-page.scss'
import DepartmentDocumentsContainer from 'containers/department-page/department-documents-container'
import WRGLFile from './wrgl-file'
import { RECENT_ITEM_TYPES } from 'constants/common'
import { formatDataPeriods } from 'utils/formatter'

const Department = (props) => {
  const {
    department,
    fetchDepartment,
    isRequesting,
    saveRecentItem,
    recentData,
    clearDocumentHead,
    setDocumentHead,
    changeSearchDepartment,
  } = props
  const { id: departmentId } = useParams()

  const [expandedCsvFiles, setExpandedCsvFiles] = useState([])
  const location = useLocation()
  const history = useHistory()

  const {
    city,
    address,
    phone,
    complaintsCount,
    sustainedComplaintPercentage,
    documentsCount,
    recentDocumentsCount,
    datasetsCount,
    recentDatasetsCount,
    locationMapUrl,
    name,
    officersCount,
    newsArticlesCount,
    recentNewsArticlesCount,
    incidentForceCount,
    parish,
    wrglFiles,
    dataPeriod,
  } = department

  const mapElementStyles = isEmpty(locationMapUrl)
    ? {}
    : { backgroundImage: `url(${locationMapUrl})` }

  const joinedDataPeriod = useMemo(() => formatDataPeriods(dataPeriod), [
    dataPeriod,
  ])

  useEffect(() => {
    fetchDepartment(departmentId)
  }, [departmentId])

  useEffect(() => {
    if (name) {
      changeSearchDepartment({ name, id: departmentId })
    }
  }, [name])

  useEffect(() => {
    if (
      !isRequesting &&
      !isEmpty(department) &&
      departmentId == department.id
    ) {
      saveRecentItem({
        type: RECENT_ITEM_TYPES.DEPARTMENT,
        id: departmentId,
        data: recentData,
      })
    }
  }, [departmentId, isRequesting])

  useEffect(() => {
    const parsedSearch = qs.parse(location.search, {
      ignoreQueryPrefix: true,
      comma: true,
    })
    const { csv } = parsedSearch

    if (isEmpty(csv)) {
      const defaultExpandedCsvFiles = map(
        filter(wrglFiles, 'defaultExpanded'),
        'slug'
      )
      setExpandedCsvFiles(defaultExpandedCsvFiles)
    } else if (isString(csv)) {
      setExpandedCsvFiles([csv])
    } else {
      setExpandedCsvFiles(csv)
    }
  }, [wrglFiles])

  useEffect(() => {
    if (!isEmpty(name)) {
      setDocumentHead({
        title: name,
      })
    }

    return () => clearDocumentHead()
  }, [name, setDocumentHead])

  const updateExpandedCsvFiles = (slug, isExpanded) => {
    const parsedSearch = qs.parse(location.search, {
      ignoreQueryPrefix: true,
      comma: true,
    })

    let newExpandedCsvFiles
    if (isExpanded) {
      newExpandedCsvFiles = compact(
        filter(expandedCsvFiles, (item) => item !== slug)
      )
    } else {
      newExpandedCsvFiles = compact(concat(expandedCsvFiles, [slug]))
    }
    history.replace({
      search: qs.stringify(
        { ...parsedSearch, csv: newExpandedCsvFiles },
        { arrayFormat: 'comma', encode: false }
      ),
    })
    setExpandedCsvFiles(newExpandedCsvFiles)
  }

  return (
    !isRequesting &&
    !isEmpty(department) && (
      <div className='department-page'>
        {!isEmpty(joinedDataPeriod) && (
          <div className='department-period'>
            Data for this department is limited to the years&nbsp;
            {joinedDataPeriod}
          </div>
        )}
        <div className='department-content'>
          <div className='department-title'>Police Department</div>
          <div className='department-name'>{name}</div>
          <div className='department-basic-info'>
            <div className='department-location'>
              {!isEmpty(mapElementStyles) && (
                <div className='department-map' style={mapElementStyles} />
              )}
              <div className='upper-location-info'>
                {!isEmpty(city) && (
                  <div className='department-city'>{city}</div>
                )}
                {!isEmpty(parish) && (
                  <div className='department-parish'>{parish}</div>
                )}
              </div>
              {(!isEmpty(address) || !isEmpty(phone)) && (
                <div className='lower-location-info'>
                  {!isEmpty(address) && (
                    <div className='address'>{address}</div>
                  )}
                  {!isEmpty(phone) && <div className='phone'>{phone}</div>}
                </div>
              )}
            </div>
            <div className='department-summary'>
              <div className='summary-item summary-officers'>
                <div className='summary-item-count'>{officersCount}</div>
                <div className='summary-item-title'>
                  {pluralize('officer', officersCount)}
                </div>
              </div>
              <div className='summary-item  summary-datasets'>
                <div className='summary-item-count'>{datasetsCount}</div>
                <div className='summary-item-title'>
                  {pluralize('dataset', datasetsCount)}
                </div>
                <div className='recent-summary-item'>
                  +{recentDatasetsCount} in the past 30 days
                </div>
              </div>
              <div className='summary-item summary-news-articles'>
                <div className='summary-item-count'>{newsArticlesCount}</div>
                <div className='summary-item-title'>
                  {pluralize('news article', newsArticlesCount)}
                </div>
                <div className='recent-summary-item'>
                  +{recentNewsArticlesCount} in the past 30 days
                </div>
              </div>
              <div className='summary-item summary-allegations'>
                <div className='summary-item-count'>{complaintsCount}</div>
                <div className='summary-item-title'>
                  {pluralize('allegation', complaintsCount)}
                </div>
                <div className='recent-summary-item'>
                  {sustainedComplaintPercentage}% sustained allegations
                </div>
              </div>
              <div className='summary-item summary-documents'>
                <div className='summary-item-count'>{documentsCount}</div>
                <div className='summary-item-title'>
                  {pluralize('document', documentsCount)}
                </div>
                <div className='recent-summary-item'>
                  +{recentDocumentsCount} in the past 30 days
                </div>
              </div>

              <div className='summary-item summary-incidents'>
                <div className='summary-item-count'>{incidentForceCount}</div>
                <div className='summary-item-title'>
                  {pluralize('force incident', incidentForceCount)}
                </div>
              </div>
            </div>
          </div>
          <div className='department-wrgl-files'>
            {map(wrglFiles, ({ id, ...rest }) => (
              <WRGLFile
                key={id}
                {...rest}
                expandedCsvFiles={expandedCsvFiles}
                updateExpandedCsvFiles={updateExpandedCsvFiles}
              />
            ))}
          </div>

          {documentsCount > 0 && (
            <DepartmentDocumentsContainer departmentId={departmentId} />
          )}
        </div>
      </div>
    )
  )
}

Department.propTypes = {
  clearDocumentHead: PropTypes.func,
  department: PropTypes.object,
  fetchDepartment: PropTypes.func,
  isRequesting: PropTypes.bool,
  recentData: PropTypes.object,
  saveRecentItem: PropTypes.func,
  setDocumentHead: PropTypes.func,
  changeSearchDepartment: PropTypes.func,
}

Department.defaultProps = {
  clearDocumentHead: noop,
  department: {},
  fetchDepartment: noop,
  isRequesting: false,
  recentData: {},
  saveRecentItem: noop,
  setDocumentHead: noop,
  changeSearchDepartment: noop,
}

export default Department
