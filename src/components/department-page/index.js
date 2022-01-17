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
import WRGLFile from './wrgl-file'
import { RECENT_ITEM_TYPES } from 'constants/common'
import { formatDataPeriods, formatNumber } from 'utils/formatter'
import DepartmentSection from './featured-items/department-section'
import FeaturedOfficerCard from './featured-items/featured-officer-card'
import FeaturedDocumentCard from './featured-items/featured-document-card'
import FeaturedNewsArticleCard from './featured-items/featured-news-article-card'
import FeaturedSearch from 'containers/department-page/featured-search'

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
    changeSearchDepartment,
  } = props
  const { id: departmentId } = useParams()

  const [expandedCsvFiles, setExpandedCsvFiles] = useState([])
  const [itemType, setItemType] = useState('')
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
      section: 'news_articles',
    },
  ]

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
    fetchFeaturedOfficers(departmentId)
    fetchFeaturedDocuments(departmentId)
    fetchFeaturedNewsArticles(departmentId)
    fetchDatasets(departmentId)
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

  const [isSearchModalOpen, setIsSearchModalOpen] = React.useState(false)

  const openSearchModal = () => {
    setIsSearchModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeSearchModal = () => {
    setIsSearchModalOpen(false)
    document.body.style.overflow = 'unset'
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
                <div className='summary-item-count'>
                  {formatNumber(officersCount)}
                </div>
                <div className='summary-item-title'>
                  {pluralize('officer', officersCount)}
                </div>
              </div>
              <div className='summary-item  summary-datasets'>
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
              <div className='summary-item summary-news-articles'>
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
              <div className='summary-item summary-allegations'>
                <div className='summary-item-count'>
                  {formatNumber(complaintsCount)}
                </div>
                <div className='summary-item-title'>
                  {pluralize('allegation', complaintsCount)}
                </div>
                <div className='recent-summary-item'>
                  {sustainedComplaintPercentage}% sustained allegations
                </div>
              </div>
              <div className='summary-item summary-documents'>
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

              <div className='summary-item summary-incidents'>
                <div className='summary-item-count'>
                  {formatNumber(incidentForceCount)}
                </div>
                <div className='summary-item-title'>
                  {pluralize('force incident', incidentForceCount)}
                </div>
              </div>
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
        <FeaturedSearch
          isSearchModalOpen={isSearchModalOpen}
          searchModalOnClose={closeSearchModal}
          departmentId={departmentId}
          departmentName={name}
          itemType={itemType}
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
  fetchDatasets: PropTypes.func,
  fetchDepartment: PropTypes.func,
  fetchSearchOfficers: PropTypes.func,
  isRequesting: PropTypes.bool,
  recentData: PropTypes.object,
  saveRecentItem: PropTypes.func,
  setDocumentHead: PropTypes.func,
  changeSearchDepartment: PropTypes.func,
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
  isRequesting: false,
  recentData: {},
  saveRecentItem: noop,
  setDocumentHead: noop,
  changeSearchDepartment: noop,
}

export default Department
