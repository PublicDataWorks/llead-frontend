import React, { useEffect, useState, useMemo } from 'react'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
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
import cx from 'classnames'

import './department-page.scss'
import WRGLFile from './wrgl-file'
import DepartmentSection from './featured-items/department-section'
import FeaturedOfficerCard from './featured-items/featured-officer-card'
import FeaturedDocumentCard from './featured-items/featured-document-card'
import FeaturedNewsArticleCard from './featured-items/featured-news-article-card'
import DepartmentMigratoryMap from './migratory-map'
import { RECENT_ITEM_TYPES } from 'constants/common'
import SearchFeature from 'containers/common/search-feature'
import { formatDataPeriods, formatNumber } from 'utils/formatter'

const Department = (props) => {
  const {
    department,
    fetchDepartment,
    featuredOfficers,
    featuredDocuments,
    featuredNewsArticles,
    datasets,
    isRequesting,
    saveRecentItem,
    recentData,
    clearDocumentHead,
    setDocumentHead,
    fetchFeaturedOfficers,
    fetchFeaturedDocuments,
    fetchFeaturedNewsArticles,
    fetchDatasets,
    fetchDepartmentMigratoryData,
  } = props
  const { id: departmentId } = useParams()

  const [expandedCsvFiles, setExpandedCsvFiles] = useState([])
  const [itemType, setItemType] = useState('')
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const location = useLocation()
  const history = useHistory()

  const featuredSectionMappings = [
    {
      title: 'Featured officers',
      cardComponent: FeaturedOfficerCard,
      items: featuredOfficers,
      section: 'officers',
    },
    {
      title: 'Featured documents',
      cardComponent: FeaturedDocumentCard,
      items: featuredDocuments,
      section: 'documents',
    },
    {
      title: 'Featured news',
      cardComponent: FeaturedNewsArticleCard,
      items: featuredNewsArticles,
      section: 'articles',
    },
  ]

  const {
    complaintsCount,
    sustainedComplaintPercentage,
    documentsCount,
    recentDocumentsCount,
    datasetsCount,
    recentDatasetsCount,
    name,
    officersCount,
    newsArticlesCount,
    recentNewsArticlesCount,
    incidentForceCount,
    dataPeriod,
  } = department

  const summarySectionCount = [
    officersCount,
    complaintsCount,
    incidentForceCount,
    documentsCount,
    newsArticlesCount,
    datasetsCount,
  ].filter((count) => count > 0).length

  const joinedDataPeriod = useMemo(() => formatDataPeriods(dataPeriod), [
    dataPeriod,
  ])

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

  const openSearchModal = () => {
    setIsSearchModalOpen(true)
  }

  const closeSearchModal = () => {
    setIsSearchModalOpen(false)
  }

  useEffect(() => {
    fetchDepartment(departmentId)
    fetchDepartmentMigratoryData(departmentId)
    fetchFeaturedOfficers(departmentId)
    fetchFeaturedDocuments(departmentId)
    fetchFeaturedNewsArticles(departmentId)
    fetchDatasets(departmentId)
  }, [departmentId])

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
        filter(datasets, 'defaultExpanded'),
        'slug'
      )
      setExpandedCsvFiles(defaultExpandedCsvFiles)
    } else if (isString(csv)) {
      setExpandedCsvFiles([csv])
    } else {
      setExpandedCsvFiles(csv)
    }
  }, [datasets])

  useEffect(() => {
    if (!isEmpty(name)) {
      setDocumentHead({
        title: name,
      })
    }

    return () => clearDocumentHead()
  }, [name, setDocumentHead])

  useEffect(() => {
    return () => closeSearchModal()
  }, [departmentId])

  return (
    !isRequesting &&
    !isEmpty(department) && (
      <div className='department-page'>
        {!isEmpty(joinedDataPeriod) && (
          <div className='department-period'>
            Incident data for this agency is limited to the years&nbsp;
            {joinedDataPeriod}
          </div>
        )}
        <div className='department-content'>
          <div className='department-title'>Agency</div>
          <div className='department-name'>{name}</div>
          <div className='department-basic-info'>
            {!isEmpty(department.location) && <DepartmentMigratoryMap />}
            <div className='department-summary'>
              {officersCount > 0 && (
                <div
                  className={cx(
                    'summary-officers',
                    'summary-item',
                    `summary-item-${summarySectionCount}`,
                    'summary-item-mobile-stretch',
                    'summary-item-stretch'
                  )}
                >
                  <div className='summary-item-count'>
                    {formatNumber(officersCount)}
                  </div>
                  <div className='summary-item-title'>
                    {pluralize('officer', officersCount)}
                  </div>
                </div>
              )}
              {datasetsCount > 0 && (
                <div
                  className={cx(
                    'summary-datasets',
                    'summary-item',
                    `summary-item-${summarySectionCount}`,
                    {
                      'summary-item-mobile-stretch':
                        officersCount === 0 && isMobile,
                    }
                  )}
                >
                  <div className='summary-item-count'>
                    {formatNumber(datasetsCount)}
                  </div>
                  <div className='summary-item-title'>
                    {pluralize('dataset', datasetsCount)}
                  </div>
                  <div className='recent-summary-item'>
                    +{recentDatasetsCount} in the past 30 days
                  </div>
                </div>
              )}
              {newsArticlesCount > 0 && (
                <div
                  className={cx(
                    'summary-news-articles',
                    'summary-item',
                    `summary-item-${summarySectionCount}`
                  )}
                >
                  <div className='summary-item-count'>
                    {formatNumber(newsArticlesCount)}
                  </div>
                  <div className='summary-item-title'>
                    {pluralize('news article', newsArticlesCount)}
                  </div>
                  <div className='recent-summary-item'>
                    +{recentNewsArticlesCount} in the past 30 days
                  </div>
                </div>
              )}
              {complaintsCount > 0 && (
                <div
                  className={cx(
                    'summary-allegations',
                    'summary-item',
                    `summary-item-${summarySectionCount}`,
                    'summary-item-stretch'
                  )}
                >
                  <div className='summary-item-count'>
                    {formatNumber(complaintsCount)}
                  </div>
                  <div className='summary-item-title'>
                    {pluralize('allegation', complaintsCount)}
                  </div>
                  {sustainedComplaintPercentage > 0 && (
                    <div className='recent-summary-item'>
                      {sustainedComplaintPercentage}% sustained allegations
                    </div>
                  )}
                </div>
              )}
              {documentsCount > 0 && (
                <div
                  className={cx(
                    'summary-documents',
                    'summary-item',
                    `summary-item-${summarySectionCount}`
                  )}
                >
                  <div className='summary-item-count'>
                    {formatNumber(documentsCount)}
                  </div>
                  <div className='summary-item-title'>
                    {pluralize('document', documentsCount)}
                  </div>
                  <div className='recent-summary-item'>
                    +{recentDocumentsCount} in the past 30 days
                  </div>
                </div>
              )}
              {incidentForceCount > 0 && (
                <div
                  className={cx(
                    'summary-incidents',
                    'summary-item',
                    `summary-item-${summarySectionCount}`,
                    'summary-item-stretch',
                    {
                      'summary-item-shrink':
                        officersCount > 0 && complaintsCount > 0,
                    }
                  )}
                >
                  <div className='summary-item-count'>
                    {formatNumber(incidentForceCount)}
                  </div>
                  <div className='summary-item-title'>
                    {pluralize('force incident', incidentForceCount)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {featuredSectionMappings.map(
          ({ items, cardComponent: Card, title, section }, index) =>
            !isEmpty(items) && (
              <DepartmentSection
                key={index}
                card={Card}
                title={title}
                items={items}
                searchModalOnOpen={openSearchModal}
                setItemType={setItemType}
                section={section}
                saveRecentItem={saveRecentItem}
              />
            )
        )}
        {!isEmpty(datasets) && (
          <div className='department-wrgl-files'>
            <div className='wrgl-title'>Datasets</div>
            <div>
              {map(datasets, ({ id, ...rest }) => (
                <WRGLFile
                  key={id}
                  {...rest}
                  expandedCsvFiles={expandedCsvFiles}
                  updateExpandedCsvFiles={updateExpandedCsvFiles}
                />
              ))}
            </div>
          </div>
        )}
        <SearchFeature
          itemType={itemType}
          isSearchModalOpen={isSearchModalOpen}
          searchModalOnClose={closeSearchModal}
          department={department}
        />
      </div>
    )
  )
}

Department.propTypes = {
  clearDocumentHead: PropTypes.func,
  department: PropTypes.object,
  featuredOfficers: PropTypes.array,
  featuredDocuments: PropTypes.array,
  featuredNewsArticles: PropTypes.array,
  datasets: PropTypes.array,
  searchOfficers: PropTypes.array,
  fetchFeaturedOfficers: PropTypes.func,
  fetchFeaturedDocuments: PropTypes.func,
  fetchFeaturedNewsArticles: PropTypes.func,
  fetchDepartmentMigratoryData: PropTypes.func,
  fetchDatasets: PropTypes.func,
  fetchDepartment: PropTypes.func,
  fetchSearchOfficers: PropTypes.func,
  isRequesting: PropTypes.bool,
  recentData: PropTypes.object,
  saveRecentItem: PropTypes.func,
  setDocumentHead: PropTypes.func,
}

Department.defaultProps = {
  clearDocumentHead: noop,
  department: {},
  featuredOfficers: [],
  featuredDocuments: [],
  featuredNewsArticles: [],
  datasets: [],
  searchOfficers: [],
  fetchFeaturedOfficers: noop,
  fetchFeaturedDocuments: noop,
  fetchFeaturedNewsArticles: noop,
  fetchDatasets: noop,
  fetchDepartment: noop,
  fetchSearchOfficers: noop,
  fetchDepartmentMigratoryData: noop,
  isRequesting: false,
  recentData: {},
  saveRecentItem: noop,
  setDocumentHead: noop,
}

export default Department
